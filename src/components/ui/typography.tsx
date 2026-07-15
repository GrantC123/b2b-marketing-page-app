import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

type TypographyElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "b" | "strong" | "span" | "div" | "p";

const typographyVariants = cva("not-italic leading-tight text-headings", {
  variants: {
    variant: {
      "display-1": "text-pretty font-medium font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl",
      "display-2": "text-pretty font-medium font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
      "display-3": "text-pretty font-medium font-serif text-5xl lg:text-6xl xl:text-7xl",
      "heading-1": "text-pretty font-medium font-serif text-4xl lg:text-5xl",
      "heading-2": "text-pretty font-medium font-serif text-3xl lg:text-4xl",
      "heading-3": "text-pretty font-medium font-serif text-2xl lg:text-3xl",
      "heading-4": "text-pretty font-bold text-xl",
      "eyebrow-lg": "font-bold text-sm leading-none uppercase tracking-wide",
      "eyebrow-sm": "font-bold text-xs leading-none uppercase tracking-wider",
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

function Display1({ className, as = "h1", ...props }: Omit<TypographyProps, "variant">) {
  return <Typography variant="display-1" as={as} className={className} {...props} />;
}

function Display2({ className, as = "h1", ...props }: Omit<TypographyProps, "variant">) {
  return <Typography variant="display-2" as={as} className={className} {...props} />;
}

function Display3({ className, as = "h1", ...props }: Omit<TypographyProps, "variant">) {
  return <Typography variant="display-3" as={as} className={className} {...props} />;
}

function Heading1({ className, as = "h1", ...props }: Omit<TypographyProps, "variant">) {
  return <Typography variant="heading-1" as={as} className={className} {...props} />;
}

function Heading2({ className, as = "h2", ...props }: Omit<TypographyProps, "variant">) {
  return <Typography variant="heading-2" as={as} className={className} {...props} />;
}

function Heading3({ className, as = "h3", ...props }: Omit<TypographyProps, "variant">) {
  return <Typography variant="heading-3" as={as} className={className} {...props} />;
}

function Heading4({ className, as = "h4", ...props }: Omit<TypographyProps, "variant">) {
  return <Typography variant="heading-4" as={as} className={className} {...props} />;
}

function EyebrowLg({ className, as = "span", ...props }: Omit<TypographyProps, "variant">) {
  return <Typography variant="eyebrow-lg" as={as} className={className} {...props} />;
}

function EyebrowSm({ className, as = "span", ...props }: Omit<TypographyProps, "variant">) {
  return <Typography variant="eyebrow-sm" as={as} className={className} {...props} />;
}

export {
  Typography,
  typographyVariants,
  Display1,
  Display2,
  Display3,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  EyebrowLg,
  EyebrowSm,
};
export type { TypographyProps, TypographyElement };
