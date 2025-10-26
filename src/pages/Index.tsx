import { useEffect, useRef } from "react";
import { Info } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { ContentSkeletonGrid } from "@/components/ContentSkeleton";
import { useContentFilters } from "@/hooks/useContentFilters";
import { useContentData } from "@/hooks/useContentData";
import { toast } from "react-toastify";
import { PricingOption } from "@/constants";
import Header from "@/components/Header";
import SearchAndSort from "@/components/SearchAndSort";
import ContentFilters from "@/components/ContentFilters";

/**
 * Index Page Component
 * Main page displaying the content filter and product grid with infinite scroll
 */
const Index = () => {

  // Get filter state from URL params
  const {
    pricingFilters,
    keyword,
    sortBy,
    priceRange,
    togglePricingFilter,
    setKeyword,
    setSortCriteria,
    setPriceRange,
    resetFilters,
  } = useContentFilters();

  // Fetch content data with infinite scroll
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useContentData({
    pricingFilters,
    keyword,
    sortBy,
    priceRange,
  });

  // Observer for infinite scroll
  const observerTarget = useRef<HTMLDivElement>(null);

  /**
   * Show error toast if data fetching fails
   */
  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Failed to fetch content data")
    }
  }, [isError, error?.message]);

  /**
   * Infinite scroll intersection observer
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  /**
   * Check if paid filter is active (for price slider)
   */
  const isPaidFilterActive = pricingFilters.includes(PricingOption.PAID);

  /**
   * Get all items from all pages
   */
  const allItems = data?.pages.flatMap((page) => page.items) ?? [];
  const totalItems = data?.pages[0]?.totalItems ?? 0;

  return (
    <div className="min-h-screen bg-(--background)">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6 flex-wrap">
            <h1 className="text-lg mb-4 lg:mb-0 lg:w-1/4">
              Find the Items you're looking for
            </h1>

            {/* Keyword Search and Sort */}
            <SearchAndSort sortBy={sortBy} keyword={keyword} setSortCriteria={setSortCriteria} setKeyword={setKeyword} />
          </div>

          {/* Contents Filter */}
          <ContentFilters
            priceRange={priceRange}
            pricingFilters={pricingFilters}
            togglePricingFilter={togglePricingFilter}
            resetFilters={resetFilters}
            isPaidFilterActive={isPaidFilterActive}
            setPriceRange={setPriceRange}
          />

          {/* Contents List */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Info className="w-4 h-4 text-(--primary)" />
                <h2 className="text-base font-medium text-(--primary)">Contents List</h2>
              </div>

              {/* Results count */}
              <span className="text-sm ">
                {isLoading ? "Loading..." : `${totalItems} items found`}
              </span>
            </div>

            {/* Product Grid with responsive breakpoints */}
            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 min-[768px]:grid-cols-2 min-[1200px]:grid-cols-3 xl:grid-cols-4 gap-6">
              {allItems.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}

              {/* Loading skeleton during infinite scroll */}
              {isFetchingNextPage && <ContentSkeletonGrid count={4} />}
            </div>

            {/* Initial loading skeleton */}
            {isLoading && (
              <div className="grid grid-cols-1 min-[480px]:grid-cols-2 min-[768px]:grid-cols-2 min-[1200px]:grid-cols-3 xl:grid-cols-4 gap-6">
                <ContentSkeletonGrid count={12} />
              </div>
            )}

            {/* No Results Message */}
            {!isLoading && allItems.length === 0 && (
              <div className="text-center py-12">
                <p className="">
                  No products match your filters. Try adjusting your search criteria.
                </p>
              </div>
            )}

            {/* Error Message */}
            {isError && (
              <div className="text-center py-12">
                <p className="text-destructive">
                  Failed to load content. Please try again later.
                </p>
              </div>
            )}

            {/* Infinite scroll observer target */}
            <div ref={observerTarget} className="h-4" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
