/**
 * Pricing option enum for content items
 */
export const PricingOption= {
  PAID : "paid",
  FREE : "free",
  VIEW_ONLY : "viewOnly",
}

/**
 * Sort criteria enum
 */
export const SortCriteria= {
  ITEM_NAME : "itemName",
  HIGHER_PRICE : "higherPrice",
  LOWER_PRICE :"lowerPrice",
}

export const PricingEnumMapping:Record<string, number>= {
  paid: 0,
  free: 1,
  viewOnly:2
  
}