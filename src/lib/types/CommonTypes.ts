// تایپ محصول تکی
export interface ProductItemType {
    id: number;
    title: string;
    brief: string;
    cover: string;
    inventory: number;
    is_discount: 0 | 1; // چون فقط 0 یا 1 است بهتر است به صورت union مشخص شود
    old_price: number;
    price: number;
    sale_type: 'simple' | string; // اگر فقط 'simple' دارید دقیق‌تر می‌شود، در غیر این صورت string
    seo_title: string | null;
    sku: string;
    type_discount: 'percent' | 'price' | string; // اگر مقادیر مشخص است دقیق‌تر تعیین شود
    value_discount: number;
    is_favourite?: boolean;
    sale_price ?:number // اختیاری بودن در این مدل
}

// تایپ برند
export interface BrandType {
    id: number;
    title: string;
    icon: string | null;
}

// تایپ دسته‌بندی
export interface CategoryType {
    id: number;
    title: string;
    icon: string | null;
}

// تایپ تصویر
export interface ImageType {
    source: string;
    description: string;
}

// تایپ ویدئو
export interface VideoType {
    source: string;
    description: string;
}

// تایپ ویژگی‌ها
export interface AttributeType {
    id: number;
    title: string;
    value: string;
}

// تایپ فیلترهای قابل اعمال
export interface CanFilterType {
    variety: number[];
    attributes: number[];
    brands: BrandType[];
    min_price: number;
    max_price: number;
}

// تایپ پارامترهای درخواستی
export interface GetProductsReqParams {
    page?: number;
    per_page?: number;
    search?: string;
    categories?: number[];
    brands?: number[];
    just_exist?: 0 | 1;
    attributes?: number[];
    price_range?: [number, number] | null;
    variety?: number[];
    only_in_discount?: boolean;
    sort?: 
      | 'asc_price_products'
      | 'desc_price_products'
      | 'discount_products'
      | 'favourite_products'
      | 'best_seller_products'
      | 'random_products'
      | 'new_products';
}

// تایپ پاسخ سرویس لیست محصولات
export interface ProductsListResponseType {
    products: ProductItemType[];
    can_filter: CanFilterType;
    group?: {
        id: number;
        name: string;
    };
}

// تایپ پاسخ جزئیات محصول
export interface AttributeType {
    key: string;
    value: string;
  }
  
  // تایپ گارانتی محصول
  export interface WarrantyType {
    logo?: string;
    title: string;
    duration: string;
    description?: string;
  }
export interface ProductDetailsResponseType {
    id: number;
    title: string;
    brief: string;
    cover: string;
    description: string;
    inventory: number;
    is_discount: 0 | 1;
    old_price: number;
    sale_price: number;
    sale_type: 'simple' | string;
    sale_unit: string;
    sku: string;
    seo_title: string | null;
    type_discount: 'percent' | 'price' | string;
    value_discount: number;
    is_favourite: boolean;
    is_register: 0 | 1;
    have_register: 0 | 1;
    keywords: string[];
    warranty: WarrantyType | null;
    weight: number | null;
    width: number | null;
    height: number | null;
    length: number | null;
    date_end_sale: number | null;
    attributes: AttributeType[];
    brands: BrandType[];
    categories: CategoryType[];
    images: ImageType[];
    videos: VideoType[];
    similars: ProductItemType[];
    related: ProductItemType[];
    
}

// تایپ پاسخ کلی سرویس
export interface SingleServiceResponseType<T> {
    success: boolean;
    status: number;
    result: T;
    data:T
}

export interface PaginationType {
    current_page: number;
    last_page: number;
    per_page: number;
    total_count: number;
  }

  