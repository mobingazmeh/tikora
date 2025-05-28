"use client";

import Image from "next/image";
import Link from "next/link";

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
  };
  title: string | null;
}

export default function Banner({ data, title }: BannerProps) {
  return (
    <div className="relative rounded-xl pb-6 border bg-white">
      {title && (
        <div className="w-full flex px-4 justify-between items-center h-20">
          <h2 className="flex items-center w-fit gap-2 text-md">{title}</h2>
        </div>
      )}
      <div className="p-4">
        <div className="relative rounded-lg overflow-hidden">
          {data.is_link ? (
            <Link href={data.link_external || "#"}>
              <Image
                src={data.source}
                alt={data.alt}
                width={1216}
                height={300}
                className="w-full h-auto"
                onError={e => e.currentTarget.classList.add('!hidden')}
              />
            </Link>
          ) : (
            <Image
              src={data.source}
              alt={data.alt}
              width={1216}
              height={300}
              className="w-full h-auto"
              onError={e => e.currentTarget.classList.add('!hidden')}
            />
          )}
        </div>
      </div>
    </div>
  );
} 