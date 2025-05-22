import { Input } from "@/components/ui/input";
import { DualRangeSlider } from "@/components/ui/range-slider";
import useQueryManager from "@/lib/utils/useQueryManager";
import React, { useState } from "react";
import { useDebounce } from "react-use";

const PriceRangeSelector = () => {
  // دریافت setState و state از hook استفاده‌شده برای مدیریت وضعیت
  const { setState, state } = useQueryManager();

  // نگه‌داری مقادیر حداقل و حداکثر قیمت
  const [values, setValues] = useState([
    Number(state.price_start) || 100000,  // مقدار پیش‌فرض برای حداقل قیمت
    Number(state.price_end) || 100000000, // مقدار پیش‌فرض برای حداکثر قیمت
  ]);

  // تابعی برای تغییر مقادیر ورودی قیمت‌ها
  const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "min") {
      // تغییر حداقل قیمت
      setValues((prev) => [
        Number(e.target.value.replaceAll(",", "")),
        prev[1],
      ]);
    } else if (e.target.name === "max") {
      // تغییر حداکثر قیمت
      setValues((prev) => [
        prev[0],
        Number(e.target.value.replaceAll(",", "")),
      ]);
    }
  };

  // استفاده از debounce برای به‌روزرسانی state پس از یک ثانیه
  useDebounce(
    () => {
      // اگر مقادیر جدید با مقادیر موجود در state متفاوت باشد، آنها را در state ذخیره می‌کنیم
      if (
        Number(state?.price_start) != values[0] &&
        Number(state?.price_end) != values[1]
      ) {
        setState({
          price_start: values[0], // ذخیره حداقل قیمت
          price_end: values[1],   // ذخیره حداکثر قیمت
        });
      }
    },
    1000, // تأخیر 1 ثانیه‌ای
    values // وابستگی به مقادیر قیمت
  );

  return (
    <div className="w-full h-full ">
      {/* ورودی برای حداقل قیمت */}
      <div className="flex  items-center gap-x-2 justify-between">
        <span className="font-bold text-xs">از</span>
        <Input
          type="tel"
          name="min"
          onChange={handleChangeValues} // تغییر مقدار ورودی
          className="font-bold text-2xl px-0 w-full pl-2"
          value={values[0].toLocaleString()} // نمایش به فرمت عددی
          containerClassName="!border-x-0   !border-t-0 !rounded-none"
        />
        <span className="font-bold text-xs">تومان</span>
      </div>

      {/* ورودی برای حداکثر قیمت */}
      <div className="flex  items-center gap-x-2 justify-between">
        <span className="font-bold text-xs">تا</span>
        <Input
          type="tel"
          name="max"
          onChange={handleChangeValues} // تغییر مقدار ورودی
          className="font-bold text-2xl px-0 w-full pl-2"
          value={values[1].toLocaleString()} // نمایش به فرمت عددی
          containerClassName="!border-x-0 !border-t-0 !rounded-none"
        />
        <span className="font-bold text-xs">تومان</span>
      </div>

      {/* اسلایدر دوگانه برای انتخاب محدوده قیمت */}
      <div className="h-20 mt-8 px-4">
        <DualRangeSlider
          labelPosition="bottom"
          value={values} // مقدار انتخابی از اسلایدر
          onValueChange={(value) => {
            setValues(value); // به‌روزرسانی مقادیر
          }}
          min={100000} // حداقل مقدار اسلایدر
          max={1000000000} // حداکثر مقدار اسلایدر
          step={1} // گام اسلایدر
        />

        {/* نمایش قیمت‌ها */}
        <div className="w-full flex justify-between mt-8">
          <span className="font-bold text-caption">گرانترین </span>
          <span className="font-bold text-caption">ارزانترین </span>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSelector;
