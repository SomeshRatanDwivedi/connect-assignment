


/**
 * Content item interface from API
 */
export interface ContentItem {
  id: string;
  title: string;
  userName: string;
  imagePath: string;
  pricingOption: "paid" | "free" | "viewOny";
  price?: number;
}

/**
 * API response interface
 */
export interface ContentApiResponse {
  data: ContentItem[];
  total: number;
}

export type SortCriteriaType = {
  itemName: string,
  higherPrice: string,
  lowerPrice:string
}

export type PricingOption = string;