"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { useWindowSize } from "react-use";
import ProfileMenu from "./ProfileMenu";

/**
 * کامپوننت اصلی لایه‌بندی پروفایل
 * این کامپوننت ساختار صفحه پروفایل را بر اساس نوع دستگاه (موبایل یا دسکتاپ) تعریف می‌کند
 * @param children - محتوای اصلی صفحه که در داخل لایه‌بندی قرار می‌گیرد
 */
const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  // دریافت مسیر فعلی و تشخیص نوع دستگاه
  const pathname = usePathname();
  const path = pathname.split("/").pop();
  const isMobile = useWindowSize().width < 768;

  // حالت موبایل - نمایش فقط محتوا بدون منو
  if (isMobile && path !== "profile") {
    return children;
  } 
  // حالت موبایل - نمایش فقط منو
  else if (isMobile && path === "profile") {
    return (
      <div className="w-full h-full pt-10 flex">
        <ProfileMenu />
      </div>
    );
  } 
  // حالت دسکتاپ - نمایش منو و محتوا کنار هم
  else {
    return (
      <div className="border w-full rounded-lg px-6 pb-5 max-w-5xl mx-auto mt-10 py-10 ">
        {/* عنوان صفحه */}
        <div className="py-5 ">
          <h1 className="text-lg ">حساب کاربری من </h1>
        </div>
        {/* محتوای اصلی شامل منو و محتوا */}
        <div className="w-full flex">
          <ProfileMenu />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    );
  }
};

export default ProfileLayout;
