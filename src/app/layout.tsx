/* eslint-disable @next/next/no-css-tags */
// ایمپورت کامپوننت‌های هدر و فوتر
import BottomNavigation from "@/components/shared/footer/BottomNavigation";
import MainFooter from "@/components/shared/footer/MainFooter";
import MainHeader from "@/components/shared/header/MainHeader";
import MobileHeader from "@/components/shared/header/MobileHeader";

// ایمپورت پرودرهای مختلف
import ClientProviders from "@/providers/ClientProviders";
import NotificationProvider from "@/providers/NotificationProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

// ایمپورت سرویس‌های مورد نیاز
import { getUserProfileReq } from "@/services/auth/useGetUserProfile";
import { getAppConfigReq, getCacheAppConfigReq } from "@/services/useGetAppConfig";
import { useGetHomeDataReqMutation } from "@/services/home/useGetHomeDataQuery";

import type { Metadata } from "next";
import localFont from "next/font/local";
import { cookies } from "next/headers";
import { Suspense } from "react";
import "./globals.css";
import Loading from "./loading";

/**
 * تابع تولید متادیتا برای SEO
 * این تابع اطلاعات متادیتای سایت را از کانفیگ برنامه دریافت می‌کند
 */
export async function generateMetadata(): Promise<Metadata> {
  const appConfig = await getCacheAppConfigReq();
  console.log('dd',appConfig)
  return {
    manifest: "/api/manifest",
    title: {
      template: appConfig?.results?.information_site.sitename + " | %s",
      default: appConfig?.results.information_site.sitename,
    },
    description: appConfig?.results.information_site.short_description,
    icons: [appConfig?.results.information_site.icon_logo],
    openGraph: {
      images: [appConfig?.results.information_site.logo],
    },
  };
}

// تنظیمات viewport برای ریسپانسیو بودن سایت
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

/**
 * کامپوننت اصلی لایه‌بندی برنامه
 * این کامپوننت ساختار اصلی برنامه را تعریف می‌کند
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // دریافت کانفیگ برنامه و توکن کاربر
  const appConfig = await getAppConfigReq();
  const token = (await cookies()).get("token")?.value;

  let userProfile = null;
    console.log("📦 useGetHomeDataReqMutation Config:", useGetHomeDataReqMutation);

  //console.log("📦 App Config:", appConfig);
  // تلاش برای دریافت پروفایل کاربر
  try {
    userProfile = await getUserProfileReq({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    userProfile = null;
  }
  return (
    <html lang="en">
      <head>
        {/* لینک به فایل CSS که رنگ‌های کانفیگ را اعمال می‌کند */}
        <link rel="stylesheet" href="/api/colors" />
      </head>
      <body
        className={`${IranYekanLocalFont.className}  antialiased flex flex-col justify-between h-screen [&>.container]:flex-1 sm:text-sm`}
      >
        {/* پرودرهای اصلی برنامه */}
        <ReactQueryProvider>
          <ClientProviders
            userData={userProfile?.result?.user}
            appConfig={appConfig}
          />
          <NotificationProvider />
          
          {/* هدر موبایل و دسکتاپ */}
          <MobileHeader />
          <MainHeader appConfig={appConfig?.results} />
          
          {/* محتوای اصلی برنامه */}
          <Suspense fallback={<Loading />}>{children}</Suspense>
          
          {/* فوتر موبایل و دسکتاپ */}
          <MainFooter appConfig={appConfig?.results} />
          <BottomNavigation />
        </ReactQueryProvider>
      </body>
    </html>
  );
}

/**
 * تنظیمات فونت ایران یکان
 * این بخش فونت‌های مختلف ایران یکان را برای استفاده در برنامه تعریف می‌کند
 */
const IranYekanLocalFont = localFont({
  src: [
    // فونت‌های اصلی
    {
      path: "./../../public/assets/fonts/iran-yekan/iranyekanwebthin.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "./../../public/assets/fonts/iran-yekan/iranyekanweblight.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./../../public/assets/fonts/iran-yekan/iranyekanwebregular.woff",
      weight: "normal",
      style: "normal",
    },
    {
      path: "./../../public/assets/fonts/iran-yekan/iranyekanwebmedium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./../../public/assets/fonts/iran-yekan/iranyekanwebextrabold.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "./../../public/assets/fonts/iran-yekan/iranyekanwebblack.woff",
      weight: "900",
      style: "normal",
    },
    {
      path: "./../../public/assets/fonts/iran-yekan/iranyekanwebextrablack.woff",
      weight: "950",
      style: "normal",
    },
    // فونت‌های اعداد
    {
      path: "./../../public/assets/fonts/iran-yekan/num/iranyekanwebthinfanum.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "./../../public/assets/fonts/iran-yekan/num/iranyekanweblightfanum.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./../../public/assets/fonts/iran-yekan/num/iranyekanwebregularfanum.woff",
      weight: "normal",
      style: "normal",
    },
    {
      path: "./../../public/assets/fonts/iran-yekan/num/iranyekanwebmediumfanum.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./../../public/assets/fonts/iran-yekan/num/iranyekanwebextraboldfanum.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "./../../public/assets/fonts/iran-yekan/num/iranyekanwebblackfanum.woff",
      weight: "900",
      style: "normal",
    },
    {
      path: "./../../public/assets/fonts/iran-yekan/num/iranyekanwebextrablackfanum.woff",
      weight: "950",
      style: "normal",
    },
  ],
  variable: "--font-iran-yekan",
  weight: "100 900",
});
