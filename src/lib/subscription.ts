import { env } from "@/env";
import { cache } from "react";
import prisma from "./prisma";

export type SubscriptionLevel = "free" | "pro" | "pro_plus";

export const getUserSubscriptionLevel = cache(
  async (userId: string): Promise<SubscriptionLevel> => {
    let subscription:
      | Awaited<ReturnType<typeof prisma.userSubscription.findUnique>>
      | null;

    try {
      subscription = await prisma.userSubscription.findUnique({
        where: {
          userId,
        },
      });
    } catch (error) {
      console.warn(
        "[db] Failed to fetch user subscription; defaulting to free. " +
          "This usually means DATABASE_URL is unreachable.",
        error,
      );
      return "free";
    }

    if (!subscription || subscription.stripeCurrentPeriodEnd < new Date()) {
      return "free";
    }

    if (
      subscription.stripePriceId === env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY
    ) {
      return "pro";
    }

    if (
      subscription.stripePriceId ===
      env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY
    ) {
      return "pro_plus";
    }

    throw new Error("Invalid subscription");
  },
);
