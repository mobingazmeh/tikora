import AuthFlowForms from "@/components/shared/auth/AuthFlowForms";
import Image from "next/image";

import { getCacheAppConfigReq } from "@/services/useGetAppConfig";

export async function generateMetadata() {
  const appConfig = await getCacheAppConfigReq();

  const title = `ورود به ${appConfig.results.information_site.sitename}`;

  return {
    title: title,
    description: "وارد حساب کاربری خود شوید و از امکانات سایت استفاده کنید",
    openGraph: {
      title: title,
      description: "وارد حساب کاربری خود شوید و از امکانات سایت استفاده کنید", 
      images: [appConfig.results.information_site.logo]
    }
  };
}

const page = () => {
  return (
    <div className="w-full max-w-container-lg container   mx-auto sm:px-2 px-4">
      <div className="w-full max-w-3xl mx-auto  ">
        <div className="s   sm:px-0 pr-3  mt-14">
          <div className="w-full flex items-center justify-between  ">
            <div className="max-w-sm w-full ">
              <AuthFlowForms />
            </div>

            {/* Image Section */}
            <div className="">
              <div
                className="w-full h-[300px] sm:h-[200px] !rounded-full bg-gray-100
               rounded-t-md  "
              >
                <Image
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                  src="/assets/images/Login.svg"
                  alt="Background"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
