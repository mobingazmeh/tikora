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
  const rawId = useId();
  const uniqueId = rawId.replaceAll(":", "");
  
  // ساخت آرایه تصاویر با چک کردن مقادیر
  const images = product ? [
    { id: "cover", path: product.cover || '', description: 'تصویر شاخص' },
    ...(product.images || []).map((img, index) => ({ 
      id: `img-${index}`, 
      path: img?.source || '',
      description: img?.description || ''
    }))
  ].filter(img => img.path) : [];

  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (swiperRef.current?.swiper && typeof activeIndex === 'number') {
      swiperRef.current.swiper.slideTo(activeIndex);
    }
  }, [activeIndex]);

  // اگر تصویری نباشه، یک پیام نمایش بده
  if (!product || images.length === 0) {
    return (
      <div className="w-full h-[460px] bg-gray-100 rounded-2xl flex items-center justify-center">
        <p className="text-gray-500">تصویری موجود نیست</p>
      </div>
    );
  }

  return (
    <div className="relative sm:px-0 px-4">
      <Swiper
        dir="rtl"
        autoHeight
        ref={swiperRef}
        pagination={{
          el: `#${uniqueId}-pagination`,
          bulletActiveClass: "main-slider-active-bullet",
          bulletClass: "main-slider-bullet ",
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class=" ${className} "></span>`;
          },
        }}
        navigation={{
          prevEl: `#${uniqueId}-prev`,
          nextEl: `#${uniqueId}-next`,
        }}
        onSlideChange={(swiper) => setActiveIndex?.(swiper.activeIndex)}
        modules={[Navigation, Pagination]}
        className="rounded-2xl !overflow-y-auto !h-fit group"
      >
        {images.map((item) => (
          <SwiperSlide key={item?.id}>
            <Image
              className="rounded-2xl w-[460px] h-[460px] object-cover"
              width={460}
              src={item.path}
              height={460}
              alt={item.description || ''}
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
        className="w-full mt-4  flex items-center justify-center gap-x-2"
      ></div>
    </div>
  );
}

export default function ProductImageSlider({
  product,
}: ProductImageSliderProps) {
  // ساخت آرایه تصاویر با چک کردن مقادیر
  const images = product ? [
    { id: "cover", path: product.cover || '', description: 'تصویر شاخص' },
    ...(product.images || []).map((img, index) => ({ 
      id: `img-${index}`, 
      path: img?.source || '',
      description: img?.description || ''
    }))
  ].filter(img => img.path) : [];

  const [activeIndex, setActiveIndex] = useState(0);

  // اگر تصویری نباشه، یک پیام نمایش بده
  if (!product || images.length === 0) {
    return (
      <div className="w-full h-[460px] bg-gray-100 rounded-2xl flex items-center justify-center">
        <p className="text-gray-500">تصویری موجود نیست</p>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <ProductRawImageSlider 
        product={product} 
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
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
            <div className="sm:col-span-2 col-span-full grid grid-cols-4 sm:mt-0 mt-6 sm:grid-cols-3 gap-x-2 items-start h-fit">
              {images.map((image, index) => (
                <div
                  className="flex flex-col items-center justify-center"
                  key={image.id}
                  onClick={() => setActiveIndex(index)}
                >
                  <Image
                    alt={image.description || ''}
                    src={image.path}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <span
                    className={`block mx-auto rounded-full w-15 border-2 ${
                      index === activeIndex
                        ?  "border-green"
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