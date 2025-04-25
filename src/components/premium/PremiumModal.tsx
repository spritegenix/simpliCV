"use client";

import { env } from "@/env";
import { useToast } from "@/hooks/use-toast";
import usePremiumModal from "@/hooks/usePremiumModal";
import { Check } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { createCheckoutSession } from "./actions";

const freeFeatures = [
  "Up to 1 resumes",
  "Writing settings control",
  "24/7 Support Service",
];
const premiumFeatures = [
  "AI tools",
  "Up to 3 resumes",
  "Writing settings control",
  "24/7 Support Service",
];
const premiumPlusFeatures = [
  "AI tools",
  "Infinite resumes",
  "Writing settings control",
  "24/7 Support Service",
];

export default function PremiumModal() {
  const { open, setOpen } = usePremiumModal();

  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  async function handlePremiumClick(priceId: string) {
    try {
      setLoading(true);
      const redirectUrl = await createCheckoutSession(priceId);
      // window.location.href = redirectUrl;
      if (redirectUrl) {
        setOpen(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!loading) {
          setOpen(open);
        }
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">SimpliCV AI Premium</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <p className="font-rubik">
            Get a premium subscription to unlock more features.
          </p>
          <div className="flex">
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="text-center text-lg font-bold">Premium</h3>
              <div>
                <h3 className="space-x-1 text-center text-lg font-medium text-webColor">
                  <span className="line-through">₹ 50/month</span>{" "}
                  <span className="font-bold text-red-600">FREE</span>
                </h3>
              </div>
              <ul className="list-inside space-y-2">
                {premiumFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 font-rubik"
                  >
                    <Check className="size-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className="text-lg"
                onClick={() =>
                  handlePremiumClick(
                    env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY,
                  )
                }
                disabled={loading}
              >
                Get Premium
              </Button>
            </div>
            <div className="mx-6 border-l" />
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-center text-lg font-bold text-transparent">
                Premium Plus
              </h3>
              <h3 className="space-x-1 text-center text-lg font-medium text-webColor">
                <span className="line-through">₹ 250</span>{" "}
                <span className="font-bold text-red-600">FREE</span>
              </h3>
              <ul className="list-inside space-y-2">
                {premiumPlusFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 font-rubik"
                  >
                    <Check className="size-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant="premium"
                onClick={() =>
                  handlePremiumClick(
                    env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY,
                  )
                }
                disabled={loading}
              >
                Get Premium Plus
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function PremiumCards() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function handlePremiumClick(priceId: string) {
    try {
      setLoading(true);
      const redirectUrl = await createCheckoutSession(priceId);
      // window.location.href = redirectUrl;
      if (redirectUrl) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {/* Free  */}
      <div className="space-y-3 rounded-lg border p-5 py-10 shadow-xl transition-all duration-300 hover:scale-105">
        <h2 className="text-center text-lg font-bold uppercase text-w2">
          Beginner
        </h2>
        <p className="text-center text-zinc-500">Perfect to get started</p>
        <hr className="border-t" />
        <h3 className="space-x-1 text-center text-3xl font-medium text-webColor">
          <span className="font-bold text-w3">Free</span>
        </h3>
        <hr className="border-t" />
        <ul className="list-inside space-y-3">
          {freeFeatures.map((feature) => (
            <li key={feature} className="flex items-center gap-2 font-rubik">
              <Check className="size-4 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
        <Button
          className="!mt-12 w-full text-lg"
          onClick={() =>
            handlePremiumClick(env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY)
          }
          disabled={loading}
        >
          SUBSCRIBE
        </Button>
      </div>
      {/* Premium  */}
      <div className="space-y-3 rounded-lg border p-5 py-10 shadow-xl transition-all duration-300 hover:scale-105">
        <h2 className="text-center text-lg font-bold uppercase text-w2">
          Premium
        </h2>
        <p className="text-center text-zinc-500">
          Best for professionals and bloggers
        </p>
        <hr className="border-t" />
        <h3 className="space-x-1 text-center text-3xl font-medium text-w3">
          <span className="line-through">₹ 50/month</span>{" "}
          <span className="font-bold text-red-600">FREE</span>
        </h3>
        <hr className="border-t" />
        <ul className="list-inside space-y-3">
          {premiumFeatures.map((feature) => (
            <li key={feature} className="flex items-center gap-2 font-rubik">
              <Check className="size-4 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
        <Button
          className="w-full text-lg"
          onClick={() =>
            handlePremiumClick(env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY)
          }
          disabled={loading}
        >
          Get Premium
        </Button>
      </div>
      {/* Premium Plus  */}
      <div className="space-y-3 rounded-lg border p-5 py-10 shadow-xl transition-all duration-300 hover:scale-105">
        <h3 className="text-center text-lg font-bold uppercase text-w2">
          Premium Plus
        </h3>
        <p className="text-center text-zinc-500">
          Perfect For large enterprises
        </p>
        <hr className="border-t" />
        <h3 className="space-x-1 text-center text-3xl font-medium text-w3">
          <span className="line-through">₹ 250</span>{" "}
          <span className="font-bold text-red-600">FREE</span>
        </h3>
        <hr className="border-t" />
        <ul className="list-inside space-y-3">
          {premiumPlusFeatures.map((feature) => (
            <li key={feature} className="flex items-center gap-2 font-rubik">
              <Check className="size-4 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
        <Button
          className="w-full text-lg"
          onClick={() =>
            handlePremiumClick(env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY)
          }
          disabled={loading}
        >
          Get Premium Plus
        </Button>
      </div>
    </div>
  );
}
