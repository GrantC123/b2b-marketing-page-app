"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Legacy path → `/partner-with-us/demand` (vercel.json handles this in production). */
export default function LegacyDemandRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/partner-with-us/demand");
  }, [router]);
  return (
    <p className="p-8 text-center text-sm text-muted-foreground">Redirecting…</p>
  );
}
