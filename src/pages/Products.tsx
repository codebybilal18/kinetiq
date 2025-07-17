import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Zap, Activity, Thermometer, Shield } from 'lucide-react';
import { useCart } from '@/components/CartContext';
import { useToast } from '@/hooks/use-toast';
import Cart from '@/components/Cart';
import ProductCard from '@/components/ProductCard';
import FilterDropdown from '@/components/FilterDropdown';
import SortDropdown from '@/components/SortDropdown';

// Import hero images
import heroMenImage from '@/assets/hero-men.jpg';
import heroWomenImage from '@/assets/hero-women.jpg';
import heroKidsImage from '@/assets/hero-kids.jpg';
import heroAllImage from '@/assets/hero-all.jpg';

// Import product images
import apexGripImage from '@/assets/apex-grip-gloves.jpg';
import forceBandImage from '@/assets/force-band.jpg';
import frostPulseImage from '@/assets/frost-pulse-bottle.jpg';
import titanGuardImage from '@/assets/titan-guard.jpg';
import Footer from '@/components/Footer';

interface Product {
  id: string;
  name: string;
  tagline: string;
  image: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  features: string[];
  price: number;
  priceDisplay: string;
  description: string;
  category: 'men' | 'women' | 'kids';
  type: 'gloves' | 'bands' | 'bottles' | 'guards';
  rating: number;
  isNew: boolean;
  performance: number;
}

const products: Product[] = [
  {
    id: 'apex-grip',
    name: 'ApexGrip™ Gloves',
    tagline: 'Adaptive friction sensors',
    image: apexGripImage,
    icon: Zap,
    features: ['Neural grip feedback', 'Moisture-wicking polymer', 'Force distribution mapping'],
    price: 349,
    priceDisplay: '$349',
    description: 'Revolutionary gloves with adaptive friction technology that responds to your grip in real-time.',
    category: 'men',
    type: 'gloves',
    rating: 4.9,
    isNew: true,
    performance: 95
  },
  {
    id: 'force-band',
    name: 'ForceBand™',
    tagline: 'AI fatigue tracker',
    image: forceBandImage,
    icon: Activity,
    features: ['Biometric monitoring', 'Predictive analytics', 'Recovery optimization'],
    price: 249,
    priceDisplay: '$249',
    description: 'AI-powered wristband that predicts fatigue and optimizes your training performance.',
    category: 'women',
    type: 'bands',
    rating: 4.8,
    isNew: false,
    performance: 88
  },
  {
    id: 'frost-pulse',
    name: 'FrostPulse Bottle',
    tagline: 'Real-time thermal core',
    image: frostPulseImage,
    icon: Thermometer,
    features: ['Temperature regulation', 'Hydration tracking', 'Smart notifications'],
    price: 129,
    priceDisplay: '$129',
    description: 'Thermodynamic water bottle that maintains optimal temperature and tracks hydration.',
    category: 'kids',
    type: 'bottles',
    rating: 4.7,
    isNew: false,
    performance: 82
  },
  {
    id: 'titan-guard',
    name: 'TitanGuard™ Mouthpiece',
    tagline: 'Brainwave feedback protection',
    image: titanGuardImage,
    icon: Shield,
    features: ['Impact detection', 'Concussion monitoring', 'Neural feedback'],
    price: 199,
    priceDisplay: '$199',
    description: 'Advanced mouthguard with brainwave monitoring for ultimate protection and performance.',
    category: 'men',
    type: 'guards',
    rating: 4.9,
    isNew: true,
    performance: 90
  }
];

type CategoryFilter = 'all' | 'men' | 'women' | 'kids';
type TypeFilter = 'all' | 'gloves' | 'bands' | 'bottles' | 'guards';
type SortOption = 'price-low' | 'price-high' | 'rating' | 'new' | 'performance';

// Theme configurations
const themes = {
  all: {
    background: 'bg-gradient-hero',
    heroImage: heroAllImage,
    title: 'ELITE COLLECTION',
    tagline: 'Peak performance gear for every athlete'
  },
  men: {
    background: 'bg-gradient-to-br from-slate-900 via-gray-900 to-black',
    heroImage: heroMenImage,
    title: 'MEN\'S ELITE',
    tagline: 'Power, precision, and uncompromising performance'
  },
  women: {
    background: 'bg-gradient-to-br from-purple-100 via-pink-50 to-purple-200',
    heroImage: heroWomenImage,
    title: 'WOMEN\'S ELITE',
    tagline: 'Elegant strength meets cutting-edge technology'
  },
  kids: {
    background: 'bg-gradient-to-br from-blue-100 via-green-50 to-yellow-100',
    heroImage: heroKidsImage,
    title: 'KIDS ELITE',
    tagline: 'Building tomorrow\'s champions with today\'s innovation'
  }
};

const Products = () => {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('performance');

  const { addToCart } = useCart();
  const { toast } = useToast();

  const currentTheme = themes[categoryFilter];

  const handleCategoryChange = (newCategory: CategoryFilter) => {
    setCategoryFilter(newCategory);
    setTypeFilter('all'); // Reset type filter when category changes
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.priceDisplay,
      image: product.image
    });
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const resetFilters = () => {
    setCategoryFilter('all');
    setTypeFilter('all');
    setSortBy('performance');
    toast({
      title: "Filters Reset",
      description: "All filters have been cleared.",
    });
  };

  // Filter and sort products
  const filteredAndSortedProducts = products
    .filter(product =>
      (categoryFilter === 'all' || product.category === categoryFilter) &&
      (typeFilter === 'all' || product.type === typeFilter)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'new':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'performance':
          return b.performance - a.performance;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen">
      {/* Dynamic Hero Section */}
      <motion.section
        key={categoryFilter}
        className={`relative h-[40vh] sm:h-[50vh] flex items-center justify-center overflow-hidden ${currentTheme.background}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img
            src={currentTheme.heroImage}
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-center text-white container-responsive"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            {currentTheme.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            {currentTheme.tagline}
          </p>
        </motion.div>
      </motion.section>

      {/* Compact Controls Bar */}
      <div className="bg-background/95 backdrop-blur-md border-b border-border py-3">
        <div className="container-responsive flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="font-display text-xl sm:text-2xl font-bold">
            {filteredAndSortedProducts.length} Products
          </h2>
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
            <FilterDropdown
              categoryFilter={categoryFilter}
              typeFilter={typeFilter}
              onCategoryChange={handleCategoryChange}
              onTypeChange={setTypeFilter}
            />
            <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="py-6 sm:py-8">
        <div className="container-responsive">
          {/* Products Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${categoryFilter}-${typeFilter}-${sortBy}`}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {filteredAndSortedProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No Results */}
          {filteredAndSortedProducts.length === 0 && (
            <motion.div
              className="text-center py-12 sm:py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="font-display text-xl sm:text-2xl font-bold mb-4">
                No Products Found
              </h3>
              <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">
                Try adjusting your filters to see more products.
              </p>
              <button
                onClick={resetFilters}
                className="btn-elite"
              >
                <span>Reset Filters</span>
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Cart */}
      <Cart />
      <Footer />
    </div>
  );
};

export default Products;