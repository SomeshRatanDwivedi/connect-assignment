import { useEffect, useRef} from "react";
import { Search, Info } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { ContentSkeletonGrid } from "@/components/ContentSkeleton";
import { PriceRangeSlider } from "@/components/PriceRangeSlider";
import { SortDropdown } from "@/components/SortDropdown";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContentFilters } from "@/hooks/useContentFilters";
import { useContentData } from "@/hooks/useContentData";
import { toast } from "react-toastify";
import { PricingOption } from "@/constants";

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
      <header className="border-b border-(--primary) px-4">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="text-xl font-bold tracking-wider">
                <img src="https://storagefiles.clo-set.com/public/connect/common/connect-desktop-header-bi.svg"/>
              </div>
            </div>

            {/* Required Feature Badge */}
            <div className="bg-(--primary) px-4 py-2 rounded text-sm font-medium tracking-wide">
              REQUIRED FEATURE
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-lg">
              Find the Items you're looking for
            </h1>

            {/* Keyword Search and Sort */}
            <div className="flex items-center space-x-6">
              {/* Sort Dropdown */}
              <SortDropdown value={sortBy} onChange={setSortCriteria} />

              {/* Keyword Search */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Info className="w-4 h-4 text-(--primary)" />
                  <span className="text-sm text-(--primary) font-medium">Keyword search</span>
                </div>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder=""
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-64 bg-input border-border text-(--foreground) pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Contents Filter */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Info className="w-4 h-4 text-(--primary)" />
              <h2 className="text-base font-medium text-(--primary)">Contents Filter</h2>
            </div>

            {/* Filter Options */}
            <div className="border border-(--primary) rounded-lg p-6 space-y-6">
              {/* Pricing Options */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-8">
                  <span className="text-sm  font-medium">Pricing Option</span>

                  {/* Paid Filter */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="paid"
                      checked={pricingFilters.includes(PricingOption.PAID)}
                      onCheckedChange={() => togglePricingFilter(PricingOption.PAID)}
                      className=" data-[state=checked]:bg-(--primary) data-[state=checked]:border-(--primary)"
                    />
                    <Label
                      htmlFor="paid"
                      className="text-sm font-medium text-(--foreground) cursor-pointer"
                    >
                      Paid
                    </Label>
                  </div>

                  {/* Free Filter */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="free"
                      checked={pricingFilters.includes(PricingOption.FREE)}
                      onCheckedChange={() => togglePricingFilter(PricingOption.FREE)}
                      className=" data-[state=checked]:bg-(--primary) data-[state=checked]:border-(--primary)"
                    />
                    <Label
                      htmlFor="free"
                      className="text-sm font-medium text-(--foreground) cursor-pointer"
                    >
                      Free
                    </Label>
                  </div>

                  {/* View Only Filter */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="viewOnly"
                      checked={pricingFilters.includes(PricingOption.VIEW_ONLY)}
                      onCheckedChange={() => togglePricingFilter(PricingOption.VIEW_ONLY)}
                      className=" data-[state=checked]:bg-(--primary) data-[state=checked]:border-(--primary)"
                    />
                    <Label
                      htmlFor="viewOnly"
                      className="text-sm font-medium text-(--foreground) cursor-pointer"
                    >
                      View Only
                    </Label>
                  </div>
                </div>

                {/* Reset Button */}
                <Button
                  variant="ghost"
                  onClick={resetFilters}
                  className=" hover:text-(--foreground) hover:bg-(--secondary) text-xs font-medium tracking-wider"
                >
                  RESET
                </Button>
              </div>

              {/* Price Range Slider */}
              <PriceRangeSlider
                enabled={isPaidFilterActive}
                min={0}
                max={999}
                value={[priceRange.min, priceRange.max]}
                onChange={(value) => setPriceRange(value[0], value[1])}
              />
            </div>
          </div>

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
