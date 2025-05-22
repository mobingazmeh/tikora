import { HomeItemTypeGenerator } from "@/lib/types/HomeServiceTypes";
import Image from "next/image";

// تعریف نوع داده‌ای که این کامپوننت دریافت می‌کند
interface QuickAccessProps {
  data: HomeItemTypeGenerator<"quick_access">; // داده‌هایی که شامل لیستی از آیتم‌ها هستند
}

const QuickAccess = ({ data }: QuickAccessProps) => {
  return (
    <div className="relative mx-auto py-4 w-full flex sm:gap-6 gap-x-3 snap-x overflow-x-auto sm:overflow-x-visible  scrollbar-hidden">
      {/* بخش اصلی که لیست آیتم‌ها را نمایش می‌دهد */}
      {data.data.map((item, index) => (
        <div
          key={index} // استفاده از ایندکس برای کلید منحصر به فرد هر آیتم
          className="snap-center cursor-pointer rounded-main hover:scale-105 transition-all shrink-0 border hover:border-primary-500 flex items-center justify-between flex-col px-1 py-2 sm:w-28 sm:h-[70px] w-24 h-[61px]"
        >
          {/* آیکون هر آیتم */}
          <span className="h-fit block">
            <Image
              src={item.icon} // تصویر آیکون هر آیتم
              width={33} // عرض آیکون
              height={33} // ارتفاع آیکون
              alt={item.title} // متن جایگزین آیکون
              className="filter invert sm:w-auto sm:h-auto !w-6 !h-6"
            />
          </span>
          {/* عنوان هر آیتم */}
          <span className="sm:text-sm text-xs text-caption-dark ">
            {item.title}
          </span>
        </div>
      ))}
    </div>
  );
};

export default QuickAccess;
