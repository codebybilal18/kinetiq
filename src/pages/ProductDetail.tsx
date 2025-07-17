import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Zap, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/components/CartContext';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';

// Import product images
import apexGripImage from '@/assets/apex-grip-gloves.jpg';
import forceBandImage from '@/assets/force-band.jpg';
import frostPulseImage from '@/assets/frost-pulse-bottle.jpg';
import titanGuardImage from '@/assets/titan-guard.jpg';

import { Zap as ZapIcon, Activity, Thermometer, Shield as ShieldIcon } from 'lucide-react';

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
  detailedDescription: string;
  specifications: { [key: string]: string };
  gallery: string[];
}

const products: Product[] = [
  {
    id: 'apex-grip',
    name: 'ApexGrip™ Gloves',
    tagline: 'Adaptive friction sensors',
    image: apexGripImage,
    icon: ZapIcon,
    features: ['Neural grip feedback', 'Moisture-wicking polymer', 'Force distribution mapping', 'Real-time grip analysis', 'Adaptive texture response'],
    price: 349,
    priceDisplay: '$349',
    description: 'Revolutionary gloves with adaptive friction technology that responds to your grip in real-time.',
    detailedDescription: 'The ApexGrip™ Gloves represent the pinnacle of grip technology, featuring advanced neural feedback systems that adapt to your unique grip patterns. Built with proprietary moisture-wicking polymers and force distribution mapping, these gloves provide unparalleled control and comfort during intense training sessions.',
    category: 'men',
    type: 'gloves',
    rating: 4.9,
    isNew: true,
    performance: 95,
    specifications: {
      'Material': 'Advanced polymer composite',
      'Battery Life': '72 hours continuous use',
      'Connectivity': 'Bluetooth 5.2',
      'Water Resistance': 'IPX7',
      'Weight': '85g per glove',
      'Sizes': 'S, M, L, XL'
    },
    gallery: [apexGripImage, apexGripImage, apexGripImage]
  },
  {
    id: 'force-band',
    name: 'ForceBand™',
    tagline: 'AI fatigue tracker',
    image: forceBandImage,
    icon: Activity,
    features: ['Biometric monitoring', 'Predictive analytics', 'Recovery optimization', 'Heart rate variability', 'Sleep tracking'],
    price: 249,
    priceDisplay: '$249',
    description: 'AI-powered wristband that predicts fatigue and optimizes your training performance.',
    detailedDescription: 'The ForceBand™ utilizes cutting-edge AI algorithms to monitor your biometric data in real-time, providing predictive insights into your fatigue levels and recovery needs. This revolutionary device helps optimize your training schedule for maximum performance gains.',
    category: 'women',
    type: 'bands',
    rating: 4.8,
    isNew: false,
    performance: 88,
    specifications: {
      'Display': '1.4" AMOLED',
      'Battery Life': '7 days',
      'Sensors': 'Heart rate, SpO2, Accelerometer',
      'Water Resistance': 'IP68',
      'Weight': '32g',
      'Compatibility': 'iOS 14+, Android 8+'
    },
    gallery: [forceBandImage, forceBandImage, forceBandImage]
  },
  {
    id: 'frost-pulse',
    name: 'FrostPulse Bottle',
    tagline: 'Real-time thermal core',
    image: frostPulseImage,
    icon: Thermometer,
    features: ['Temperature regulation', 'Hydration tracking', 'Smart notifications', 'UV sterilization', 'Leak-proof design'],
    price: 129,
    priceDisplay: '$129',
    description: 'Thermodynamic water bottle that maintains optimal temperature and tracks hydration.',
    detailedDescription: 'The FrostPulse Bottle combines advanced thermodynamic technology with smart hydration tracking. Its intelligent temperature control system maintains your beverage at the perfect temperature while monitoring your hydration levels throughout the day.',
    category: 'kids',
    type: 'bottles',
    rating: 4.7,
    isNew: false,
    performance: 82,
    specifications: {
      'Capacity': '750ml',
      'Temperature Range': '-10°C to 85°C',
      'Battery Life': '30 days',
      'Material': 'Medical-grade stainless steel',
      'Weight': '420g',
      'Charging': 'USB-C'
    },
    gallery: [frostPulseImage, frostPulseImage, frostPulseImage]
  },
  {
    id: 'titan-guard',
    name: 'TitanGuard™ Mouthpiece',
    tagline: 'Brainwave feedback protection',
    image: titanGuardImage,
    icon: ShieldIcon,
    features: ['Impact detection', 'Concussion monitoring', 'Neural feedback', 'Custom fit technology', 'Emergency alerts'],
    price: 199,
    priceDisplay: '$199',
    description: 'Advanced mouthguard with brainwave monitoring for ultimate protection and performance.',
    detailedDescription: 'The TitanGuard™ Mouthpiece provides revolutionary protection through advanced impact detection and neural monitoring. Its custom-fit technology ensures maximum comfort while continuously monitoring for potential concussion indicators.',
    category: 'men',
    type: 'guards',
    rating: 4.9,
    isNew: true,
    performance: 90,
    specifications: {
      'Material': 'Medical-grade silicone',
      'Sensors': 'Accelerometer, Gyroscope',
      'Battery Life': '48 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '15g',
      'Certification': 'FDA approved'
    },
    gallery: [titanGuardImage, titanGuardImage, titanGuardImage]
  }
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);

  useEffect(() => {
    if (!product) {
      navigate('/products');
    }
  }, [product, navigate]);

  if (!product) {
    return null;
  }

  const IconComponent = product.icon;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.priceDisplay,
        image: product.image
      });
    }

    toast({
      title: "Added to Cart!",
      description: `${quantity}x ${product.name} added to your cart.`,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Product link copied to clipboard.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />

      <div className="pt-16 sm:pt-20">
        <div className="container-responsive py-6 sm:py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 sm:mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/products')}
              className="flex items-center gap-2 hover:bg-muted/50 text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="relative bg-gradient-to-br from-muted/50 to-muted rounded-2xl aspect-square flex items-center justify-center overflow-hidden">
                <img
                  src={product.gallery[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />

                {/* Badges */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 space-y-2">
                  {product.isNew && (
                    <Badge className="bg-neon-green text-black font-display text-xs">
                      NEW
                    </Badge>
                  )}
                </div>

                {/* Performance Indicator */}
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-white/90 rounded-lg p-2 sm:p-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                    <span className="font-display font-bold text-sm">{product.performance}%</span>
                  </div>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-accent' : 'border-border'
                      }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Header */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 sm:p-3 bg-accent/10 rounded-lg">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-current" />
                    <span className="font-medium text-sm sm:text-base">{product.rating}</span>
                    <span className="text-muted-foreground text-xs sm:text-sm">(128 reviews)</span>
                  </div>
                </div>

                <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                  {product.name}
                </h1>

                <p className="text-base sm:text-lg text-muted-foreground">
                  {product.tagline}
                </p>

                <div className="font-display text-3xl sm:text-4xl font-bold text-accent">
                  {product.priceDisplay}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="font-display text-lg sm:text-xl font-bold">Elite Performance</h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {product.detailedDescription}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="font-display text-lg sm:text-xl font-bold">Advanced Features</h3>
                <div className="grid grid-cols-1 gap-2 sm:gap-3">
                  {product.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 p-2 sm:p-3 bg-muted/50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                      <span className="font-medium text-sm sm:text-base">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="font-medium text-sm sm:text-base">Quantity:</label>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-6 h-6 sm:w-8 sm:h-8 p-0"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="px-3 sm:px-4 py-2 font-medium text-sm sm:text-base">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-6 h-6 sm:w-8 sm:h-8 p-0"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleAddToCart}
                    className="btn-elite flex-1"
                  >
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Add to Cart</span>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 justify-center">
                    <Heart className="w-4 h-4" />
                    <span className="hidden sm:inline">Wishlist</span>
                  </Button>
                  <Button variant="outline" onClick={handleShare} className="flex items-center gap-2 justify-center">
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Share</span>
                  </Button>
                </div>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-border">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-neon-green flex-shrink-0" />
                  <div>
                    <p className="font-medium text-xs sm:text-sm">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">On all orders</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-ion-blue flex-shrink-0" />
                  <div>
                    <p className="font-medium text-xs sm:text-sm">30-Day Guarantee</p>
                    <p className="text-xs text-muted-foreground">Performance promise</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                  <div>
                    <p className="font-medium text-xs sm:text-sm">Easy Returns</p>
                    <p className="text-xs text-muted-foreground">Hassle-free process</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Specifications */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 sm:mt-16"
          >
            <div className="product-card">
              <h3 className="font-display text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-border last:border-b-0">
                    <span className="font-medium text-sm sm:text-base">{key}:</span>
                    <span className="text-muted-foreground text-sm sm:text-base text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
      <Cart />
    </div>
  );
};

export default ProductDetail;