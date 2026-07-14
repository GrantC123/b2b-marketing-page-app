"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  syncMarketingSiteNav,
  injectMarketingPartnerNavLink,
} from "@/components/common/site-nav-normalize";
import { registerSpaNavigate, unregisterSpaNavigate } from "@/lib/spa-navigate";

/** Register App Router navigation + re-sync ESI nav after SPA route changes. */
export function NavRouteSync() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const navigate = (href: string) => {
      router.push(href);
    };
    registerSpaNavigate(navigate);
    return () => unregisterSpaNavigate(navigate);
  }, [router]);

  useEffect(() => {
    syncMarketingSiteNav();
    const root = document.querySelector<HTMLElement>(".site-nav-root");
    if (root) injectMarketingPartnerNavLink(root);
  }, [pathname]);

  return null;
}
