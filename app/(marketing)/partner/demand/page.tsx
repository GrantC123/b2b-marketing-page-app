import type { Metadata } from "next";

import { DemandPage } from "@/components/pages/demand-page";

export const metadata: Metadata = {
  title: "Bankrate B2B — Affiliate",
};

export default function Page() {
  return <DemandPage />;
}
