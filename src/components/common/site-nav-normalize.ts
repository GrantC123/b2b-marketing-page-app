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
const PARTNER_WHO_WE_ARE_ITEM_ID = "marketing-partner-with-us-who-we-are";
const PARTNER_NAV_ATTR = "data-marketing-partner-nav";
const BRAND_HOME_PATH = "/";
const PARTNER_HUB_PATH = "/partner";
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
 * One delegated listener for logo + Partner with us so we never stack stale
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
      `a[${PARTNER_NAV_ATTR}]`
    );
    if (partner && container.contains(partner)) {
      event.preventDefault();
      spaNavigate(PARTNER_HUB_PATH);
    }
  });
}

/** Remove legacy top-level Partner CTAs (right rail / mobile category). */
function removeLegacyMarketingPartnerNavLinks(container: HTMLElement): void {
  container.querySelector(`#${PARTNER_NAV_LINK_ID}`)?.remove();
  container.querySelector(`#${PARTNER_NAV_MOBILE_ITEM_ID}`)?.remove();
}

/**
 * Append “Partner with us” as the last item in the Who we are subnav list.
 */
export function injectPartnerWhoWeAreNavLink(container: HTMLElement): void {
  container.querySelector(`#${PARTNER_WHO_WE_ARE_ITEM_ID}`)?.remove();

  const flyout = container.querySelector("#siteNavCategory-flyout-who-we-are");
  if (!flyout) return;

  const list = flyout.querySelector<HTMLUListElement>(
    ".SiteNavPrimaryLinkList-list"
  );
  if (!list) return;

  const item = document.createElement("li");
  item.id = PARTNER_WHO_WE_ARE_ITEM_ID;
  item.className = "SiteNavPrimaryLinkList-item";

  const link = document.createElement("a");
  link.href = PARTNER_HUB_PATH;
  link.className = "SiteNavPrimaryLink";
  link.textContent = "Partner with us";
  link.setAttribute(PARTNER_NAV_ATTR, "true");
  link.setAttribute("data-location", "site-nav");
  link.setAttribute("data-name", "partner-with-us");
  link.setAttribute("data-text", "Partner with us");
  link.setAttribute("data-position", String(list.children.length + 1));

  if (
    window.location.pathname === PARTNER_HUB_PATH ||
    window.location.pathname.startsWith(`${PARTNER_HUB_PATH}/`)
  ) {
    link.setAttribute("aria-current", "page");
  }

  item.appendChild(link);
  list.appendChild(item);
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
  removeLegacyMarketingPartnerNavLinks(container);
  injectPartnerWhoWeAreNavLink(container);

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
