"use client";
import Menu from "../Menu";

// import ThemeToggle from "@/components/ThemeToggle";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Wrapper from "@/components/Wrappers";
import { useTheme } from "next-themes";
import Logo from "../../Logo";
export default function Header({
  show,
  upperNavItems,
  activeItemId,
  handleNavItemClick,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
  const { theme } = useTheme();
  return (
    <header
      className={`fixed top-0 z-50 w-full bg-w3 transition-transform duration-300 font-teko ${show}`}
    >
      {/* Desktop Section */}
      {/* Upper Nav  */}
      <Wrapper as={"nav"} className="flex w-full items-center justify-between py-1 max-md:hidden">
        {/* Logo with Link */}
        <Logo />
        <div className="flex items-center gap-3 md:gap-4">
          <ul className="hidden items-center gap-x-5 font-medium text-white md:flex">
            <Menu
              navItemsArray={upperNavItems}
              activeItemId={activeItemId}
              onItemClick={handleNavItemClick}
            />
          </ul>
          {/* <ThemeToggle /> */}
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
          >
            {/* <UserButton.MenuItems>
              <UserButton.Link
                label="Billing"
                labelIcon={<CreditCard className="size-4" />}
                href="/billing"
              />
            </UserButton.MenuItems> */}
          </UserButton>
        </div>
      </Wrapper>
      {/* -------------------------------------  */}
      {/* Mobile Section */}
      <Wrapper as={"nav"} className="flex w-full items-center justify-between gap-3 py-2 md:hidden">
        {/* Logo with Link */}
        <Logo />
        <div className="flex items-center gap-x-4">
          {/* <ThemeToggle /> */}
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
          >
            {/* <UserButton.MenuItems>
              <UserButton.Link
                label="Billing"
                labelIcon={<CreditCard className="size-4" />}
                href="/billing"
              />
            </UserButton.MenuItems> */}
          </UserButton>
        </div>
      </Wrapper>
    </header>
  );
}