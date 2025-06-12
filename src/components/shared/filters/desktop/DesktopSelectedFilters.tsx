"use client";

import FILTER_CONSTANTS from "@/constants/FiltersConstants";
import useQueryManager from "@/lib/utils/useQueryManager";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const DesktopSelectedFilters = () => {
  const { state, resetStates, deleteState } = useQueryManager();
  const isHaveFilter = Object.keys(state).length > 0;
  const selectedFilters = Object.keys(state) as Array<keyof typeof FILTER_CONSTANTS.filterNames | "sort">;

  return (
    <div className="w-full flex mb-2 gap-x-2">
      <div className="w-fit flex gap-x-2">
        {selectedFilters.map((filter) => {
          // اگر فیلتر مربوط به قیمت باشد
          if (filter.includes("price_start") || filter.includes("price_end")) {
            if (filter.includes("price_start")) {
              return (
                <button
                  key={filter}
                  onClick={() => {
                    deleteState(["price_start", "price_end"]);
                  }}
                  className="text-xs rounded-full flex items-center justify-center px-3 py-2 border border-green bg-green-500/5 text-green"
                >
                  <span className="ml-1">
                    <Icon
                      icon={"solar:close-circle-outline"}
                      className="size-4"
                    />
                  </span>
                  <div className="flex gap-x-1">
                    <span>قیمت از </span>
                    <span>
                      {Number(state["price_start"]).toLocaleString("fa-IR")}
                    </span>
                    <span>تا</span>
                    <span>
                      {Number(state["price_end"]).toLocaleString("fa-IR")}
                    </span>
                  </div>
                </button>
              );
            }
            return null;
          }

          // اگر فیلتر مربوط به مرتب‌سازی باشد
          if (filter === "sort") {
            const sortValue = state[filter] as keyof typeof FILTER_CONSTANTS.filterNames;
            return (
              <button
                key={filter}
                onClick={() => {
                  deleteState([filter]);
                }}
                className="text-xs rounded-full flex items-center justify-center px-3 py-2 border border-green bg-green-500/5 text-green"
              >
                <span className="ml-1">
                  <Icon
                    icon={"solar:close-circle-outline"}
                    className="size-4"
                  />
                </span>
                {FILTER_CONSTANTS.filterNames[sortValue]}
              </button>
            );
          }

          // برای سایر فیلترها
          return (
            <button
              key={filter}
              onClick={() => {
                deleteState([filter]);
              }}
              className="text-xs rounded-full flex items-center justify-center px-3 py-2 border border-green bg-green-500/5 text-green"
            >
              <span className="ml-1">
                <Icon
                  icon={"solar:close-circle-outline"}
                  className="size-4"
                />
              </span>
              {Array.isArray(state[filter]) && (
                <span className="font-semibold px-1">
                  {state[filter].length}
                </span>
              )}
              {FILTER_CONSTANTS.filterNames[filter]}
            </button>
          );
        })}
      </div>

      {isHaveFilter && (
        <>
          <span className="block w-px h-8 border"></span>
          <button
            className="px-2 text-green"
            onClick={() => {
              resetStates();
            }}
          >
            حذف فیلتر ها
          </button>
        </>
      )}
    </div>
  );
};

export default DesktopSelectedFilters;