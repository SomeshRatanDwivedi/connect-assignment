import { PricingOption, SortCriteria } from "@/constants";
import type { ContentItem } from "@/types/content";
import { useInfiniteQuery } from "@tanstack/react-query";

const API_URL = "https://closet-recruiting-api.azurewebsites.net/api/data";
const ITEMS_PER_PAGE = 12;

/**
 * Fetch content data from API
 */
const fetchContentData = async (): Promise<ContentItem[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch content data");
  }
  const data = await response.json();
  return data;
};

/**
 * Filter content items based on criteria
 */
const filterContent = (
  items: ContentItem[],
  pricingFilters: string[],
  keyword: string,
  priceRange: { min: number; max: number }
): ContentItem[] => {
  return items.filter((item) => {
    // Apply pricing filter
    if (pricingFilters.length > 0 && !pricingFilters.includes(item.pricingOption)) {
      return false;
    }

    // Apply keyword search (search in both userName and title)
    if (keyword) {
      const searchTerm = keyword.toLowerCase();
      const matchesUserName = item.userName.toLowerCase().includes(searchTerm);
      const matchesTitle = item.title.toLowerCase().includes(searchTerm);
      if (!matchesUserName && !matchesTitle) {
        return false;
      }
    }

    // Apply price range filter (only for paid items)
    if (item.pricingOption === PricingOption.PAID && item.price !== undefined) {
      if (item.price < priceRange.min || item.price > priceRange.max) {
        return false;
      }
    }

    return true;
  });
};

/**
 * Sort content items based on criteria
 */
const sortContent = (items: ContentItem[], sortBy: string): ContentItem[] => {
  const sorted = [...items];

  switch (sortBy) {
    case SortCriteria.ITEM_NAME:
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    case SortCriteria.HIGHER_PRICE:
      return sorted.sort((a, b) => {
        const priceA = a.price ?? -1;
        const priceB = b.price ?? -1;
        return priceB - priceA;
      });

    case SortCriteria.LOWER_PRICE:
      return sorted.sort((a, b) => {
        const priceA = a.price ?? Infinity;
        const priceB = b.price ?? Infinity;
        return priceA - priceB;
      });

    default:
      return sorted;
  }
};

interface UseContentDataParams {
  pricingFilters: string[];
  keyword: string;
  sortBy: string;
  priceRange: { min: number; max: number };
}

/**
 * Custom hook to fetch and filter content data with infinite scroll
 */
export const useContentData = ({
  pricingFilters,
  keyword,
  sortBy,
  priceRange,
}: UseContentDataParams) => {
  return useInfiniteQuery({
    queryKey: ["content", pricingFilters, keyword, sortBy, priceRange],
    queryFn: async ({ pageParam = 0 }) => {
      // Fetch all data from API
      const allData = await fetchContentData();

      // Apply filters and sorting
      const filtered = filterContent(allData, pricingFilters, keyword, priceRange);
      const sorted = sortContent(filtered, sortBy);

      // Paginate results
      const start = pageParam * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      const paginatedData = sorted.slice(start, end);

      return {
        items: paginatedData,
        nextPage: end < sorted.length ? pageParam + 1 : undefined,
        totalItems: sorted.length,
      };
    },
    // Allow nextPage to be optional in the last page so types match the possible `undefined` value
    getNextPageParam: (lastPage: { nextPage?: number }) => lastPage.nextPage,
    initialPageParam: 0,
  });
};
