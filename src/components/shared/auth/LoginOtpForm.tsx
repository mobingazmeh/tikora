import { Button } from "@/components/ui/button"; // دکمه سفارشی پروژه
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form"; // اجزای فرم از کتابخانه سفارشی
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"; // کامپوننت مخصوص ورود OTP
import useAppConfigStore from "@/lib/store/useAppConfigStore"; // گرفتن اطلاعات تنظیمات اپلیکیشن از Zustand
import { usePostLoginByOtp } from "@/services/auth/usePostLoginByOtp"; // هوک درخواست ورود با OTP
import { zodResolver } from "@hookform/resolvers/zod"; // استفاده از zod برای ولیدیشن فرم
import { Icon } from "@iconify/react/dist/iconify.js"; // آیکن‌ها از کتابخانه iconify
import Link from "next/link"; // لینک داخلی در Next.js
import { useForm } from "react-hook-form"; // فرم هندلینگ از react-hook-form
import { z } from "zod"; // کتابخانه اعتبارسنجی Zod
import { AuthFlowFormItemProps, AuthFlowSteps } from "./AuthFlowForms"; // تایپ‌ها و مراحل فرم احراز هویت
import { useTimeCountDown } from "@/lib/hooks/useTimeCountDown"; // هوک شمارش معکوس برای ارسال مجدد کد
import { usePostSendOtp } from "@/services/auth/usePostSendOtp"; // هوک ارسال OTP مجدد

// تعریف نوع تایپ برای props کامپوننت
type LoginOtpForm = AuthFlowFormItemProps;

const LoginOtpForm = ({ goTo, next, data, stepId }: LoginOtpForm) => {
  const { config } = useAppConfigStore(); // گرفتن اطلاعات کانفیگ اپلیکیشن از Zustand

  const { mutateAsync, isPending } = usePostLoginByOtp(); // ارسال کد OTP برای ورود
  const { mutateAsync: mutateSendOtp, isPending: isSendOtpPending } = usePostSendOtp(); // ارسال مجدد کد OTP

  // هوک شمارش معکوس ۱۰ ثانیه‌ای برای زمان ارسال مجدد کد
  const timeHook = useTimeCountDown(10, { autoStart: true });

  // اعتبارسنجی فرم با Zod
  const formSchema = z.object({
    otp: z.string().length(5, "کد تایید معتبر نمی باشد "),
  });

  // تنظیمات فرم
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: data?.otp ?? "", // مقدار پیش‌فرض اگر موجود بود
    },
  });

  // تابع ارسال مجدد OTP در صورت اتمام زمان و داشتن شماره موبایل
  const reSendOtp = () => {
    if (timeHook.isEnd && data.mobile) {
      mutateSendOtp({
        phone: data.phone,
        exists: 1,
        type: "phone",
        minutes: 10,
      }).then(() => {
        timeHook.reset(); // ریست تایمر پس از ارسال مجدد
      });
    }
  };

  // تابع ارسال فرم
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutateAsync({
      phone: data?.phone,
      code: values.otp,
    }).then((res) => {
      // اگر موفقیت‌آمیز بود، به مرحله بعدی برو
      next({
        data: {
          ...res.result,
        },
        stepId,
      });
    });
  }

  // اگر کانفیگ وجود نداشت، هیچ چیزی نمایش داده نشود
  if (!config) {
    return null;
  }

  // رندر فرم OTP
  else {
    return (
      <div className="w-full sm:mt-20">
        {/* عنوان */}
        <div className="">
          <span className="text-xl font-medium"> کُد تایید را وارد کنید:</span>
        </div>

        {/* نمایش شماره تلفن */}
        <div className="w-full mt-6">
          <span className="text-sm font-medium">
            این کُد برای شماره <span className="px-1">{data?.mobile}</span>{" "}
            پیامک شده است.
          </span>

          {/* دکمه بازگشت برای تغییر شماره موبایل */}
          <div className="w-full mt-4">
            <Button
              onClick={() => goTo?.(AuthFlowSteps.getMobile)}
              variant={"ghost"}
              className="text-green text-sm !p-0"
              iconPosition="end"
              icon={
                <Icon className="size-4" icon="solar:alt-arrow-left-linear" />
              }
            >
              تغییر شماره موبایل
            </Button>
          </div>
        </div>

        {/* فرم ورود کد OTP */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* فیلد OTP با ورودی پنج رقمی */}
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <InputOTP maxLength={5} {...field}>
                    <InputOTPGroup className="w-full gap-x-2">
                      {[0, 1, 2, 3, 4].map((index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className=" flex-1 h-12  !border-0 !border-b !rounded-none text-md"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* دکمه‌های تایید و ارسال مجدد */}
            <div className="mt-6">
              {/* دکمه ارسال مجدد کد */}
              <Button
                disabled={isSendOtpPending || !timeHook.isEnd}
                onClick={reSendOtp}
                variant={"ghost"}
                isLoading={isSendOtpPending}
                type="button"
                className="disabled:text-gray-700 mb-2 text-green text-sm  w-full h-12"
              >
                {timeHook.isEnd ? (
                  <span className="font-medium"> دریافت کد جدید </span>
                ) : (
                  <span className="font-medium">
                    <span>
                      {timeHook.time.m}:{timeHook.time.s}
                    </span>
                    <span> دیگر تا تلاش بعدی </span>
                  </span>
                )}
              </Button>

              {/* دکمه تایید */}
              <Button
                isLoading={isPending}
                variant={"green"}
                className="!rounded w-full h-12"
              >
                تایید
              </Button>
            </div>
          </form>
        </Form>

        {/* نمایش قوانین */}
        <div className="mt-2 pt-3 text-[11px] text-center border-t text-caption-dark">
          <span>
            ثبت‌نام یا ورود شما به معنای پذیرفتن{" "}
            <span>
              <Link
                href={"statics/rules"}
                className="text-green-500 font-medium"
              >
                <span>شرایط و قوانین </span>

              </Link>
            </span>{" "}
            است
          </span>
        </div>
      </div>
    );
  }
};

export default LoginOtpForm;