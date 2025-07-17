import { motion } from 'framer-motion';
import { ArrowUpDown, Zap, DollarSign, Star, Sparkles } from 'lucide-react';

type SortOption = 'price-low' | 'price-high' | 'rating' | 'new' | 'performance';

interface SortBarProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SortBar = ({ sortBy, onSortChange }: SortBarProps) => {
  const sortOptions = [
    { value: 'performance', label: 'Performance', icon: Zap },
    { value: 'price-low', label: 'Price: Low', icon: DollarSign },
    { value: 'price-high', label: 'Price: High', icon: DollarSign },
    { value: 'rating', label: 'Rating', icon: Star },
    { value: 'new', label: 'New', icon: Sparkles }
  ] as const;

  const SortPill = ({ 
    active, 
    onClick, 
    children, 
    icon: Icon 
  }: { 
    active: boolean; 
    onClick: () => void; 
    children: React.ReactNode;
    icon: React.ComponentType<any>;
  }) => (
    <motion.button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
        active 
          ? 'bg-accent text-accent-foreground shadow-glow' 
          : 'bg-card border border-border hover:bg-muted text-muted-foreground hover:text-foreground'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="w-4 h-4" />
      {children}
    </motion.button>
  );

  return (
    <motion.div
      className="bg-card/80 backdrop-blur-md rounded-2xl p-4 border border-border shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <ArrowUpDown className="w-5 h-5" />
          <span className="font-display text-sm uppercase tracking-wider">Sort by:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((option) => (
            <SortPill
              key={option.value}
              active={sortBy === option.value}
              onClick={() => onSortChange(option.value)}
              icon={option.icon}
            >
              {option.label}
            </SortPill>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SortBar;