"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

interface CartItemProps {
  id: number;
  title: string;
  cover: string;
  variety_title?: string;
  price: number;
  sale_price: number;
  qty_basket: number;
  onUpdateQuantity: (id: number, quantity: number) => Promise<void>;
  onRemove: (id: number) => Promise<void>;
  isLoading: boolean;
  loadingAction: 'quantity' | 'remove' | null;
}

const CartListItem = ({
  id,
  title,
  cover,
  variety_title,
  price,
  sale_price,
  qty_basket,
  onUpdateQuantity,
  onRemove,
  isLoading,
  loadingAction,
}: CartItemProps) => {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-4 py-4 border-b last:border-0">
      {/* تصویر محصول */}
      {cover && (
        <div className="relative w-16 h-16 lg:w-20 lg:h-20">
          <Image
            src={cover}
            alt={title}
            fill
            className="object-cover rounded"
          />
        </div>
      )}
      
      {/* اطلاعات محصول */}
      <div className="flex-1 w-full lg:w-auto">
        <h3 className="font-medium text-sm lg:text-base truncate">{title}</h3>
        {variety_title && (
          <p className="text-xs lg:text-sm text-gray-600 truncate">{variety_title}</p>
        )}
        
        {/* دکمه‌های کنترل مقدار و حذف */}
        <div className="flex items-center justify-between lg:justify-start gap-4 mt-2">
          <div className="flex items-center gap-2">
            {/* دکمه کاهش مقدار */}
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 lg:h-9 lg:w-auto lg:px-3"
              onClick={() => onUpdateQuantity(id, Math.max(1, qty_basket - 1))}
              disabled={isLoading && loadingAction === 'quantity'}
            >
              -
            </Button>
            
            {/* نمایش مقدار یا لودینگ */}
            {isLoading && loadingAction === 'quantity' ? (
              <Icon icon="svg-spinners:6-dots-scale" className="text-green-500 w-4 h-4 lg:w-5 lg:h-5" />
            ) : (
              <span className="w-6 text-center text-sm lg:text-base">{qty_basket}</span>
            )}
            
            {/* دکمه افزایش مقدار */}
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 lg:h-9 lg:w-auto lg:px-3"
              onClick={() => onUpdateQuantity(id, qty_basket + 1)}
              disabled={isLoading && loadingAction === 'quantity'}
            >
              +
            </Button>
          </div>
          
          {/* دکمه حذف */}
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 h-8 w-8 p-0 lg:h-9 lg:w-auto lg:px-3"
            onClick={() => onRemove(id)}
            disabled={isLoading && loadingAction === 'remove'}
          >
            {isLoading && loadingAction === 'remove' ? (
              <Icon icon="svg-spinners:6-dots-scale" className="text-red-500 w-4 h-4 lg:w-5 lg:h-5" />
            ) : (
              <Icon icon="solar:trash-bin-trash-linear" className="w-4 h-4 lg:w-5 lg:h-5" />
            )}
          </Button>
        </div>
      </div>
      
      {/* قیمت‌ها */}
      <div className="text-left w-full lg:w-auto">
        <p className="font-medium text-sm lg:text-base">
          {new Intl.NumberFormat("fa-IR").format(sale_price)} تومان
        </p>
        {price !== sale_price && (
          <p className="text-xs lg:text-sm text-red-500 line-through">
            {new Intl.NumberFormat("fa-IR").format(price)} تومان
          </p>
        )}
      </div>
    </div>
  );
};

export default CartListItem;