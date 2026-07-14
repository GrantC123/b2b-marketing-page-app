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

function decoratePartnerAnchor(link: HTMLAnchorElement): void {
  link.href = PARTNER_HUB_PATH;
  link.textContent = "Partner with us";
  link.setAttribute(PARTNER_NAV_ATTR, "true");
  link.setAttribute("data-location", "site-nav");
  link.setAttribute("data-name", "partner-with-us");
  link.removeAttribute("aria-current");
}

/** Point the ESI Bankrate logo at this app’s brand homepage (`/`). */
export function bindMarketingHomeLogo(container: HTMLElement): void {
  const logo = container.querySelector<HTMLAnchorElement>("a.SiteNav-logo");
  if (!logo) return;

  logo.href = BRAND_HOME_PATH;
  logo.setAttribute("aria-label", "Bankrate home");
}

function closeMobileSiteNav(container: HTMLElement): void {
  const siteNav = container.querySelector<HTMLElement>(".SiteNav");
  siteNav?.classList.remove("is-active");
  container
    .querySelectorAll(".SiteNavCategories.is-active")
    .forEach((node) => node.classList.remove("is-active"));
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
      `a[${PARTNER_NAV_ATTR}]`
    );
    if (partner && container.contains(partner)) {
      event.preventDefault();
      partner.blur();
      closeMobileSiteNav(container);
      spaNavigate(PARTNER_HUB_PATH);
    }
  });
}

/** Desktop CTA beside production auth in the ESI nav bar. */
function injectDesktopPartnerNavLink(container: HTMLElement): void {
  const rightLinks = container.querySelector<HTMLElement>(".SiteNav-rightLinks");
  if (!rightLinks) return;

  let link = container.querySelector<HTMLAnchorElement>(`#${PARTNER_NAV_LINK_ID}`);

  if (!link) {
    link = document.createElement("a");
    link.id = PARTNER_NAV_LINK_ID;
    link.className = "marketing-partner-nav-link";
    decoratePartnerAnchor(link);

    const authSection = rightLinks.querySelector("#desktop-auth-section");
    if (authSection) {
      rightLinks.insertBefore(link, authSection);
    } else {
      rightLinks.prepend(link);
    }
  } else {
    decoratePartnerAnchor(link);
    const authSection = rightLinks.querySelector("#desktop-auth-section");
    if (authSection && link.nextElementSibling !== authSection) {
      rightLinks.insertBefore(link, authSection);
    }
  }
}

/**
 * Mobile hamburger list item — placed directly under “News & Research”.
 */
function injectMobilePartnerNavItem(container: HTMLElement): void {
  const list = container.querySelector<HTMLElement>(".SiteNavCategories-list");
  if (!list) return;

  let item = container.querySelector<HTMLLIElement>(`#${PARTNER_NAV_MOBILE_ITEM_ID}`);

  if (!item) {
    item = document.createElement("li");
    item.id = PARTNER_NAV_MOBILE_ITEM_ID;
    item.className =
      "SiteNavCategory SiteNavCategory--flat marketing-partner-nav-category";

    const link = document.createElement("a");
    link.className = "SiteNavCategory-link marketing-partner-nav-link-mobile";
    decoratePartnerAnchor(link);
    item.appendChild(link);
  } else {
    const link = item.querySelector<HTMLAnchorElement>("a");
    if (link) decoratePartnerAnchor(link);
  }

  const newsItem = Array.from(
    list.querySelectorAll<HTMLLIElement>("li.SiteNavCategory")
  ).find((li) => {
    const text = li.textContent?.replace(/\s+/g, " ").trim().toLowerCase() ?? "";
    return text.includes("news") && text.includes("research");
  });

  if (newsItem) {
    newsItem.after(item);
  } else if (item.parentElement !== list) {
    list.appendChild(item);
  }
}

/** B2B marketing CTA — desktop bar + mobile category list. */
export function injectMarketingPartnerNavLink(container: HTMLElement): void {
  injectDesktopPartnerNavLink(container);
  injectMobilePartnerNavItem(container);
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
