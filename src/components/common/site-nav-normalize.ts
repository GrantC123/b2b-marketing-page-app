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
const PARTNER_NAV_MOBILE_ITEM_ID = "marketing-partner-with-us-mobile";
const PARTNER_NAV_ATTR = "data-marketing-partner-nav";
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

/**
 * One delegated listener for logo so we never stack stale pushState handlers
 * after HMR / re-inject.
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
    }
  });
}

/** Remove any previously injected Partner with us nav CTAs. */
function removeMarketingPartnerNavLink(container: HTMLElement): void {
  container.querySelector(`#${PARTNER_NAV_LINK_ID}`)?.remove();
  container.querySelector(`#${PARTNER_NAV_MOBILE_ITEM_ID}`)?.remove();
  container
    .querySelectorAll(`a[${PARTNER_NAV_ATTR}]`)
    .forEach((node) => node.remove());
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
  removeMarketingPartnerNavLink(container);

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
