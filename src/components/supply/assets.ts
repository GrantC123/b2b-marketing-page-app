const base = "/marketing/supply";

export const SUPPLY_IMG = {
  heroPhone: `${base}/hero-phone.png`,
  heroFullBleedBg: `${base}/hero-fullbleed-bg.png`,
  /** Brush + jagged edge in one asset — Figma 666:3128 (flush heroes). */
  heroFullBleedWithEdge: `${base}/hero-fullbleed-with-edge.png`,
  /** Section-end brush edge — Figma 581:1938 */
  heroSectionEnd: `${base}/hero-section-end.svg`,
  capabilityCard: `${base}/capability-card.png`,
} as const;
