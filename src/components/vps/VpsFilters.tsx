
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Slider } from "@/components/ui/slider";

interface VpsFiltersProps {
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  sortOrder?: string;
  onSortChange?: (order: string) => void;
  onClearFilters?: () => void;
  hasActiveFilters?: boolean;
  range?: [number, number];
  setRange?: (range: [number, number]) => void;
  maxPrice?: number;
}

const VpsFilters: React.FC<VpsFiltersProps> = ({
  searchTerm = '',
  onSearchChange,
  sortOrder = 'price_low',
  onSortChange,
  onClearFilters,
  hasActiveFilters = false,
  range,
  setRange,
  maxPrice = 200
}) => {
  const handleRangeChange = (value: number[]) => {
    if (setRange && value.length >= 2) {
      // Ensure we have valid values and they are in order (min, max)
      const min = Math.min(value[0], value[1]);
      const max = Math.max(value[0], value[1]);
      
      // Only update if there's an actual change
      if (range && (min !== range[0] || max !== range[1])) {
        console.log(`Price range changed: $${min} - $${max}`);
        setRange([min, max] as [number, number]);
      }
    }
  };

  return (
    <div className="mb-6 space-y-6 bg-card p-4 rounded-lg border">
      <div className="flex flex-col gap-4">
        <h3 className="font-medium">Filter Options</h3>
        
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search packages..."
            value={searchTerm}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        
        {range && setRange && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Price Range</h3>
              <span className="text-sm text-muted-foreground">
                ${range[0]} - ${range[1]}
              </span>
            </div>
            <Slider
              defaultValue={range}
              min={0}
              max={maxPrice}
              step={1}
              value={[range[0], range[1]]}
              onValueChange={handleRangeChange}
              className="mt-2"
            />
          </div>
        )}

        <div className="flex gap-2">
          <div className="flex-1">
            <Select 
              value={sortOrder} 
              onValueChange={(value) => onSortChange && onSortChange(value)}
            >
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
                <SelectItem value="cpu">CPU: Most to Least</SelectItem>
                <SelectItem value="memory">Memory: Most to Least</SelectItem>
                <SelectItem value="disk">Storage: Most to Least</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {hasActiveFilters && onClearFilters && (
            <Button variant="outline" onClick={onClearFilters} title="Clear filters">
              <X className="h-4 w-4 mr-2" /> Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VpsFilters;
