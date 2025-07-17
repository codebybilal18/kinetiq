import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from './CartContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
    setIsOpen(false);
  };

  return (
    <>
      {/* Cart Trigger */}
      <motion.div
        className="fixed bottom-6 sm:bottom-8 right-4 sm:right-8 z-40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="btn-elite rounded-full w-14 h-14 sm:w-16 sm:h-16 shadow-glow relative p-0"
        >
          <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
          {totalItems > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center min-w-0 leading-none"
              style={{ fontSize: totalItems > 99 ? '8px' : '10px' }}
            >
              {totalItems > 99 ? '99+' : totalItems}
            </motion.span>
          )}
        </Button>
      </motion.div>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Cart Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm sm:max-w-md bg-background border-l border-border z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
                <h2 className="font-display text-xl sm:text-2xl font-bold">
                  CART ({totalItems})
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                {items.length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-base sm:text-lg">Your cart is empty</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Add some elite gear to get started
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-card border border-border rounded-lg p-3 sm:p-4"
                      >
                        <div className="flex gap-3 sm:gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-display font-bold text-sm truncate">{item.name}</h3>
                            <p className="text-accent font-bold text-sm">{item.price}</p>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 sm:w-8 sm:h-8 p-0"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="font-medium w-6 sm:w-8 text-center text-sm">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 sm:w-8 sm:h-8 p-0"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.id)}
                                className="ml-auto text-destructive hover:text-destructive p-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-4 sm:p-6 border-t border-border">
                  {/* Total */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-display text-lg font-bold">TOTAL:</span>
                    <span className="font-display text-xl sm:text-2xl font-bold text-accent">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <Button
                      onClick={handleCheckout}
                      className="btn-elite w-full"
                    >
                      <span>CHECKOUT</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={clearCart}
                      className="w-full"
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cart;