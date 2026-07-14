"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        // Horizontal tabs = tablist above panels (column). Vertical = side-by-side.
        "group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted group-data-[orientation=horizontal]/tabs:h-8",
        line: "gap-1 bg-transparent",
        /** Brand homepage segment control (Next Steps). */
        pill: "h-auto bg-gray-100 rounded-[1.625rem] p-1.5 w-fit max-w-full gap-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const TabsListContext = React.createContext<
  VariantProps<typeof tabsListVariants>
>({
  variant: "default",
})

const tabsTriggerVariants = cva(
  "relative inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "h-[calc(100%-1px)] data-active:bg-background data-active:text-foreground data-active:shadow-sm",
        line: [
          "bg-transparent after:absolute after:bg-foreground after:opacity-0 after:transition-opacity",
          "data-active:bg-transparent data-active:shadow-none",
          "group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5",
          "group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5",
          "group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        ].join(" "),
        pill: "flex-none h-auto min-h-10 cursor-pointer bg-transparent text-gray-900 font-semibold leading-none rounded-[1.25rem] py-2.5 px-6 data-active:bg-primary data-active:text-white data-active:shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  children,
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsListContext.Provider value={{ variant }}>
      <TabsPrimitive.List
        data-slot="tabs-list"
        data-variant={variant}
        className={cn(tabsListVariants({ variant }), className)}
        {...props}
      >
        {children}
      </TabsPrimitive.List>
    </TabsListContext.Provider>
  )
}

function TabsTrigger({
  className,
  variant,
  ...props
}: TabsPrimitive.Tab.Props & VariantProps<typeof tabsTriggerVariants>) {
  const context = React.useContext(TabsListContext)
  const resolvedVariant = variant ?? context.variant ?? "default"

  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      data-variant={resolvedVariant}
      className={cn(
        tabsTriggerVariants({ variant: resolvedVariant }),
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  )
}

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  tabsTriggerVariants,
}
