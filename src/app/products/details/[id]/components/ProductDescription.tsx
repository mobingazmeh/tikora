"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProductDetailsResponseType } from "@/lib/types/CommonTypes";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

interface ProductDescription {
  product: ProductDetailsResponseType;
}
// کامپوننت نمایش توضیحات محصول
const ProductDescription = ({ product }: ProductDescription) => {
  const [showMore, setShowMore] = useState(true); // وضعیت باز یا بسته بودن متن
  return (
    <div className="w-full min-h-32 border rounded-xl pt-4 pb-2 px-2 ">
      <h3 className="font-bold text-md">توضیحات فروشنده</h3>

      {/* نمایش متن توضیحات با محدودیت ۴ خط یا کامل */}
      <p
        className={cn(
          "text-caption line-clamp-2 mt-2", // محدود کردن به ۴ خط
          !showMore && "line-clamp-none"     // اگر showMore = false باشد، تمام متن نمایش داده شود
        )}
        dangerouslySetInnerHTML={{ __html: product?.brief }} // نمایش HTML خام از توضیحات
      ></p>

      {/* دکمه نمایش بیشتر / بستن */}
      <div className="w-full justify-center flex items-center">
        <Button
          className="bg-caption/10 h-7 px-2 text-caption text-[11px]"
          size={"sm"}
          onClick={() => setShowMore((prev) => !prev)} // تغییر وضعیت باز/بسته با کلیک
          icon={
            <Icon
              icon={
                showMore
                  ? "solar:alt-arrow-down-line-duotone" // آیکون فلش به پایین
                  : "solar:alt-arrow-up-line-duotone"   // آیکون فلش به بالا
              }
              className="size-4"
            />
          }
          variant={"ghost"}
        >
          {showMore ? "نمایش بیشتر" : "بستن"}
        </Button>
      </div>
    </div>
  );
};

export default ProductDescription;