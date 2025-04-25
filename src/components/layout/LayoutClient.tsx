/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Header from "./header/Header/Header";
import Footer from "./footer/Footer";

export default function LayoutClient({
  header1Data,
  headerStyle = 1,
  children,
  footerStyle = false
}: any) {
  const upperNavItems = header1Data?.upperNav;
  // Mobile Menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [show, setShow] = useState<string>("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > 200) {
        if (window.scrollY > lastScrollY && !isMobileMenuOpen) {
          setShow("-translate-y-[75px]");
          
        } else {
          setShow("shadow-sm");
        }
      } else {
        setShow("translate-y-0");
      }
      setLastScrollY(window.scrollY);
    }
  };

  const getBasePath = (url: string) => {
    const urlSegments = url.split("/");
    return `/${urlSegments[1]}`;
  };
  useEffect(() => {
    const activeItem =
      upperNavItems.find((item: any) => item.href === getBasePath(pathname)) ||
      upperNavItems.find((item: any) =>
        item.subNav?.some(
          (subItem: { href: string }) => subItem.href === getBasePath(pathname),
        ),
      );
    if (activeItem) {
      setActiveItemId(activeItem.id.toString());
    } else {
      setActiveItemId(null);
    }
  }, [pathname, upperNavItems]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScrollY, isMobileMenuOpen]);

  const handleNavItemClick = (itemId: string, href: string) => {
    setActiveItemId(itemId.toString());
    setIsMobileMenuOpen(false);
    router.push(href);
  };

  return (
    <>
      {headerStyle == 1 && (
        <Header
          show={show}
          handleMobileMenu={() => setIsMobileMenuOpen((pre) => !pre)}
          isMobileMenuOpen={isMobileMenuOpen}
          upperNavItems={upperNavItems}
          activeItemId={activeItemId}
          handleNavItemClick={handleNavItemClick}
          handleLogout={() => {}}
        />
      )}
      <main>{children}</main>
      {footerStyle===true && <Footer  />}
    </>
  );
}
