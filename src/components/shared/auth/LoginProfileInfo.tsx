"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import useAppConfigStore from "@/lib/store/useAppConfigStore";
import { usePostUpdateProfile } from "@/services/auth/usePostUpdateProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthFlowFormItemProps } from "./AuthFlowForms";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { convertNullPropertiesToEmptyString } from "@/lib/utils/helper";
import {
  createZodSchemaFromRequiredProfileFields,
  USER_REQUIRED_PROFILE_FIELDS,
} from "@/constants/UserProfileFields";
import { useEffect } from "react";

// تعریف نوع پراپزها
type LoginProfileInfo = AuthFlowFormItemProps;

const LoginProfileInfo = ({ next, stepId }: LoginProfileInfo) => {
  const { config } = useAppConfigStore(); // گرفتن کانفیگ اپلیکیشن از استور
  const requiredFields = config?.login_register?.fields_required_in_register as string[]; // فیلدهای ضروری از کانفیگ
  const { user } = useAuthStore(); // گرفتن اطلاعات کاربر از استور

  const fieldsStructure =
    createZodSchemaFromRequiredProfileFields(requiredFields); // ساخت ساختار zod از فیلدهای ضروری
  const formSchema = z.object(fieldsStructure.zodSchema); // تعریف اسکیمای کلی فرم

  /*
  چرا از USER_REQUIRED_PROFILE_FIELDS استفاده می‌کنیم به جای requiredFields؟
  چون مقدار requiredFields از استور گرفته می‌شود و بعد از mount شدن مقدار می‌گیرد.
  ولی useForm فقط یکبار مقداردهی اولیه را دریافت می‌کند و بعد از آن قابل تغییر نیست.
  بنابراین از مقدار ثابت استفاده می‌کنیم تا باگ uncontrolled/controlled نداشته باشیم.
 */
  const defaultValues = USER_REQUIRED_PROFILE_FIELDS.reduce(
    (acc, fieldItem) => {
      acc[fieldItem.key] = ""; // مقدار پیش‌فرض فیلدها را خالی قرار می‌دهیم
      return acc;
    },
    {} as Record<string, string>
  );

  const form = useForm({
    resolver: zodResolver(formSchema), // اتصال اعتبارسنجی zod به فرم
    defaultValues: defaultValues as any, // مقداردهی اولیه به فرم
  });

  useEffect(() => {
    if (user) {
      // اگر اطلاعات کاربر موجود بود، فرم را با آن مقداردهی مجدد کن
      form.reset(
        convertNullPropertiesToEmptyString({ reagent_code: "", ...user }) // مقدار null را به رشته خالی تبدیل می‌کنیم
      );
    }
  }, [user]);

  const { mutateAsync, isPending } = usePostUpdateProfile(); // تابع ارسال اطلاعات پروفایل به API

  function onSubmit(values: any) {
    // هنگام ارسال فرم، اطلاعات را به API ارسال کرده و در صورت موفقیت به مرحله بعد برو
    mutateAsync(values).then((res) => {
      next({
        data: {
          ...res.result,
        },
        stepId,
      });
    });
  }

  if (!config) {
    return null; // اگر کانفیگ هنوز آماده نیست، چیزی نمایش نده
  }

  // فرم و رابط کاربری
  else {
    return (
      <div className="w-full mt-40">
        <div className="">
          <span className="text-xl font-medium"> تکمیل پروفایل </span>
        </div>
        <div className="w-full mt-6">
          <p>لطفا اطلاعات مورد نیاز را با دقت وارد کنید </p>
        </div>

        {/* فرم کامل‌شدن پروفایل */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* تولید ورودی‌های فرم بر اساس ساختار فیلدها */}
            {fieldsStructure.inputs.map((fieldItem) => {
              return (
                <FormField
                  key={fieldItem.key}
                  control={form.control}
                  name={fieldItem.key}
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <Label>{fieldItem.label}</Label>
                      <Input {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })}
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

        {/* متن قوانین */}
        <div className="mt-2 pt-3 text-[11px] text-center border-t text-caption-dark">
          <span>
            ثبت‌نام یا ورود شما به معنای پذیرفتن{" "}
            <span>
              <Link
                href={"statics/rules"}
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

export default LoginProfileInfo;