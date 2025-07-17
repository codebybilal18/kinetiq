import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { name: 'GEAR', action: () => navigate('/products') },
    { name: 'ATHLETES', id: 'athletes' },
    { name: 'TECH', id: 'tech' },
    { name: 'CONTACT', id: 'contact' }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-lg'
            : 'bg-black/20 backdrop-blur-sm border-b border-white/10'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
              onClick={() => scrollToSection('hero')}
            >
              <h1 className={`font-display text-2xl md:text-3xl font-bold ${isScrolled ? 'text-foreground' : 'text-white'
                }`}>
                KINETIQ
                <span className="text-accent">.</span>
              </h1>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => item.action ? item.action() : scrollToSection(item.id)}
                  className={`font-display text-sm font-medium tracking-wider hover:text-accent transition-colors ${isScrolled ? 'text-foreground' : 'text-white'
                    }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button onClick={() => navigate('/products')} className="btn-elite" size="sm">
                <span>SHOP NOW</span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 ${isScrolled ? 'text-foreground' : 'text-white'}`}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 left-0 right-0 z-40 bg-background/98 backdrop-blur-md border-b border-border md:hidden"
        >
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => item.action ? item.action() : scrollToSection(item.id)}
                className="block w-full text-left font-display text-lg font-medium tracking-wider hover:text-accent transition-colors py-2"
              >
                {item.name}
              </button>
            ))}
            <div className="pt-4 border-t border-border">
              <Button variant="ghost" className="w-full mb-2" onClick={() => navigate('/checkout')}>
                <ShoppingBag className="w-4 h-4 mr-2" />
                CART
              </Button>
              <Button className="btn-elite w-full" onClick={() => navigate('/products')}>
                <span>SHOP NOW</span>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navigation;