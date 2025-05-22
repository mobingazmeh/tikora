// وارد کردن کامپوننت ResponsiveDrawer که یک پنل کشویی سفارشی است
import { ResponsiveDrawer } from "../responsive-drawer/ResponsiveDrawer";

// وارد کردن فرم‌های مربوط به ورود/ثبت‌نام/تایید شماره
import AuthFlowForms from "./AuthFlowForms";

// تعریف کامپوننت AuthModal که یک trigger به عنوان ورودی می‌گیرد (مثل دکمه ورود)
const AuthModal = ({ children }: any) => {
  return (
    // استفاده از پنل کشویی به عنوان مودال
    <ResponsiveDrawer 
      dialogHeader={false} // عدم نمایش هدر بالای مودال
      title={""}           // بدون عنوان برای پنل
      trigger={children}   // trigger همان المانی است که با کلیک روی آن، مودال باز می‌شود
    >
      {/* محتوای داخل مودال */}
      <div className="bg-white px-4">
        {/* نمایش فرم‌های احراز هویت (مثل ورود، ثبت‌نام یا تایید شماره) */}
        <AuthFlowForms />
      </div>
    </ResponsiveDrawer>
  );
};

export default AuthModal; // خروجی گرفتن از کامپوننت برای استفاده در جاهای دیگر
