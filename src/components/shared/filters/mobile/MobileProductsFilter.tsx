"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useQueryManager from "@/lib/utils/useQueryManager";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import MobileFilters from "./MobileFilters";
import MobileSort from "./MobileSort";


// کامپوننت فیلتر موبایل
const MobileProductsFilter = () => {
  // تابع برای ریست کردن فیلترها
  const { resetStates } = useQueryManager();
  const deleteFilters = () => resetStates();

  return (
    <div className="w-full flex gap-x-2 ">
      <div className="flex gap-x-2">
        {/* نمایش مودال فیلتر و مرتب‌سازی */}
        <ProductFilterModal />
        <MobileSort />
      </div>
      <div className="flex gap-x-2">
        {/* دکمه حذف فیلترها */}
        <Button
          onClick={deleteFilters}
          variant={"glass"}
          size={"sm"}
          className="text-xs !p-0 text-green gap-x-1 !pr-2 border-r "
        >
          حذف فیلتر ها
        </Button>
      </div>
    </div>
  );
};

export default MobileProductsFilter;

// کامپوننت مودال فیلتر
export const ProductFilterModal = () => {
  // گرفتن وضعیت فیلترها و تابع ریست
  const { state, resetStates } = useQueryManager();
  const filterLength = Object.keys(state).length;
  const isHaveFilter = filterLength > 0;
  const deleteFilters = () => resetStates();

  // وضعیت باز بودن مودال
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          variant={isHaveFilter ? "green-outline" : "outline"}
          className="rounded-full "
          icon={<Icon icon={"mage:filter-fill"} />}
          size={"sm"}
        >
          {isHaveFilter ? (
            <span className="text-xs">
              <span className="mx-2">{filterLength}</span> <span>فیلتر</span>
            </span>
          ) : (
            <span className="text-xs"> فیلتر ها</span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent
        dir="rtl"
        className="sm:max-w-4xl sm:h-fit h-screen flex flex-col w-full !rounded-lg"
      >
        <DialogHeader className="!flex flex-row items-center  justify-between">
          <DialogTitle className="!text-right font-medium text-md  block">
            فیلتر ها
          </DialogTitle>
          <Button
            onClick={deleteFilters}
            variant={"green-outline"}
            size={"sm"}
            icon={<Icon icon={"solar:trash-bin-2-outline"} />}
            className="w-fit text-xs text-green py-2 h-fit !m-0  "
          >
            حذف فیلتر ها
          </Button>
        </DialogHeader>

        <MobileFilters />

        <DialogFooter className="sm:justify-start mt-auto">
          <DialogClose asChild>
            <Button type="button" variant="green">
              تایید
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
