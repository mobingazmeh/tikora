"use client";
import {
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore, User } from "@/lib/store/useAuthStore";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { FormField, FormMessage, FormItem, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePostUpdateProfile, PostUpdateProfileRequestParams } from "@/services/auth/usePostUpdateProfile";
import { Button } from "@/components/ui/button";
import AdvanceSelect from "@/components/ui/advance-select";
//import { useGetCountries } from "@/services/locations/useGetCountries";
//import { useGetProvinces } from "@/services/locations/useGetProvinces";
//import { useGetCities } from "@/services/locations/useGetCities";

/**
 * کامپوننت ویرایش اطلاعات پروفایلs
 * این کامپوننت یک دیالوگ برای ویرایش اطلاعات کاربر نمایش می‌دهد
 */
const EditProfileInfo = ({ children }: { children: React.ReactNode }) => {
  // دریافت اطلاعات کاربر و متد آپدیت از store
  const { user, update } = useAuthStore();
  
  // دریافت لیست کشورها
  // const { data: countriesRequest } = useGetCountries();
  const [open, setOpen] = useState(false);
  // const countries = countriesRequest?.results?.countries;

  // تعریف schema اعتبارسنجی فرم
  const zodSchema = z.object({
    first_name: z.string().min(1, "نام نمیتواند خالی باشد"),
    last_name: z.string().min(1, "نام خانوادگی نمیتواند خالی باشد"),
    phone: z.string().min(1, "شماره موبایل نمیتواند خالی باشد"),
    national_code: z.string().min(1, "کد ملی نمیتواند خالی باشد"),
    email: z.string().email("ایمیل نامعتبر است").optional().or(z.literal('')),
    username: z.string().min(1, "نام کاربری نمیتواند خالی باشد"),
  });

  // تنظیم فرم با استفاده از react-hook-form
  const form = useForm<PostUpdateProfileRequestParams>({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      phone: '',
      national_code: '',
      email: '',
      username: '',
    },
  });

  // مقداردهی اولیه فرم با اطلاعات کاربر
  useEffect(() => {
    if (user) {
      form.reset({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        phone: user.phone || '',
        national_code: user.national_code || '',
        email: user.email || '',
        username: user.username || '',
      });
    }
  }, [user, form]);

  // دریافت لیست استان‌ها بر اساس کشور انتخاب شده
  // const { data: provincesRequest, isLoading: isProvincesLoading } =
  //   useGetProvinces(form.watch("country_id"));
  
  // دریافت لیست شهرها بر اساس استان انتخاب شده
  // const { data: citiesRequest, isLoading: isCitiesLoading } = useGetCities(
  //   form.watch("province_id")
  // );
  // const provinces = provincesRequest?.results?.provinces;
  // const cities = citiesRequest?.results?.cities;

  // متد آپدیت پروفایل
  const { mutateAsync, isPending } = usePostUpdateProfile();
  
  function onSubmit(values: PostUpdateProfileRequestParams) {
    console.log('Submitting values:', values);
    mutateAsync(values)
      .then((res) => {
        console.log('Update successful:', res);
        if (res.result) {
          update({
            ...res.result,
          });
          setOpen(false);
        }
      })
      .catch((error) => {
        console.error('Update failed:', error);
        // نمایش پیام خطا به کاربر
        alert('خطا در بروزرسانی اطلاعات. لطفا دوباره تلاش کنید.');
      });
  }

  return (
    // دیالوگ ویرایش اطلاعات
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div onClick={() => setOpen(true)}>{children}</div>
      </DialogTrigger>
      <DialogContent
        dir="rtl"
        className="sm:max-w-4xl sm:h-fit h-screen   block  w-full !rounded-lg"
      >
        <DialogHeader>
          <DialogTitle className="!text-right font-medium text-md h-8 block">
            اطلاعات کاربری
          </DialogTitle>
        </DialogHeader>
        <div className="w-full ">
          <Form {...form}>
            <form
              className="grid sm:grid-cols-2 gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {/* فیلد نام */}
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <Label>نام</Label>
                    <Input {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* فیلد نام خانوادگی */}
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <Label>نام خانوادگی</Label>
                    <Input {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* فیلد شماره موبایل */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <Label>شماره موبایل</Label>
                    <Input {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* فیلد کد ملی */}
              <FormField
                control={form.control}
                name="national_code"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <Label>کد ملی</Label>
                    <Input {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* فیلد ایمیل */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <Label>ایمیل</Label>
                    <Input {...field} value={field.value || ''} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* فیلد نام کاربری */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <Label>نام کاربری</Label>
                    <Input {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* دکمه ثبت اطلاعات */}
              <Button
                variant="primary"
                type="submit"
                isLoading={isPending}
                disabled={isPending}
                className="col-span-2"
              >
                تایید و ثبت
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileInfo;
