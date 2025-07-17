import { motion } from 'framer-motion';
import { useState } from 'react';
import { Zap, Activity, Thermometer, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from './CartContext';
import { useToast } from '@/hooks/use-toast';
import apexGripImage from '@/assets/apex-grip-gloves.jpg';
import forceBandImage from '@/assets/force-band.jpg';
import frostPulseImage from '@/assets/frost-pulse-bottle.jpg';
import titanGuardImage from '@/assets/titan-guard.jpg';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';

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

const ProductShowroom = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
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

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section id="products" className="py-20 px-4 bg-gradient-hero">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-6xl md:text-7xl font-bold mb-6">
            PERFORMANCE
            <span className="text-performance block">REDEFINED</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Elite gear engineered for athletes who demand precision, power, and performance beyond limits.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={handleQuickView}
              onAddToCart={handleAddToCart}
              index={index}
            />
          ))}
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />
    </section>
  );
};

export default ProductShowroom;