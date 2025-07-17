import { useState } from 'react';
import { ChevronDown, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type SortOption = 'price-low' | 'price-high' | 'rating' | 'new' | 'performance';

interface SortDropdownProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SortDropdown = ({ sortBy, onSortChange }: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: 'performance', label: 'Performance' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Rating' },
    { value: 'new', label: 'New Arrivals' }
  ] as const;

  const currentSort = sortOptions.find(option => option.value === sortBy);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-10">
          <ArrowUpDown className="w-4 h-4 mr-2" />
          Sort: {currentSort?.label}
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onSortChange(option.value)}
            className={`cursor-pointer ${
              sortBy === option.value ? 'bg-accent text-accent-foreground' : ''
            }`}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortDropdown;