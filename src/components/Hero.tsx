import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-athlete.jpg';

const Hero = () => {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Elite athlete in motion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Main Brand Title */}
          <h1 className="kinetic-text mb-6">
            KINETIQ
          </h1>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-8"
          >
            <p className="font-display text-2xl md:text-4xl text-white tracking-wider mb-4">
              Unleash Precision.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mb-16"
          >
            <Button
              onClick={scrollToProducts}
              className="btn-elite glow-effect"
              size="lg"
            >
              <span>Explore Gear</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="cursor-pointer"
          onClick={scrollToProducts}
        >
          <ChevronDown className="w-8 h-8 text-white/70 hover:text-white transition-colors" />
        </motion.div>
      </motion.div>

      {/* Performance Stats Overlay */}
      <div className="absolute bottom-20 left-8 z-10 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-4"
        >
          <div className="text-white/90 text-sm">
            <div className="mb-2">
              <span className="text-accent font-bold">99.7%</span> Precision Rate
            </div>
            <div className="mb-2">
              <span className="text-ion-blue font-bold">15ms</span> Response Time
            </div>
            <div>
              <span className="text-neon-green font-bold">2M+</span> Athletes Trust
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;