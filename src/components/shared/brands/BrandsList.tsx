"use client";

import ImageSlider from "../sliders/image-slider/ImageSlider";

interface BrandsListProps {
  data: Array<{
    type: string;
    source: string;
    alt: string;
    is_internal_link: number;
    is_link: number;
    link_external: string | null;
    query: string | null;
    type_link: string | null;
  }>;
}

export default function BrandsList({ data }: BrandsListProps) {
  // تبدیل داده‌های API به آرایه مسیرهای تصویر
  const images = data.map(item => item.source);
  console.log("Brands Data:", data);
  return (
    <div className="w-full h-full">
      <ImageSlider images={images} slidesPerView={4} />
    </div>
  );
}