export type Banner = {
  id: string;
  image: string;
  title: string;
  is_mobile: boolean;
  is_desktop: boolean;
  link: { subcategory_id: string };
  href: string;
};

export type Prices = {
  id: string;
  internal_code: string;
  title: string;
  qtd_stock: number;
  stock_control_enabled: false;
  price: number;
  promo_price?: number;
  promo_end_at?: string;
  bar_codes: string[];
  promo_free_delivery?: {
    promo_start_at: Date;
    promo_end_at: Date;
  };
};

export type Promo = {
  id: string;
  created_at: Date;
  item_type: 'product' | 'products_kit';
  subcategory_ids: string[];
  main_subcategory: string;
  store_id: string;
  visible: boolean;
  description: string;
  images: string[];
  name: string;
  custom_infos: any[];
  prices: Prices[];
  available_stock: boolean;
  min_price_valid: number;
  variation_items: [];
  related_items: [];
  slug: string;
  unit_type: string;
  increment_value: number;
  shipping: { deliverable: boolean };
  copy_of: string;
};

export type Bundles = {
  id: string;
  name: string;
  min_choice: number;
  max_choice: number;
  products: { data: string; additional_price: number }[];
};

export type Items = {
  id: string;
  created_at: Date;
  item_type: 'product' | 'products_kit';
  subcategory_ids: string[];
  main_subcategory: string;
  store_id: string;
  visible: true;
  description: string;
  images: string[];
  name: string;
  custom_infos: [];
  prices: Prices[];
  available_stock: boolean;
  min_price_valid: number;
  show_in_main_page: boolean;
  variation_items: [];
  related_items: [];
  slug: string;
  bundles: Bundles[];
  brand?: string;
};

export type Collection_items = {
  id: string;
  title: string;
  slug: string;
  items: Items[];
};

export type LayoutRes = {
  data: {
    banners: Banner[];
    promo: Promo[];
    collection_items: Collection_items[];
  };
  status: string;
  count: number;
  http_status: number;
};
