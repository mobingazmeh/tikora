import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useWindowSize } from "react-use";

// تعریف تایپ‌ها برای پروپ‌های کامپوننت
export interface ResponsiveDrawerProps {
  title: string | any; // عنوان پنجره
  trigger?: React.ReactNode; // محتوای فعال‌سازی پنجره (مثل دکمه یا لینک)
  children: React.ReactNode; // محتوای داخلی پنجره
  isOpen?: boolean; // وضعیت باز یا بسته بودن پنجره
  dialogHeader?: boolean; // آیا باید هدر دیالوگ نمایش داده شود؟
  onClose?: (openStatus: boolean) => void; // تابع برای اطلاع از تغییر وضعیت پنجره
}

// کامپوننت اصلی که برای نمایش دیالوگ یا دراور استفاده می‌شود
export function ResponsiveDrawer({
  title,
  children,
  trigger,
  isOpen = false,
  dialogHeader = true,
  onClose,
}: ResponsiveDrawerProps) {
  const [open, setOpen] = React.useState(isOpen); // وضعیت باز یا بسته بودن پنجره

  // بروزرسانی وضعیت باز یا بسته بودن پنجره بر اساس ورودی isOpen
  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  // فراخوانی تابع onClose زمانی که وضعیت پنجره تغییر می‌کند
  React.useEffect(() => {
    onClose?.(open);
  }, [open, onClose]);

  // دریافت اندازه پنجره مرورگر
  const { width: windowWidth } = useWindowSize();
  const isDesktop = windowWidth > 768; // تعیین اینکه آیا صفحه در حال مشاهده در دسکتاپ است یا موبایل

  // اگر صفحه دسکتاپ باشد، از دیالوگ استفاده می‌شود
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>} {/* فعال‌سازی پنجره */}
        <DialogContent dir="rtl" className="sm:max-w-[425px] !rounded-lg">
          {/* اگر dialogHeader فعال باشد، هدر دیالوگ نمایش داده می‌شود */}
          {dialogHeader ? (
            <DialogHeader>
              <DialogTitle className="!text-right"> {title}</DialogTitle>
            </DialogHeader>
          ) : (
            <div className="hidden">
              <DialogHeader>
                <DialogTitle className="!text-right"> </DialogTitle>
              </DialogHeader>
            </div>
          )}
          {children} {/* نمایش محتوای داخل پنجره */}
        </DialogContent>
      </Dialog>
    );
  }

  // اگر صفحه موبایل باشد، از دراور استفاده می‌شود
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>} {/* فعال‌سازی پنجره */}
      <DrawerContent className="z-[103]">
        <DrawerHeader className="text-right">
          <DrawerTitle>{title}</DrawerTitle> {/* نمایش عنوان دراور */}
        </DrawerHeader>
        {children} {/* نمایش محتوای داخل دراور */}
      </DrawerContent>
    </Drawer>
  );
}
