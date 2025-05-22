
//مناسب برای انتخاب بازه‌ای از مقادیر، مثل بازه قیمت از ۱۰۰ تا ۵۰۰ مناسب برای انتخاب یک مقدار واحد (مثلاً مقدار صدا، روشنایی)
"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

interface DualRangeSliderProps
  extends React.ComponentProps<typeof SliderPrimitive.Root> {
  labelPosition?: "top" | "bottom";
  label?: (value: number | undefined) => React.ReactNode;
}
const DualRangeSlider = React.forwardRef<
React.ElementRef<typeof SliderPrimitive.Root>,
DualRangeSliderProps
>(({ className, label, labelPosition = "top", ...props }, ref) => {
const initialValue = Array.isArray(props.value)
  ? props.value
  : [props.min, props.max];
  return (
    // کامپوننت اصلی Radix UI برای اسلایدر
<SliderPrimitive.Root
  ref={ref}
  className={cn(
    "relative flex w-full touch-none select-none items-center",
    className
  )}
  {...props}
>
   {/* بخش track یا نوار پس‌زمینه اسلایدر */}
   <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary-100/20">
            {/* بخش range یا محدوده انتخاب‌شده (مثلاً بین دو عدد در dual slider) */}
        <SliderPrimitive.Range className="absolute h-full bg-secondary-500" />
      </SliderPrimitive.Track>
      {initialValue.map((value, index) => (
        <React.Fragment key={index}>
          <SliderPrimitive.Thumb className="relative block h-5 w-5 rounded-full border-2 border-primary bg-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            {label && (
              <span
                className={cn(
                  "absolute flex w-full justify-center",
                  labelPosition === "top" && "-top-7",
                  labelPosition === "bottom" && "top-4"
                )}
              >
                {label(value)}
              </span>
            )}
          </SliderPrimitive.Thumb>
        </React.Fragment>
      ))}
    </SliderPrimitive.Root>
  );
});
DualRangeSlider.displayName = "DualRangeSlider";

export { DualRangeSlider };
