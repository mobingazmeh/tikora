'use client'
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";

// تابعی برای پیمایش به بالای صفحه
const ScrollToTopButton = () => {
  const ScrollToTop = () => {
    window.scrollTo(0, 0);
    return null;
  };
  return (
    <>
    {/* دکمه بازگشت به بالا */}
      <Button
        onClick={ScrollToTop}
        variant={"secondary-outline"}
        iconPosition="end"
        className="rounded-lg hover:scale-105 px-3"
        size={"lg"}
        icon={
          <Icon
            icon={"solar:alt-arrow-up-line-duotone"}
            className="size-6   "
          />
        }
      >
        بازگشت به بالا
      </Button>
    </>
  );
};

export default ScrollToTopButton;
