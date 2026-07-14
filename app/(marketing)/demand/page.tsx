"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Legacy path → `/partner/demand` (vercel.json handles this in production). */
export default function LegacyDemandRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/partner/demand");
  }, [router]);
  return (
    <p className="p-8 text-center text-sm text-muted-foreground">Redirecting…</p>
  );
}
