// فعال‌سازی قابلیت‌های React
import * as React from "react";

// Slot از Radix برای جایگزینی تگ اصلی در صورت نیاز
import { Slot } from "@radix-ui/react-slot";

// cva و نوع VariantProps برای مدیریت کلاس‌های ترکیبی (variant + size)
import { cva, type VariantProps } from "class-variance-authority";

// ابزار ترکیب کلاس‌ها
import { cn } from "@/lib/utils";

// ایمپورت آیکون لودینگ از Iconify
import { Icon } from "@iconify/react/dist/iconify.js";

// تعریف کلاس‌های مختلف برای دکمه با استفاده از class-variance-authority
const buttonVariants = cva(
  // کلاس‌های پایه مشترک برای همه دکمه‌ها
  "inline-flex group items-center transition-all justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300",
  {
    variants: {
      // تعریف انواع استایل برای دکمه‌ها
      variant: {
        default:
          "bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90",
        destructive:
          "bg-red-500 text-neutral-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90",
        outline:
          "border border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",

        // حالت outline سفارشی ثانویه
        "secondary-outline":
          "border border-secondary-500 bg-white hover:bg-secondary-500/5 text-secondary-500",

        secondary:
          "bg-secondary-500 text-white hover:bg-secondary-500 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80",

        primary:
          "bg-primary-300 text-black hover:bg-primary-300 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80",

        ghost:
          "hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",

        link: "text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50",

        glass: "bg-white/10 hover:bg-white/20",
      },

      // اندازه‌های مختلف برای دکمه
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10", // فقط آیکون
      },
    },
    // مقادیر پیش‌فرض
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// تعریف تایپ برای پراپرتی‌های دکمه
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, // تمام ویژگی‌های پایه‌ی دکمه
    VariantProps<typeof buttonVariants> { // نوع‌های variant و size
  asChild?: boolean; // اگر true باشد از Slot استفاده می‌شود
  icon?: React.ReactNode; // آیکون قابل تنظیم
  iconPosition?: "start" | "end"; // محل قرارگیری آیکون
  isLoading?: boolean; // حالت در حال لود
  animation?: boolean; // اگر true باشد انیمیشن اعمال می‌شود
}

// تعریف کامپوننت اصلی Button با قابلیت ref
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      icon,
      iconPosition,
      variant,
      size,
      asChild = false,
      animation,
      isLoading,
      ...props
    },
    ref
  ) => {
    // تعیین اینکه از Slot استفاده شود یا button
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }), // کلاس‌های ترکیبی براساس ورودی
          iconPosition == "end" && "flex-row-reverse" // اگر آیکون سمت راست باشد
        )}
        ref={ref}
        disabled={isLoading} // در حالت لودینگ، دکمه غیرفعال می‌شود
        {...props}
      >
        {/* اگر isLoading فعال باشد، spinner نمایش داده می‌شود */}
        {isLoading ? (
          <span className="h-full w-full flex items-center justify-center">
            <Icon icon={"svg-spinners:ring-resize"} className="!size-6" />
          </span>
        ) : (
          <>
            {/* نمایش آیکون (در صورت وجود) */}
            {icon && (
              <span
                className={cn(
                  "h-full transition-all flex justify-center items-center",
                  animation && "relative right-0 group-hover:right-1" // انیمیشن حرکت آیکون
                )}
              >
                {icon}
              </span>
            )}

            {/* نمایش متن دکمه فقط وقتی که نوع icon نباشد */}
            {size != "icon" && (
              <div
                className={cn(
                  "transition-all w-fit",
                  animation && "relative delay-100 right-0 group-hover:right-1" // انیمیشن حرکت متن
                )}
              >
                {children}
              </div>
            )}
          </>
        )}
      </Comp>
    );
  }
);

// تعیین نام کامپوننت برای Debug در DevTools
Button.displayName = "Button";

// خروجی گرفتن از Button و buttonVariants
export { Button, buttonVariants };
