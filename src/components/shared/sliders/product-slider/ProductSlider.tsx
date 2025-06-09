"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ProductItem from "@/components/shared/product-item/ProductItem";
import { Button } from "@/components/ui/button";
import { HomeItemTypeGenerator } from "@/lib/types/HomeServiceTypes";
import { Navigation, Pagination } from "swiper/modules";
import { ProductSliderButtons } from "../utils/ProductSliderButtons";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useWindowSize } from "react-use";
import { useId } from "react";
import { ProductItemType } from "@/lib/types/CommonTypes";

interface MainSliderProps {
  data: ProductItemType[];
  slidesPerView?: number;
  title?: string;
  template_data?: string;


}

export default function ProductSlider({ data,title ,slidesPerView = 6.2 }: MainSliderProps) {
  const { width } = useWindowSize(); // بررسی عرض صفحه برای واکنش‌گرایی
  const rawId = useId(); // تولید شناسه یکتا برای دکمه‌های Swiper
  const uniqueId = rawId.replaceAll(":", "");
  const prevElId = `${uniqueId}-prev`;
  const nextElId = `${uniqueId}-next`;

  // حالت دسکتاپ
  if (width > 768) {
    return (
      <div className="relative rounded-xl pb-6 border bg-white">
        <div className="w-full flex px-4 justify-between items-center ">
        </div>

        {/* اسلایدر محصولات */}
        <Swiper
          dir="rtl"
          autoHeight
          slidesPerView={slidesPerView}
          spaceBetween={4}
          navigation={{
            prevEl: `#${prevElId}`,
            nextEl: `#${nextElId}`,
          }}
          breakpoints={{
            1216: {
              slidesPerView: slidesPerView,
            },
            360: {
              slidesPerView: 2.2,
            },
          }}
          modules={[Navigation, Pagination]}
          className=" !overflow-y-auto !h-fit !px-4 group"
        >
          {Array.isArray(data) ? data.map((item) => (
            <SwiperSlide key={item?.id}>
              <div className="bg-white rounded-lg overflow-hidden w-full p-4">
                <ProductItem item={item} />
              </div>
            </SwiperSlide>
          )) : null}

          {/* دکمه‌های کنترل اسلایدر */}
          <ProductSliderButtons nextElmId={nextElId} prevElmId={prevElId} />
        </Swiper>
      </div>
    );
  }

  // حالت موبایل
  return (
    <div className="relative pb-6  bg-white">
      <div className="w-full flex px-4 justify-between items-center ">
       {/* <h2 className="flex items-center w-fit gap-2 pl-2 text-md">
          {title}
        </h2> */}
      
      </div>

      {/* لیست محصولات به صورت اسکرولی در موبایل */}
      <div className="relative mx-auto py-4 w-full flex gap-x-3 snap-x overflow-x-auto sm:overflow-x-visible scrollbar-hidden group border-y !overflow-y-auto !h-fit !px-4 group">
        {Array.isArray(data) ? data.map((item) => (
          <div key={item?.id}>
            <div className="bg-white rounded-lg overflow-hidden w-full p-4">
              <ProductItem item={item} />
            </div>
          </div>
        )):null}
      </div>
    </div>
  );
}
