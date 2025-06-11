"use client";
import { Icon } from "@iconify/react/dist/iconify.js";

/**
 * کامپوننت صفحه لودینگ
 * این کامپوننت یک انیمیشن لودینگ زیبا را نمایش می‌دهد
 * شامل یک اسپینر و سه دایره متحرک است
 */
export default function Loading() {
  return (
    // کانتینر اصلی لودینگ که کل صفحه را می‌پوشاند
    <div className="fixed inset-0 bg-white backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* اسپینر چرخان */}
        <div className="animate-spin">
          <Icon
            icon="solar:spinner-line-duotone"
            className="size-12 text-secondary-500"
          />
        </div>
     
        {/* انیمیشن سه دایره متحرک */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="sm:size-24 size-16">
          {/* دایره اول */}
          <circle
            className="fill-green stroke-green"
            strokeWidth="15"
            r="15"
            cx="40"
            cy="65"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="2"
              values="65;135;65;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="-.4"
            ></animate>
          </circle>
          
          {/* دایره دوم */}
          <circle
            className="fill-green stroke-green"
            strokeWidth="15"
            r="15"
            cx="100"
            cy="65"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="2"
              values="65;135;65;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="-.2"
            ></animate>
          </circle>
          
          {/* دایره سوم */}
          <circle
            className="fill-green stroke-green"
            strokeWidth="15"
            r="15"
            cx="160"
            cy="65"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="2"
              values="65;135;65;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="0"
            ></animate>
          </circle>
        </svg>

        {/* متن لودینگ */}
        <p className="text-black animate-pulse">
          در حال بارگذاری...
        </p>
      </div>
    </div>
  );
}
