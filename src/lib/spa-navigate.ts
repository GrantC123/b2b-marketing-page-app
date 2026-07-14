/**
 * Bridge so ESI/DOM nav handlers can soft-navigate via the App Router.
 * Registered from a client component that owns `useRouter()`.
 */

type SpaNavigateFn = (href: string) => void;

let spaNavigateFn: SpaNavigateFn | null = null;

export function registerSpaNavigate(fn: SpaNavigateFn): void {
  spaNavigateFn = fn;
}

export function unregisterSpaNavigate(fn: SpaNavigateFn): void {
  if (spaNavigateFn === fn) spaNavigateFn = null;
}

/** Soft-navigate within this app; falls back to a full load if unregistered. */
export function spaNavigate(href: string): void {
  const url = new URL(href, window.location.origin);
  const next = `${url.pathname}${url.search}${url.hash}`;

  if (spaNavigateFn) {
    spaNavigateFn(next);
    return;
  }

  window.location.assign(next);
}
