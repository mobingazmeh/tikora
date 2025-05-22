"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Import required modules
import { ProductDetailsResponseType } from "@/lib/types/CommonTypes";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProductImageSliderProps {
  product: ProductDetailsResponseType;
  activeIndex?: number;
  setActiveIndex?: (index: number) => void;
}
interface ProductRawImageSliderProps {
  product: ProductDetailsResponseType;
  activeIndex?: number;
  setActiveIndex?: (index: number) => void;
}

function ProductRawImageSlider({
  product,
  activeIndex,
  setActiveIndex,
}: ProductRawImageSliderProps) {
  const rawId = useId(); // شناسه خام تولید شده توسط useId
  const uniqueId = rawId.replaceAll(":", "");
  // وضعیت تصویر فعال
  const images = [{ id: "cover", path: product.cover }, ...product.images];
  const swiperRef = useRef<any>(null); // استفاده از useRef برای گرفتن دسترسی به Swiper

  useEffect(() => {
    swiperRef.current.swiper.slideTo(activeIndex); // اسلاید به ایندکس جدید
  }, [activeIndex]);

  return (
    <div className="relative sm:px-0 px-4">
      <Swiper
        dir="rtl"
        autoHeight
        ref={swiperRef}
        pagination={{
          el: `#${uniqueId}-pagination`, // اتصال به عنصر سفارشی
          bulletActiveClass: "main-slider-active-bullet",
          bulletClass: "main-slider-bullet",
          clickable: true, // قابلیت کلیک روی دکمه‌ها
          renderBullet: (index, className) => {
            return `<span class=" ${className} "></span>`;
          },
        }}
        navigation={{
          prevEl: `#${uniqueId}-prev`, // اتصال دکمه قبلی
          nextEl: `#${uniqueId}-next`, // اتصال دکمه بعدی
        }}
        onSlideChange={(swiper) => setActiveIndex?.(swiper.activeIndex)} // بروزرسانی activeIndex
        modules={[Navigation, Pagination]}
        className="rounded-2xl !overflow-y-auto !h-fit  group"
      >
        {images.map((item) => (
          <SwiperSlide key={item?.id}>
            <Image
              className="rounded-2xl w-[460px] h-[460px]"
              width={460}
              src={item.path}
              height={460}
              alt=""
            />
          </SwiperSlide>
        ))}

        <button
          id={`${uniqueId}-prev`}
          className="absolute opacity-0 group-hover:opacity-100 group-hover:disabled:!opacity-50 transition-opacity left-2 top-1/2 transform -translate-y-1/2 bg-white w-10 h-10 rounded-full z-10 flex items-center justify-center"
        >
          <Icon icon={"solar:alt-arrow-left-outline"} className="size-6" />
        </button>

        <button
          id={`${uniqueId}-next`}
          className="absolute opacity-0 group-hover:opacity-100 group-hover:disabled:!opacity-50 transition-opacity right-2 top-1/2 transform -translate-y-1/2 bg-white w-10 h-10 rounded-full z-10 flex items-center justify-center"
        >
          <Icon icon={"solar:alt-arrow-right-outline"} className="size-6" />
        </button>
      </Swiper>
      <div
        id={`${uniqueId}-pagination`}
        className="w-full mt-4 flex items-center justify-center gap-x-2"
      ></div>
    </div>
  );
}

export default function ProductImageSlider({
  product,
}: ProductImageSliderProps) {
  const images = [{ id: "cover", path: product.cover }, ...product.images.map((img, index) => ({ id: `img-${index}`, path: img.source }))];
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="w-full relative">
      <ProductRawImageSlider product={product} />
      <Dialog>
        <DialogTrigger asChild>
          <span className="block bg-caption cursor-pointer text-white p-2 rounded-full z-50 absolute bottom-10 left-5">
            <Icon icon={"solar:full-screen-outline"} />
          </span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[804px] sm:!px-6 !px-0 flex flex-col items-start sm:rounded-lg rounded-none w-screen sm:h-fit h-dvh">
          <DialogHeader className="h-fit pr-4">
            <DialogTitle className="text-right text-md font-medium">
              تصاویر محصول
            </DialogTitle>
          </DialogHeader>
          <div className="w-full grid grid-cols-5">
            <div className="sm:col-span-3 col-span-full">
              <ProductRawImageSlider
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                product={product}
              />
            </div>
            <div className="sm:col-span-2 col-span-full grid grid-cols-4 sm:mt-0 mt-6 sm:grid-cols-3 gap-x-2   items-start h-fit">
              {images.map((image, index) => (
                <div
                  className="flex flex-col items-center justify-center"
                  key={image.id}
                  onClick={() => setActiveIndex(index)} // کلیک روی تصویر کوچک
                >
                  <Image
                    alt=""
                    src={image.path}
                    width={80}
                    height={80}
                    className="w-20 h-20"
                  />
                  {/* اگر تصویر در اسلایدر فعال باشد، دایره فعال نمایش داده می‌شود */}
                  <span
                    className={`block mx-auto rounded-full w-15 border-2 ${
                      index === activeIndex
                        ? "border-primary-500"
                        : "border-transparent"
                    }`}
                  ></span>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
