import { motion } from 'framer-motion';
import { Instagram, Twitter, Youtube, Linkedin, Mail, MapPin, Phone, Globe, Github, Code } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    'PRODUCTS': [
      'ApexGrip™ Gloves',
      'ForceBand™ Tracker',
      'FrostPulse Bottle',
      'TitanGuard™ Mouthpiece',
      'All Gear'
    ],
    'COMPANY': [
      'About KINETIQ',
      'Our Athletes',
      'Technology',
      'Careers',
      'Press'
    ],
    'SUPPORT': [
      'Size Guide',
      'Returns & Exchanges',
      'Warranty',
      'Technical Support',
      'Contact Us'
    ],
    'CONNECT': [
      'Training Programs',
      'Elite Community',
      'Performance Blog',
      'Events',
      'Partnerships'
    ]
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  const developerLinks = [
    { icon: Github, href: 'https://github.com/bilalaslam18', label: 'GitHub' },
    { icon: Globe, href: 'https://muhammadbilal.dev/', label: 'Portfolio' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/mbilal18/', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="font-display text-3xl font-bold mb-4">
                KINETIQ<span className="text-accent">.</span>
              </h3>
              <p className="text-primary-foreground/80 mb-6 leading-relaxed">
                Empowering athletes with technology that doesn't just measure performance—it enhances it.
                Join the future of sports excellence.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-accent" />
                  hello@kinetiq.com
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-accent" />
                  1-800-KINETIQ
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-3 text-accent" />
                  Los Angeles, CA
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-display text-lg font-bold mb-4 text-accent">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-primary-foreground/20"
        >
          <div className="max-w-md">
            <h4 className="font-display text-xl font-bold mb-3">ELITE UPDATES</h4>
            <p className="text-primary-foreground/70 text-sm mb-4">
              Get exclusive access to new gear, athlete stories, and performance insights.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg 
                         text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-accent"
              />
              <button className="px-6 py-3 bg-accent text-white rounded-lg font-display font-medium hover:bg-accent/90 transition-colors">
                JOIN
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="border-t border-primary-foreground/20 bg-primary-foreground/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div>
                <p className="text-primary-foreground/80 text-sm">
                  Developed by <span className="font-medium text-accent">Muhammad Bilal</span>
                </p>
                <p className="text-primary-foreground/60 text-xs">
                  Full Stack Developer & UI/UX Designer
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {developerLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 bg-primary-foreground/10 rounded-full flex items-center justify-center
                           hover:bg-accent transition-colors group"
                  aria-label={`Developer ${link.label}`}
                >
                  <link.icon className="w-4 h-4 text-primary-foreground/70 group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-primary-foreground/60 text-sm">
              © 2024 KINETIQ. All rights reserved. Engineered for excellence.
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center
                           hover:bg-accent transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-primary-foreground/70 group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6 text-sm text-primary-foreground/60">
              <a href="#" className="hover:text-primary-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;