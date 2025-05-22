"use client";

import FavouriteProductsList from "./components/FavouriteProductsList";

export default function FavouritesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">لیست علاقه‌مندی‌ها</h2>
      </div>

      <FavouriteProductsList />
    </div>
  );
}
