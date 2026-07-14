"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Legacy path → `/partner/enterprise` (vercel.json handles this in production). */
export default function LegacyEnterpriseRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/partner/enterprise");
  }, [router]);
  return (
    <p className="p-8 text-center text-sm text-muted-foreground">Redirecting…</p>
  );
}
