export type GetItemByIdParams = {
  product_id?: string;
  slug: string;
};

type Category_id = {
  id: string;
  created_at: Date;
  title: string;
  show_order: number;
  slug: string;
  icon_image: string;
  spotlight_image: string;
};

type Subcategory_ids = {
  id: string;
  created_at: Date;
  store_id: string;
  title: string;
  _title: string;
  category_id: Category_id;
};

type Prices = {
  id: string;
  internal_code: string;
  title: string;
  qtd_stock: number;
  stock_control_enabled: false;
  price: number;
  promo_price: number;
  promo_end_at: Date;
  bar_codes: string[];
};

type Products = {
  data: GetItemById_FULL_ITEM;
  additional_price: number;
};

export type FullItemBundles = {
  id: string;
  name: string;
  min_choice: number;
  max_choice: number;
  products: Products[];
};

export type GetItemById_FULL_ITEM = {
  id: string;
  created_at: Date;
  item_type: 'product' | 'products_kit';
  subcategory_ids: Subcategory_ids[];
  main_subcategory: Subcategory_ids;
  store_id: string;
  visible: boolean;
  description: string;
  images: string[];
  name: string;
  custom_infos: any[];
  prices: Prices[];
  available_stock: boolean;
  min_price_valid: number;
  variation_items: any[];
  related_items: any[];
  slug: string;
  unit_type: string;
  increment_value: number;
  shipping: {
    deliverable: boolean;
  };
  copy_of: string;
  brand?: string;
  bundles?: FullItemBundles[];
};

export type GetItemByIdSuccess = {
  data: GetItemById_FULL_ITEM[];
  status: 'success' | 'error';
  count: number;
  http_status: number;
};
