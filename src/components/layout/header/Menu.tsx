/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Menu = ({ navItemsArray, activeItemId, onItemClick }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return navItemsArray?.map((item: any, index: number) => (
    <li key={item?.id} className="group relative transition-all">
      <Link
        href={item?.href || "#"}
        className="relative flex cursor-pointer items-center gap-1"
        onClick={() => onItemClick(item.id, item.href)}
      >
        <span className={`${item?.iconStyle && item?.iconStyle}`}>{item?.icon}</span>
        {item?.label === "Free Listing" && (
          <span className="absolute left-1/2 top-1 -translate-x-1/2 cursor-pointer bg-red-600 px-1 text-xs text-white">
            Firms
          </span>
        )}
        <p
          className={`font cursor-pointer px-1 py-4 capitalize transition-all duration-300 hover:scale-105 hover:text-bg1 ${activeItemId === item.id.toString() ? "text-bg1" : ""}`}
        >
          {item?.label}
        </p>
        {item?.subNav && item.subNav?.length !== 0 && (
          <IoIosArrowDown className="rotate-180 transition-all group-hover:rotate-0" />
        )}
      </Link>
      {/* dropdown */}
      {item.subNav && (
        <div
          className={`absolute animate-slide-up ${index === navItemsArray.length - 1 ? "right-0" : "left-0"} top-[101%] z-30 hidden w-auto flex-col gap-1 rounded bg-white py-3 shadow-md transition-all group-hover:flex`}
        >
          {item.subNav.map((nav: any) => (
            <Link
              key={nav.id}
              href={nav.href || "#"}
              className={`flex cursor-pointer items-center py-1 pl-2 pr-8 hover:bg-bg1 hover:text-white ${activeItemId === nav.id.toString() ? "bg1" : ""}`}
              onClick={() => onItemClick(nav.id, nav.href)}
            >
              <span className="whitespace-nowrap pl-3">{nav.label}</span>
            </Link>
          ))}
        </div>
      )}
    </li>
  ));
};

export default Menu;
