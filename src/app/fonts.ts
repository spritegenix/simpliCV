import {
  Lora,
  Zilla_Slab,
  PT_Serif,
  Literata,
  EB_Garamond,
  Lato,
  Aleo,
  Crimson_Pro,
  Cormorant_Garamond,
  Vollkorn,
  Amiri,
  Crimson_Text,
  Alegreya,
  Source_Serif_4,
} from "next/font/google";

// These fonts are used by the resume Customization Panel (Font section).
// They are loaded globally as CSS variables so templates can switch fonts via CSS.

const lora = Lora({ subsets: ["latin"], variable: "--font-lora", display: "swap" });

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

const zillaSlab = Zilla_Slab({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-zilla-slab",
  display: "swap",
});

const ptSerif = PT_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pt-serif",
  display: "swap",
});

const literata = Literata({
  subsets: ["latin"],
  variable: "--font-literata",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

const aleo = Aleo({
  subsets: ["latin"],
  variable: "--font-aleo",
  display: "swap",
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson-pro",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cormorant-garamond",
  display: "swap",
});

const vollkorn = Vollkorn({
  subsets: ["latin"],
  variable: "--font-vollkorn",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-crimson-text",
  display: "swap",
});

const alegreya = Alegreya({
  subsets: ["latin"],
  variable: "--font-alegreya",
  display: "swap",
});

export const resumeFonts = {
  lora,
  sourceSerif,
  zillaSlab,
  ptSerif,
  literata,
  ebGaramond,
  lato,
  aleo,
  crimsonPro,
  cormorantGaramond,
  vollkorn,
  amiri,
  crimsonText,
  alegreya,
} as const;

export const resumeFontVariableClassName = Object.values(resumeFonts)
  .map((f) => f.variable)
  .join(" ");
