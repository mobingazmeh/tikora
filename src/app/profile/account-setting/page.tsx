"use client";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import EditProfileInfo from "./components/EditProfileInfo";

/**
 * صفحه تنظیمات حساب کاربری
 * این صفحه اطلاعات شخصی کاربر را نمایش می‌دهد و امکان ویرایش آن‌ها را فراهم می‌کند
 */
const AccountSettingPage = () => {
  // دریافت اطلاعات کاربر از store
  const { user } = useAuthStore();
  return (
    <div className="w-full min-h-full h-fit px-4 my-4">
      {/* عنوان صفحه */}
      <div className="w-full flex items-center justify-between">
        <h1 className="">اطلاعات من </h1>
      </div>

      {/* بخش اصلی اطلاعات کاربر */}
      <div className="w-full ">
        {/* گرید نمایش اطلاعات کاربر */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {/* نام و نام خانوادگی */}
          <div className="flex flex-col gap-2 px-4 pb-2 border-b ">
            <span className="text-gray-500">نام و نام خانوادگی</span>
            <p>
              {user?.first_name} {user?.last_name}
            </p>
          </div>

          {/* شماره موبایل */}
          <div className="flex flex-col gap-2 px-4 pb-2 border-b ">
            <span className="text-gray-500">شماره موبایل</span>
            <p>{user?.phone}</p>
          </div>

          {/* کد ملی */}
          <div className="flex flex-col gap-2 px-4 pb-2 border-b ">
            <span className="text-gray-500">کد ملی</span>
            <p>{user?.national_code}</p>
          </div>

          {/* ایمیل */}
          <div className="flex flex-col gap-2 px-4 pb-2 border-b ">
            <span className="text-gray-500">ایمیل</span>
            <p>{user?.email || '-'}</p>
          </div>

          {/* نام کاربری */}
          <div className="flex flex-col gap-2 px-4 pb-2 border-b ">
            <span className="text-gray-500">نام کاربری</span>
            <p>{user?.username || '-'}</p>
          </div>

          {/* کد دعوت */}
          <div className="flex flex-col gap-2 px-4 pb-2 border-b ">
            <span className="text-gray-500">کد دعوت</span>
            <p>{user?.invitation_code || '-'}</p>
          </div>

          {/* وضعیت تکمیل پروفایل */}
          <div className="flex flex-col gap-2 px-4 pb-2 border-b ">
            <span className="text-gray-500">وضعیت تکمیل پروفایل</span>
            <p>{user?.is_profile_complete ? 'تکمیل شده' : 'ناقص'}</p>
          </div>

          {/* موجودی کیف پول */}
          <div className="flex flex-col gap-2 px-4 pb-2 border-b ">
            <span className="text-gray-500">موجودی کیف پول</span>
            <p>{user?.balance_wallet || 0} تومان</p>
          </div>

          {/* تاریخ عضویت */}
          <div className="flex flex-col gap-2 px-4 pb-2 border-b ">
            <span className="text-gray-500">تاریخ عضویت</span>
            <p>{user?.created_at ? new Date(user.created_at * 1000).toLocaleDateString('fa-IR') : '-'}</p>
          </div>
        </div>
         
        {/* دکمه ویرایش اطلاعات */}
        <div className="w-full mt-4 pb-20 lg:pb-0  text-left ">
          <EditProfileInfo>
            <Button
              variant={"green"}
              size={"sm"}
              icon={<Icon icon="solar:pen-linear" />}
            >
              ویرایش اطلاعات
            </Button>
          </EditProfileInfo>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingPage;
