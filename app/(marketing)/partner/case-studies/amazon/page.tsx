"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Legacy path → `/partner-with-us/case-studies/amazon`. */
export default function PartnerAmazonCaseStudyRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/partner-with-us/case-studies/amazon");
  }, [router]);
  return null;
}
