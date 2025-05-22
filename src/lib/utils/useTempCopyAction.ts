"use client";
import { useState } from "react";

const useTempCopyAction = (ActionDelay?: number) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (data: string) => {
    navigator.clipboard.writeText(data); // کپی کردن لینک
    setCopied(true); // نمایش پیام "کپی شد"
    setTimeout(() => setCopied(false), ActionDelay ?? 2000); // بازگشت به حالت اولیه
  };

  return {
    isCopied: copied,
    setCopied: setCopied,
    handleCopy,
  };
};

export default useTempCopyAction;
