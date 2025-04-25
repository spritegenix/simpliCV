import Wrapper from "@/components/Wrappers";
import React from "react";
import Logo from "../Logo";
import Link from "next/link";

export default function Footer() {
  return (
    <Wrapper as={"footer"} bgColor="bg-w3 pattern3" className="text-white" containerClassName="border-t border-white/50">
      <div className="flex flex-col justify-between py-3 md:py-10 sm:flex-row md:items-center">
        <Logo className="max-sm:pb-3" />
        <ul className="flex  gap-5  md:items-center">
          <li>
            <Link href="/about-us">About</Link>
          </li>
          <li>
            <Link href="/templates">Template</Link>
          </li>
          <li>
            <Link href="/sign-in">Sign In</Link>
          </li>
          <li>
            <Link href="/contact-us">Contact</Link>
          </li>
        </ul>
      </div>
      <hr className="border-white/50" />
      <div className="flex flex-col justify-between py-2 sm:flex-row md:items-center">
        <ul className="flex gap-5  md:items-center">
          <li>
            <Link href="/terms">Terms</Link>
          </li>
          <li>
            <Link href="/privacy">Privacy</Link>
          </li>
        </ul>
        <p className="text-sm">© 2025 SimpliCV. All rights reserved.</p>
      </div>
    </Wrapper>
  );
}
