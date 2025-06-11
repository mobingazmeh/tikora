"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProductDetailsResponseType } from "@/lib/types/CommonTypes";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

interface ProductDescription {
  product: ProductDetailsResponseType;
}

const ProductDescription = ({ product }: ProductDescription) => {
  const [showMore, setShowMore] = useState(true);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'warranty'>('description');

  if (!product) return null;

  return (
    <div className="w-full flex flex-col gap-y-4">
      {/* تب‌های اطلاعات */}
      <div className="w-full flex items-center gap-x-2 border-b py-2">
      <Button
  variant="ghost"
  className={cn(
    "h-10 px-4 text-sm hover:bg-green/10 ",
    activeTab === 'description' && "border-b-2 border-green text-green "
  )}
  onClick={() => setActiveTab('description')}
>
  توضیحات
</Button>
<Button
  variant="ghost"
  className={cn(
    "h-10 px-4 text-sm hover:bg-green/10",
    activeTab === 'specs' && "border-b-2 border-green text-green"
  )}
  onClick={() => setActiveTab('specs')}
>
  مشخصات فنی
</Button>
<Button
  variant="ghost"
  className={cn(
    "h-10 px-4 text-sm hover:bg-green/10",
    activeTab === 'warranty' && "border-b-2 border-green text-green"
  )}
  onClick={() => setActiveTab('warranty')}
>
  گارانتی
</Button>
      </div>

      {/* محتوای تب‌ها */}
      <div className="w-full min-h-32 border border-green rounded-xl p-4">
        {/* تب توضیحات */}
        {activeTab === 'description' && (
          <div className="w-full">
            <h3 className="font-bold text-md mb-4">توضیحات فروشنده</h3>
            <div
              className={cn(
                "text-caption line-clamp-2",
                !showMore && "line-clamp-none"
              )}
              dangerouslySetInnerHTML={{ __html: product?.brief || '' }}
            />
            <div className="w-full justify-center flex items-center mt-4">
              <Button
                className="bg-caption/10 h-7 px-2 text-caption text-[11px]"
                size={"sm"}
                onClick={() => setShowMore((prev) => !prev)}
                icon={
                  <Icon
                    icon={
                      showMore
                        ? "solar:alt-arrow-down-line-duotone"
                        : "solar:alt-arrow-up-line-duotone"
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
        )}

        {/* تب مشخصات فنی */}
        {activeTab === 'specs' && (
          <div className="w-full">
            <h3 className="font-bold text-md mb-4">مشخصات فنی</h3>
            <div className="w-full grid grid-cols-2 gap-4">
              {/* مشخصات اصلی */}
              <div className="flex items-center gap-x-2">
                <span className="text-caption">کد محصول:</span>
                <span className="text-black">{product.sku}</span>
              </div>
              <div className="flex items-center gap-x-2">
                <span className="text-caption">وزن:</span>
                <span className="text-black">{product.weight} گرم</span>
              </div>
              {product.length && (
                <div className="flex items-center gap-x-2">
                  <span className="text-caption">طول:</span>
                  <span className="text-black">{product.length} سانتی‌متر</span>
                </div>
              )}
              {product.width && (
                <div className="flex items-center gap-x-2">
                  <span className="text-caption">عرض:</span>
                  <span className="text-black">{product.width} سانتی‌متر</span>
                </div>
              )}
              {product.height && (
                <div className="flex items-center gap-x-2">
                  <span className="text-caption">ارتفاع:</span>
                  <span className="text-black">{product.height} سانتی‌متر</span>
                </div>
              )}

              {/* برند */}
              {product.brands && product.brands.length > 0 && (
                <div className="flex items-center gap-x-2">
                  <span className="text-caption">برند:</span>
                  <span className="text-black">{product.brands[0].title}</span>
                </div>
              )}

              {/* دسته‌بندی */}
              {product.categories && product.categories.length > 0 && (
                <div className="flex items-center gap-x-2">
                  <span className="text-caption">دسته‌بندی:</span>
                  <span className="text-black">{product.categories[0].title}</span>
                </div>
              )}

              {/* ویژگی‌های اضافی */}
              {product.attributes && product.attributes.map((attr, index) => (
                <div key={index} className="flex items-center gap-x-2">
                  <span className="text-caption">{attr.key}:</span>
                  <span className="text-black">{attr.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* تب گارانتی */}
        {activeTab === 'warranty' && product.warranty && (
          <div className="w-full">
            <h3 className="font-bold text-md mb-4">اطلاعات گارانتی</h3>
            <div className="w-full flex items-center gap-x-4">
             {/* {product.warranty.logo && (
                <Image
                  src={product.warranty.logo}
                  width={40}
                  height={40}
                  alt={product.warranty.title || ''}
                  className="rounded-lg"
                />
              )} */}
              <div className="flex flex-col">
                <span className="text-black font-medium">{product.warranty.title}</span>
                <span className="text-caption">{product.warranty.duration}</span>
                {product.warranty.description && (
                  <span className="text-caption text-xs mt-1">
                    {product.warranty.description}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;