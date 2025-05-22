"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
//تبلیغات ویژه یا بنرهای تبلیغاتی:نمایش محصولات برجسته یا جدید:
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Import required modules
import {
  HomeItemTypeGenerator,
  SliderItemType,
} from "@/lib/types/HomeServiceTypes";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useId } from "react";
import { Navigation, Pagination } from "swiper/modules";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import "swiper/css/pagination";
import { Icon } from "@iconify/react/dist/iconify.js";

interface MainSliderProps {
  data: HomeItemTypeGenerator<"sliders">;
}

export default function MainSlider({ data }: MainSliderProps) {
  const rawId = useId(); // شناسه خام تولید شده توسط useId
  const uniqueId = rawId.replaceAll(":", ""); 
  return (
    <div className="pb-4 pt-8 relative sm:px-0 px-4">
      <Swiper
        dir="rtl"
        autoHeight
        pagination={{
          el: `#${uniqueId}-pagination`, // اتصال به عنصر سفارشی
          bulletActiveClass: "main-slider-active-bullet",
          bulletClass: "main-slider-bullet",
          clickable: true, // قابلیت کلیک روی دکمه‌ها
          renderBullet: (index, className) => {
            return `<span class="  ${className} "></span>`;
          },
        }}
        navigation={{
          prevEl: `#${uniqueId}-prev`, // اتصال دکمه قبلی
          nextEl: `#${uniqueId}-next`, // اتصال دکمه بعدی
        }}
        modules={[Navigation, Pagination]}
        className="rounded-2xl !overflow-y-auto !h-fit  group "
      >
        {data.data.map((item) => (
          <SwiperSlide key={item?.id}>
            <MainSliderItemWrapper item={item}>
              <Image
                className="rounded-2xl sm:h-[277px] "
                width={1216}
                src={item.image}
                height={277}
                alt=""
                onError={e=>e.currentTarget.classList.add('!hidden')}
              />
            </MainSliderItemWrapper>
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

interface MainSliderItemWrapperProps {
  item: SliderItemType;
  children: ReactNode;
}

const MainSliderItemWrapper = ({
  children,
  item,
}: MainSliderItemWrapperProps) => {
  switch (item.type.id) {
    case 129:
      return <Link href={"/products/" + item.product_id}>{children}</Link>;
    case 130:
      return (
        <Link
          href={{
            pathname: "/products/",
            query: {
              category: [item.product_group_id as number],
            },
          }}
        >
          {children}
        </Link>
      );
    case 131:
      return (
        <Dialog>
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent className="sm:max-w-[620px] flex flex-col items-start sm:rounded-lg rounded-none w-screen sm:h-fit h-dvh">
            <DialogHeader className="h-fit">
              <DialogTitle className="text-right text-md font-medium">
                توضیحات
              </DialogTitle>
            </DialogHeader>
            <div
              className="p-2"
              dangerouslySetInnerHTML={{ __html: item.description as string }}
            ></div>
          </DialogContent>
        </Dialog>
      );
    case 132:
      return (
        <a target="_blank" href={item.link}>
          {children}
        </a>
      );
  }
};
