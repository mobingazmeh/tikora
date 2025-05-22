import React from "react";
import ProfileLayout from "./components/ProfileLayoutCore";

/**
 * متادیتای صفحه پروفایل
 * این متادیتا برای SEO و نمایش در مرورگر استفاده می‌شود
 */
export const metadata = {
  title: "پروفایل",
  description: "پروفایل کاربری",
};

/**
 * لایه‌بندی اصلی صفحه پروفایل
 * این کامپوننت ساختار اصلی صفحه پروفایل را تعریف می‌کند
 * @param children - محتوای اصلی صفحه که در داخل ProfileLayout قرار می‌گیرد
 */
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ProfileLayout>{children}</ProfileLayout>
    </>
  );
};

export default layout;
