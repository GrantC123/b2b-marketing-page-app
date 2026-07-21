"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Legacy path → `/partner-with-us/demand`. */
export default function PartnerDemandRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/partner-with-us/demand");
  }, [router]);
  return null;
}
