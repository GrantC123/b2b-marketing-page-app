import type { Metadata } from "next";

import { BrandHomePage } from "@/components/pages/brand-home-page";

export const metadata: Metadata = {
  title: "Bankrate — Better rates start here",
};

export default function Page() {
  return <BrandHomePage />;
}
