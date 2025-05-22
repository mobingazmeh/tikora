// ایمپورت کتابخانه Zod برای اعتبارسنجی فرم‌ها
import { z } from "zod";

/**
 * تعریف نوع هر فیلد ضروری پروفایل
 * هر فیلد دارای: برچسب، کلید، آیکون، قوانین اعتبارسنجی، و نوع ورودی می‌باشد
 */
type USER_REQUIRED_PROFILE_FIELDS_TYPE = {
  label: string; // برچسب نمایشی فیلد (مثلاً: "نام")
  key: string; // کلید استفاده‌شده در دیتا یا API
  iconName: string; // نام آیکون مرتبط با فیلد
  zodRules: any; // قوانین اعتبارسنجی فیلد (نوع Zod)
  type: // نوع ورودی فیلد برای رندر در فرم
    | "text"
    | "date"
    | "select"
    | "number"
    | "select-country"
    | "select-province"
    | "select-city"
    | "select-region"
    | "multi-select";
};

/**
 * آرایه‌ای از فیلدهای پیش‌فرض مورد نیاز برای تکمیل پروفایل کاربر
 */
export const USER_REQUIRED_PROFILE_FIELDS: USER_REQUIRED_PROFILE_FIELDS_TYPE[] =
  [
    {
      label: "نام", // برچسب نمایشی
      key: "first_name", // کلید دیتا
      iconName: "solar:user-linear", // آیکون مربوطه
      zodRules: z.string().min(3, "وارد کردن نام اجباری است"), // اعتبارسنجی: حداقل ۳ کاراکتر
      type: "text", // نوع ورودی
    },
    {
      label: "نام خانوادگی",
      key: "last_name",
      iconName: "solar:user-linear",
      zodRules: z.string().min(3, "وارد کردن نام خانوادگی اجباری است"),
      type: "text",
    },
    {
      label: "کد معرف",
      key: "reagent_code",
      iconName: "solar:key-linear",
      zodRules: z
        .string()
        // اعتبارسنجی: اختیاری، ولی اگر مقدار دارد باید حداقل ۳ حرف باشد
        .refine(
          (val) => val === undefined || val.trim() === "" || val.length >= 3,
          {
            message: "کد معرف معتبر نمی باشد",
          }
        )
        .optional(),
      type: "text",
    },
    {
      label: "کد ملی",
      key: "national_code",
      iconName: "solar:user-id-linear",
      zodRules: z
        .string()
        .min(10, "کد ملی معتبر نمی باشد")
        .max(10, "کد ملی معتبر نمی باشد"), // باید دقیقاً ۱۰ رقم باشد
      type: "text",
    },
    {
      label: "تاریخ تولد",
      key: "birth_date",
      iconName: "solar:calendar-linear",
      zodRules: z.string().min(1, "تاریخ تولد اجباری است"),
      type: "date",
    },
    {
      label: "کشور",
      key: "country_id",
      iconName: "solar:globe-linear",
      zodRules: z.string().min(1, "انتخاب کشور اجباری است"),
      type: "select-country",
    },
    {
      label: "استان",
      key: "province_id",
      iconName: "solar:map-point-linear",
      zodRules: z.string().min(1, "انتخاب استان اجباری است"),
      type: "select-province",
    },
    {
      label: "شهر",
      key: "city_id",
      iconName: "solar:city-linear",
      zodRules: z.string().min(1, "انتخاب شهر اجباری است"),
      type: "select-city",
    },
    {
      label: "منطقه",
      key: "region_id",
      iconName: "solar:map-linear",
      zodRules: z.string().min(1, "انتخاب منطقه اجباری است"),
      type: "select-region",
    },
    {
      label: "نام شرکت",
      key: "company_name",
      iconName: "solar:buildings-2-linear",
      zodRules: z.string().optional(), // اختیاری
      type: "text",
    },
    {
      label: "تلفن شرکت",
      key: "company_phone",
      iconName: "solar:phone-linear",
      zodRules: z.string().optional(), // اختیاری
      type: "text",
    },
  ];

/**
 * این تابع با دریافت لیست فیلدهای فعال از سمت سرور، 
 * دو خروجی تولید می‌کند:
 * 1. zodSchema: شیئی برای اعتبارسنجی فرم با Zod
 * 2. inputs: ساختار ورودی برای تولید فیلدهای فرم در UI
 *
 * @param configFields - آرایه‌ای از کلید فیلدهای فعال‌شده از سمت سرور
 * @returns شیء حاوی schema و inputs جهت ساخت فرم
 */
export const createZodSchemaFromRequiredProfileFields = (
  configFields?: string[]
) => {
  if (!configFields) return { zodSchema: {}, inputs: [] }; // اگر فیلدی داده نشد، خروجی خالی بده

  const requiredFields = USER_REQUIRED_PROFILE_FIELDS; // گرفتن همه فیلدهای پیش‌فرض
  const schemaObject: Record<string, any> = {}; // شیء برای ساخت zod schema
  const inputsSchema: Omit<USER_REQUIRED_PROFILE_FIELDS_TYPE, "zodRules">[] =
    []; // لیست فیلدها برای UI (بدون zodRules)

  // تکرار روی فیلدهای تعریف‌شده
  for (const { zodRules, ...pureItem } of requiredFields) {
    // اگر کلید این فیلد در configFields وجود دارد
    if (configFields.includes(pureItem.key)) {
      inputsSchema.push(pureItem); // برای ساخت UI اضافه کن
      schemaObject[pureItem.key] = zodRules; // برای Zod اضافه کن
    }
  }

  // خروجی نهایی: شامل Zod schema و لیست ورودی‌ها
  return {
    zodSchema: schemaObject,
    inputs: inputsSchema,
  };
};
