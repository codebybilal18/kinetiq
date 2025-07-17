import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for your interest in KINETIQ. We'll get back to you within 24 hours.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Welcome to KINETIQ!",
      description: "You're now part of the elite athlete community. Check your email for exclusive updates.",
    });
  };

  const locations = [
    {
      city: 'Los Angeles',
      address: '1234 Performance Blvd, CA 90210',
      type: 'Headquarters'
    },
    {
      city: 'New York',
      address: '567 Elite Ave, NY 10001',
      type: 'East Coast Hub'
    },
    {
      city: 'Tokyo',
      address: '890 Innovation St, Shibuya',
      type: 'Asia Pacific'
    }
  ];

  return (
    <section className="py-20 bg-gradient-hero">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-6xl md:text-7xl font-bold mb-6">
            TRAIN LIKE
            <span className="text-performance block">TOMORROW'S CHAMPION</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to elevate your performance? Connect with KINETIQ and join the future of athletic excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-display text-3xl font-bold mb-6">GET IN TOUCH</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="h-14 text-lg"
                    required
                  />
                </div>
                
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-14 text-lg"
                    required
                  />
                </div>
                
                <div>
                  <Textarea
                    name="message"
                    placeholder="Tell us about your training goals..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="min-h-32 text-lg"
                    required
                  />
                </div>
                
                <Button type="submit" className="btn-elite w-full">
                  <span>Send Message</span>
                </Button>
              </form>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h4 className="font-display text-xl font-bold mb-4">ELITE UPDATES</h4>
              <p className="text-muted-foreground mb-4">
                Get exclusive access to new gear launches, athlete stories, and performance insights.
              </p>
              <form onSubmit={handleNewsletterSignup} className="flex gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                  required
                />
                <Button type="submit" variant="outline">
                  Subscribe
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info & Locations */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="font-display text-2xl font-bold mb-6">CONNECT WITH US</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-accent rounded-full p-3">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-muted-foreground">hello@kinetiq.com</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-ion-blue rounded-full p-3">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">Support</div>
                    <div className="text-muted-foreground">1-800-KINETIQ</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-neon-green rounded-full p-3">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">Headquarters</div>
                    <div className="text-muted-foreground">Los Angeles, CA</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Store Locations */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="font-display text-2xl font-bold mb-6">STORE LOCATIONS</h3>
              
              <div className="space-y-4">
                {locations.map((location, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="border border-border rounded-lg p-4 hover:border-accent transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-display text-lg font-bold">{location.city}</h4>
                        <p className="text-muted-foreground text-sm">{location.address}</p>
                      </div>
                      <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                        {location.type}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;