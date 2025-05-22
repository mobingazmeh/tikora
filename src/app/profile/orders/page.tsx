import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import OrderListItem from "./components/OrderListItem";

/**
 * صفحه سفارشات کاربر
 * این صفحه شامل تب‌های مختلف برای نمایش سفارشات در وضعیت‌های مختلف است
 */
const page = () => {
  return (
    <div className="px-4 pb-4">
      {/* عنوان صفحه */}
      <div className="flex items-center justify-between">
        <h1 className="text-md">خریدهای من</h1>
      </div>

      {/* تب‌های مختلف سفارشات */}
      <div className="mt-4">
        <Tabs dir="rtl" defaultValue="products" className="w-full">
          {/* لیست تب‌ها */}
          <TabsList>
            <TabsTrigger value="current"> جاری </TabsTrigger>
            <TabsTrigger value="canceled"> لغو شده </TabsTrigger>
            <TabsTrigger value="completed"> انجام شده </TabsTrigger>
          </TabsList>

          {/* محتوای تب سفارشات جاری */}
          <TabsContent value="current" className="!mt-0">
            <div className="border-t py-4">
              <OrderListItem />
            </div>
          </TabsContent>

          {/* محتوای تب سفارشات لغو شده */}
          <TabsContent value="canceled" className="!mt-0">
            <div className="border-t py-4"></div>
          </TabsContent>

          {/* محتوای تب سفارشات انجام شده */}
          <TabsContent value="completed" className="!mt-0">
            <div className="border-t py-4"></div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default page;
