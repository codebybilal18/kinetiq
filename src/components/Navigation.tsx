import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from './CartContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleSectionNavigation = (sectionId: string) => {
    const isHomePage = location.pathname === '/';

    if (isHomePage) {
      scrollToSection(sectionId);
    } else {
      navigate('/');
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    }
  };

  const navItems = [
    { name: 'GEAR', action: () => handleNavigation('/products') },
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
        <div className="container-responsive">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
              onClick={() => {
                navigate('/');
                setIsMobileMenuOpen(false);
              }}
            >
              <h1 className={`font-display text-xl sm:text-2xl md:text-3xl font-bold ${isScrolled ? 'text-foreground' : 'text-white'
                }`}>
                KINETIQ
                <span className="text-accent">.</span>
              </h1>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => item.action ? item.action() : handleSectionNavigation(item.id)}
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

      {/* Mobile Menu - Full Screen */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-background md:hidden"
            style={{ paddingTop: '4rem' }} // Account for navbar height
          >
            <div className="h-full flex flex-col">
              {/* Navigation Items */}
              <div className="flex-1 flex flex-col justify-center items-center space-y-8 px-6">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => item.action ? item.action() : handleSectionNavigation(item.id)}
                    className="font-display text-2xl sm:text-3xl font-bold tracking-wider text-foreground hover:text-accent transition-colors duration-300 py-2"
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>

              {/* Bottom Action */}
              <div className="px-6 pb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    className="btn-elite w-full h-12 text-lg"
                    onClick={() => handleNavigation('/products')}
                  >
                    <span>SHOP NOW</span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;