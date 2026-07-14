import type { LogoBarItem } from "@/components/common/logo-bar";

const base = "/marketing/brand/partner-logos";

/**
 * Canonical press logos for "Featured by names you know and trust".
 */
export const FEATURED_PRESS_LOGOS: LogoBarItem[] = [
  { src: `${base}/wsj.svg`, alt: "The Wall Street Journal", width: 51, height: 28 },
  { src: `${base}/usatoday.svg`, alt: "USA Today", width: 130, height: 24 },
  { src: `${base}/abc.svg`, alt: "ABC", width: 40, height: 40 },
  { src: `${base}/new-york-times.svg`, alt: "The New York Times", width: 200, height: 29 },
  { src: `${base}/cnn.svg`, alt: "CNN", width: 62, height: 30 },
  { src: `${base}/bloomberg.svg`, alt: "Bloomberg", width: 121, height: 24 },
];
