import { PricingOption } from "@/constants";
import { Info } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { memo } from "react";
import { PriceRangeSlider } from "./PriceRangeSlider";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
interface ContentFilterInterface{
  pricingFilters: string[];
  togglePricingFilter: (pricingOption:string) => void;
  resetFilters: () => void;
  isPaidFilterActive: boolean;
  priceRange: { min: number, max: number };
  setPriceRange:(min:number, max:number)=>void
}
const ContentFilter = ({ pricingFilters, togglePricingFilter, resetFilters, isPaidFilterActive, priceRange, setPriceRange }: ContentFilterInterface) => (
  <div className="mb-8">
    <div className="flex items-center space-x-2 mb-4">
      <Info className="w-4 h-4 text-(--primary)" />
      <h2 className="text-base font-medium text-(--primary)">Contents Filter</h2>
    </div>

    {/* Filter Options */}
    <div className="border border-(--primary) rounded-lg sm:p-6 p-4 space-y-6">
      {/* Pricing Options */}
      <div className="flex items-center justify-between">
        <div className="flex items-center sm:space-x-8 space-x-4">
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
          className="hover:text-(--primary) text-xs font-medium cursor-pointer border border-(--primary) hidden min-[480px]:block"
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
      {/* Reset Button */}
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
export default memo(ContentFilter);