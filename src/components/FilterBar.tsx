import { motion } from 'framer-motion';
import { Filter, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type CategoryFilter = 'all' | 'men' | 'women' | 'kids';
type TypeFilter = 'all' | 'gloves' | 'bands' | 'bottles' | 'guards';

interface FilterBarProps {
  categoryFilter: CategoryFilter;
  typeFilter: TypeFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  onTypeChange: (type: TypeFilter) => void;
  onResetFilters: () => void;
  activeFilterCount: number;
}

const FilterBar = ({ 
  categoryFilter, 
  typeFilter, 
  onCategoryChange, 
  onTypeChange, 
  onResetFilters,
  activeFilterCount 
}: FilterBarProps) => {
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'men', label: 'Men' },
    { value: 'women', label: 'Women' },
    { value: 'kids', label: 'Kids' }
  ] as const;

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'gloves', label: 'Gloves' },
    { value: 'bands', label: 'Bands' },
    { value: 'bottles', label: 'Bottles' },
    { value: 'guards', label: 'Guards' }
  ] as const;

  const FilterPill = ({ 
    active, 
    onClick, 
    children 
  }: { 
    active: boolean; 
    onClick: () => void; 
    children: React.ReactNode;
  }) => (
    <motion.button
      onClick={onClick}
      className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
        active 
          ? 'bg-accent text-accent-foreground shadow-glow' 
          : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );

  return (
    <motion.div
      className="sticky top-20 z-40 bg-background/95 backdrop-blur-md border-b border-border py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8">
          {/* Filter Header */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Filter className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">Filters</h3>
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {activeFilterCount} active
                </Badge>
              )}
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground mr-2">Category:</span>
            {categoryOptions.map((option) => (
              <FilterPill
                key={option.value}
                active={categoryFilter === option.value}
                onClick={() => onCategoryChange(option.value)}
              >
                {option.label}
              </FilterPill>
            ))}
          </div>

          {/* Type Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground mr-2">Type:</span>
            {typeOptions.map((option) => (
              <FilterPill
                key={option.value}
                active={typeFilter === option.value}
                onClick={() => onTypeChange(option.value)}
              >
                {option.label}
              </FilterPill>
            ))}
          </div>

          {/* Reset Button */}
          {activeFilterCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onResetFilters}
              className="ml-auto"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;