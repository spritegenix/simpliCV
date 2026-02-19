"use client";

import Menu from "../Menu";
import Wrapper from "@/components/Wrappers";
import { Button } from "@/components/ui/button";
import Logo from "../../Logo";
import { UserButton, useAuth } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header({
  show,
  upperNavItems,
  activeItemId,
  handleNavItemClick,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
  const { theme } = useTheme();
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const authActions =
    mounted && isLoaded ? (
      isSignedIn ? (
        <UserButton
          appearance={{
            baseTheme: theme === "dark" ? dark : undefined,
            elements: {
              avatarBox: {
                width: 35,
                height: 35,
              },
            },
          }}
        />
      ) : (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/sign-in")}
            className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            Sign In
          </Button>
        </div>
      )
    ) : null;

  return (
    <header
      className={`fixed top-0 z-50 w-full bg-w3 font-teko transition-transform duration-300 ${show}`}
    >
      {/* Desktop Section */}
      <Wrapper
        as={"nav"}
        className="flex w-full items-center justify-between py-1 max-md:hidden"
      >
        <Logo />
        <div className="flex items-center gap-3 md:gap-4">
          <ul className="hidden items-center gap-x-5 font-medium text-white md:flex">
            <Menu
              navItemsArray={upperNavItems}
              activeItemId={activeItemId}
              onItemClick={handleNavItemClick}
            />
          </ul>
          {authActions}
        </div>
      </Wrapper>

      {/* Mobile Section */}
      <Wrapper
        as={"nav"}
        className="flex w-full items-center justify-between gap-3 py-2 md:hidden"
      >
        <Logo />
        <div className="flex items-center gap-x-4">{authActions}</div>
      </Wrapper>
    </header>
  );
}
