/**
 * Marketing footer rewrites for this SPA — remap production ESI links that
 * should land on local partner routes.
 */

import { spaNavigate } from "@/lib/spa-navigate";

const PARTNER_HUB_PATH = "/partner";
const PARTNER_FOOTER_ATTR = "data-marketing-partner-footer";
const FOOTER_CLICKS_BOUND = "data-marketing-footer-clicks";

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

function isAdvertiseWithUsLink(anchor: HTMLAnchorElement): boolean {
  const text = anchor.textContent?.replace(/\s+/g, " ").trim().toLowerCase() ?? "";
  return text === "advertise with us";
}

function decoratePartnerFooterLink(anchor: HTMLAnchorElement): void {
  anchor.href = PARTNER_HUB_PATH;
  anchor.textContent = "Partner with us";
  anchor.setAttribute(PARTNER_FOOTER_ATTR, "true");
  if (anchor.hasAttribute("data-text")) {
    anchor.setAttribute("data-text", "Partner with us");
  }
  if (anchor.hasAttribute("data-name")) {
    anchor.setAttribute("data-name", "partner-with-us");
  }
}

function bindMarketingFooterClicks(container: HTMLElement): void {
  if (container.hasAttribute(FOOTER_CLICKS_BOUND)) return;
  container.setAttribute(FOOTER_CLICKS_BOUND, "true");

  container.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    if (isModifiedClick(event)) return;

    const partner = event.target.closest<HTMLAnchorElement>(
      `a[${PARTNER_FOOTER_ATTR}]`
    );
    if (partner && container.contains(partner)) {
      event.preventDefault();
      spaNavigate(PARTNER_HUB_PATH);
    }
  });
}

/** Point “Advertise with us” at the local partner hub as “Partner with us”. */
export function normalizeMarketingFooter(container: HTMLElement): void {
  container.querySelectorAll<HTMLAnchorElement>("a").forEach((anchor) => {
    if (isAdvertiseWithUsLink(anchor) || anchor.hasAttribute(PARTNER_FOOTER_ATTR)) {
      decoratePartnerFooterLink(anchor);
    }
  });
  bindMarketingFooterClicks(container);
}
