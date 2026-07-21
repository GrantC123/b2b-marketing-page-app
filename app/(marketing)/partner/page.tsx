"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Legacy path → `/partner-with-us`. */
export default function PartnerRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/partner-with-us");
  }, [router]);
  return null;
}
