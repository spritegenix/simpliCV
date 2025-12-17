import { NextRequest, NextResponse } from "next/server";
const PDFParser = require("pdf2json");
import mammoth from "mammoth";
import genAI from "@/lib/gemini";

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
      
      text = await new Promise((resolve, reject) => {
        const pdfParser = new PDFParser(null, 1);

        pdfParser.on("pdfParser_dataError", (errData: any) =>
          reject(errData.parserError),
        );

        pdfParser.on("pdfParser_dataReady", () => {
          const content = (pdfParser as any).getRawTextContent();
          resolve(content);
        });

        pdfParser.parseBuffer(buffer);
      });
      
    } else if (
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
        const isOverloaded = error.response?.status === 503 || error.message?.includes("503") || error.message?.includes("overloaded");
        const isRateLimited = error.response?.status === 429 || error.message?.includes("429") || error.message?.includes("quota");

        if ((isOverloaded || isRateLimited) && retryCount < maxRetries) {
          retryCount++;
          const delay = 1000 * Math.pow(2, retryCount); // 2s, 4s, 8s, 16s, 32s
          console.warn(`Gemini error (${isOverloaded ? "503" : "429"}). Retrying in ${delay/1000}s... (${retryCount}/${maxRetries})`);
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
    const jsonString = response.text().replace(/```json|```/g, "").trim();

    try {
        const parsedData = JSON.parse(jsonString);
        return NextResponse.json(parsedData);
    } catch (error) {
        console.error("Error parsing Gemini response:", error);
        return NextResponse.json({ error: "Failed to parse resume data form AI response" }, { status: 500 });
    }

  } catch (error: any) {
    console.error("Error parsing resume:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
