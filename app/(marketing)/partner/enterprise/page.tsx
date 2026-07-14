import type { Metadata } from "next";

import { EnterprisePage } from "@/components/pages/enterprise-page";

export const metadata: Metadata = {
  title: "Bankrate B2B — Enterprise",
};

export default function Page() {
  return <EnterprisePage />;
}
