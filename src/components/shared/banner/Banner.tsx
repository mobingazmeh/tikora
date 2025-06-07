"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

interface BannerProps {
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

export default function Banner({ data, title }: BannerProps) {
  // Convert single object to array if needed and memoize the result
  const banners = useMemo(() => {
    const bannerArray = Array.isArray(data) ? data : [data];
    
    // Group banners by their alt text
    const groupedBanners = bannerArray.reduce((acc, banner) => {
      const key = banner.alt.includes('/') ? 'paired' : 'single';
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(banner);
      return acc;
    }, {} as Record<string, typeof bannerArray>);

    return groupedBanners;
  }, [data]);

  return (
    <div className="space-y-4">
      {/* Single banner */}
      {banners.single?.map((banner, index) => (
        <div key={index} className="relative rounded-xl pb-6 bg-white">
          <div className="p-4">
            <div className="relative rounded-lg">
              <Image
                src={banner.source}
                alt={banner.alt}
                width={1216}
                height={300}
                className="w-full h-auto rounded-lg"
                onError={e => e.currentTarget.classList.add('!hidden')}
              />
            </div>
          </div>
        </div>
      ))}

      {/* Paired banners */}
      {banners.paired && banners.paired.length > 0 && (
        <div className="relative rounded-xl pb-6 bg-white">
          <div className="p-4">
            <div className="relative rounded-lg grid grid-cols-2 gap-4">
              {banners.paired.map((banner, index) => (
                <div key={index} className="relative">
                  <Image
                    src={banner.source}
                    alt={banner.alt}
                    width={1216}
                    height={300}
                    className="w-full h-auto rounded-lg"
                    onError={e => e.currentTarget.classList.add('!hidden')}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}