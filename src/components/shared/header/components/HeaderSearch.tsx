"use client"; 

import React, { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useClickAway } from "react-use";

const HeaderSearch = () => {
  const areaRef = useRef(null); // مرجع برای شناسایی کلیک‌های خارج از ناحیه جستجو
  const [isOpen, setIsOpen] = useState(false); // وضعیت برای نمایش یا مخفی کردن پنل جستجو
  useClickAway(areaRef, () => { // بستن پنل جستجو هنگام کلیک خارج
    setIsOpen(false);
  });

  return (
    <div
      ref={areaRef} // مرجع برای بررسی کلیک خارج از جستجو
      className="w-full sm:relative rounded-main border border-gray-200 z-50 min-w-20 h-11 bg-gray-100 flex items-center"
    >
      <div className="flex-1 px-3 h-full flex items-center">
        <span>
          <Icon
            icon={"solar:magnifer-outline"} // آیکن جستجو
            className="size-6 text-gray-400"
          />
        </span>
        <input
          onClick={() => { setIsOpen(true); }} // باز کردن پنل جستجو هنگام کلیک بر روی ورودی
          type="search"
          className="flex-1 pr-2 placeholder:!text-sm h-full bg-transparent outline-none"
          placeholder="محصول مورد نظر خودرا جستجو کنید"
        />
      </div>
      {isOpen && ( // نمایش پنل جستجو در صورت فعال بودن
        <div className="sm:w-full w-screen sm:h-fit h-svh sm:absolute fixed left-0 top-0 sm:p-0 pt-2 rounded-main drop-shadow-xl bg-white border">
          <div className="flex-1 px-3 h-11 flex items-center">
            {/* آیکن جستجو برای نمایش در دستگاه‌های بزرگ */}
            <span className="sm:inline-block hidden">
              <Icon
                icon={"solar:magnifer-outline"}
                className="size-6 text-gray-400"
              />
            </span>
            {/* دکمه بستن برای دستگاه‌های کوچک */}
            <span
              className="sm:hidden inline-block cursor-pointer"
              onClick={() => { setIsOpen(false); }} // بستن پنل جستجو
            >
              <Icon
                icon={"solar:arrow-right-outline"} // آیکن بستن
                className="size-6 text-caption-dark"
              />
            </span>

            <input
              autoFocus // تمرکز خودکار بر روی ورودی
              type="search"
              className="flex-1 pr-2 placeholder:!text-sm h-full bg-transparent outline-none"
              placeholder="محصول مورد نظر خودرا جستجو کنید"
            />
          </div>

          <div className="px-5 pt-5 pb-2 border-t-2 p-2 mx-4">
            <h3 className="font-medium text-md text-caption">
              جستجوهای پرطرفدار
            </h3>

            <ul className="mt-4 max-h-svh overflow-auto space-y-6">
              <li className="flex items-center gap-x-4">
                <span>
                  <Icon icon={"mdi:fire"} className="text-caption size-6" /> {/* آیکن محبوب */}
                </span>
                <span className="font-medium text-md text-caption-dark">
                  ویپ
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderSearch;
