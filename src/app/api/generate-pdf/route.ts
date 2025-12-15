import { NextResponse, type NextRequest } from "next/server";
import { chromium } from "playwright";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ error: "Missing URL parameter" }, { status: 400 });
    }

    const browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Wait for network to be idle to ensure all content loads
    await page.goto(url, { waitUntil: "networkidle" });

    // Wait for the resume content to be visible
    await page.waitForSelector('#resumePreviewContent', { timeout: 10000 });

    // Additional wait for fonts and dynamic content to load
    await page.waitForTimeout(500);

    // Use JavaScript to extract only the resume content and remove all wrapper divs
    await page.evaluate(() => {
      const resumeContent = document.querySelector('#resumePreviewContent');

      if (resumeContent) {
        // Clone the resume content to preserve it
        const clonedContent = resumeContent.cloneNode(true) as HTMLElement;

        // Clear the entire body
        document.body.innerHTML = '';

        // Reset body styles
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.background = 'white';

        // Append only the resume content
        document.body.appendChild(clonedContent);
      }
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0.6cm", bottom: "0.6cm", left: "0.6cm", right: "0.6cm" },
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
    return NextResponse.json({ message: "Error generating PDF" }, { status: 500 });
  }
}
