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

export const FILTER_OPTIONS = [
  { id: "paid", label: "Paid", value: PricingOption.PAID },
  { id: "free", label: "Free", value: PricingOption.FREE },
  { id: "viewOnly", label: "View Only", value: PricingOption.VIEW_ONLY },
];

// <SelectItem value={ SortCriteria.ITEM_NAME }> Item Name </SelectItem>
//   < SelectItem value = { SortCriteria.HIGHER_PRICE } > Higher Price </SelectItem>
//     < SelectItem value = { SortCriteria.LOWER_PRICE } > Lower Price </SelectItem>

export const SORTING_CRITERIA_OPTIONS = [
  { id: "itemName", label: "Item Name", value: SortCriteria.ITEM_NAME },
  { id: "higherPrice", label: "Higher Price", value: SortCriteria.HIGHER_PRICE },
  { id: "lowerPrice", label: "Lower Price", value: SortCriteria.LOWER_PRICE },
]
export const CONNECT_LOGO_URL ="https://storagefiles.clo-set.com/public/connect/common/connect-desktop-header-bi.svg"
