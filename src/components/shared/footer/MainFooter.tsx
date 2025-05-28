import { AppConfigType } from "@/services/useGetAppConfig";

import Image from "next/image";
import Link from "next/link";
import ScrollToTopButton from "./ScrollToTopButton";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

// تعریف نوع پروپس برای کامپوننت Footer
interface MainFooterProps {
  appConfig: AppConfigType["results"];
}

const MainFooter = ({ appConfig }: MainFooterProps) => {
  return (
    <footer className="w-full sm:block hidden mt-6  bg-[#f0f0f1] ">
      <div className="w-full container px-6 h-full mx-auto">
        {/* بخش اول: هدر فوتر با لوگو و شماره تماس */}
        <div className="w-full flex items-center justify-between py-6">
          <div className="flex-1">
            <Link href={"/"}>
              <h4 className="h-11">
                {/* نمایش لوگو اپلیکیشن */}
                <Image
                  width={146}
                  height={46}
                  className="!max-h-full object-contain "
                  alt={appConfig?.information_site.sitename}
                  src={appConfig?.information_site.logo}
                />
              </h4>
            </Link>

            <div className="w-full flex  text-xs  items-center mt-2">
              {/* نمایش شماره تلفن پشتیبانی */}
              <div className="flex gap-x-2 items-center pl-2">
                <span>شماره پشتیبانی: </span>
                <div>
                  {appConfig?.business_information?.phone_support?.split(",").map(
                    (item:string, index:number) => (
                      <React.Fragment key={index}>
                        <span
                          key={item}
                          className="transition-all hover:text-secondary-500"
                        >
                          <Link href={"tel:" + item}>{item}</Link>
                        </span>
                        {index < appConfig?.business_information?.phone_support.length - 1 && <span> - </span>}
                      </React.Fragment>
                    )
                  )}
                </div>
              </div>
              {/* نمایش آدرس شرکت */}
              <div className="flex-1 pr-2 border-r border-gray-400 ">
                {appConfig?.business_information.address}
              </div>
            </div>
          </div>

          {/* دکمه اسکرول به بالا */}
          <ScrollToTopButton />
        </div>

        {/* بخش دوم: لینک‌ها برای بخش‌های مختلف سایت */}
        <div className="border-t w-full py-6">
          <div className="w-full flex justify-between">
            <div className="flex flex-1">
              <div>
                <h4 className="text-caption-dark font-medium text-md mb-2">
                  {appConfig?.information_site.sitename}
                </h4>
                <ul className="text-base  text-caption space-y-2">
                  <li>
                    <Link href={""}>فروش در {appConfig?.information_site.sitename}</Link>
                  </li>
                  <li>
                    <Link href={""}>
                      {" "}
                      تماس با {appConfig?.information_site.sitename}
                    </Link>
                  </li>
                  <li>
                    <Link href={""}> درباره {appConfig?.information_site.sitename}</Link>
                  </li>
                </ul>
              </div>
              <div className="mr-32">
                <h4 className="text-caption-dark font-medium text-md mb-2">
                  راهنمای مشتریان{" "}
                </h4>
                <ul className="text-base text-caption space-y-2">
                  <li>
                    <Link href={""}> پرسش‌های پرتکرار </Link>
                  </li>
                  <li>
                    <Link href={""}> شرایط استفاده </Link>
                  </li>
                  <li>
                    <Link href={""}> حریم خصوصی</Link>
                  </li>
                  <li>
                    <Link href={""}> معامله امن</Link>
                  </li>
                  <li>
                    <Link href={""}> صفحه فروشنده</Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* بخش سوم: مجوزها و شبکه‌های اجتماعی */}
            <div className="w-fit    ">
              <div className="flex gap-x-4 mb-4">
                {/* نمایش مجوزها */}
                <div
                  className="w-40 h-[130px] border rounded-lg"
                  dangerouslySetInnerHTML={{
                    __html: appConfig?.social,
                  }}
                ></div>
                <div
                  className="w-40 h-[130px]  border rounded-lg"
                  dangerouslySetInnerHTML={{
                    __html: appConfig?.social,
                  }}
                ></div>
                <div
                  className="w-40 h-[130px] border rounded-lg"
                  dangerouslySetInnerHTML={{
                    __html: appConfig?.social,
                  }}
                ></div>
              </div>

              {/* نمایش شبکه‌های اجتماعی */}
              <div className="w-full  ">
                <div className="w-full flex gap-x-4 items-center justify-end">
                  <span className="text-base text-caption-dark">
                    در شبکه‌های اجتماعی کنارتان هستیم!
                  </span>
                  {appConfig?.social.instagram && (
                    <Link href={appConfig?.social.instagram}>
                      <Icon icon="fa:instagram" className="size-8 text-caption" />
                    </Link>
                  )}
                  {appConfig?.social.telegram && (
                    <Link href={appConfig?.social.telegram}>
                      <Icon icon="fa:telegram" className="size-8 text-caption" />
                    </Link>
                  )}
                   {appConfig?.social.linkedIn && (
      <Link href={appConfig.social.linkedIn}>
        <Icon icon="fa:linkedin" className="size-8 text-caption" />
      </Link>
    )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* بخش چهارم: دانلود اپلیکیشن    <div className="py-6 border-t w-full ">
          <div className="w-full   radius-medium flex items-center justify-between py-4  ">
            <p className="text-black font-medium text-md">
              دانلود اپلیکیشن {appConfig.information_site.sitename}
            </p>
            <div className="  flex gap-x-4">
             //لینک دانلود اندروید
              {appConfig.update.android.android_app_links.map((item) => (
                <Link href={item.market_link} key={item.market_title}>
                  <div className="w-[150px] h-11 border rounded-sm overflow-hidden">
                    <Image
                      width={150}
                      height={44}
                      className="w-full h-full object-cover"
                      src={item.market_logo}
                      alt={item.market_title}
                    />
                  </div>
                </Link>
              ))}
             //لینک دانلود ios
             {appConfig.update.ios.ios_app_links.map((item) => (
                <Link href={item?.market_link} key={item?.market_title}>
                  <div className="w-[150px] h-11 border rounded-sm overflow-hidden">
                    <Image
                      width={150}
                      height={44}
                      className="w-full h-full object-cover"
                      src={item?.market_logo}
                      alt={item?.market_title}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

                //;\d vhdj 
        <div className="py-6 border-t w-full text-center text-caption ">
          {appConfig.footer_copy.simple_content}
        </div>*/}
      
      </div>
    </footer>
  );
};

export default MainFooter;
