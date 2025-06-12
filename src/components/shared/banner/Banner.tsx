"use client";

import Image from "next/image";

export interface BannerProps {
  data: {
    type: "image";
    source: string;
    alt: string;
    is_internal_link: number;
    is_link: number;
    link_external: string | null;
    query: any | null;
    type_link: string | null;
  } | {
    type: "image";
    source: string;
    alt: string;
    is_internal_link: number;
    is_link: number;
    link_external: string | null;
    query: any | null;
    type_link: string | null;
  }[];
  title: string | null;
}

export default function Banner({ data }: BannerProps) {
  // Convert single object to array if needed
  const bannerArray = Array.isArray(data) ? data : [data];
  
  // Separate banners based on their alt text
  const singleBanner = bannerArray.find(banner => !banner.alt.includes('/'));
  const pairedBanners = bannerArray.filter(banner => banner.alt.includes('/'));

  return (
    <div className="space-y-4" >
      {/* Single banner */}
      {singleBanner && (
        <div className="relative rounded-xl bg-white w-full h-full  hidden sm:block">
          <div className="">
            <div className="relative rounded-lg ">
              <Image
                src={singleBanner.source}
                alt={singleBanner.alt}
                width={1216}
                height={300}
                className="w-full h-auto rounded-lg "
                onError={e => e.currentTarget.classList.add('!hidden')}
              />
            </div>
          </div>
        </div>
      )}

    {/* Paired banners */}
    {pairedBanners.length > 0 && (
        <div className="relative rounded-xl pb-6 bg-white w-full">
          <div className="p-4">
            <div className="relative rounded-lg flex flex-row gap-4">
              {pairedBanners[0] && (
                <div className="relative  w-1/2">
                  <Image
                    src={pairedBanners[0].source}
                    alt={pairedBanners[0].alt}
                    width={300}
                    height={300}
                    className="w-full h-auto rounded-lg"
                    onError={e => e.currentTarget.classList.add('!hidden')}
                  />
                </div>
              )}
              {pairedBanners[1] && (
                <div className="relative w-1/2">
                  <Image
                    src={pairedBanners[1].source}
                    alt={pairedBanners[1].alt}
                    width={300}
                    height={300}
                    className="w-full h-auto rounded-lg"
                    onError={e => e.currentTarget.classList.add('!hidden')}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}