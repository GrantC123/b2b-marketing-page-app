"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Root → contact hub. */
export default function RootRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/partner-with-us");
  }, [router]);
  return null;
}
