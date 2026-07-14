import * as React from "react"
import { Checkmark } from "@bankrate/icons-react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        [
          "peer size-4.5 shrink-0 rounded-sm border border-input text-primary flex items-center justify-center cursor-pointer outline-2 outline-transparent outline-offset-2",
          "focus-visible:border-ring focus-visible:outline-ring",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white",
        ].join(" "),
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="text-current size-4"
      >
        <Checkmark className="size-3.5 pl-px" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
