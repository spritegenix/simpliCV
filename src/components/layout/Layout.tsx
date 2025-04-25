import React from "react";
import LayoutClient from "./LayoutClient";
import { header } from "@/data/layout";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Layout({ headerStyle = 1,   footerStyle = false, children }: any) {
  const headerData = {
    upperNav: header?.upperNav,
  };
  // const footerData = {
  //   ...footer,
  //   // list2: { ...footer.list2, links: categories?.allCategories },
  // };

  return (
    <LayoutClient
      headerStyle={headerStyle}
      footerStyle={footerStyle}
      header1Data={headerData}
      // footerData={footerData}
    >
      {children}
    </LayoutClient>
  );
}
