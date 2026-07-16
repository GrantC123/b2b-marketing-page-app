"use client";

import { useState } from "react";

import { PartnersInquiryForm } from "@/components/common/partners-inquiry-form";
import { Button } from "@/components/ui/button";
import { Heading2, Heading3 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import { marketingBody, marketingBodySm } from "../shared/copy";
import { SectionShell } from "../shared/section-shell";

type HubPathChooserProps = {
  id?: string;
};

type PathOption = {
  id: string;
  kind: "path";
  href: string;
  cta: string;
  label: string;
  /** Optional — omit when the label already says enough. */
  hint?: string;
};

type OtherOption = {
  id: "other";
  kind: "other";
  label: string;
  hint: string;
};

type IdentityOption = PathOption | OtherOption;

/** Serializable triage options — kept local so this client island stays safe. */
const OPTIONS: IdentityOption[] = [
  {
    id: "supply",
    kind: "path",
    href: "/partner/supply",
    cta: "Explore advertiser programs",
    label:
      "I advertise mortgages, deposits, credit cards, or other financial products",
  },
  {
    id: "enterprise-private",
    kind: "path",
    href: "/partner/enterprise",
    cta: "View enterprise options",
    label: "I want to offer a mortgage benefit to employees or members",
  },
  {
    id: "demand",
    kind: "path",
    href: "/partner/demand",
    cta: "Explore affiliate programs",
    label: "I'm a publisher or creator/influencer",
  },
  {
    id: "other",
    kind: "other",
    label: "Other",
    hint: "Tell us a bit more and we'll reach out",
  },
];

/**
 * Closing triage — one-question mini questionnaire into the right partner page,
 * with Other revealing a generic inquiry form.
 */
export function HubPathChooser({ id = "choose-path" }: HubPathChooserProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected =
    OPTIONS.find((option) => option.id === selectedId) ?? null;
  const showForm = selected?.kind === "other";
  const selectedPath = selected?.kind === "path" ? selected : null;

  return (
    <SectionShell
      id={id}
      className="scroll-mt-[calc(82px+1rem)] bg-transparent"
    >
      <div className="rounded-[32px] bg-blue-200 px-6 py-10 sm:rounded-[48px] sm:px-10 sm:py-14 lg:px-14">
        <div className="mx-auto flex w-full max-w-[40rem] flex-col gap-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <Heading2 className="text-pretty text-blue-900">
              Not sure where to start?
            </Heading2>
            <p className={cn("text-pretty text-blue-900/80", marketingBody)}>
              Answer one question and we&apos;ll take you to the right place.
            </p>
          </div>

          <fieldset className="m-0 min-w-0 border-0 p-0">
            <legend className="sr-only">Who are you partnering as?</legend>
            <p className="mb-3 text-center text-sm font-semibold text-blue-900">
              Who are you partnering as?
            </p>
            <div className="flex flex-col gap-3">
              {OPTIONS.map((option) => {
                const checked = selectedId === option.id;

                return (
                  <label
                    key={option.id}
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-2xl bg-card px-4 py-4 shadow-[0_4px_24px_rgba(15,27,47,0.06)] transition-colors",
                      checked
                        ? "ring-2 ring-primary"
                        : "hover:bg-white"
                    )}
                  >
                    <input
                      type="radio"
                      name="hub-partner-identity"
                      value={option.id}
                      checked={checked}
                      onChange={() => setSelectedId(option.id)}
                      className="mt-1 size-4 shrink-0 accent-primary"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-base font-semibold tracking-tight text-blue-900">
                        {option.label}
                      </span>
                      {option.hint ? (
                        <span className="mt-0.5 block text-pretty text-sm text-gray-700">
                          {option.hint}
                        </span>
                      ) : null}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {showForm ? (
            <div className="rounded-[24px] bg-card p-6 shadow-[0_4px_24px_rgba(15,27,47,0.08)] sm:p-8">
              <Heading3 className="text-pretty text-blue-900">
                Tell us about your audience and goals
              </Heading3>
              <p className={cn("mt-2", marketingBodySm)}>
                Fill out the form to tell us about your goals—we&apos;ll reach
                out to show how Bankrate can improve outcomes for the people you
                serve.
              </p>
              <div className="mt-6">
                <PartnersInquiryForm
                  formId="hub-other-inquiry"
                  submitLabel="Submit request"
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              {selectedPath ? (
                <Button
                  href={selectedPath.href}
                  size="lg"
                  arrow
                  className="w-full sm:w-auto"
                >
                  {selectedPath.cta}
                </Button>
              ) : (
                <Button
                  type="button"
                  size="lg"
                  arrow
                  disabled
                  className="w-full sm:w-auto"
                >
                  Select an option to continue
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </SectionShell>
  );
}
