import { motion } from 'framer-motion';
import { Zap, Star, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  index: number;
}

const ProductCard = ({ product, onQuickView, onAddToCart, index }: ProductCardProps) => {
  const IconComponent = product.icon;

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
        <Badge className="absolute top-4 left-4 z-10 bg-neon-green text-black font-display">
          NEW
        </Badge>
      )}

      {/* Product Image */}
      <div className="relative overflow-hidden rounded-lg mb-6 group-hover:scale-105 transition-transform duration-500">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onQuickView(product)}
            className="bg-white/90 hover:bg-white"
          >
            <Eye className="w-4 h-4 mr-2" />
            Quick View
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        {/* Icon and Performance */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-accent/10 rounded-lg">
              <IconComponent className="w-5 h-5 text-accent" />
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Zap className="w-4 h-4" />
            <span>{product.performance}%</span>
          </div>
        </div>

        {/* Name and Tagline */}
        <div>
          <h3 className="font-display text-xl font-bold mb-1 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground">{product.tagline}</p>
        </div>

        {/* Features */}
        <div className="space-y-1">
          {product.features.slice(0, 2).map((feature, idx) => (
            <div key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
              <div className="w-1 h-1 bg-accent rounded-full" />
              {feature}
            </div>
          ))}
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="font-display text-2xl font-bold">
            {product.priceDisplay}
          </div>
          <Button
            onClick={() => onAddToCart(product)}
            className="px-6 py-2 text-sm"
            size='sm'
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;