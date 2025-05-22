"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import HeaderSearch from "./components/HeaderSearch";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ShareDialog from "../share-dialog/ShareDialog";
import { useState } from "react";

const MobileHeader = () => {
  const { back } = useRouter(); // دسترسی به تابع بازگشت به صفحه قبل
  const pathname = usePathname(); // مسیر فعلی صفحه
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false); // مدیریت باز بودن دیالوگ اشتراک‌گذاری

  return (
    // هدر موبایل (فقط در حالت sm و پایین‌تر نمایش داده می‌شود)
    <div className="w-full z-[100] sticky top-0 sm:hidden block bg-white min-h-[60px] border-b shadow-sm ">
      <div className="w-full container pr-6 pl-3 h-full flex items-center justify-between">

        {/* نمایش دکمه برگشت اگر مسیر فعلی صفحه اصلی نباشد */}
        {pathname != "/" && pathname.length >= 2 && (
          <Button onClick={back} variant={"ghost"} className="!p-2 -mr-3 ml-1">
            <Icon icon={"solar:arrow-right-linear"} className="!size-6 " />
          </Button>
        )}

        {/* اگر در صفحه پروفایل هستیم نمایش متن، در غیر اینصورت نمایش باکس جستجو */}
        {pathname.includes("profile") ? (
          <div className="flex items-center gap-x-2 flex-1">حساب کاربر من</div>
        ) : (
          <div className="sm:w-[460px] flex-1">
            <HeaderSearch />
          </div>
        )}

        {/* در صفحه جزئیات محصول منو برای اشتراک‌گذاری و ذخیره محصول، در صفحات دیگر دکمه سبد خرید */}
        {pathname.includes("products/details") ? (
          <DropdownMenu dir="rtl">
            <DropdownMenuTrigger className="outline-none">
              <Icon icon={"solar:menu-dots-bold"} className="transform rotate-90" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-[102] ml-10">
              <DropdownMenuItem>
                <button className="w-full outline-none flex gap-x-2 items-center">
                  <Icon icon={"solar:bookmark-linear"} className="!size-4" />
                  <span className="flex-1">ذخیره محصول</span>
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button onClick={() => setIsShareDialogOpen(true)} className="w-full outline-none flex gap-x-2 items-center">
                  <Icon icon={"solar:share-linear"} className="!size-4" />
                  <span className="flex-1">اشتراک گذاری</span>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant={"ghost"} className="mr-4">
            <Icon icon={"solar:cart-5-outline"} className="!size-6" />
          </Button>
        )}
      </div>

      {/* دیالوگ اشتراک‌گذاری */}
      <ShareDialog onClose={setIsShareDialogOpen} isOpen={isShareDialogOpen} />
    </div>
  );
};

export default MobileHeader;
