import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

type TypographyElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "b" | "strong" | "span" | "div" | "p";

const typographyVariants = cva("not-italic leading-tight text-headings", {
  variants: {
    variant: {
      "heading-1": "text-pretty font-medium font-serif text-4xl lg:text-5xl",
      "heading-3": "text-pretty font-medium font-serif text-2xl lg:text-3xl",
    },
  },
});

type TypographyProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof typographyVariants> & {
    asChild?: boolean;
    as?: TypographyElement;
  };

function Typography({
  className,
  variant,
  asChild = false,
  as,
  ...props
}: TypographyProps) {
  const Comp = asChild ? Slot.Root : (as ?? "div");

  return (
    <Comp
      className={cn(typographyVariants({ variant, className }))}
      {...(props as React.HTMLAttributes<HTMLElement>)}
    />
  );
}

function Heading1({ className, as = "h1", ...props }: Omit<TypographyProps, "variant">) {
  return <Typography variant="heading-1" as={as} className={className} {...props} />;
}

function Heading3({ className, as = "h3", ...props }: Omit<TypographyProps, "variant">) {
  return <Typography variant="heading-3" as={as} className={className} {...props} />;
}

export { Typography, typographyVariants, Heading1, Heading3 };
export type { TypographyProps, TypographyElement };
