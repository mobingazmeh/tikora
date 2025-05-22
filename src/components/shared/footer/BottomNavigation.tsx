"use client";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import AuthModal from "../auth/AuthModal";

export interface BottomNavigationItemType {
  path: string;
  title: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
}
const BottomNavigation = () => {
    // استفاده از استور برای دریافت اطلاعات کاربر (آیا وارد شده است یا نه)
  const { user } = useAuthStore();
  const pathname = usePathname();
    // تعریف آیتم‌های نوار ناوبری با اطلاعات مسیر و آیکون‌ها
  const items: BottomNavigationItemType[] = [
    {
      path: "/",
      title: "خانه",
      icon: (
        <Icon icon={"solar:home-2-outline"} className="size-6  text-caption" />
      ),
      activeIcon: (
        <Icon
          icon={"solar:home-2-bold"}
          className="size-6  text-secondary-500"
        />
      ),
    },
    {
      path: "/category",
      title: "دسته بندی ",
      icon: (
        <Icon
          icon={"iconamoon:category-light"}
          className="size-6  text-caption"
        />
      ),
      activeIcon: (
        <Icon
          icon={"iconamoon:category-fill"}
          className="size-6  text-secondary-500"
        />
      ),
    },
    {
      path: "/sell",
      title: "بفروش",
      icon: <Icon icon={"uil:plus"} className="size-6  text-caption" />,
      activeIcon: (
        <Icon icon={"uil:plus"} className="size-6 text-secondary-500" />
      ),
    },
    {
      path: "/chat",
      title: "چت ",
      icon: (
        <Icon
          icon={"solar:chat-line-outline"}
          className="size-6  text-caption"
        />
      ),
      activeIcon: (
        <Icon
          icon={"solar:chat-line-bold"}
          className="size-6  text-secondary-500"
        />
      ),
    },
  ];
  return (
    <div className="sticky sm:hidden block bottom-0 w-full   py-1 border-t border-gray-100 bg-white   z-50">
           {/* نوار ناوبری پایین صفحه */}
      <ul className="w-full   flex items-center justify-between">
        {items.map((item) => {
                    // بررسی اینکه آیا مسیر کنونی با مسیر هر آیتم تطابق دارد
          const isActive = pathname.includes(item.path);
          return (
            <li
              key={item.title}
              className={`w-full h-12 flex items-center justify-center py-2   ${
                isActive ? "text-secondary-500" : " text-caption"
              }`}
            >               
              <Link
                href={item.path}
                className="flex flex-col items-center gap-2 text-sm"
              >
                 {/* نمایش آیکون فعال یا غیرفعال بر اساس وضعیت فعال بودن آیتم */}
                {isActive ? item.activeIcon : item.icon}
                <span className="text-xs">{item.title}</span>
              </Link>
            </li>
          );
        })}
 {/* نمایش گزینه ورود یا پروفایل کاربر */}
        <li className={`w-full h-12 flex items-center justify-center py-2    `}>
             {/* اگر کاربر وارد نشده باشد، مودال ورود نمایش داده می‌شود */}
          {!user ? (
            <AuthModal>
              <div className="flex flex-col items-center gap-2 text-sm">
                <Icon
                  icon={"solar:login-3-linear"}
                  className="size-6  text-caption"
                />
                <span className="text-xs">ورود.عضویت</span>
              </div>
            </AuthModal>
          ) : (
             // اگر کاربر وارد شده باشد، لینک به پروفایل کاربر نمایش داده می‌شود
            <Link
              href={"/profile"}
              className="flex flex-col items-center gap-2 text-sm"
            >
              <Icon
                icon={"solar:user-outline"}
                className="size-6  text-caption"
              />
              <span className="text-xs">پروفایل</span>
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default BottomNavigation;
