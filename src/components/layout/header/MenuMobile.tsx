import { Link } from "next-view-transitions";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface NavItem {
  id: number | string;
  label: string;
  href: string;
  subNav?: NavItem[];
  iconImage?: string;
}

interface MenuMobileProps {
  navItemsArray: NavItem[];
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeItemId: string | null;
}

const MenuMobile: React.FC<MenuMobileProps> = ({
  navItemsArray,
  setIsMobileMenuOpen,
  activeItemId,
}) => {
  return (
    <ul className="flex w-full flex-col bg-white">
      {navItemsArray.map((item) => (
        <SingleNavItem
          key={item.id}
          item={item}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          activeItemId={activeItemId}
        />
      ))}
    </ul>
  );
};

interface SingleNavItemProps {
  item: NavItem;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeItemId: string | null;
}

const SingleNavItem: React.FC<SingleNavItemProps> = ({
  item,
  setIsMobileMenuOpen,
  activeItemId,
}) => {
  const [isItemOpen, setItemOpen] = useState(false);

  const toggleItem = () => {
    setItemOpen(!isItemOpen);
  };

  return (
    <>
      <div>
        <div className="flex w-full items-center justify-between border-b border-zinc-200">
          <Link
            href={item.href ?? "#"}
            className={`hover:bg-bg1 relative flex justify-between px-5 py-3 transition-all hover:text-white ${
              activeItemId === item.id.toString() ? "text-bg1" : "text-black"
            }`}
            onClick={() => {
              setIsMobileMenuOpen(false);
            }}
          >
            {item.label}
          </Link>
          {item?.subNav && item.subNav?.length !== 0 && (
            <IoIosArrowDown
              className={`mr-5 transition-transform ${isItemOpen ? "rotate-180" : "rotate-0"}`}
              onClick={() => {
                if (item.subNav && item.subNav.length > 0) {
                  toggleItem();
                } else {
                  setIsMobileMenuOpen(false); // Close the menu if there are no subnav items
                }
              }}
            />
          )}
        </div>

        {isItemOpen && item.subNav && (
          <div className="z-10 flex w-full flex-col gap-1 bg-gray-100 pl-6">
            {item.subNav.map((subItem, index) => (
              <Link
                key={index}
                href={subItem.href ?? "#"}
                onClick={() => {
                  setIsMobileMenuOpen(false); // Close the menu when a subnav item is clicked
                }}
                className={`hover:bg-bg1 flex cursor-pointer items-center border-b border-zinc-200 py-2 pl-5 capitalize transition-colors hover:text-white ${
                  activeItemId === subItem.id.toString()
                    ? "text-bg1"
                    : "text-black"
                }`}
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MenuMobile;
