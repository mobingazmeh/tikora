"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useShoppingCartStore from "@/lib/store/useCartDetailsStore";
import { useState } from "react";
import { Icon } from "@iconify/react";

const DiscountCodeInput = () => {
  const { setDiscountCode } = useShoppingCartStore();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsLoading(true);
    try {
      await setDiscountCode(code);
      setCode(""); // پاک کردن کد بعد از اعمال موفق
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 ">
      <Input
        type="text"
        placeholder="کد تخفیف را وارد کنید"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="flex-1"
        disabled={isLoading}
      />
      <Button variant='green' type="submit" disabled={isLoading}>
        {isLoading ? (
          <Icon icon="svg-spinners:6-dots-scale" className="text-white" />
        ) : (
          "اعمال کد"
        )}
      </Button>
    </form>
  );
};

export default DiscountCodeInput;