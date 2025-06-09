"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useId } from "react";
import { useWindowSize } from "react-use";
import Image from "next/image";

interface ImageSliderProps {
  images: string[];
  slidesPerView?: number;
}

export default function ImageSlider({ images, slidesPerView = 4 }: ImageSliderProps) {
  const { width } = useWindowSize();
  const rawId = useId();
  const uniqueId = rawId.replaceAll(":", "");
  const prevElId = `${uniqueId}-prev`;
  const nextElId = `${uniqueId}-next`;

  // حالت دسکتاپ
  if (width > 768) {
    return (
      <div className="relative rounded-xl pb-6 bg-white">
        <Swiper
          dir="rtl"
          autoHeight
          slidesPerView={slidesPerView}
          spaceBetween={16}
          navigation={{
            prevEl: `#${prevElId}`,
            nextEl: `#${nextElId}`,
          }}
          breakpoints={{
            1216: {
              slidesPerView: slidesPerView,
            },
            768: {
              slidesPerView: 3,
            },
            360: {
              slidesPerView: 2,
            },
          }}
          modules={[Navigation, Pagination]}
          className="!overflow-y-auto !h-fit !px-4 group"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-lg overflow-hidden w-full h-[400px]">
                <Image
                  src={image}
                  alt={`Slide ${index + 1}`}
                  width={400}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  // حالت موبایل
  return (
    <div className="relative pb-6 my-10 bg-white">
      <div className="relative mx-auto py-4 w-full flex gap-x-3 snap-x overflow-x-auto sm:overflow-x-visible scrollbar-hidden group border-y !px-4">
        {images.map((image, index) => (
          <div key={index} className="flex-none w-[250px]">
            <div className="bg-white rounded-lg overflow-hidden w-full h-[400px]">
              <Image
                src={image}
                alt={`Slide ${index + 1}`}
                width={400}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}