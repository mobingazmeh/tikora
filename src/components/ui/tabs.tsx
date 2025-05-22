"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"


// کامپوننت ریشه تب‌ها
const Tabs = TabsPrimitive.Root

 const TabsList =React.forwardRef<
 React.ElementRef<typeof TabsPrimitive.List>,
 React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
 >(({className,...props},ref)=>(
  <TabsPrimitive.List
  ref={ref}
  className={cn(
      "text-caption h-12 flex items-center ",
      className
  )}
  {...props}
  />
 ))
 TabsList.displayName = TabsPrimitive.List.displayName


 const TabsTrigger = React.forwardRef<
 React.ElementRef<typeof TabsPrimitive.Trigger>,
 React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
 >(({className, ...props},ref)=>(
  <TabsPrimitive.Trigger
  ref={ref}
  className={cn(
    "mx-4 h-full data-[state=active]:border-b-4 data-[state=active]:text-secondary-500 data-[state=active]:font-medium px-2  data-[state=active]:border-secondary-500 ",
className
  )}
  {...props}
  />
 ))
 TabsTrigger.displayName = TabsPrimitive.Trigger.displayName


 const TabsContent =React.forwardRef<
 React.ElementRef<typeof TabsPrimitive.Content>,
 React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
 >(({className, ...props},ref)=>(
  <TabsPrimitive.Content
  ref={ref}
  className={cn(
    "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300",
className
  )}
  {...props}
  />
 ))
 TabsContent.displayName = TabsPrimitive.Content.displayName

// صادر کردن کامپوننت‌ها برای استفاده در بخش‌های دیگر اپلیکیشن
export { Tabs, TabsList, TabsTrigger, TabsContent }
