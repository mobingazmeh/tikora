import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface ProductSliderButtonsProps {
  nextElmId: string;
  prevElmId: string;
}
export const ProductSliderButtons = ({
  nextElmId,
  prevElmId,
}: ProductSliderButtonsProps) => {
  return (
    <>
      <button
        id={nextElmId}
        className="absolute  disabled:!opacity-0 transition-opacity left-0 border-y border-r drop-shadow top-1/2 transform -translate-y-1/2 bg-white w-12 h-20 rounded-r-md z-10 flex items-center justify-center"
      >
        <Icon icon={"solar:alt-arrow-left-outline"} className="size-6" />
      </button>

      <button
        id={prevElmId}
        className="absolute disabled:!opacity-0 transition-opacity right-0 top-1/2 transform -translate-y-1/2 bg-white  w-12 h-20 rounded-l-md border-y border-l  drop-shadow z-10 flex items-center justify-center"
      >
        <Icon icon={"solar:alt-arrow-right-outline"} className="size-7" />
      </button>
    </>
  );
};
