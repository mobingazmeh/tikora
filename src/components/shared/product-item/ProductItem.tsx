import { ProductItemType } from "@/lib/types/CommonTypes"; // وارد کردن نوع داده برای محصول
import { Icon } from "@iconify/react/dist/iconify.js"; // وارد کردن آیکون‌ها
import Image from "next/image"; // وارد کردن کامپوننت Image برای نمایش تصویر محصول
import Link from "next/link"; // وارد کردن Link برای هدایت به صفحه جزئیات محصول
import React from "react";
import { Button } from "@/components/ui/button";
import useShoppingCartStore from "@/lib/store/useCartDetailsStore";

// تعریف Props برای کامپوننت ProductItem
interface ProductItemProps {
  item: ProductItemType; // محصول که از نوع ProductItemType است
}

// کامپوننت برای نمایش اطلاعات محصول
const ProductItem = ({ item }: ProductItemProps) => {
  const addItemToCart = useShoppingCartStore((state) => state.addItemToCart);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    const cartItem = {
      product_id: item.id,
      quantity: 1,
      type: 'simple' as const
    };
    await addItemToCart(cartItem);
  };

  return (
    <div className="w-full bg-white max-w-40 items-center flex flex-col justify-between relative group">
      {/* دکمه سبد خرید */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handleAddToCart}
        icon={<Icon icon="solar:cart-3-linear" className="w-4 h-4" />}
      />

      {/* لینک به صفحه جزئیات محصول */}
      <Link href={`/products/details/${item.id}`}>
        {/* نمایش تصویر محصول */}
        <div className="w-full h-fit pb-3 ">
          <Image
            src={item.cover} // تصویر محصول
            width={162} // عرض تصویر
            height={162} // ارتفاع تصویر
            alt={item.title} // متن جایگزین تصویر
            className="!w-40 !h-40 border rounded-lg" // استایل تصویر
          />
        </div>

        {/* نمایش نام محصول */}
        <div className="w-full leading-7 h-14 mb-2 line-clamp-2 overflow-hidden">{item.title}</div>

        {/* نمایش تخفیف و ویژگی‌های ویژه */}
        <div className="w-full h-10 flex items-center">
          <div className="flex flex-col gap-1">
            <span className="bg-primary-500 text-[11px] rounded-full h-5 px-2 flex items-center justify-center ">
              10% {/* درصد تخفیف */}
            </span>
            <span className="bg-danger text-white text-[11px] rounded-full h-5 px-2 flex items-center justify-center ">
              فوری {/* ویژگی فوری */}
            </span>
          </div>

          {/* نمایش قیمت محصول */}
          <div className="flex-1 flex justify-end">
            <div className="flex flex-col">
              <span className="text-xs">
                {new Intl.NumberFormat("fa-IR").format(897000)} {/* قیمت تخفیف خورده */}
              </span>
              <s className="text-caption">
                {new Intl.NumberFormat("fa-IR").format(950000)} {/* قیمت اصلی */}
              </s>
            </div>
            <span className="p-1">تومان</span> {/* واحد پول */}
          </div>
        </div>

        {/* نمایش نام فروشگاه */}
        <div className="w-full flex h-10 items-center gap-x-1">
          <span>
            <Icon icon={"mdi:store-outline"} className="size-5 text-caption-dark" /> {/* آیکون فروشگاه */}
          </span>
          <span className="text-xs text-caption-dark">فروشگاه</span> {/* عنوان فروشگاه */}
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
