"use client"
import React, { useState } from "react";
import { ResponsiveDrawer } from "../responsive-drawer/ResponsiveDrawer";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname } from "next/navigation";

interface ShareDialogProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: (status: boolean) => void;
}

const ShareDialog = ({ children, isOpen, onClose }: ShareDialogProps) => {
  const pathname = usePathname(); // گرفتن مسیر فعلی
  const currentURL =
    typeof window !== "undefined" ? window.location.origin + pathname : ""; // لینک کامل صفحه
  const [copied, setCopied] = useState(false);

  // تابع برای کپی کردن لینک صفحه
  const handleCopy = () => {
    navigator.clipboard.writeText(currentURL); // کپی کردن لینک
    setCopied(true); // نمایش پیام "کپی شد"
    setTimeout(() => setCopied(false), 2000); // بازگشت به حالت اولیه پس از 2 ثانیه
  };

  return (
    <ResponsiveDrawer
      onClose={onClose}
      isOpen={isOpen}
      title={<span className="font-medium text-md">اشتراک گذاری </span>}
      trigger={children}
    >
      <div className="w-full text-sm sm:px-0 px-4 pb-10 text-gray-600">
        <p>
          با یکی از روش های زیر میتوانید لینک این صفحه را به اشتراک بگزارید{" "}
        </p>

        <div className="flex items-center gap-3 mt-6  rounded-md  ">
          {/* دکمه کپی لینک */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-main hover:bg-gray-100 transition"
          >
            {copied ? (
              <Icon
                icon="solar:check-read-line-duotone"
                className="!size-5 text-sm text-green-600"
              />
            ) : (
              <Icon
                icon="solar:link-minimalistic-broken"
                className="size-4 text-sm"
              />
            )}
            <span className="text-sm">{copied ? "کپی شد" : "کپی لینک"}</span>
          </button>

          {/* اشتراک‌گذاری در Twitter */}
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              currentURL
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black  hover:opacity-80 transition"
          >
            <Icon icon="skill-icons:twitter" className="!size-8" />
          </a>

          {/* اشتراک‌گذاری در Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:opacity-80 transition"
          >
            <Icon icon="skill-icons:instagram" className="!size-8"  />
          </a>

          {/* اشتراک‌گذاری در Telegram */}
          <a
            href={`tg://msg_url?url=${encodeURIComponent(currentURL)}`}
            className="text-blue-500 hover:opacity-80 transition"
          >
            <Icon icon="logos:telegram" className="!size-8"  />
          </a>

          {/* اشتراک‌گذاری در WhatsApp */}
          <a
            href={`whatsapp://send?text=${encodeURIComponent(currentURL)}`}
            className="text-green-500 bg-green-500 p-1 rounded-lg hover:opacity-80 transition"
          >
            <Icon icon="logos:whatsapp-icon" className="!size-6"  />
          </a>

          {/* اشتراک‌گذاری از طریق SMS */}
          <a
            href={`sms:;?&body=${encodeURIComponent(currentURL)}`}
            className="text-gray-700 hover:opacity-80 transition"
          >
            <Icon icon="solar:chat-line-linear" className="!size-8"  />
          </a>
        </div>
      </div>
    </ResponsiveDrawer>
  );
};

export default ShareDialog;
