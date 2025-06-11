"use client";
import useQueryManager from "@/lib/utils/useQueryManager";
import { Icon } from "@iconify/react/dist/iconify.js";

interface PaginationProps {
  total: number;
  currentPage: number;
  perPage: number;
  last_page: number;
}

const Pagination = ({ currentPage, perPage, last_page }: PaginationProps) => {
  // استفاده از hook `useQueryManager` برای به‌روزرسانی صفحه فعلی
  const { setState } = useQueryManager();

  // تابعی برای محاسبه صفحات قابل مشاهده
  const getVisiblePages = () => {
    // اگر تعداد صفحات کمتر یا مساوی ۷ باشد، تمامی صفحات نمایش داده می‌شود
    if (last_page <= 7) {
      return Array.from({ length: last_page }, (_, i) => i + 1);
    }

    // اگر صفحه فعلی کمتر یا مساوی ۳ باشد، صفحات ۱ تا ۴ و صفحات آخر نشان داده می‌شوند
    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", last_page - 1, last_page];
    }

    // اگر صفحه فعلی نزدیک به آخرین صفحه‌ها باشد، صفحات اول و آخر و چند صفحه میانه نمایش داده می‌شود
    if (currentPage >= last_page - 2) {
      return [
        1,
        2,
        "...",
        last_page - 3,
        last_page - 2,
        last_page - 1,
        last_page,
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
      last_page - 1,
      last_page,
    ];
  };

  // محاسبه صفحات قابل مشاهده
  const visiblePages = getVisiblePages();

  // تابعی برای تغییر صفحه با استفاده از `setState` از `useQueryManager`
  const goToPage = (page: number) => {
    setState({
      page: page,
      per_page: perPage
    });
  };

  return (
    <nav
      aria-label="Page navigation"
      className="w-full flex items-center justify-center mt-8"
    >
      <ul className="flex flex-row-reverse items-center space-x-1 h-10 text-base">
        {/* دکمه صفحه قبلی */}
        <li>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center justify-center px-4 h-10 leading-tight border rounded-l-lg hover:enabled:bg-gray-100 hover:enabled:text-gray-700 ${
              currentPage === 1
                ? "text-gray-300 bg-gray-200 border-gray-300 cursor-not-allowed"
                : "text-gray-500 bg-white border-gray-300"
            }`}
          >
            <span className="sr-only">Previous</span>
            <Icon
              icon={"solar:alt-arrow-left-linear"}
              className="[&>path]:!stroke-[4]"
            />
          </button>
        </li>

        {/* نمایش صفحات قابل مشاهده */}
        {visiblePages.map((page, index) => (
          <li key={index}>
            {typeof page === "number" ? (
              <button
                onClick={() => goToPage(page)}
                className={`flex items-center justify-center px-4 h-10 leading-tight border ${
                  page === currentPage
                    ? "text-green bg-green-50 border-green hover:bg-green-100 hover:text-green-700"
                    : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                {page}
              </button>
            ) : (
              <span className="px-2 text-gray-500">{page}</span>
            )}
          </li>
        ))}

        {/* دکمه صفحه بعدی */}
        <li>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === last_page}
            className={`flex items-center justify-center px-4 h-10 leading-tight border rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ${
              currentPage === last_page
                ? "text-gray-300 bg-gray-200 border-gray-300 cursor-not-allowed"
                : "text-gray-500 bg-white border-gray-300"
            }`}
          >
            <span className="sr-only">Next</span>
            <Icon
              icon={"solar:alt-arrow-right-linear"}
              className="[&>path]:!stroke-[4]"
            />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;