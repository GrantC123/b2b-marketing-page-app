import { RemoteHtml } from "./remote-html";

const baseUrl =
  process.env.NEXT_PUBLIC_HEADER_FOOTER_BASE_URL ?? "https://www.bankrate.com";

const flagParam = process.env.NODE_ENV === "development"
  ? "?rebrand=1&feature-flag_enable-esi-routes=true"
  : "?rebrand=1&with-fountain=1&with-ripple=1";

/** Production Bankrate footer from brand-identity-pages ESI include. */
export function SiteFooter() {
  return (
    <RemoteHtml
      url={`${baseUrl}/esi-includes/footer/${flagParam}`}
      normalizeFooter
    />
  );
}
