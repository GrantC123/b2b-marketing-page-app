import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  [
    "w-full min-w-0 rounded-lg border border-input bg-transparent leading-normal transition-colors duration-100 outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-(--input) disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
  ].join(" "),
  {
    variants: {
      size: {
        default: "h-9 px-3 py-2 text-sm",
        sm: "h-8 px-3 text-sm",
        lg: "h-12 rounded-xl px-4 text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

type InputProps = Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants>

function Input({ className, type, size = "default", ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      data-size={size}
      className={cn(inputVariants({ size, className }))}
      {...props}
    />
  )
}

export { Input, inputVariants, type InputProps }
