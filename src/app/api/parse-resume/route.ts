import { NextRequest, NextResponse } from "next/server";
import mammoth from "mammoth";
import genAI from "@/lib/gemini";
import { extractText } from "unpdf";

/**
 * Remove null bytes and other invalid characters from strings to prevent PostgreSQL UTF8 encoding errors
 * PostgreSQL doesn't allow null bytes (\x00) in text fields
 */
function sanitizeString(value: string): string {
  // Remove null bytes and other control characters except newline, tab, and carriage return
  return value.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F]/g, '');
}

/**
 * Deeply sanitize an object by removing null bytes from all strings
 */
function deepSanitize<T>(value: T): T {
  if (value === undefined || value === null) return value;

  // Handle strings - sanitize them
  if (typeof value === "string") {
    return sanitizeString(value) as T;
  }

  // Handle arrays
  if (Array.isArray(value)) {
    return value.map((item) => deepSanitize(item)) as T;
  }

  // Handle objects (but preserve special types like Date)
  if (typeof value === "object") {
    if (value instanceof Date) return value;

    const result: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(value as any)) {
      result[key] = deepSanitize(nested);
    }
    return result as T;
  }

  // Return primitives as-is (numbers, booleans, etc.)
  return value;
}

// PDF parsing with unpdf (uses pdfjs-dist, handles Type3 fonts properly)
const pdfParse = async (buffer: Buffer): Promise<string> => {
  const uint8Array = new Uint8Array(buffer);
  const { text } = await extractText(uint8Array, { mergePages: true });
  return Array.isArray(text) ? text.join("\n") : text;
};

