export interface IProductQuery {
  search: string;
  category: string;
  priceStart: string;
  priceEnd: string;
  inStock: 'true' | 'false';
  pageLimit: string;
  pageSkip: string;
  sortPrice: string;
  sortDate: string;
}

export interface IMatch {
  category?: string;
  name?: RegExp;
  priceStart?: { $gte: number };
  priceEnd?: { $lte: number };
  inStock?: { $gte: 0 } | { $gt: 0 };
}

export interface IPriceRange {
  $and: Array<{ price: Partial<Record<'$gte' | '$lte', number>> }>;
}
