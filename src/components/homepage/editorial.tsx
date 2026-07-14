import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EyebrowSm, Heading2, Heading3 } from "@/components/ui/typography";

import SectionShell from "./shell";

/** Static prototype editorial — brand app pulls live newsroom feed. */
const SIDE_POSTS = [
  {
    title: "How to compare mortgage rates without getting sold",
    href: "https://www.bankrate.com/mortgages/",
    tag: "MORTGAGES",
    image: "/marketing/brand/placeholder.jpg",
  },
  {
    title: "What Bankrate’s rate data tells us about today’s market",
    href: "https://www.bankrate.com/banking/",
    tag: "BANKING",
    image: "/marketing/brand/placeholder.jpg",
  },
  {
    title: "Credit card APR vs. balance transfer: when switching pays off",
    href: "https://www.bankrate.com/credit-cards/",
    tag: "CREDIT CARDS",
    image: "/marketing/brand/placeholder.jpg",
  },
] as const;

export default function Editorial() {
  return (
    <SectionShell id="editorial">
      <Heading2 className="mb-8 text-center text-pretty">
        The research banks don&rsquo;t want you to read
      </Heading2>

      <div className="grid justify-center gap-x-6 gap-y-4 lg:grid-cols-2 lg:grid-rows-3">
        <Card className="group grid w-full max-w-157 flex-col gap-4 rounded-3xl border-gray-200 bg-white p-3 py-0 shadow-none lg:col-start-1 lg:row-span-3">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl lg:aspect-auto lg:grow">
            <Image
              src="/marketing/brand/hht-featured.png"
              alt="The Hidden Homeownership Tax"
              width={1080}
              height={720}
              sizes="(max-width: 70em) 100vw, 50vw"
              className="size-full object-cover"
            />
          </div>
          <CardContent className="flex w-full flex-col gap-4 self-center p-2">
            <EyebrowSm className="text-gray-600">BANKRATE RESEARCH</EyebrowSm>
            <Heading3 className="text-xl/tight line-clamp-3">
              <Link
                href="https://www.bankrate.com/mortgages/the-hidden-homeownership-tax/"
                className="transition-colors hover:text-primary"
              >
                The Hidden Homeownership Tax
              </Link>
            </Heading3>
            <p className="text-base leading-relaxed tracking-tight text-gray-600">
              How mortgage overpayment is making housing and retirement less affordable
            </p>
          </CardContent>
        </Card>

        {SIDE_POSTS.map((post) => (
          <Card
            key={post.title}
            className="group grid w-full max-w-157 flex-col gap-4 rounded-3xl border-gray-200 bg-white p-3 py-0 shadow-none lg:col-start-2 lg:grid-cols-[min-content_1fr]"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-xl lg:aspect-square">
              <Image
                src={post.image}
                alt=""
                width={320}
                height={320}
                className="size-full object-cover"
              />
            </div>
            <CardContent className="flex w-full flex-col gap-4 self-center p-2">
              <EyebrowSm className="text-gray-600">{post.tag}</EyebrowSm>
              <Heading3 className="line-clamp-3 text-xl/tight">
                <Link
                  href={post.href}
                  className="transition-colors hover:text-primary"
                >
                  {post.title}
                </Link>
              </Heading3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          size="lg"
          variant="link"
          arrow
          href="https://www.bankrate.com/news/"
        >
          See all our reporting
        </Button>
      </div>
    </SectionShell>
  );
}
