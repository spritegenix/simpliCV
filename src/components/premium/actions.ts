"use server";

import prisma from "@/lib/prisma";
// import { env } from "@/env";
// import stripe from "@/lib/stripe";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { addMonths } from "date-fns";

export async function createCheckoutSession(priceId: string) {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    // const stripeCustomerId = user.privateMetadata.stripeCustomerId as
    //   | string
    //   | undefined;

    // const session = await stripe.checkout.sessions.create({
    //   line_items: [{ price: priceId, quantity: 1 }],
    //   mode: "subscription",
    //   success_url: `${env.NEXT_PUBLIC_BASE_URL}/billing/success`,
    //   cancel_url: `${env.NEXT_PUBLIC_BASE_URL}/billing`,
    //   customer: stripeCustomerId,
    //   customer_email: stripeCustomerId
    //     ? undefined
    //     : user.emailAddresses[0].emailAddress,
    //   metadata: {
    //     userId: user.id,
    //   },
    //   subscription_data: {
    //     metadata: {
    //       userId: user.id,
    //     },
    //   },
    //   custom_text: {
    //     terms_of_service_acceptance: {
    //       message: `I have read SimpliCV's [terms of service](${env.NEXT_PUBLIC_BASE_URL}/tos) and agree to them.`,
    //     },
    //   },
    //   consent_collection: {
    //     terms_of_service: "required",
    //   },
    // });

    // if (!session.url) {
    //   throw new Error("Failed to create checkout session");
    // }

    // return session.url;

    await (
      await clerkClient()
    ).users.updateUserMetadata(user.id, {
      privateMetadata: {
        stripeCustomerId: priceId,   // free: 1, pro: 3, pro_plus: Infinity,
      },
    });

    await prisma.userSubscription.upsert({
      where: {
        userId: user.id,
      },
      create: {
        userId: user.id,
        stripeSubscriptionId: user.id,
        stripeCustomerId: user.id,
        stripePriceId: priceId,
        stripeCurrentPeriodEnd: addMonths(new Date(), 1), // Set next month's date
        stripeCancelAtPeriodEnd: false,
      },
      update: {
        stripePriceId: priceId,
        stripeCurrentPeriodEnd: addMonths(new Date(), 1), // Extend by one month
        stripeCancelAtPeriodEnd: false,
      },
    });
    return true;

  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw new Error("Failed to create checkout session.");
  }

}
