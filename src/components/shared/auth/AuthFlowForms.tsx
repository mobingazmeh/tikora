"use client";
import React, { useLayoutEffect, useState } from "react";
import LoginForm from "./LoginForm";
import LoginOtpForm from "./LoginOtpForm";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useRouter } from "next/navigation";
import LoginProfileInfo from "./LoginProfileInfo";

// مراحل روند ورود (Authentication)
export enum AuthFlowSteps {
  getMobile = "GET_MOBILE", // وارد کردن شماره موبایل
  getOtp = "GET_OTP",       // وارد کردن کد تایید (OTP)
  getInfo = "GET_INFO",     // وارد کردن اطلاعات پروفایل
}

// مشخصات props برای هر فرم
export interface AuthFlowFormItemProps {
  next: (data: { stepId: AuthFlowSteps; data: any }) => void;
  goTo?: (stepId: AuthFlowSteps) => void;
  stepId: AuthFlowSteps;
  data: any;
}

const AuthFlowForms = () => {
  // مدیریت وضعیت مراحل و داده‌های فرم
  const [step, setStep] = useState<AuthFlowSteps>(AuthFlowSteps.getMobile);
  const [dataStore, setStateStore] = useState({});
  const router = useRouter();
  const { login, update, user } = useAuthStore();

  // تابع برای رفتن به مرحله خاص
  const gotoHandler: AuthFlowFormItemProps["goTo"] = (stepId) => {
    setStep(stepId);
  };

  // بررسی وضعیت کاربر بعد از ورود
  useLayoutEffect(() => {
    if (user) {
      if (step !== AuthFlowSteps.getInfo) {
        setStep(AuthFlowSteps.getInfo); // رفتن به مرحله پروفایل
      } 
    }
  }, [user,step]);

  // تابع برای پیشرفت به مرحله بعدی با ذخیره داده‌ها
  const nextHandler: AuthFlowFormItemProps["next"] = ({ stepId, data }) => {
    switch (stepId) {
      case AuthFlowSteps.getMobile:
        setStateStore((prev) => ({ ...prev, ...data }));
        setStep(AuthFlowSteps.getOtp); // رفتن به مرحله OTP
        break;
      case AuthFlowSteps.getOtp:
        setStateStore((prev) => ({ ...prev, ...data }));
        if (data.token && data.user.id) {
          login({ ...data.user, is_registered: data.is_registered }, data.token); // ورود با داده‌های کاربر
        }
        if (data.is_registered == 1) {
          router.push("/"); // هدایت به صفحه اصلی
        } else {
          setStep(AuthFlowSteps.getInfo); // رفتن به مرحله اطلاعات پروفایل
        }
        break;
      case AuthFlowSteps.getInfo:
        setStateStore((prev) => ({ ...prev, ...data }));
        if (data.id) {
          update({ ...data, is_registered: 1 }); // به‌روزرسانی اطلاعات کاربر
        }
        router.push("/"); // هدایت به صفحه اصلی
        break;
      default:
        break;
    }
  };

  // نمایش فرم مربوط به هر مرحله
  switch (step) {
    case AuthFlowSteps.getMobile:
      return (
        <LoginForm
          data={dataStore}
          goTo={gotoHandler}
          stepId={AuthFlowSteps.getMobile}
          next={nextHandler}
        />
      );
    case AuthFlowSteps.getOtp:
      return (
        <LoginOtpForm
          data={dataStore}
          goTo={gotoHandler}
          stepId={AuthFlowSteps.getOtp}
          next={nextHandler}
        />
      );
    case AuthFlowSteps.getInfo:
      return (
        <LoginProfileInfo
          data={dataStore}
          goTo={gotoHandler}
          stepId={AuthFlowSteps.getInfo}
          next={nextHandler}
        />
      );
    default:
      break;
  }
};
 
export default AuthFlowForms;
