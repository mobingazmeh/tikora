"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname } from "next/navigation";
import React from "react";

interface BreadCrumbCustomProps {
  items?: { title: string; link?: string }[]; // ورودی اختیاری برای آیتم‌های نوار ناوبری (عنوان و لینک)
}

export function BreadCrumbCustom({ items }: BreadCrumbCustomProps) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  // نقشه‌ای برای تبدیل بخش‌های مسیر به عناوین فارسی
  const titleMap: { [key: string]: string } = {
    home: "صفحه خانه",
    components: "کامپوننت‌ها",
    breadcrumb: "نوار ناوبری",
    products: "محصولات",
    details: "جزئیات محصول ",
  };

  // در صورتی که آیتم‌های سفارشی ارسال شده باشد، نوار ناوبری با استفاده از آن‌ها نمایش داده می‌شود
  if (items && items.length > 0) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink className="!text-xs" href={item.link}>
                  {item.title}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index + 1 < items.length && (
                <BreadcrumbSeparator>
                  <Icon icon="mdi:slash-forward" className="size-2" />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    );
  } else {
    // در صورتی که آیتم‌های سفارشی ارسال نشده باشد، نوار ناوبری براساس مسیر فعلی URL ساخته می‌شود
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">خانه</BreadcrumbLink>
          </BreadcrumbItem>
          {pathSegments.map((segment, index) => {
            const isLast = index === pathSegments.length - 1; // بررسی اینکه آیا این بخش آخرین بخش مسیر است یا خیر
            const path = "/" + pathSegments.slice(0, index + 1).join("/");

            // دریافت عنوان فارسی از نقشه یا استفاده از نام بخش اگر عنوان فارسی موجود نباشد
            const title = titleMap[segment] || segment;

            return (
              <React.Fragment key={index}>
                <BreadcrumbSeparator>
                  <Icon icon="mdi:slash-forward" className="size-2" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{title}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={path}>{title}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }
}
