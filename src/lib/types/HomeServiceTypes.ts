import { CanFilterType, ProductItemType } from "@/lib/types/CommonTypes";
import { CategoryItemType } from "../../services/categories/useGetCategoriesListQuery";

export type HomeItemType =
  | "sliders"
  | "product_groups"
  | "quick_access"
  | "amazing_products"
  | "brands"
  | "blog"
  | "products"
  | "special_markets"
  | "slider_image"
  | "slider_products"
  | "banner";

export interface SliderItemType {
  type: "image";
  source: string;
  alt: string;
  is_internal_link: number;
  is_link: number;
  link_external: string | null;
  query: any | null;
  type_link: string | null;
}

export interface QuickAccessItemType {
  title: string;
  type: {
    title:
      | "orders"
      | "favorite"
      | "wallet"
      | "support"
      | "announcements"
      | "survey";
  };
  color: string;
  icon: string;
}

export type HomeItemDataTypeGenerator<T extends HomeItemType> =
  T extends "sliders"
    ? SliderItemType
    : T extends "product_groups"
    ? CategoryItemType
    : T extends "quick_access"
    ? QuickAccessItemType
    : T extends "amazing_products"
    ? ProductItemType
    : T extends "products"
    ? ProductItemType
    : T extends "special_markets";

export type BaseHomeItemDataType = {
  id: number;
  title: string;
  component: HomeItemType;
  /**
   * Determines where to show the content.
   * - `1`: Mobile and Desktop
   * - `2`: Desktop
   | "mobile";
   */
  show_in: 1 | 2 | 3;
  query: {
    url: string;
    method: "POST";
    body: {
      basic_filter?: CanFilterType;
      [key: string]: any;
    };
  };
};

export interface BannerItemType {
  component: "banner";
  template_data: "banner";
  col_sm: string;
  col_md: string;
  col_lg: string;
  title: string | null;
  data: {
    type: "image";
    source: string;
    alt: string;
    is_internal_link: number;
    is_link: number;
    link_external: string | null;
    query: any | null;
    type_link: string | null;
  }[];
}

export interface HomeItemTypeGenerator<T extends HomeItemType> {
  id: number;
  title: string;
  show_in: 1 | 2 | 3;
  query: {
    url: string;
    method: "POST";
    body: {
      basic_filter?: CanFilterType;
      [key: string]: any;
    };
  };
  item_category: T;
  data: T extends "sliders" ? SliderItemType[] 
    : T extends "products" ? ProductItemType[]
    : T extends "banner" ? BannerItemType["data"]
    : never;
}

export type HomeDataResponseItemType = {
  [K in HomeItemType]: BaseHomeItemDataType & {
    item_category: K;
    data: HomeItemDataTypeGenerator<K>[];
  };
}[HomeItemType];

export type HomeDataResponseType = HomeDataResponseItemType[];
