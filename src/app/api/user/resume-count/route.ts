import { safeResumeCount } from "@/lib/dbSafe";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ count: 0 }, { status: 200 });
  }

  const count = await safeResumeCount(userId);
  return NextResponse.json({ count }, { status: 200 });
}
