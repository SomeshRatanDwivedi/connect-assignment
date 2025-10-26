import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortCriteria } from "@/constants";

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
    <div className="flex items-center space-x-3">
      <span className="text-sm font-medium">Sort by:</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px] bg(--input) border-(--border)">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-(--popover) border-(--border)">
          <SelectItem value={SortCriteria.ITEM_NAME}>Item Name</SelectItem>
          <SelectItem value={SortCriteria.HIGHER_PRICE}>Higher Price</SelectItem>
          <SelectItem value={SortCriteria.LOWER_PRICE}>Lower Price</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
