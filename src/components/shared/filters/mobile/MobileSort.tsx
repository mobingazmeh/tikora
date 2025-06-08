import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import useQueryManager from "@/lib/utils/useQueryManager";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const MobileSort = () => {
  const { state, setState } = useQueryManager();

  // لیست گزینه‌های مرتب‌سازی
  const items = [
    { id: 1, sort_order: "ASC", sort_by: "created_at", title: "جدیدترین" },
    { id: 2, sort_order: "DESC", sort_by: "sale_price", title: "گرانترین" },
    { id: 3, sort_order: "ASC", sort_by: "sale_price", title: "ارزانترین" },
    { id: 4, sort_order: "DESC", sort_by: "off_percent", title: "پر تخفیف ترین" },
  ];

  // پیدا کردن گزینه فعال بر اساس وضعیت
  const ActiveItem = items.find(
    (item) =>
      state.sort_order === item.sort_order && state.sort_by === item.sort_by
  );

  return (
    <Drawer>
      {/* دکمه برای باز کردن کشو */}
      <DrawerTrigger asChild>
        <Button
          variant={ActiveItem ? "green-outline" : "outline"}
          className="rounded-full"
          icon={<Icon icon={"bi:sort-down"} />}
          size={"sm"}
        >
          {/* نمایش عنوان مرتب‌سازی یا متن پیش‌فرض */}
          {ActiveItem ? (
            <span className="text-xs"> {ActiveItem?.title} </span>
          ) : (
            <span className="text-xs"> مرتب سازی</span>
          )}
        </Button>
      </DrawerTrigger>

      {/* محتوای کشو که شامل لیست گزینه‌های مرتب‌سازی است */}
      <DrawerContent>
        <div className="bg-white p-9">
          <h2 className="w-full border-b py-2 ">مرتب سازی بر اساس</h2>

          <div className="w-full">
            {items.map((item) => {
              const isActive =
                state.sort_order === item.sort_order &&
                state.sort_by === item.sort_by;

              return (
                <div
                  className="w-full h-14 text-sm flex justify-between border-b text-caption-dark items-center"
                  key={item.id}
                  onClick={() => {
                    // تغییر وضعیت مرتب‌سازی
                    setState({
                      sort_order: item.sort_order,
                      sort_by: item.sort_by,
                    });
                  }}
                >
                  <span> {item.title}</span>
                  {/* نمایش آیکون چک مارک برای گزینه فعال */}
                  {isActive && (
                    <span>
                      <Icon
                        className="size-6 text-caption"
                        icon={"lucide:check"}
                      />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileSort;
