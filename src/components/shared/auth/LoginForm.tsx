"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAppConfigStore from "@/lib/store/useAppConfigStore"; // استور تنظیمات اپ
import { mobileRegex } from "@/lib/utils/regex"; // ریجکس برای اعتبارسنجی موبایل
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthFlowFormItemProps } from "./AuthFlowForms";
import { usePostSendOtp } from "@/services/auth/usePostSendOtp"; // هوک ارسال درخواست OTP

type LoginForm = AuthFlowFormItemProps;

const LoginForm = ({ next, stepId, data }: LoginForm) => {
  const { config } = useAppConfigStore(); // گرفتن تنظیمات اپ مثل لوگو و عنوان
  const { mutateAsync, isPending } = usePostSendOtp(); // اجرای ارسال OTP

  // تعریف اسکیمای فرم با Zod برای اعتبارسنجی شماره موبایل
  const formSchema = z.object({
    mobile: z.string().regex(mobileRegex, "شماره موبایل نا معتبر است "),
  });

  // تنظیمات فرم با react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobile: data?.mobile ?? "", // اگر کاربر قبلاً شماره وارد کرده بود
    },
  });

  // تابع ارسال فرم
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutateAsync({
      phone: values.mobile,
      exists: 1,
      type: "phone",
      minutes: 10,
    }).then((res) => {
      // رفتن به مرحله بعد و ذخیره شماره و کد OTP (برای dev)
      next({
        data: {
          phone: values.mobile,
        },
        stepId,
      });
    });
  }

  // در صورتی که تنظیمات اپ آماده نباشد، هیچ چیزی نمایش نده
  if (!config) {
    return null;
  }

  // رندر فرم ورود شماره موبایل
  else {
    return (
      <div className="w-full ">
        {/* نمایش لوگوی اپلیکیشن */}
        <div className="flex justify-center items-center">
        <Image
          alt={config.information_site.sitename}
            src={config.information_site.logo}
             width={250}
              height={100}
             className="object-cover"
              />
        </div>

        {/* عنوان خوش‌آمدگویی */}
        <div className="w-full mt-6">
          <span className="text-xl font-medium">سلام!</span>
        </div>

        {/* فرم ورود شماره موبایل */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block mt-4 mb-2 text-sm">
                    لطفا شماره موبایلتان را وارد کنید:
                  </FormLabel>
                  <Input
                    maxLength={11}
                    type="tel"
                    containerClassName="!rounded h-12   border-0"
                    className="w-full h-12 bg-natural-100 text-md"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* دکمه تایید */}
            <div className="mt-6">
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

        {/* متن پذیرش قوانین سایت */}
        <div className="mt-2 pt-3 text-[11px] text-center border-t text-caption-dark">
          <span>
            ثبت‌نام یا ورود شما به معنای پذیرفتن{" "}
            <span>
              <Link
                href={"/"}
                className="text-green-500 font-medium"
              >
                <span>شرایط و قوانین </span>
                <span>{config.information_site.sitename}</span>
              </Link>
            </span>{" "}
            است
          </span>
        </div>
      </div>
    );
  }
};

export default LoginForm;
