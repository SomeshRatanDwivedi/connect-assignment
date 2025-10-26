import { useEffect, useState } from "react";
import { Slider } from "radix-ui";
import { cn } from "@/lib/utils";

interface PriceRangeSliderProps {
  /** Whether the slider is enabled */
  enabled: boolean;
  /** Minimum price value */
  min: number;
  /** Maximum price value */
  max: number;
  /** Current price range */
  value: [number, number];
  /** Callback when range changes */
  onChange: (value: [number, number]) => void;
  /** Optional className */
  className?: string;
}

/**
 * Price Range Slider Component
 * Displays a dual-handle slider for selecting price range
 * Only active when Paid pricing option is selected
 */
export const PriceRangeSlider = ({
  enabled,
  min,
  max,
  value,
  onChange,
  className,
}: PriceRangeSliderProps) => {
  const [localValue, setLocalValue] = useState<[number, number]>(value);

  // Update local value when prop changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  /**
   * Handle slider value change
   */
  const handleValueChange = (newValue: number[]) => {
    const range: [number, number] = [newValue[0], newValue[1]];
    setLocalValue(range);
  };

  /**
   * Commit changes when user releases the slider
   */
  const handleValueCommit = (newValue: number[]) => {
    const range: [number, number] = [newValue[0], newValue[1]];
    onChange(range);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between text-sm">
        <span>Price Range</span>
        {enabled && (
          <span className="text-foreground font-medium">
            ${localValue[0]} - ${localValue[1]}
          </span>
        )}
      </div>

      <Slider.Root
        min={min}
        max={max}
        step={1}
        value={localValue}
        onValueChange={handleValueChange}
        onValueCommit={handleValueCommit}
        disabled={!enabled}
        className={cn(
          "relative flex w-full h-3 select-none touch-none items-center",
          !enabled && "opacity-40 cursor-not-allowed"
        )}
      >
        <Slider.Track className="relative h-[3px] grow rounded-full bg-white">
          <Slider.Range className="absolute h-full rounded-full bg-(--primary)" />
        </Slider.Track>
        <Slider.Thumb
          className="block size-5 rounded-[10px] bg-(--primary) shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:shadow-blackA5 focus:outline-none"
          aria-label="Volume"
        />
        <Slider.Thumb
          className="block size-5 rounded-[10px] bg-(--primary) shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:shadow-blackA5 focus:outline-none"
          aria-label="Volume"
        />
      </Slider.Root>

      <div className="flex items-center justify-between text-xs">
        <span>${min}</span>
        <span>${max}</span>
      </div>
    </div>

  );
};
