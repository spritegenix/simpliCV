import { NextResponse, type NextRequest } from "next/server";
import { chromium } from "playwright";

export const dynamic = "force-dynamic";
export const maxDuration = 60;
export const runtime = "nodejs";

function getOriginFromRequest(req: NextRequest): string {
  const proto = req.headers.get("x-forwarded-proto") ?? "http";
  const host =
    req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "";

  if (host) {
    return `${proto}://${host}`;
  }

  return req.nextUrl.origin;
}

export async function POST(req: NextRequest) {
  try {
    const { offerId, styleId } = (await req.json()) as {
      offerId?: string;
      styleId?: string;
    };

    if (!offerId || typeof offerId !== "string") {
      return NextResponse.json({ error: "Missing offerId" }, { status: 400 });
    }

    const origin = getOriginFromRequest(req);

    const url = new URL(`/offer/${encodeURIComponent(offerId)}`, origin);
    url.searchParams.set("print", "true");
    if (styleId && typeof styleId === "string" && styleId.trim().length > 0) {
      url.searchParams.set("styleId", styleId);
    }

    const browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.goto(url.toString(), { waitUntil: "networkidle" });

    await page.waitForSelector("#offerPreviewContent", {
      timeout: 30000,
      state: "attached",
    });

    await page.waitForTimeout(1200);

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "0mm",
        right: "0mm",
        bottom: "0mm",
        left: "0mm",
      },
      preferCSSPageSize: true,
    });

    await browser.close();

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="offer-${offerId}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Offer PDF generation error:", error);
    return NextResponse.json(
      { message: "Error generating offer PDF" },
      { status: 500 },
    );
  }
}
