"use client"
import { ProductItemType } from "@/lib/types/CommonTypes";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import useShoppingCartStore from "@/lib/store/useCartDetailsStore";
import { toast } from "react-toastify";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToggleFavouriteMutation } from "@/services/favourites/useToggleFavourite";
import { useGetFavouritesQuery } from "@/services/favourites/useGetFavourites";

interface ProductItemProps {
  item: ProductItemType;
}

const ProductItem = ({ item }: ProductItemProps) => {
  const cart = useShoppingCartStore((state) => state.cart);
  const addItemToCart = useShoppingCartStore((state) => state.addItemToCart);
  const removeItemFromCart = useShoppingCartStore((state) => state.removeItemFromCart);
  const toggleFavouriteMutation = useToggleFavouriteMutation();
  const { data: favouritesData } = useGetFavouritesQuery();
  const [isCurrentFavourite, setIsCurrentFavourite] = useState(item.is_favourite);
    // بررسی وجود محصول در سبد خرید
    const isInCart = useMemo(() => {
      return cart.some((cartItem) => cartItem.product_id === item.id);
    }, [cart, item.id]);

    useEffect(() => {
      if (favouritesData?.result) {
        console.log('لیست محصولات علاقه‌مندی:', favouritesData.result);
        const isFavourite = favouritesData.result.some(fav => fav.id === item.id);
        setIsCurrentFavourite(isFavourite);
      }
    }, [favouritesData, item.id]);

const handleCartAction = async (e: React.MouseEvent) => {
  e.preventDefault();
  try {
    if (isInCart) {
      await removeItemFromCart(item.id);
      toast.success("محصول از سبد خرید حذف شد", {
        position: "top-right",
        rtl: true,
        theme: "dark"
      });
    } else {
      const cartItem = {
        product_id: item.id,
        quantity: 1,
        type: 'simple' as const
      };
      await addItemToCart(cartItem);
      toast.success("محصول به سبد خرید اضافه شد", {
        position: "top-right",
        rtl: true,
        theme: "dark"
      });
    }
  } catch  {
    toast.error("خطا در عملیات سبد خرید", {
      position: "top-right",
      rtl: true,
      theme: "dark"
    });
  }
};

const handleToggleFavourite = async (e: React.MouseEvent) => {
  e.preventDefault();
  if (toggleFavouriteMutation.isPending) return;

  try {
    const result = await toggleFavouriteMutation.mutateAsync({
      id: item.id,
      type: "products",
    });
    setIsCurrentFavourite((prev) => !prev);
    toast.success(result.data?.message , {
      position: "top-right",
      rtl: true,
      theme: "dark",
    });
  } catch  {
    toast.error("خطا در تغییر علاقه‌مندی", {
      position: "top-right",
      rtl: true,
      theme: "dark",
    });
  } finally {
  }
};


  // محاسبه درصد تخفیف
  const discountPercentage = item.old_price && item.sale_price 
    ? Math.round(((item.old_price - item.sale_price) / item.old_price) * 100)
    : 0;

  return (
    <div className="w-full bg-white max-w-40 items-center flex flex-col justify-between relative group">
   

      {/* لینک به صفحه جزئیات محصول */}
      <Link href={`/products/details/${item.id}`}>
        {/* نمایش تصویر محصول */}
        <div className="w-full h-fit pb-3">
          <Image
            src={item.cover}
            width={162}
            height={162}
            alt={item.title}
            className="!w-40 !h-40 border rounded-lg object-contain"
          />
        </div>

        {/* نمایش نام محصول */}
        <div className="w-full leading-5 h-14 mb-2 line-clamp-2 overflow-hidden text-sm">
          {item.title}
        </div>

        {/* نمایش تخفیف و ویژگی‌های ویژه */}
        <div className="w-full h-10 flex items-center">
          <div className="flex flex-col gap-1">
            {discountPercentage > 0 && (
              <span className="bg-primary-500 text-white text-[11px] rounded-full h-5 px-2 flex items-center justify-center">
                {discountPercentage}%
              </span>
            )}
            {item.inventory < 5 && (
              <span className="bg-danger text-white text-[7px] rounded-full h-5 px-2 flex items-center justify-center">
                 عدم موجودی
              </span>
            )}
          </div>

          {/* نمایش قیمت محصول */}
          <div className="flex-1 flex justify-end">
            <div className="flex flex-col">
              <span className="text-xs">
              {item.sale_price !== undefined
        ? new Intl.NumberFormat("fa-IR").format(item.sale_price)
        : "-"}
              </span>
              {item.old_price && (
                <s className="text-caption text-red-500">
                  {new Intl.NumberFormat("fa-IR").format(item.old_price)}
                </s>
              )}
            </div>
            <span className="p-1 text-xs">تومان</span>
          </div>
        </div>


          {/* دکمه سبد خرید با تولتیپ */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`absolute bottom-2 left-2 z-10 bg-white/80 hover:bg-white transition-opacity ${
                  isInCart ? 'text-red-500 hover:text-red-600' : 'text-green hover:text-green-600'
                }`}
                onClick={handleCartAction}
                icon={
                  <Icon 
                    icon={isInCart ? "material-symbols:remove-shopping-cart" : "material-symbols:add-shopping-cart"} 
                    className="w-5 h-5" 
                  />
                }
              />
            </TooltipTrigger>
            <TooltipContent className="bg-white text-gray-800 border border-gray-200 shadow-lg">
              <p className="text-sm font-medium">
                {isInCart ? "حذف از سبد خرید" : "افزودن ب سبد خرید"}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

     {/* دکمه علاقه‌مندی */}
  <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white"
                onClick={handleToggleFavourite}
                icon={
                  toggleFavouriteMutation.isPending ? (
                    <Icon icon="svg-spinners:6-dots-scale" className="text-red-500" width={20} />
                  ) : (
                    <Icon
                      icon={
                        isCurrentFavourite
                          ? "material-symbols:favorite"
                          : "material-symbols:favorite-outline"
                      }
                      className="w-5 h-5 text-red-500"
                    />
                  )
                }
              />
            </TooltipTrigger>
            <TooltipContent className="bg-white text-gray-800 border border-gray-200 shadow-lg">
              <p className="text-sm font-medium">
                {isCurrentFavourite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="w-full flex h-10 items-center gap-x-1">
          <span>
            <Icon icon={"mdi:store-outline"} className="size-5 text-caption-dark" />
          </span>
          <span className="text-xs text-caption-dark">فروشگاه</span>
        </div>
      </Link>
    </div>
  );
};


export default ProductItem;