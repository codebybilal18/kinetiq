import { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type CategoryFilter = 'all' | 'men' | 'women' | 'kids';
type TypeFilter = 'all' | 'gloves' | 'bands' | 'bottles' | 'guards';

interface FilterDropdownProps {
  categoryFilter: CategoryFilter;
  typeFilter: TypeFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  onTypeChange: (type: TypeFilter) => void;
}

const FilterDropdown = ({ 
  categoryFilter, 
  typeFilter, 
  onCategoryChange, 
  onTypeChange 
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'men', label: 'Men' },
    { value: 'women', label: 'Women' },
    { value: 'kids', label: 'Kids' }
  ] as const;

  const types = [
    { value: 'all', label: 'All Types' },
    { value: 'gloves', label: 'Gloves' },
    { value: 'bands', label: 'Bands' },
    { value: 'bottles', label: 'Bottles' },
    { value: 'guards', label: 'Guards' }
  ] as const;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-10">
          <Filter className="w-4 h-4 mr-2" />
          Filters
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-4" align="start">
        <div className="grid grid-cols-2 gap-4">
          {/* Categories Column */}
          <div>
            <h4 className="font-medium text-sm mb-3">Categories</h4>
            <div className="space-y-1">
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category.value}
                  onClick={() => onCategoryChange(category.value)}
                  className={`cursor-pointer ${
                    categoryFilter === category.value ? 'bg-accent text-accent-foreground' : ''
                  }`}
                >
                  {category.label}
                </DropdownMenuItem>
              ))}
            </div>
          </div>
          
          {/* Types Column */}
          <div>
            <h4 className="font-medium text-sm mb-3">Product Types</h4>
            <div className="space-y-1">
              {types.map((type) => (
                <DropdownMenuItem
                  key={type.value}
                  onClick={() => onTypeChange(type.value)}
                  className={`cursor-pointer ${
                    typeFilter === type.value ? 'bg-accent text-accent-foreground' : ''
                  }`}
                >
                  {type.label}
                </DropdownMenuItem>
              ))}
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;