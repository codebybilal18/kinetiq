import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Zap, ShoppingCart } from 'lucide-react';
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

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductModal = ({ product, isOpen, onClose, onAddToCart }: ProductModalProps) => {
  if (!product) return null;

  const IconComponent = product.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] bg-card rounded-2xl shadow-elite overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white"
            >
              <X className="w-5 h-5" />
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              {/* Image Section */}
              <div className="relative bg-gradient-to-br from-muted/50 to-muted p-8 flex items-center justify-center">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg"
                  />

                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 space-y-2">
                    {product.isNew && (
                      <Badge className="bg-neon-green text-black font-display">
                        NEW
                      </Badge>
                    )}
                    <Badge variant="outline" className="capitalize font-display">
                      {product.category}
                    </Badge>
                  </div>

                  {/* Performance Indicator */}
                  <div className="absolute bottom-4 right-4 bg-white/90 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-accent" />
                      <span className="font-display font-bold">{product.performance}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 overflow-y-auto">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <IconComponent className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <span className="font-medium">{product.rating}</span>
                        <span className="text-muted-foreground text-sm">(128 reviews)</span>
                      </div>
                    </div>

                    <h1 className="font-display text-3xl lg:text-4xl font-bold">
                      {product.name}
                    </h1>

                    <p className="text-lg text-muted-foreground">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <div className="space-y-4">
                    <h3 className="font-display text-xl font-bold">Elite Performance</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    <h3 className="font-display text-xl font-bold">Advanced Features</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {product.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                        >
                          <div className="w-2 h-2 bg-accent rounded-full" />
                          <span className="font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Price and Actions */}
                  <div className="space-y-4 pt-6 border-t border-border">
                    <div className="flex items-center justify-between">
                      <div className="font-display text-4xl font-bold">
                        {product.priceDisplay}
                      </div>
                      <Badge
                        variant="outline"
                        className="text-neon-green border-neon-green"
                      >
                        Free Shipping
                      </Badge>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={() => onAddToCart(product)}
                        className="btn-elite flex-1"
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        <span>Add to Cart</span>
                      </Button>
                      <Button variant="outline" className="px-8">
                        Wishlist
                      </Button>
                    </div>

                    <p className="text-xs text-muted-foreground text-center">
                      Elite gear with 30-day performance guarantee
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;