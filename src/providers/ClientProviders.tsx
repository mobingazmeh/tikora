

"use client";
import { initializeAppConfig } from "@/lib/store/useAppConfigStore";
import { initializeAuthStore, useAuthStore, User } from "@/lib/store/useAuthStore";
import { AppConfigType } from "@/services/useGetAppConfig";
import Cookies from "js-cookie";
import { useLayoutEffect } from "react";
// بصورت خودکار هنگام بار گذاری سمت سرور اطلاعات پیکر بندی و کاربر را میگیره و استور هایه مربوطه رو مقدار دهی میکند
interface ClientProvidersProps {
  appConfig: AppConfigType;
  userData?: User | null;
}
//AppConfig Store
const ClientProviders = ({ appConfig, userData }: ClientProvidersProps) => {
  const {logout}=useAuthStore()
  useLayoutEffect(() => {
    initializeAppConfig(appConfig.results);
  }, [appConfig]);
 //مشابه useEffect است ولی زودتر اجرا می‌شود (قبل از ترسیم صفحه)، برای مقاصد حساس به UI.
 // Auth Store یا خروج کارب
 useLayoutEffect(() => {
  const token = Cookies.get("token");

  //console.log("ClientProviders useLayoutEffect");
  //console.log("userData: ", userData);
  //console.log("token from cookie: ", token);

  if (userData === undefined) return;

  if (userData && token) {
   // console.log("✅ initializeAuthStore اجرا میشه");
    initializeAuthStore(userData, token);
  } else {
    //console.warn("⚠️ userData یا token نداریم → اجرای logout");
    logout(false);
  }
}, [userData]);



  return null;
};
export default ClientProviders;


{/* useLayoutEffect(() => {
  const token = Cookies.get("token");
  if (userData && token) initializeAuthStore(userData, token);
  else logout(false);
}, [userData]);*/}