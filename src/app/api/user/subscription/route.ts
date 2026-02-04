import { getUserSubscriptionLevel } from "@/lib/subscription";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json("free", { status: 200 });
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId);
  return NextResponse.json(subscriptionLevel, { status: 200 });
}
