import { motion } from 'framer-motion';
import { useState } from 'react';
import { Brain, Cpu, Wifi, Battery } from 'lucide-react';

const TechStory = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const techFeatures = [
    {
      icon: Brain,
      title: 'Neural Integration',
      description: 'Advanced biometric sensors that adapt to your unique physiological patterns'
    },
    {
      icon: Cpu,
      title: 'AI Processing',
      description: 'Real-time performance analysis with predictive feedback algorithms'
    },
    {
      icon: Wifi,
      title: 'Seamless Connectivity',
      description: 'Ultra-low latency wireless communication between all KINETIQ devices'
    },
    {
      icon: Battery,
      title: 'Endurance Power',
      description: 'Revolutionary energy cells that last as long as your training sessions'
    }
  ];

  const storyPoints = [
    {
      year: '2019',
      title: 'The Vision',
      text: 'Founded by former Olympic athletes and MIT engineers who believed technology could redefine human performance.'
    },
    {
      year: '2021',
      title: 'The Breakthrough',
      text: 'First adaptive friction sensor technology developed in partnership with leading sports science laboratories.'
    },
    {
      year: '2023',
      title: 'The Revolution',
      text: 'AI-powered fatigue prediction algorithm achieves 97.3% accuracy in beta testing with professional athletes.'
    },
    {
      year: '2024',
      title: 'The Future',
      text: 'KINETIQ gear trusted by over 2 million athletes worldwide, pushing the boundaries of what\'s possible.'
    }
  ];

  return (
    <section className="py-20 bg-background">
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
            WHY
            <span className="text-performance block">KINETIQ?</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Tech Infographic */}
          <div className="space-y-8">
            <h3 className="font-display text-3xl font-bold mb-8">SMART TECHNOLOGY</h3>
            
            {/* Interactive Tech Features */}
            <div className="space-y-6">
              {techFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`border border-border rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                    activeFeature === index 
                      ? 'bg-accent/5 border-accent shadow-glow' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setActiveFeature(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`rounded-full p-3 transition-all duration-300 ${
                      activeFeature === index 
                        ? 'bg-accent text-white' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-display text-xl font-bold mb-2">{feature.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tech Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary to-ion-blue rounded-2xl p-8 text-primary-foreground relative overflow-hidden"
            >
              <div className="relative z-10">
                <h4 className="font-display text-2xl font-bold mb-4">PERFORMANCE METRICS</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-accent mb-1">99.7%</div>
                    <div className="text-sm opacity-80">Precision Rate</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-neon-green mb-1">15ms</div>
                    <div className="text-sm opacity-80">Response Time</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent mb-1">72hrs</div>
                    <div className="text-sm opacity-80">Battery Life</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-neon-green mb-1">2M+</div>
                    <div className="text-sm opacity-80">Athletes</div>
                  </div>
                </div>
              </div>
              
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-32 h-32 border border-white rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-24 h-24 border border-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white rounded-full"></div>
              </div>
            </motion.div>
          </div>

          {/* Origin Story */}
          <div className="space-y-8">
            <h3 className="font-display text-3xl font-bold mb-8">OUR STORY</h3>
            
            {/* Timeline */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-border"></div>
              
              {storyPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative mb-12 last:mb-0"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 w-4 h-4 bg-accent rounded-full border-4 border-background shadow-lg"></div>
                  
                  {/* Content */}
                  <div className="ml-20">
                    <div className="font-display text-xl font-bold text-accent mb-2">{point.year}</div>
                    <h4 className="font-display text-2xl font-bold mb-3">{point.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{point.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Vision Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-xl p-8 mt-12"
            >
              <h4 className="font-display text-xl font-bold mb-4">OUR MISSION</h4>
              <blockquote className="text-lg font-light leading-relaxed text-muted-foreground">
                "To empower every athlete with technology that doesn't just measure performance—it enhances it. 
                We believe the future of sports lies at the intersection of human potential and intelligent design."
              </blockquote>
              <div className="mt-4 text-sm text-accent font-medium">
                - KINETIQ Founders
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStory;