import { memo } from "react";
import { Info } from "lucide-react";
import { FILTER_OPTIONS} from "@/constants";
import { Checkbox } from "@/components/ui/checkbox";
import { PriceRangeSlider } from "./PriceRangeSlider";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

interface ContentFilterInterface {
  pricingFilters: string[]; // Current selected pricing filters (e.g., ["PAID", "FREE"])
  togglePricingFilter: (pricingOption: string) => void; // Toggle a pricing filter on/off
  resetFilters: () => void; // Reset all active filters
  isPaidFilterActive: boolean; // Whether the Paid filter is active (enables range slider)
  priceRange: { min: number; max: number }; // Current min/max price range
  setPriceRange: (min: number, max: number) => void; // Update price range
}

/**
 * ContentFilter Component
 * ------------------------
 * Displays filtering controls for content listings:
 * - Pricing options: Paid, Free, View Only
 * - Price range slider (enabled only for Paid)
 * - Reset button for clearing all filters
 */
const ContentFilter = ({
  pricingFilters,
  togglePricingFilter,
  resetFilters,
  isPaidFilterActive,
  priceRange,
  setPriceRange,
}: ContentFilterInterface) => (
  <div className="mb-8">
    {/* Header */}
    <div className="flex items-center space-x-2 mb-4">
      <Info className="w-4 h-4 text-(--primary)" />
      <h2 className="text-base font-medium text-(--primary)">
        Contents Filter
      </h2>
    </div>

    {/* Main Filter Box */}
    <div className="border border-(--primary) rounded-lg sm:p-6 p-4 space-y-6">
      {/* Pricing Options */}
      <div className="flex items-center justify-between">
        <div className="flex items-center sm:space-x-8 space-x-4">
          <span className="text-sm font-medium">Pricing Option</span>
           {/* Rendering pricing filters */}
          <PricingCheckBoxes pricingFilters={pricingFilters} togglePricingFilter={togglePricingFilter}/>
        </div>

        {/* Reset Button (desktop only) */}
        <Button
          variant="ghost"
          onClick={resetFilters}
          className="hover:text-(--primary) text-xs font-medium cursor-pointer border border-(--primary) hidden min-[480px]:block"
        >
          RESET
        </Button>
      </div>

      {/* Price Range Slider (only active when Paid filter is ON) */}
      <PriceRangeSlider
        enabled={isPaidFilterActive}
        min={0}
        max={999}
        value={[priceRange.min, priceRange.max]}
        onChange={(value) => setPriceRange(value[0], value[1])}
      />

      {/* Reset Button (mobile only) */}
      <Button
        variant="ghost"
        onClick={resetFilters}
        className="hover:text-(--primary) w-full text-xs font-medium cursor-pointer border border-(--primary) min-[480px]:hidden"
      >
        RESET
      </Button>
    </div>
  </div>
);

const PricingCheckBoxes = memo(({ pricingFilters, togglePricingFilter }: { pricingFilters: string[], togglePricingFilter:(value:string)=>void }) => (
  <>{
    FILTER_OPTIONS.map(({ id, label, value }) => (
      <div key={id} className="flex items-center space-x-2">
        <Checkbox
          id={id}
          checked={pricingFilters.includes(value)}
          onCheckedChange={() => togglePricingFilter(value)}
          className="data-[state=checked]:bg-(--primary) data-[state=checked]:border-(--primary)"
        />
        <Label
          htmlFor={id}
          className="text-sm font-medium text-(--foreground) cursor-pointer"
        >
          {label}
        </Label>
      </div>
    ))
  }
</>
))
export default memo(ContentFilter);
