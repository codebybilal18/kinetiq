import { motion } from 'framer-motion';
import { Zap, Star, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

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

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  index: number;
}

const ProductCard = ({ product, onAddToCart, index }: ProductCardProps) => {
  const IconComponent = product.icon;
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <motion.div
      className="group relative product-card hover:shadow-glow transition-all duration-500"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ scale: 1.02 }}
    >
      {/* New Badge */}
      {product.isNew && (
        <Badge className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 bg-neon-green text-black font-display text-xs">
          NEW
        </Badge>
      )}

      {/* Product Image */}
      <div className="relative overflow-hidden rounded-lg mb-4 sm:mb-6 group-hover:scale-105 transition-transform duration-500">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 sm:h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 sm:gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleViewDetails}
            className="bg-white/90 hover:bg-white text-xs sm:text-sm"
          >
            <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            View Details
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-3 sm:space-y-4">
        {/* Icon and Performance */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 sm:p-2 bg-accent/10 rounded-lg">
              <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
              <span className="text-xs sm:text-sm font-medium">{product.rating}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{product.performance}%</span>
          </div>
        </div>

        {/* Name and Tagline */}
        <div>
          <h3 className="font-display text-lg sm:text-xl font-bold mb-1 group-hover:text-accent transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">{product.tagline}</p>
        </div>

        {/* Features */}
        <div className="space-y-1">
          {product.features.slice(0, 2).map((feature, idx) => (
            <div key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
              <div className="w-1 h-1 bg-accent rounded-full flex-shrink-0" />
              <span className="line-clamp-1">{feature}</span>
            </div>
          ))}
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-border">
          <div className="font-display text-xl sm:text-2xl font-bold">
            {product.priceDisplay}
          </div>
          <Button
            onClick={() => onAddToCart(product)}
            className="px-3 sm:px-4 py-2 text-xs sm:text-sm flex items-center gap-1 sm:gap-2"
            size='sm'
          >
            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Add to Cart</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;