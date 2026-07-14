"use client";

import Image from "next/image";
import { CloseX, FlourishHouseCost } from "@bankrate/icons-react";

import { CircleEmphasis } from "@/components/common/flourish/circle-emphasis";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EyebrowLg, EyebrowSm, Heading2 } from "@/components/ui/typography";

import SectionShell from "./shell";

const STEPS = [
  {
    number: "01",
    title: "Tell us about your loan",
    description: "Purchase, refinance, or home equity. No credit pull required.",
  },
  {
    number: "02",
    title: "Lenders compete for your business",
    description: "You see their best offers, ranked by rate — not by who paid us.",
  },
  {
    number: "03",
    title: "You decide who to contact",
    description: "Your information isn't shared until you choose.",
  },
] as const;

export default function MemberExperience() {
  return (
    <SectionShell id="member-experience">
      <div className="flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-between lg:gap-14">
          <div className="flex max-w-204 flex-col gap-8">
            <Heading2 className="text-pretty text-blue-900">
              <CircleEmphasis
                before="Bankrate is built for "
                emphasis="people,"
                after=" not banks"
              />
            </Heading2>

            <p className="text-lg leading-relaxed tracking-tighter text-pretty text-gray-700">
              Your bank is a lender. It has a rate to protect. Bankrate
              isn&rsquo;t a bank, isn&rsquo;t a lender, and doesn&rsquo;t make
              money on the rate you choose. Because we have no stake in which
              lender wins, neither do our recommendations.
              <br />
              <br />
              The better rate exists. It just requires a place where lenders
              can&rsquo;t avoid offering it.
            </p>

            <div>
              <Button
                size="lg"
                arrow
                href="https://www.bankrate.com/how-we-get-paid/"
              >
                How we&rsquo;re paid
              </Button>
            </div>
          </div>

          <Dialog>
            <DialogTrigger
              className="group relative mx-auto w-full max-w-94 shrink-0 cursor-pointer rounded-4xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:mx-0"
              aria-label="Play video"
            >
              <div className="overflow-hidden rounded-4xl p-8">
                <div className="relative w-full overflow-hidden rounded-2xl">
                  <Image
                    src="/marketing/brand/bankrate-people.jpg"
                    alt="A father and daughter smiling together"
                    width={752}
                    height={502}
                    className="w-full object-cover"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-green-900/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src="/marketing/brand/brush/play-button.svg"
                      alt=""
                      aria-hidden
                      width={96}
                      height={96}
                      className="transition-transform duration-200 group-hover:scale-110"
                    />
                  </div>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent
              className="border-0 bg-black p-0 shadow-2xl sm:max-w-[900px]"
              showCloseButton={false}
            >
              <DialogTitle className="sr-only">Bankrate video</DialogTitle>
              <DialogClose className="absolute top-3 right-3 z-10 cursor-pointer text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                <CloseX className="pointer-events-none size-4" />
                <span className="sr-only">Close</span>
              </DialogClose>
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/Da9421qzWUM?autoplay=1&rel=0"
                  title="Bankrate video"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full rounded-lg"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col items-center gap-6">
          <EyebrowLg className="text-gray-600">How it works</EyebrowLg>
          <div className="relative grid w-fit items-stretch justify-center gap-6 md:grid-cols-3">
            <FlourishHouseCost
              className="text-electric-500 absolute -top-6.5 -right-2.5 size-15.5"
              aria-hidden="true"
            />
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="flex max-w-106 flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-6"
              >
                <EyebrowSm className="text-gray-600">{step.number}</EyebrowSm>
                <p className="font-serif text-lg leading-tight font-semibold tracking-tight text-gray-700">
                  {step.title}
                </p>
                <p className="text-lg leading-relaxed tracking-tighter text-gray-700">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
