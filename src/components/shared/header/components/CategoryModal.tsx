"use client";
import * as React from "react";


import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CategoryList from "./CategoryList";
import { Icon } from "@iconify/react/dist/iconify.js";

// کامپوننت اصلی برای نمایش مودال دسته بندی
export function CategoryModal() {
  const [open, setOpen] = React.useState(false); // وضعیت باز و بسته بودن مودال

  return (
    // مودال که با وضعیت `open` کنترل می‌شود
    <Dialog open={open} onOpenChange={setOpen}>
      {/* دکمه‌ای برای باز کردن مودال */}
      <DialogTrigger asChild>
        <Button className="text-caption-dark py-0 px-2 gap-x-2 items-center" variant="ghost" icon={<Icon icon={"lets-icons:boxes-light"} className="!size-6"/>}>
          {/* متن دکمه "دسته بندی" و آیکن */}
          دسته بندی
        </Button>
      </DialogTrigger>
      {/* محتوای مودال که شامل عنوان و لیست دسته‌بندی است */}
      <DialogContent className="sm:max-w-[620px] flex flex-col items-start sm:rounded-lg rounded-none w-screen sm:h-fit h-dvh ">
        {/* هدر مودال شامل عنوان */}
        <DialogHeader className="h-fit">
          <DialogTitle className="text-right text-md font-medium">
            دسته بندی
          </DialogTitle>
        </DialogHeader>
        {/* لیست دسته‌بندی */}
        <CategoryList onChange={e=>console.log(e)} /> {/* فرض بر این است که `onChange` برای دریافت انتخاب دسته‌بندی است */}
      </DialogContent>
    </Dialog>
  );
}




