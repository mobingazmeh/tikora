"use client";

import FavouriteProductsList from "./components/FavouriteProductsList";

export default function FavouritesPage() {
  return (
    <div className="container mx-auto p-4 pb-20 md:pb-0">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-800">لیست علاقه‌مندی‌ها</h1>
          </div>
        </div>
      </div>

      <FavouriteProductsList />
    </div>
  );
}