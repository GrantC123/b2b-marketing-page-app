"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Legacy path → `/partner-with-us/supply`. */
export default function PartnerSupplyRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/partner-with-us/supply");
  }, [router]);
  return null;
}
