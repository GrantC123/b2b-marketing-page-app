"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Legacy path → `/partner-with-us/enterprise`. */
export default function PartnerEnterpriseRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/partner-with-us/enterprise");
  }, [router]);
  return null;
}
