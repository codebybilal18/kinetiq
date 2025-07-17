import { motion } from 'framer-motion';
import { useState } from 'react';
import { Trophy, Target, Zap } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  title: string;
  quote: string;
  sport: string;
  achievement: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Elena Kross',
    title: 'Olympic Sprinter',
    quote: 'When milliseconds matter, trust KINETIQ. The precision is unmatched.',
    sport: 'Track & Field',
    achievement: '3x Olympic Gold Medalist'
  },
  {
    id: '2',
    name: 'Marcus Chen',
    title: 'Professional Boxer',
    quote: 'ApexGrip gloves changed my game. Every punch is calculated, every movement optimized.',
    sport: 'Boxing',
    achievement: 'WBC Heavyweight Champion'
  },
  {
    id: '3',
    name: 'Sarah Williams',
    title: 'CrossFit Champion',
    quote: 'ForceBand predicted my fatigue before I felt it. Game-changing technology.',
    sport: 'CrossFit',
    achievement: 'CrossFit Games Winner'
  }
];

const trainingZones = [
  {
    id: 'endurance',
    name: 'ENDURANCE',
    icon: Target,
    description: 'Long-distance precision',
    color: 'bg-ion-blue'
  },
  {
    id: 'strength',
    name: 'STRENGTH',
    icon: Trophy,
    description: 'Maximum power output',
    color: 'bg-accent'
  },
  {
    id: 'focus',
    name: 'FOCUS',
    icon: Zap,
    description: 'Mental performance',
    color: 'bg-neon-green'
  }
];

const AthleteMode = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeZone, setActiveZone] = useState('endurance');

  return (
    <section className="py-20 bg-primary text-primary-foreground">
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
            ATHLETE
            <span className="text-accent block">MODE</span>
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Trusted by elite athletes who push the boundaries of human performance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Testimonials */}
          <div className="space-y-8">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-8"
            >
              <div className="mb-6">
                <blockquote className="text-2xl md:text-3xl font-light leading-relaxed mb-6">
                  "{testimonials[activeTestimonial].quote}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-display text-xl font-bold">
                      {testimonials[activeTestimonial].name}
                    </div>
                    <div className="text-accent font-medium">
                      {testimonials[activeTestimonial].title}
                    </div>
                    <div className="text-primary-foreground/70 text-sm">
                      {testimonials[activeTestimonial].achievement}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-lg">
                      {testimonials[activeTestimonial].sport}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center space-x-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-12 h-1 rounded-full transition-all duration-300 ${
                    index === activeTestimonial ? 'bg-accent' : 'bg-primary-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Training Zones */}
          <div className="space-y-6">
            <h3 className="font-display text-3xl font-bold mb-8">TRAINING ZONES</h3>
            
            {trainingZones.map((zone) => (
              <motion.div
                key={zone.id}
                className={`border border-primary-foreground/20 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                  activeZone === zone.id 
                    ? 'bg-primary-foreground/10 border-accent' 
                    : 'hover:bg-primary-foreground/5'
                }`}
                onClick={() => setActiveZone(zone.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`${zone.color} rounded-full p-3`}>
                    <zone.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-display text-xl font-bold">{zone.name}</h4>
                    <p className="text-primary-foreground/70">{zone.description}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeZone === zone.id ? 'bg-accent' : 'bg-primary-foreground/30'
                  }`} />
                </div>
              </motion.div>
            ))}

            {/* Performance Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-primary-foreground/5 rounded-xl p-6 mt-8"
            >
              <h4 className="font-display text-lg font-bold mb-4">PERFORMANCE IMPACT</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-accent">+23%</div>
                  <div className="text-sm text-primary-foreground/70">Efficiency</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-ion-blue">-15%</div>
                  <div className="text-sm text-primary-foreground/70">Fatigue</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-neon-green">+31%</div>
                  <div className="text-sm text-primary-foreground/70">Recovery</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AthleteMode;