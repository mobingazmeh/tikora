import { Icon } from "@iconify/react/dist/iconify.js";

export default function EmptyFavourites() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Icon icon="solar:heart-broken" className="w-16 h-16 text-gray-300 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">لیست علاقه‌مندی‌های شما خالی است</h3>
      <p className="text-sm text-gray-500 mb-6">محصولات مورد علاقه خود را به این لیست اضافه کنید</p>
    </div>
  );
} 