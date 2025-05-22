import { useSearchParams, useRouter } from "next/navigation";

// این تابع رشته‌ی query (پارامترهای URL) را به یک آبجکت جاوااسکریپت تبدیل می‌کند.
// همچنین از آرایه‌هایی با فرمت category[0]=12 پشتیبانی می‌کند و آن‌ها را به آرایه تبدیل می‌کند.
const searchParamsToObject = (
  searchParams: URLSearchParams
): { [key: string]: string } => {
  const params: { [key: string]: any } = {};

  searchParams.forEach((value, key) => {
    // بررسی اینکه آیا کلید به صورت آرایه‌ای است (مثلاً categories[0])
    const arrayMatch = key.match(/^(.+)\[(\d+)\]$/);
    if (arrayMatch) {
      const arrayKey = arrayMatch[1]; // کلید اصلی (مثلاً categories)
      const index = Number(arrayMatch[2]); // شماره اندیس آرایه (مثلاً 0)

      // اگر هنوز آرایه‌ای برای این کلید ساخته نشده، یک آرایه ایجاد کن
      if (!Array.isArray(params[arrayKey])) {
        params[arrayKey] = [];
      }

      // مقدار را در اندیس مشخص‌شده از آرایه قرار بده
      params[arrayKey][index] = value;
    } else {
      // اگر کلید ساده است و قبلاً مقدار داشته، آن را به آرایه تبدیل کن
      if (params[key]) {
        if (Array.isArray(params[key])) {
          params[key].push(value);
        } else {
          params[key] = [params[key], value];
        }
      } else {
        // اگر کلید جدید است، مقدار را مستقیم اضافه کن
        params[key] = value;
      }
    }
  });

  // حذف مقادیر undefined از آرایه‌ها برای پاکسازی نهایی
  for (const key in params) {
    if (Array.isArray(params[key])) {
      params[key] = params[key].filter((item) => item !== undefined);
    }
  }

  // بازگرداندن آبجکت پارامترها
  return params;
};

// این هوک، ابزار مدیریت query string برای پروژه‌های Next.js است
// شامل تابع‌هایی برای خواندن، تنظیم، حذف و ریست کردن پارامترهای URL
const useQueryManager = () => {
  const searchParams = useSearchParams(); // گرفتن پارامترهای فعلی URL از مسیر فعلی
  const router = useRouter(); // استفاده از Router برای اعمال تغییرات روی URL

  // تبدیل query string فعلی به یک آبجکت قابل استفاده
  const tempStates = searchParamsToObject(searchParams);

  // تابع برای اضافه یا به‌روزرسانی پارامترهای URL
  const handleSetState = (params: Record<string, any>) => {
    // ادغام پارامترهای فعلی با پارامترهای جدید
    const mergedParams = { ...tempStates, ...params };

    // حذف کلیدهایی که مقدار آن‌ها null، undefined، رشته خالی یا آرایه خالی باشد
    const filteredParams = Object.entries(mergedParams).reduce(
      (acc, [key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          if (Array.isArray(value)) {
            // قبل از افزودن آرایه جدید، کلیدهای مرتبط قبلی را حذف کن
            Object.keys(tempStates).forEach((stateKey) => {
              if (stateKey.startsWith(`${key}[`)) {
                delete acc[stateKey]; // حذف کلیدهای آرایه‌ای قبلی
              }
            });

            // اضافه کردن مقادیر جدید آرایه با فرمت key[0]=value
            value.forEach((item, index) => {
              if (item !== null && item !== undefined && item !== "") {
                acc[`${key}[${index}]`] = item;
              }
            });
          } else {
            // اگر مقدار آرایه نبود، مستقیم در آبجکت نهایی قرار بده
            acc[key] = value;
          }
        }
        return acc;
      },
      {} as Record<string, string> // مقدار اولیه آبجکت خروجی
    );

    // ایجاد یک URLSearchParams جدید بر اساس فیلترها
    const newParams = new URLSearchParams(filteredParams);
    const queryString = newParams.toString(); // تولید رشته نهایی query

    // به‌روزرسانی آدرس صفحه با پارامترهای جدید بدون رفرش
    router.push(`?${queryString}`);
  };

  // تابعی برای حذف یک یا چند کلید خاص از query string
  const handleDeleteParams = (keys: string[]) => {
    // حذف کلیدهای مشخص‌شده از آبجکت tempStates
    keys.forEach((key) => {
      delete tempStates[key];
    });

    // تولید query string جدید بعد از حذف کلیدها
    const newParams = new URLSearchParams(tempStates);

    // به‌روزرسانی آدرس صفحه با پارامترهای حذف‌شده
    router.push(`?${newParams.toString()}`);
  };

  // تابعی برای پاک‌سازی کامل پارامترهای URL و بازگشت به مسیر اولیه
  const handleResetParams = () => {
    router.push(window.location.pathname); // فقط مسیر را نمایش می‌دهد بدون هیچ پارامتری
  };

  // برگرداندن توابع مدیریتی و وضعیت فعلی به کامپوننت استفاده‌کننده
  return {
    setState: handleSetState, // افزودن یا بروزرسانی پارامترها
    deleteState: handleDeleteParams, // حذف پارامترها
    resetStates: handleResetParams, // ریست کامل پارامترها
    state: tempStates, // نمایش پارامترهای فعلی به صورت آبجکت
  };
};

export default useQueryManager;
