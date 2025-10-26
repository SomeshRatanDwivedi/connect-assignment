import { memo } from "react";
import { SortDropdown } from "./SortDropdown";
import { Search, Info } from "lucide-react";
import { Input } from "./ui/input";

interface SearchAndSortInterface{
  sortBy: string;
  setSortCriteria: (sortBy: string) => void;
  keyword: string;
  setKeyword: (keyword: string) => void;
}

const SearchAndSort = ({ sortBy, setSortCriteria, keyword, setKeyword }: SearchAndSortInterface) => (
  <div className="flex items-center sm:space-x-6 flex-wrap mt-4 lg:mt-0 w-full lg:w-3/4 lg:justify-end lg:flex-nowrap">
    {/* Sort Dropdown */}
    <SortDropdown value={sortBy} onChange={setSortCriteria} />

    {/* Keyword Search */}
    <div className="flex items-center space-x-3 flex-wrap sm:flex-nowrap mt-8 w-full sm:mt-0 sm:w-[calc(100%-266px)] md:w-fit!">
      <div className="flex items-center space-x-2 w-full sm:w-fit mb-1 sm:mb-1">
        <Info className="w-4 h-4 text-(--primary)" />
        <span className="text-sm text-(--primary) font-medium w-26">Keyword search</span>
      </div>
      <div className="relative w-full md:w-fit">
        <Input
          type="text"
          placeholder=""
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="md:w-64 w-full bg-(--input) border-(--border) text-(--foreground)"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" />
      </div>
    </div>
  </div>
);

export default memo(SearchAndSort);