function stripMarkdownCodeFences(text: string): string {
  // Remove only the fence markers, not the contents.
  // Handles: ```json, ```JSON, ```
  return text.replace(/```[a-zA-Z0-9_-]*\s*/g, "");
}

function extractJsonObjectSubstring(
  text: string,
  startIndex: number,
): { json: string; endIndex: number } | null {
  let depth = 0;
  let inString = false;
  let isEscaped = false;

  for (let i = startIndex; i < text.length; i++) {
    const ch = text[i];

    if (inString) {
      if (isEscaped) {
        isEscaped = false;
        continue;
      }
      if (ch === "\\") {
        isEscaped = true;
        continue;
      }
      if (ch === '"') {
        inString = false;
      }
      continue;
    }

    if (ch === '"') {
      inString = true;
      continue;
    }

    if (ch === "{") {
      depth++;
      continue;
    }

    if (ch === "}") {
      depth--;
      if (depth === 0) {
        return { json: text.slice(startIndex, i + 1), endIndex: i };
      }
      if (depth < 0) {
        return null;
      }
    }
  }

  return null;
}

function extractJSONObject(text: string): Record<string, unknown> {
  const cleaned = stripMarkdownCodeFences(text).trim();

  let lastValid: Record<string, unknown> | null = null;

  for (let i = 0; i < cleaned.length; i++) {
    if (cleaned[i] !== "{") continue;

    const extracted = extractJsonObjectSubstring(cleaned, i);
    if (!extracted) continue;

    try {
      const parsed: unknown = JSON.parse(extracted.json);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        lastValid = parsed as Record<string, unknown>;
      }
    } catch {
      // Ignore and continue searching. We'll only fail if nothing valid is found.
    }

    // Skip ahead to reduce work; safe because nested braces are handled.
    i = extracted.endIndex;
  }

  if (!lastValid) {
    throw new SyntaxError(
      "Could not find a valid JSON object in AI response (expected a final `{ ... }` block).",
    );
  }

  return lastValid;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    let text = "";

    if (file.type === "application/pdf") {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Use pdf-parse for better handling of complex PDFs
      text = await pdfParse(buffer);
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else {
      return NextResponse.json(
        { error: "Unsupported file type. Please upload PDF or DOCX." },
        { status: 400 },
      );
    }

    if (!text) {
      return NextResponse.json(
        { error: "Could not extract text from file" },
        { status: 500 },
      );
    }

    // Optimization: Clean text to reduce token usage
    // 1. Remove excessive whitespace and newlines
    const cleanedText = text
      .replace(/\s+/g, " ") // Replace multiple spaces/newlines with single space
      .trim();

    // 2. Log raw text for debugging (as requested)
    // console.log("--- Extracted Resume Text (First 500 chars) ---");
    // console.log(cleanedText);
    // console.log("--- Total Length:", cleanedText.length, "---");

    // 3. (Removed Truncation as per user request)
    const finalInput = cleanedText;

    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `
      You are an expert resume parser. I will provide you with the text content of a resume.
      Your task is to extract the information and structure it into a JSON format that matches the following interface:

      interface ResumeValues {
        // General Info
        title?: string; 
        description?: string;

        // Personal Info
        firstName?: string;
        lastName?: string;
        jobTitle?: string;
        city?: string;
        country?: string;
        phone?: string;
        email?: string;
        socialLinks?: string[];
        portfolioLink?: string;

        workExperiences?: {
          position?: string;
          company?: string;
          jobLocation?: string;
          startDate?: string; // Format: YYYY-MM-DD. If only year is available, use YYYY-01-01.
          endDate?: string; // Format: YYYY-MM-DD. If current, leave empty.
          description?: string;
        }[];
        educations?: {
          degree?: string;
          school?: string;
          location?: string;
          marks?: string;
          stream?: string;
          description?: string;
          startDate?: string; // Format: YYYY-MM-DD
          endDate?: string; // Format: YYYY-MM-DD
        }[];
        projectWorks?: {
          company?: string;
          title?: string;
          startDate?: string; // Format: YYYY-MM-DD
          endDate?: string; // Format: YYYY-MM-DD
          description?: string;
          links?: string[];
        }[];
        certifications?: {
          title?: string;
          description?: string;
          link?: string;
        }[];
        skills?: {
            title?: string;
            skillName?: string[];
        }[];
        languages?: {
            title?: string;
            description?: string;
        }[];
         interests?: {
            title?: string;
            description?: string;
        }[];
        others?: {
            title?: string;
            description?: string;
        };
        summary?: string;
      }

      Strictly return ONLY the JSON object. Do not include markdown formatting or backticks.
      
      Here is the resume text:
      ${finalInput}
    `;

    // Retry logic for 503 (Service Unavailable) and 429 (Too Many Requests) errors
    let retryCount = 0;
    const maxRetries = 5;
    let result;

    while (retryCount <= maxRetries) {
      try {
        result = await model.generateContent(prompt);
        break; // Success, exit loop
      } catch (error: any) {
        const isOverloaded =
          error.response?.status === 503 ||
          error.message?.includes("503") ||
          error.message?.includes("overloaded");
        const isRateLimited =
          error.response?.status === 429 ||
          error.message?.includes("429") ||
          error.message?.includes("quota");

        if ((isOverloaded || isRateLimited) && retryCount < maxRetries) {
          retryCount++;
          const delay = 1000 * Math.pow(2, retryCount); // 2s, 4s, 8s, 16s, 32s
          console.warn(
            `Gemini error (${isOverloaded ? "503" : "429"}). Retrying in ${delay / 1000}s... (${retryCount}/${maxRetries})`,
          );
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else {
          throw error; // Not a retryable error or max retries reached
        }
      }
    }

    if (!result) {
      throw new Error("Failed to generate content after retries");
    }

    const response = await result.response;
    const rawModelText = response.text();

    try {
      const parsedData = extractJSONObject(rawModelText);
      // Sanitize the parsed data to remove null bytes that cause PostgreSQL errors
      const sanitizedData = deepSanitize(parsedData);
      return NextResponse.json(sanitizedData);
    } catch (error) {
      console.error("Error parsing AI response:", error);
      console.error("Raw AI response:", rawModelText);
      return NextResponse.json(
        { error: "Failed to parse resume data from AI response" },
        { status: 500 },
      );
    }
  } catch (error: any) {
    console.error("Error parsing resume:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
