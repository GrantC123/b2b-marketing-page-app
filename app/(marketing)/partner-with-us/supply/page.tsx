import type { Metadata } from "next";

import { SupplyPage } from "@/components/pages/supply-page";

export const metadata: Metadata = {
  title: "Bankrate B2B — Supply",
};

export default function Page() {
  return <SupplyPage />;
}
