import { NextResponse, type NextRequest } from "next/server";
import { chromium } from "playwright";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json(
        { error: "Missing URL parameter" },
        { status: 400 },
      );
    }

    // Add print=true parameter to render in print-friendly mode
    const printUrl = new URL(url);
    printUrl.searchParams.set("print", "true");

    const browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Wait for network to be idle to ensure all content loads
    await page.goto(printUrl.toString(), { waitUntil: "networkidle" });

    // Wait for the resume content to be visible
    await page.waitForSelector("#resumePreviewContent", { timeout: 30000 });

    // Additional wait for fonts and dynamic content to load
    await page.waitForTimeout(800);

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0", bottom: "0", left: "0", right: "0" },
      preferCSSPageSize: true, // renders more accurately
    });

    await browser.close();

    // convert Node Buffer to a Uint8Array so it matches BodyInit (ArrayBufferView)
    const pdfUint8 = new Uint8Array(pdfBuffer);

    return new NextResponse(pdfUint8, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="resume.pdf"',
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { message: "Error generating PDF" },
      { status: 500 },
    );
  }
}
