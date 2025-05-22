import { ProductItemType } from "@/lib/types/CommonTypes"; // وارد کردن نوع داده محصول
import { Icon } from "@iconify/react/dist/iconify.js"; // وارد کردن آیکون‌ها
import Image from "next/image"; // وارد کردن کامپوننت تصویر برای نمایش تصاویر
import Link from "next/link"; // وارد کردن لینک برای هدایت به صفحه جزئیات محصول
import React from "react";

// تعریف props برای کامپوننت ProductListItem
interface ProductListItemProps {
  item: ProductItemType; // دریافت اطلاعات محصول
}

const ProductListItem = ({ item }: ProductListItemProps) => {
  return (
    <div className="w-full max-w-52 items-center flex flex-col justify-between">
      {/* لینک به صفحه جزئیات محصول */}
      <Link href={`/products/details/${item.id}`}>
        {/* نمایش تصویر محصول */}
        <div className="w-full h-fit pb-3 flex items-center justify-center">
          <Image
            src={item.cover} // تصویر محصول
            width={180} // عرض تصویر
            height={180} // ارتفاع تصویر
            alt={item.title} // متن جایگزین تصویر
            className="!w-[180px] !h-[180px] border border-gray-100 rounded-lg" // استایل تصویر
          />
        </div>

        {/* نمایش نام محصول */}
        <div className="w-full leading-7 h-14 mb-2 line-clamp-2 overflow-hidden">{item.title}</div>

        {/* نمایش تخفیف و ویژگی‌های ویژه */}
        <div className="w-full h-10 flex items-center">
          <div className="flex flex-col gap-1">
            {/* نمایش درصد تخفیف */}
            <span className="bg-primary-500 text-[11px] rounded-full h-5 px-2 flex items-center justify-center">
              {item.type_discount === 'percent' ? `${item.value_discount}%` : '10%'}
            </span>
            {/* نمایش ویژگی "فوری" */}
            <span className="bg-danger text-white text-[11px] rounded-full h-5 px-2 flex items-center justify-center">
              فوری
            </span>
          </div>

          {/* نمایش قیمت محصول */}
          <div className="flex-1 flex justify-end">
            <div className="flex flex-col">
              {/* قیمت تخفیف خورده */}
              <span className="text-xs">
                {new Intl.NumberFormat("fa-IR").format(item.sale_price)}
              </span>
              {/* قیمت اصلی */}
              <s className="text-caption">
                {new Intl.NumberFormat("fa-IR").format(item.old_price)}
              </s>
            </div>
            {/* واحد پول */}
            <span className="p-1">تومان</span>
          </div>
        </div>

        {/* نمایش نام فروشگاه */}
        <div className="w-full flex h-10 items-center gap-x-1">
          <span>
            <Icon icon={"mdi:store-outline"} className="size-5 text-caption-dark" /> {/* آیکون فروشگاه */}
          </span>
          <span className="text-xs text-caption-dark">فروشگاه</span> {/* نام فروشگاه */}
        </div>
      </Link>
    </div>
  );
};

export default ProductListItem;
