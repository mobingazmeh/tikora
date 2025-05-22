import Image from "next/image";
import React from "react";

const NotFoundProducts = () => {
  return (
    <div className="w-full col-span-full  !border-0 h-full flex flex-col items-center justify-center gap-4">
      <div className="w-72 h-72 bg-caption/20 rounded-full flex items-center justify-center">
        <Image
          src={"/assets/images/NotFound.svg"}
          alt="یافت نشد"
          width={250}
          height={250}
        />
      </div>

      <h3 className="font-medium mt-4">آگهی با این مشخصات پیدا نکردیم</h3>
      <p className="text-xs text-caption">پیشنهاد می‌کنیم فیلترها را تغییر دهید</p>
    </div>
  );
};

export default NotFoundProducts;
