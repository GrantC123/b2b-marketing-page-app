/**
 * Marketing shell fixes for the production Bankrate ESI nav.
 *
 * Production sets `is-condensed` on non-homepage routes, which hides desktop
 * categories in a real MPA. In this SPA we only strip those structural classes
 * and let Alpine handle hover / flyout interaction — do not re-init Alpine or
 * watch subtree mutations (that was resetting `is-active` on every hover).
 */

import { spaNavigate } from "@/lib/spa-navigate";

const MARKETING_NAV_EXPANDED_CLASS = "marketing-nav-expanded";
const PARTNER_NAV_LINK_ID = "marketing-partner-with-us";
const PARTNER_HUB_PATH = "/partner";
const BRAND_HOME_PATH = "/";
const NAV_CLICKS_BOUND = "data-marketing-nav-clicks";

function isModifiedClick(event: MouseEvent): boolean {
  return (
    event.defaultPrevented ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  );
}

/** Point the ESI Bankrate logo at this app’s brand homepage (`/`). */
export function bindMarketingHomeLogo(container: HTMLElement): void {
  const logo = container.querySelector<HTMLAnchorElement>("a.SiteNav-logo");
  if (!logo) return;

  logo.href = BRAND_HOME_PATH;
  logo.setAttribute("aria-label", "Bankrate home");
}

function isPartnerTreePath(pathname: string): boolean {
  return (
    pathname === PARTNER_HUB_PATH ||
    pathname.startsWith(`${PARTNER_HUB_PATH}/`) ||
    pathname === "/partners" ||
    pathname.startsWith("/partners/")
  );
}

function syncPartnerNavLinkState(link: HTMLAnchorElement): void {
  if (isPartnerTreePath(window.location.pathname)) {
    link.setAttribute("aria-current", "page");
  } else {
    link.removeAttribute("aria-current");
  }
}

/**
 * One delegated listener for logo + Partner CTA so we never stack stale
 * pushState handlers after HMR / re-inject.
 */
function bindMarketingNavClicks(container: HTMLElement): void {
  if (container.hasAttribute(NAV_CLICKS_BOUND)) return;
  container.setAttribute(NAV_CLICKS_BOUND, "true");

  container.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    if (isModifiedClick(event)) return;

    const logo = event.target.closest<HTMLAnchorElement>("a.SiteNav-logo");
    if (logo && container.contains(logo)) {
      event.preventDefault();
      spaNavigate(BRAND_HOME_PATH);
      return;
    }

    const partner = event.target.closest<HTMLAnchorElement>(
      `#${PARTNER_NAV_LINK_ID}`
    );
    if (partner && container.contains(partner)) {
      event.preventDefault();
      spaNavigate(PARTNER_HUB_PATH);
    }
  });
}

/** B2B marketing CTA — injected beside production auth in the ESI nav. */
export function injectMarketingPartnerNavLink(container: HTMLElement): void {
  const rightLinks = container.querySelector<HTMLElement>(".SiteNav-rightLinks");
  if (!rightLinks) return;

  let link = container.querySelector<HTMLAnchorElement>(`#${PARTNER_NAV_LINK_ID}`);

  if (!link) {
    link = document.createElement("a");
    link.id = PARTNER_NAV_LINK_ID;
    link.href = PARTNER_HUB_PATH;
    link.className = "marketing-partner-nav-link";
    link.textContent = "Partner with us";
    link.setAttribute("data-location", "site-nav");
    link.setAttribute("data-name", "partner-with-us");

    const authSection = rightLinks.querySelector("#desktop-auth-section");
    if (authSection) {
      rightLinks.insertBefore(link, authSection);
    } else {
      rightLinks.prepend(link);
    }
  } else {
    link.href = PARTNER_HUB_PATH;
    const authSection = rightLinks.querySelector("#desktop-auth-section");
    if (authSection && link.nextElementSibling !== authSection) {
      rightLinks.insertBefore(link, authSection);
    }
  }

  syncPartnerNavLinkState(link);
}

/** Strip condensed/gradient classes and reveal cloaked nodes once. */
export function normalizeMarketingSiteNav(container: HTMLElement): void {
  const siteNav = container.querySelector<HTMLElement>(".SiteNav");
  if (!siteNav) return;

  siteNav.classList.add(MARKETING_NAV_EXPANDED_CLASS);
  siteNav.classList.remove("blue-gradient-enabled", "is-condensed");

  if (!container.hasAttribute("data-marketing-nav-ready")) {
    container.querySelectorAll("[x-cloak]").forEach((node) => {
      node.removeAttribute("x-cloak");
    });
  }

  bindMarketingHomeLogo(container);
  bindMarketingNavClicks(container);
  injectMarketingPartnerNavLink(container);

  siteNav.setAttribute("data-marketing-nav-ready", "true");
  container.setAttribute("data-marketing-nav-ready", "true");
}

/** Re-apply structural fixes if production scripts re-add condensed state. */
export function observeMarketingSiteNav(container: HTMLElement): () => void {
  const siteNav = container.querySelector<HTMLElement>(".SiteNav");
  if (!siteNav) return () => {};

  const observer = new MutationObserver(() => {
    if (
      siteNav.classList.contains("is-condensed") ||
      siteNav.classList.contains("blue-gradient-enabled")
    ) {
      siteNav.classList.add(MARKETING_NAV_EXPANDED_CLASS);
      siteNav.classList.remove("blue-gradient-enabled", "is-condensed");
    }
  });

  observer.observe(siteNav, {
    attributes: true,
    attributeFilter: ["class"],
  });

  return () => observer.disconnect();
}

export function finalizeMarketingSiteNav(container: HTMLElement): () => void {
  normalizeMarketingSiteNav(container);
  return observeMarketingSiteNav(container);
}

/** Re-run after SPA route changes — structural only, no Alpine re-init. */
export function syncMarketingSiteNav(): void {
  const root = document.querySelector<HTMLElement>(".site-nav-root");
  if (root) normalizeMarketingSiteNav(root);
}
