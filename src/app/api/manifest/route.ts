import { getAppConfigReq } from "@/services/useGetAppConfig";

import { NextResponse } from "next/server";
 

export async function GET() {
  const appConfig = await getAppConfigReq();
  return NextResponse.json({
    name: appConfig?.results.information_site.sitename,
    short_name: appConfig?.results.information_site.sitename,
    description: "A Progressive Web App built with Next.js",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: appConfig?.results.information_site.logo,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: appConfig?.results.information_site.logo,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  });
}
