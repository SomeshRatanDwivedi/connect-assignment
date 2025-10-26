import { PricingOption } from "@/constants";
import { cn } from "@/lib/utils";
import type { ContentItem } from "@/types/content";
import { PricingEnumMapping } from './../constants/index';

/**
 * Product card props
 */
interface ProductCardProps {
  /** Content item data */
  item: ContentItem;
  /** Optional className for custom styling */
  className?: string;
}

/**
 * ProductCard Component
 * Displays a product with image, title, creator, and pricing information
 */
export const ProductCard = ({ item, className }: ProductCardProps) => {
  const { title, imagePath, pricingOption, price, creator, id } = item;
  /**
   * Renders the pricing badge based on pricing type
   */
  const renderPricing = () => {
    if (+pricingOption === PricingEnumMapping[PricingOption.VIEW_ONLY]) {
      return (
        <span className="text-sm font-medium text-(--foreground)">
          View Only
        </span>
      );
    }

    if (+pricingOption === PricingEnumMapping[PricingOption.FREE]) {
      return (
        <span className="text-sm font-bold text-(--foreground)">
          FREE
        </span>
      );
    }

    return (
      <span className="text-lg font-semibold text-(--foreground)">
        ${price?.toFixed(2)}
      </span>
    );
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-sm bg-(--card)",
        "transition-all duration-300 hover:border-(--primary) hover:shadow-lg",
        className
      )}
    >
      {/* Product Image Container */}
      <div className="aspect-3/4 overflow-hidden bg-white">
        <img
          src={imagePath}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-(--background)/95 backdrop-blur-sm p-4">
        <div className="flex justify-between">
          {/* Title and Creator */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-(--foreground) truncate">
              {title}
            </h3>
            <h3 className="text-sm font-medium text-(--secondary) truncate">
              {creator}
            </h3>
          </div>
          <h3>{id}</h3>

          {/* Pricing */}
          <div className="ml-3 shrink-0">
            {renderPricing()}
          </div>
        </div>
      </div>
    </div>
  );
};
