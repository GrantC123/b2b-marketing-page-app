import { Business, Email, TallBuilding, UserClassic } from "@bankrate/icons-react";

import WhoWeAreGrid, { type WhoWeAreCard } from "@/components/common/who-we-are-grid";

const CARDS: WhoWeAreCard[] = [
  {
    label: "About us",
    trackingName: "see-who-we-are",
    description:
      "For over 40 years, one job: show people what the market actually offers — not what their banks want them to see. Real data, better rates.",
    cta: "See who we are",
    href: "https://www.bankrate.com/about/",
    icon: TallBuilding,
  },
  {
    label: "Our Founder",
    trackingName: "read-where-it-started",
    description:
      "In 1982, journalist Robert K. Heady saw that people had no way to know if they were getting a fair deal from their bank. He built the solution.",
    cta: "Read where it started",
    href: "https://www.bankrate.com/our-founder/",
    icon: Business,
  },
  {
    label: "Leadership",
    trackingName: "meet-the-team",
    description:
      "The executives, journalists, and analysts carrying the mission forward: to make sure consumers always know what the market actually offers.",
    cta: "Meet the team",
    href: "https://www.bankrate.com/leadership/",
    icon: UserClassic,
  },
  {
    label: "Contact us",
    trackingName: "reach-the-right-person",
    description:
      "Press, editorial, partnership, and general inquiries. Every message reaches the right person.",
    cta: "Reach the right person",
    href: "https://www.bankrate.com/contact-us/",
    icon: Email,
  },
];

export default function WhoWeAre() {
  return (
    <WhoWeAreGrid
      id="who-we-are"
      trackingLocation="homepage"
      cards={CARDS}
      backgroundImageSrc="/marketing/brand/homepage/who-we-are.svg"
    />
  );
}
