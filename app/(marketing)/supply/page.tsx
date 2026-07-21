"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Legacy path → `/partner-with-us/supply` (vercel.json handles this in production). */
export default function LegacySupplyRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/partner-with-us/supply");
  }, [router]);
  return (
    <p className="p-8 text-center text-sm text-muted-foreground">Redirecting…</p>
  );
}
