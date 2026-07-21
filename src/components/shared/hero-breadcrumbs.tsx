import Link from "next/link";

import { cn } from "@/lib/utils";

export type HeroBreadcrumbItem = {
  label: string;
  /** Omit for the current page (non-linked). */
  href?: string;
};

type HeroBreadcrumbsProps = {
  items: HeroBreadcrumbItem[];
  className?: string;
};

/**
 * Navy-hero breadcrumbs matching Bankrate production markup
 * (`nav[data-cy=breadcrumb]` on rate-table heroes): blue-200 links, › separators, white current page.
 */
export function HeroBreadcrumbs({ items, className }: HeroBreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn(className)} data-cy="breadcrumb">
      <ol className="m-0 flex list-none flex-wrap gap-2 text-xs text-white">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          if (isLast || !item.href) {
            return (
              <li
                key={`${item.label}-${index}`}
                className="max-w-[25ch] overflow-hidden text-ellipsis whitespace-nowrap text-white md:max-w-[40ch]"
              >
                <span className="text-white" aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              </li>
            );
          }

          return (
            <li key={`${item.label}-${index}`} className="flex gap-2">
              <Link
                href={item.href}
                className="text-blue-200 no-underline hover:underline hover:underline-offset-4"
              >
                {item.label}
              </Link>
              <span className="not-sr-only text-blue-200" aria-hidden>
                &rsaquo;
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

const partnersCrumb: HeroBreadcrumbItem = {
  label: "Partners",
  href: "/partner-with-us",
};

/** Shared trails for B2B partner subpages. */
export const SUPPLY_BREADCRUMBS: HeroBreadcrumbItem[] = [
  partnersCrumb,
  { label: "Lenders & financial institutions" },
];

export const DEMAND_BREADCRUMBS: HeroBreadcrumbItem[] = [
  partnersCrumb,
  { label: "Publishers & affiliates" },
];

export const ENTERPRISE_BREADCRUMBS: HeroBreadcrumbItem[] = [
  partnersCrumb,
  { label: "Enterprise partnerships" },
];

export const AMAZON_CASE_STUDY_BREADCRUMBS: HeroBreadcrumbItem[] = [
  partnersCrumb,
  { label: "Case study" },
];
