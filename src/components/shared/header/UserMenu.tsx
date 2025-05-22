import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import React, { useState } from "react";

// تعریف نوع prop برای کامپوننت UserMenu
interface UserMenuProps {
  children: React.ReactNode;
}

const UserMenu = ({ children }: UserMenuProps) => {
  // گرفتن اطلاعات کاربر و تابع خروج از فروشگاه احراز هویت
  const { user, logout } = useAuthStore();

  // وضعیت باز یا بسته بودن منو
  const [isOpen, setIsOpen] = useState(false);

  // لیست آیتم‌های منوی کاربری
  const items = [
    {
      href: "/my-purchases",
      icon: "solar:cart-5-outline",
      label: "خریدهای من",
    },
    {
      href: "/my-ads",
      icon: "fluent:megaphone-loud-24-regular",
      label: "آگهی‌های من",
    },
    {
      href: "/messages",
      icon: "solar:cart-5-outline",
      label: "پیام‌ها",
    },
    {
      href: "/saved-ads",
      icon: "solar:bookmark-linear",
      label: "آگهی‌های ذخیره شده",
    },
  ];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      {/* دکمه‌ای که منو را باز می‌کند */}
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>

      <DropdownMenuContent>
        <div
          className="absolute -left-20 border w-72 bg-white rounded-lg shadow-lg z-50 overflow-hidden"
          dir="rtl"
        >
          {/* نمایش نام کاربر و لینک به پروفایل */}
          <Link href={"/profile"} onClick={() => setIsOpen(false)}>
            <div className="flex items-center justify-between p-4 border-b text-black">
              <div className="flex items-center gap-x-2">
                <span>
                  <Icon icon={"solar:user-outline"} className="size-6" />
                </span>
                <span className="text-sm font-medium">
                  {user?.first_name + " " + user?.last_name}
                </span>
              </div>
              <span className="text-sm font-medium">
                <Icon icon={"solar:alt-arrow-left-linear"} className="size-6" />
              </span>
            </div>
          </Link>

          {/* بخش آیتم‌های منو */}
          <div>
            {/* دکمه فروشنده شدن */}
            <div className="p-4">
              <Link
                href="/become-seller"
                className="flex items-center justify-between p-4 pr-2 bg-gradient-to-br from-primary-500 to-primary-100 text-black transition-colors rounded-lg"
              >
                <div className="flex items-center gap-x-4">
                  <span>
                    <Icon icon={"clarity:store-line"} className="size-6" />
                  </span>
                  <span className="text-sm font-medium">فروشنده شوید</span>
                </div>
                <span className="text-sm font-medium">
                  <Icon
                    icon={"solar:alt-arrow-left-linear"}
                    className="size-6"
                  />
                </span>
              </Link>
            </div>

            {/* لیست لینک‌های دیگر مثل خریدها، پیام‌ها و ... */}
            <div className="px-4">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)} // بستن منو هنگام کلیک
                  className="flex items-center gap-x-3 marker:p-4 transition-colors"
                >
                  <span className="flex items-start h-full">
                    <Icon icon={item.icon} className="size-6" />
                  </span>
                  <span className="text-xs flex-1 py-5 flex border-b font-medium">
                    {item.label}
                  </span>
                </Link>
              ))}

              {/* دکمه خروج از حساب کاربری */}
              <button
                onClick={() => logout(true)}
                className="flex items-center gap-x-3 marker:p-4 transition-colors w-full"
              >
                <span className="flex items-start h-full">
                  <Icon icon={"solar:logout-2-linear"} className="size-6" />
                </span>
                <span className="text-xs flex-1 py-5 flex border-b font-medium">
                  خروج از حساب کاربری
                </span>
              </button>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
