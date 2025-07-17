import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowLeft, CreditCard, Lock, Truck, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/components/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface CheckoutStep {
  id: number;
  title: string;
  completed: boolean;
}

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const { items, total, totalValue, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const steps: CheckoutStep[] = [
    { id: 1, title: 'Cart Review', completed: currentStep > 1 },
    { id: 2, title: 'Delivery Details', completed: currentStep > 2 },
    { id: 3, title: 'Payment', completed: orderComplete }
  ];

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setOrderComplete(true);
    clearCart();

    toast({
      title: "Order Complete!",
      description: "Your elite gear is on its way. Prepare for peak performance.",
    });
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen pt-16 sm:pt-20 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-4">EMPTY CART</h1>
          <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">Your cart is empty. Add some elite gear to continue.</p>
          <Button onClick={() => navigate('/products')} className="btn-elite">
            <span>Shop Now</span>
          </Button>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen pt-16 sm:pt-20 flex items-center justify-center bg-gradient-hero">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-2xl mx-auto px-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8 bg-neon-green rounded-full flex items-center justify-center"
          >
            <Check className="w-12 h-12 sm:w-16 sm:h-16 text-black" />
          </motion.div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
            ORDER
            <span className="text-performance block">COMPLETE</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8">
            Your elite gear is being prepared. Expect peak performance delivery within 2-3 business days.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" onClick={() => navigate('/')}>
              Back to Home
            </Button>
            <Button onClick={() => navigate('/products')} className="btn-elite">
              <span>Continue Shopping</span>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-hero">
      <div className="container-responsive py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-center mb-6 sm:mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold">
            ELITE CHECKOUT
          </h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 sm:mb-12 overflow-x-auto">
          <div className="flex items-center justify-center min-w-max px-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step.completed
                      ? 'bg-neon-green text-black'
                      : currentStep === step.id
                        ? 'bg-accent text-accent-foreground shadow-glow'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {step.completed ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : step.id}
                </motion.div>
                <span className={`hidden sm:block ml-2 font-medium text-sm sm:text-base ${currentStep === step.id ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 sm:w-16 h-0.5 mx-3 sm:mx-4 transition-all duration-300 ${step.completed ? 'bg-neon-green' : 'bg-muted'
                    }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4 sm:space-y-6"
              >
                <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Review Your Gear</h2>
                {items.map((item) => (
                  <div key={item.id} className="product-card flex items-center gap-4 sm:gap-6">
                    <img src={item.image} alt={item.name} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-lg sm:text-xl font-bold truncate">{item.name}</h3>
                      <p className="text-muted-foreground text-sm sm:text-base">Quantity: {item.quantity}</p>
                    </div>
                    <div className="font-display text-lg sm:text-xl font-bold">{item.price}</div>
                  </div>
                ))}
                <div className="flex justify-end">
                  <Button onClick={handleNextStep} className="btn-elite">
                    <span>Continue to Delivery</span>
                  </Button>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4 sm:space-y-6"
              >
                <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Delivery Details</h2>
                <div className="product-card space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="focus:ring-accent"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="focus:ring-accent"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="focus:ring-accent"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="focus:ring-accent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="focus:ring-accent"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        className="focus:ring-accent"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className="focus:ring-accent"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" onClick={handlePrevStep}>
                    Previous
                  </Button>
                  <Button onClick={handleNextStep} className="btn-elite">
                    <span>Continue to Payment</span>
                  </Button>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4 sm:space-y-6"
              >
                <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Payment</h2>
                <div className="product-card space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-neon-green" />
                    <span className="text-xs sm:text-sm text-muted-foreground">Secure payment powered by elite encryption</span>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      value={formData.cardName}
                      onChange={(e) => handleInputChange('cardName', e.target.value)}
                      className="focus:ring-accent"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="focus:ring-accent pl-10 sm:pl-12"
                      />
                      <CreditCard className="absolute left-3 top-3 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        placeholder="MM/YY"
                        className="focus:ring-accent"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                        placeholder="123"
                        className="focus:ring-accent"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 sm:p-4 bg-muted/50 rounded-lg">
                    <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm sm:text-base">Elite Delivery</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Free shipping on all orders</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" onClick={handlePrevStep}>
                    Previous
                  </Button>
                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="btn-elite flex-1"
                  >
                    {isProcessing ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <span>Complete Order • ${(totalValue * 1.1).toFixed(2)}</span>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="product-card sticky top-24 sm:top-32"
            >
              <h3 className="font-display text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Order Summary</h3>

              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm sm:text-base">
                    <span className="truncate mr-2">{item.name} x {item.quantity}</span>
                    <span className="font-medium flex-shrink-0">{item.price}</span>
                  </div>
                ))}
              </div>

              <Separator className="mb-4" />

              <div className="space-y-2 mb-4 sm:mb-6 text-sm sm:text-base">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-neon-green font-medium">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(totalValue * 0.1).toFixed(2)}</span>
                </div>
              </div>

              <Separator className="mb-4" />

              <div className="flex justify-between font-display text-lg sm:text-xl font-bold">
                <span>TOTAL:</span>
                <span className="text-accent">${(totalValue * 1.1).toFixed(2)}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;