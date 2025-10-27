import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {SORTING_CRITERIA_OPTIONS } from "@/constants";

interface SortDropdownProps {
  /** Current sort criteria */
  value: string;
  /** Callback when sort criteria changes */
  onChange: (value: string) => void;
}

/**
 * Sort Dropdown Component
 * Allows users to sort content by different criteria
 */
export const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  return (
    <div className="flex items-center sm:space-x-3 flex-wrap sm:flex-nowrap w-full sm:w-fit">
      <span className="text-sm font-medium w-full sm:w-fit mb-1 sm:mb-0 text-(--primary)">Sort by:</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full sm:w-[180px] bg(--input) border-(--border)">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-(--popover) border-(--border)">
          {
            SORTING_CRITERIA_OPTIONS.map(ele => (<SelectItem id={ele.id} value={ele.value}>{ele.label}</SelectItem>))
          }
        </SelectContent>
      </Select>
    </div>
  );
};
