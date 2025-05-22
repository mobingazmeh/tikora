"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

interface CartItemProps {
  id: string;
  title: string;
  cover: string;
  variety_title?: string;
  price: number;
  sale_price: number;
  qty_basket: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
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
}: CartItemProps) => {
  return (
    <div className="flex items-center gap-4 py-4 border-b last:border-0">
      {cover && (
        <div className="relative w-20 h-20">
          <Image
            src={cover}
            alt={title}
            fill
            className="object-cover rounded"
          />
        </div>
      )}
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        {variety_title && (
          <p className="text-sm text-gray-600">{variety_title}</p>
        )}
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateQuantity(id, Math.max(1, qty_basket - 1))}
            >
              -
            </Button>
            <span>{qty_basket}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateQuantity(id, qty_basket + 1)}
            >
              +
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500"
            onClick={() => onRemove(id)}
          >
            <Icon icon="solar:trash-bin-trash-linear" className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <div className="text-left">
        <p className="font-medium">
          {new Intl.NumberFormat("fa-IR").format(sale_price)} تومان
        </p>
        {price !== sale_price && (
          <p className="text-sm text-gray-500 line-through">
            {new Intl.NumberFormat("fa-IR").format(price)} تومان
          </p>
        )}
      </div>
    </div>
  );
};

export default CartListItem; 