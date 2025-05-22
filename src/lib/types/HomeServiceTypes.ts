import { BasicFilterType } from "@/lib/types/CommonTypes";
import { CategoryItemType } from "../../services/categories/useGetCategoriesListQuery";
import { ProductListItemType } from "../../services/products/useGetProductsQuery";

export type HomeItemType =
  | "sliders"
  | "product_groups"
  | "quick_access"
  | "amazing_products"
  | "brands"
  | "blog"
  | "products"
  | "special_markets";

export interface SliderItemType {
  id: number;
  type: {
    id: 129 | 130 | 131 | 132 | 156 | 157 | 159;
    title: string;
  };
  product_id?: number;
  product_group_id?: number;
  tag_id: null;
  description?: string;
  link?: string;
  image: string;
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
    ? ProductListItemType
    : T extends "products"
    ? ProductListItemType
    : T extends "special_markets";

export type BaseHomeItemDataType = {
  id: number;
  title: string;
  /**
   * Determines where to show the content.
   * - `1`: Mobile and Desktop
   * - `2`: Desktop
   * - `3`: Mobile
   */
  show_in: 1 | 2 | 3;
  query: {
    url: string;
    method: "POST";
    body: {
      basic_filter?: BasicFilterType;
      [key: string]: any;
    };
  };
};

export interface HomeItemTypeGenerator<T extends HomeItemType>
  extends BaseHomeItemDataType {
  item_category: T;
  data: HomeItemDataTypeGenerator<T>[];
}

export type HomeDataResponseItemType = {
  [K in HomeItemType]: BaseHomeItemDataType & {
    item_category: K;
    data: HomeItemDataTypeGenerator<K>[];
  };
}[HomeItemType];

export type HomeDataResponseType = HomeDataResponseItemType[];
