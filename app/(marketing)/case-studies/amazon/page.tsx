"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Legacy path → `/partner-with-us/case-studies/amazon`. */
export default function LegacyAmazonCaseStudyRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/partner-with-us/case-studies/amazon");
  }, [router]);
  return (
    <p className="p-8 text-center text-sm text-muted-foreground">Redirecting…</p>
  );
}
