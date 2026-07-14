import type { Metadata } from "next";

import { getHubContent } from "@/content/hub";
import { HubPage } from "@/components/pages/hub-page";

export function generateMetadata(): Metadata {
  const { title } = getHubContent().meta;
  return { title };
}

export default function Page() {
  return <HubPage />;
}
