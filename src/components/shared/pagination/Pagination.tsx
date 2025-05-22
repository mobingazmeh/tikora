"use client";
import useQueryManager from "@/lib/utils/useQueryManager";
import { Icon } from "@iconify/react/dist/iconify.js";

// تعریف نوع داده‌هایی که به کامپوننت Pagination ارسال می‌شود
interface PaginationProps {
  total: number; // تعداد کل آیتم‌ها
  currentPage: number; // شماره صفحه فعلی
  perPage: number; // تعداد آیتم‌ها در هر صفحه
}

const Pagination = ({ currentPage, perPage, total }: PaginationProps) => {
  // محاسبه تعداد صفحات کل بر اساس تعداد کل آیتم‌ها و تعداد آیتم‌ها در هر صفحه
  const pageCount = Math.ceil(total / perPage);
  
  // استفاده از hook `useQueryManager` برای به‌روزرسانی صفحه فعلی
  const { setState } = useQueryManager();

  // تابعی برای محاسبه صفحات قابل مشاهده (نشان دادن اعداد صفحات با توجه به موقعیت صفحه فعلی)
  const getVisiblePages = () => {
    // اگر تعداد صفحات کمتر یا مساوی ۷ باشد، تمامی صفحات نمایش داده می‌شود
    if (pageCount <= 7) {
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    }

    // اگر صفحه فعلی کمتر یا مساوی ۳ باشد، صفحات ۱ تا ۴ و صفحات آخر نشان داده می‌شوند
    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", pageCount - 1, pageCount];
    }

    // اگر صفحه فعلی نزدیک به آخرین صفحه‌ها باشد، صفحات اول و آخر و چند صفحه میانه نمایش داده می‌شود
    if (currentPage >= pageCount - 2) {
      return [
        1,
        2,
        "...",
        pageCount - 3,
        pageCount - 2,
        pageCount - 1,
        pageCount,
      ];
    }

    // در غیر این صورت، صفحه اول، صفحات اطراف صفحه فعلی و صفحه آخر نمایش داده می‌شود
    return [
      1,
      2,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      pageCount - 1,
      pageCount,
    ];
  };

  // محاسبه صفحات قابل مشاهده
  const visiblePages = getVisiblePages();

  // تابعی برای تغییر صفحه با استفاده از `setState` از `useQueryManager`
  const goToPage = (page: number) => {
    setState({
      page: page, // تغییر صفحه جاری
      per_page: perPage // ← این رو اضافه کن
    });
  };

  return (
    <nav
      aria-label="Page navigation"
      className="w-full flex items-center justify-center mt-8"
    >
      {/* لیست دکمه‌ها برای صفحه‌بندی */}
      <ul className="flex flex-row-reverse items-center space-x-1 h-10 text-base">
        {/* دکمه صفحه قبلی */}
        <li>
          <button
            onClick={() => goToPage(currentPage - 1)} // رفتن به صفحه قبلی
            disabled={currentPage === 1} // غیرفعال کردن دکمه اگر در صفحه اول باشیم
            className={`flex items-center justify-center px-4 h-10 leading-tight border rounded-l-lg hover:enabled:bg-gray-100 hover:enabled:text-gray-700 ${
              currentPage === 1
                ? "text-gray-300 bg-gray-200 border-gray-300 cursor-not-allowed"
                : "text-gray-500 bg-white border-gray-300"
            }`}
          >
            <span className="sr-only">Previous</span>
            <Icon
              icon={"solar:alt-arrow-left-linear"} // آیکون صفحه قبلی
              className="[&>path]:!stroke-[4]"
            />
          </button>
        </li>

        {/* نمایش صفحات قابل مشاهده */}
        {visiblePages.map((page, index) => (
          <li key={index}>
            {typeof page === "number" ? (
              <button
                onClick={() => goToPage(page)} // رفتن به صفحه مشخص شده
                className={`flex items-center justify-center px-4 h-10 leading-tight border ${
                  page === currentPage
                    ? "text-blue-600 bg-blue-50 border-blue-300 hover:bg-blue-100 hover:text-blue-700"
                    : "text-gray-500 bg-white border-gray-300  hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                {page} {/* نمایش شماره صفحه */}
              </button>
            ) : (
              // در صورتی که صفحه "..." باشد، فقط آن را نمایش می‌دهیم
              <span className="px-2 text-gray-500">{page}</span>
            )}
          </li>
        ))}

        {/* دکمه صفحه بعدی */}
        <li>
          <button
            onClick={() => goToPage(currentPage + 1)} // رفتن به صفحه بعدی
            disabled={currentPage === pageCount} // غیرفعال کردن دکمه اگر در صفحه آخر باشیم
            className={`flex items-center justify-center px-4 h-10 leading-tight border rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ${
              currentPage === pageCount
                ? "text-gray-300 bg-gray-200 border-gray-300 cursor-not-allowed"
                : "text-gray-500 bg-white border-gray-300"
            }`}
          >
            <span className="sr-only">Next</span>
            <Icon
              icon={"solar:alt-arrow-right-linear"} // آیکون صفحه بعدی
              className="[&>path]:!stroke-[4]"
            />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
