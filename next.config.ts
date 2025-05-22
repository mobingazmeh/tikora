import type { NextConfig } from "next";

/**
 * پیکربندی Next.js
 * این فایل شامل تنظیمات اصلی پروژه Next.js است
 */
const nextConfig: NextConfig = {
  /* فعال کردن حالت سخت‌گیرانه React */
  reactStrictMode: true,
  /* تنظیمات مربوط به تصاویر */
  images: {
    /* الگوهای مجاز برای تصاویر خارجی */
    domains: ['localhost', 'best-cms.ir'],

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'best-cms.ir',
        port: '',
        pathname: '/storage/**', // برای https همه دامنه‌ها مجاز هستند
      },
      {
        protocol: 'http', // اضافه کردن http
        hostname: 'localhost',
        port: '',
        pathname: '/storage/photos/**',// اضافه کردن localhost
      },
    ],
  },
};

export default nextConfig;
