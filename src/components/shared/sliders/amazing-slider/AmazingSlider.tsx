"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
//محصولات ویژه یا آگهی‌های شگفت‌انگیز 
// Import required modules
import ProductItem from "@/components/shared/product-item/ProductItem";
import { Button } from "@/components/ui/button";
import { HomeItemTypeGenerator } from "@/lib/types/HomeServiceTypes";
import { Icon } from "@iconify/react/dist/iconify.js";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { ProductSliderButtons } from "../utils/ProductSliderButtons";
import Link from "next/link";
import { useWindowSize } from "react-use";
import { useId } from "react";

interface MainSliderProps {
  data: HomeItemTypeGenerator<"amazing_products">;
}

export default function AmazingSlider({ data }: MainSliderProps) {
  const { width } = useWindowSize();
  const rawId = useId(); // شناسه خام تولید شده توسط useId
  const uniqueId = rawId.replaceAll(":", ""); 
  const prevElId = `${uniqueId}-prev`;
  const nextElId = `${uniqueId}-next`;

  return (
    <div className="relative rounded-xl pb-2 border bg-gradient-to-tl from-secondary-100 to-secondary-500">
      <div className="w-full flex px-4 justify-between items-center h-20">
        <h2 className="flex items-center w-fit gap-2">
          <span>
            <Icon icon={"streamline-emojis:fire"} className="size-10" />
          </span>
          <span className="font-bold text-lg text-white ">آگهی‌های برتر</span>
        </h2>

        <Link
          href={{
            pathname: "/products",
          }}
        >
          <Button
            animation
            iconPosition="end"
            icon={
              <Icon icon={"fluent:chevron-left-12-filled"} className="size-6" />
            }
            variant={"glass"}
            className="text-white px-3 gap-1"
            aria-label="مشاهده همه محصولات"
          >
            <span className="text-xs">مشاهده همه</span>
          </Button>
        </Link>
      </div>

      {/* رندر اسلایدر برای دسکتاپ */}
      {width > 768 ? (
        <Swiper
          dir="rtl"
          autoHeight
          slidesPerView={6.2}
          spaceBetween={4}
          breakpoints={{
            1216: { slidesPerView: 6.5 },
            360: { slidesPerView: 2.2 },
          }}
          navigation={{
            prevEl: `#${prevElId}`,
            nextEl: `#${nextElId}`,
          }}
          modules={[Navigation, Pagination]}
          className="!overflow-y-auto !h-fit !px-4 group"
        >
          {data.data.map((item) => (
            <SwiperSlide key={item?.id}>
              <div className="bg-white rounded-lg overflow-hidden w-full p-4">
                <ProductItem item={item} />
              </div>
            </SwiperSlide>
          ))}

          <ProductSliderButtons nextElmId={nextElId} prevElmId={prevElId} />
        </Swiper>
      ) : (
        /* رندر اسلایدر برای موبایل */
        <div className="relative mx-auto pr-4 py-4 w-full flex sm:gap-6 gap-x-3 snap-x overflow-x-auto sm:overflow-x-visible scrollbar-hidden group">
          {data.data.map((item,index) => (
            <div key={index+"_Mobile"}>
              <div className="bg-white rounded-lg overflow-hidden w-full p-4">
                <ProductItem item={item} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
