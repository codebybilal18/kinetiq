import React, { createContext, useContext, useState } from 'react';

interface ThemeConfig {
  // Colors
  background: string;
  gradient: string;
  cardBg: string;
  cardBgHex: string;
  sidebarBg: string;
  sidebarBgHex: string;
  textColor: string;
  textColorHex: string;
  headingColor: string;
  headingColorHex: string;
  accentColor: string;
  accentHex: string;
  accent: string;
  accentText: string;
  secondary: string;
  border: string;
  borderHex: string;
  mutedText: string;
  mutedBg: string;
  hoverBg: string;
  
  // Typography
  headingFont: string;
  bodyFont: string;
  
  // Animations
  cardAnimation: {
    y: number;
    scale: number;
    rotateX: number;
    duration: number;
    stagger: number;
    ease: string;
    hoverRotate: number;
  };
  
  imageAnimation: {
    rotateX: number;
    rotateY: number;
  };
  
  iconAnimation: {
    rotate: number;
    scale: number;
  };
  
  // Effects
  cardShadow: string;
  modalShadow: string;
  textShadow: string;
  particles: boolean;
  
  // Content
  tagline: string;
}

const themes: Record<string, ThemeConfig> = {
  all: {
    background: 'bg-gradient-to-br from-slate-50 to-slate-100',
    gradient: 'linear-gradient(135deg, hsl(210 40% 98%) 0%, hsl(210 40% 96%) 100%)',
    cardBg: 'bg-white/80',
    cardBgHex: 'rgba(255, 255, 255, 0.8)',
    sidebarBg: 'bg-white/60',
    sidebarBgHex: 'rgba(255, 255, 255, 0.6)',
    textColor: 'text-slate-700',
    textColorHex: '#334155',
    headingColor: 'text-slate-900',
    headingColorHex: '#0f172a',
    accentColor: 'text-orange-500',
    accentHex: '#f97316',
    accent: 'bg-orange-500',
    accentText: 'text-white',
    secondary: 'bg-blue-600',
    border: 'border-slate-200',
    borderHex: '#e2e8f0',
    mutedText: 'text-slate-500',
    mutedBg: 'bg-slate-200',
    hoverBg: 'hover:bg-slate-100',
    headingFont: 'font-display',
    bodyFont: 'font-body',
    cardAnimation: {
      y: 30,
      scale: 0.95,
      rotateX: 5,
      duration: 0.6,
      stagger: 0.1,
      ease: 'easeOut',
      hoverRotate: 2
    },
    imageAnimation: {
      rotateX: 5,
      rotateY: 5
    },
    iconAnimation: {
      rotate: 15,
      scale: 1.1
    },
    cardShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    modalShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    particles: false,
    tagline: 'Precision-engineered sports accessories for elite performance.'
  },
  
  men: {
    background: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    cardBg: 'bg-slate-800/90',
    cardBgHex: 'rgba(30, 41, 59, 0.9)',
    sidebarBg: 'bg-slate-900/80',
    sidebarBgHex: 'rgba(15, 23, 42, 0.8)',
    textColor: 'text-slate-300',
    textColorHex: '#cbd5e1',
    headingColor: 'text-white',
    headingColorHex: '#ffffff',
    accentColor: 'text-blue-400',
    accentHex: '#60a5fa',
    accent: 'bg-blue-600',
    accentText: 'text-white',
    secondary: 'bg-slate-700',
    border: 'border-slate-700',
    borderHex: '#374151',
    mutedText: 'text-slate-400',
    mutedBg: 'bg-slate-700',
    hoverBg: 'hover:bg-slate-700',
    headingFont: 'font-display',
    bodyFont: 'font-body',
    cardAnimation: {
      y: 40,
      scale: 0.9,
      rotateX: 10,
      duration: 0.4,
      stagger: 0.05,
      ease: 'easeOut',
      hoverRotate: 5
    },
    imageAnimation: {
      rotateX: 10,
      rotateY: 10
    },
    iconAnimation: {
      rotate: 360,
      scale: 1.2
    },
    cardShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    modalShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
    particles: true,
    tagline: 'Engineered for strength. Built for champions. Designed for men who push limits.'
  },
  
  women: {
    background: 'bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50',
    gradient: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #faf5ff 100%)',
    cardBg: 'bg-white/90',
    cardBgHex: 'rgba(255, 255, 255, 0.9)',
    sidebarBg: 'bg-rose-50/80',
    sidebarBgHex: 'rgba(255, 241, 242, 0.8)',
    textColor: 'text-rose-800',
    textColorHex: '#9f1239',
    headingColor: 'text-rose-900',
    headingColorHex: '#881337',
    accentColor: 'text-rose-600',
    accentHex: '#e11d48',
    accent: 'bg-rose-500',
    accentText: 'text-white',
    secondary: 'bg-purple-500',
    border: 'border-rose-200',
    borderHex: '#fecdd3',
    mutedText: 'text-rose-500',
    mutedBg: 'bg-rose-100',
    hoverBg: 'hover:bg-rose-100',
    headingFont: 'font-serif',
    bodyFont: 'font-body',
    cardAnimation: {
      y: 20,
      scale: 0.98,
      rotateX: 2,
      duration: 0.8,
      stagger: 0.15,
      ease: 'easeInOut',
      hoverRotate: 1
    },
    imageAnimation: {
      rotateX: 2,
      rotateY: 2
    },
    iconAnimation: {
      rotate: -15,
      scale: 1.05
    },
    cardShadow: '0 15px 35px rgba(244, 63, 94, 0.15)',
    modalShadow: '0 25px 50px rgba(244, 63, 94, 0.2)',
    textShadow: '0 1px 3px rgba(244, 63, 94, 0.2)',
    particles: true,
    tagline: 'Elegant performance meets sophisticated design. Crafted for the modern athlete.'
  },
  
  kids: {
    background: 'bg-gradient-to-br from-yellow-100 via-green-100 to-blue-100',
    gradient: 'linear-gradient(135deg, #fef3c7 0%, #dcfce7 50%, #dbeafe 100%)',
    cardBg: 'bg-white/95',
    cardBgHex: 'rgba(255, 255, 255, 0.95)',
    sidebarBg: 'bg-yellow-50/90',
    sidebarBgHex: 'rgba(254, 252, 232, 0.9)',
    textColor: 'text-slate-700',
    textColorHex: '#334155',
    headingColor: 'text-slate-800',
    headingColorHex: '#1e293b',
    accentColor: 'text-green-600',
    accentHex: '#16a34a',
    accent: 'bg-green-500',
    accentText: 'text-white',
    secondary: 'bg-blue-500',
    border: 'border-yellow-200',
    borderHex: '#fef08a',
    mutedText: 'text-slate-500',
    mutedBg: 'bg-yellow-100',
    hoverBg: 'hover:bg-yellow-100',
    headingFont: 'font-display',
    bodyFont: 'font-body',
    cardAnimation: {
      y: 50,
      scale: 0.8,
      rotateX: 15,
      duration: 0.5,
      stagger: 0.08,
      ease: 'easeOut',
      hoverRotate: 8
    },
    imageAnimation: {
      rotateX: 15,
      rotateY: 15
    },
    iconAnimation: {
      rotate: 180,
      scale: 1.3
    },
    cardShadow: '0 15px 30px rgba(34, 197, 94, 0.2)',
    modalShadow: '0 25px 50px rgba(34, 197, 94, 0.25)',
    textShadow: '0 2px 4px rgba(34, 197, 94, 0.3)',
    particles: true,
    tagline: 'Fun, safe, and exciting gear designed to inspire the next generation of champions.'
  },
  
  gloves: {
    background: 'bg-gradient-to-br from-orange-900 via-red-900 to-orange-900',
    gradient: 'linear-gradient(135deg, #7c2d12 0%, #7f1d1d 50%, #7c2d12 100%)',
    cardBg: 'bg-orange-800/90',
    cardBgHex: 'rgba(154, 52, 18, 0.9)',
    sidebarBg: 'bg-orange-900/80',
    sidebarBgHex: 'rgba(124, 45, 18, 0.8)',
    textColor: 'text-orange-100',
    textColorHex: '#fed7aa',
    headingColor: 'text-white',
    headingColorHex: '#ffffff',
    accentColor: 'text-orange-400',
    accentHex: '#fb923c',
    accent: 'bg-orange-500',
    accentText: 'text-white',
    secondary: 'bg-red-600',
    border: 'border-orange-700',
    borderHex: '#c2410c',
    mutedText: 'text-orange-300',
    mutedBg: 'bg-orange-700',
    hoverBg: 'hover:bg-orange-700',
    headingFont: 'font-display',
    bodyFont: 'font-body',
    cardAnimation: {
      y: 35,
      scale: 0.92,
      rotateX: 8,
      duration: 0.45,
      stagger: 0.06,
      ease: 'easeOut',
      hoverRotate: 6
    },
    imageAnimation: {
      rotateX: 8,
      rotateY: 8
    },
    iconAnimation: {
      rotate: 90,
      scale: 1.15
    },
    cardShadow: '0 18px 35px rgba(251, 146, 60, 0.25)',
    modalShadow: '0 28px 55px rgba(251, 146, 60, 0.3)',
    textShadow: '0 2px 6px rgba(251, 146, 60, 0.4)',
    particles: true,
    tagline: 'Precision grip technology. Feel the power in your hands.'
  },
  
  bottles: {
    background: 'bg-gradient-to-br from-cyan-100 via-blue-100 to-teal-100',
    gradient: 'linear-gradient(135deg, #cffafe 0%, #dbeafe 50%, #ccfbf1 100%)',
    cardBg: 'bg-white/85',
    cardBgHex: 'rgba(255, 255, 255, 0.85)',
    sidebarBg: 'bg-cyan-50/80',
    sidebarBgHex: 'rgba(236, 254, 255, 0.8)',
    textColor: 'text-cyan-800',
    textColorHex: '#155e75',
    headingColor: 'text-cyan-900',
    headingColorHex: '#164e63',
    accentColor: 'text-cyan-600',
    accentHex: '#0891b2',
    accent: 'bg-cyan-500',
    accentText: 'text-white',
    secondary: 'bg-teal-500',
    border: 'border-cyan-200',
    borderHex: '#a5f3fc',
    mutedText: 'text-cyan-500',
    mutedBg: 'bg-cyan-100',
    hoverBg: 'hover:bg-cyan-100',
    headingFont: 'font-display',
    bodyFont: 'font-body',
    cardAnimation: {
      y: 25,
      scale: 0.96,
      rotateX: 3,
      duration: 0.7,
      stagger: 0.12,
      ease: 'easeInOut',
      hoverRotate: 3
    },
    imageAnimation: {
      rotateX: 3,
      rotateY: 3
    },
    iconAnimation: {
      rotate: -30,
      scale: 1.08
    },
    cardShadow: '0 12px 25px rgba(8, 145, 178, 0.18)',
    modalShadow: '0 22px 45px rgba(8, 145, 178, 0.22)',
    textShadow: '0 1px 4px rgba(8, 145, 178, 0.25)',
    particles: true,
    tagline: 'Hydration perfected. Temperature controlled. Performance optimized.'
  },
  
  bands: {
    background: 'bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900',
    gradient: 'linear-gradient(135deg, #581c87 0%, #312e81 50%, #581c87 100%)',
    cardBg: 'bg-purple-800/90',
    cardBgHex: 'rgba(107, 33, 168, 0.9)',
    sidebarBg: 'bg-purple-900/80',
    sidebarBgHex: 'rgba(88, 28, 135, 0.8)',
    textColor: 'text-purple-100',
    textColorHex: '#e9d5ff',
    headingColor: 'text-white',
    headingColorHex: '#ffffff',
    accentColor: 'text-purple-400',
    accentHex: '#a855f7',
    accent: 'bg-purple-500',
    accentText: 'text-white',
    secondary: 'bg-indigo-600',
    border: 'border-purple-700',
    borderHex: '#7c3aed',
    mutedText: 'text-purple-300',
    mutedBg: 'bg-purple-700',
    hoverBg: 'hover:bg-purple-700',
    headingFont: 'font-display',
    bodyFont: 'font-body',
    cardAnimation: {
      y: 45,
      scale: 0.88,
      rotateX: 12,
      duration: 0.55,
      stagger: 0.07,
      ease: 'easeOut',
      hoverRotate: 7
    },
    imageAnimation: {
      rotateX: 12,
      rotateY: 12
    },
    iconAnimation: {
      rotate: 270,
      scale: 1.25
    },
    cardShadow: '0 20px 40px rgba(168, 85, 247, 0.3)',
    modalShadow: '0 30px 60px rgba(168, 85, 247, 0.35)',
    textShadow: '0 2px 8px rgba(168, 85, 247, 0.5)',
    particles: true,
    tagline: 'AI-powered performance tracking. Your body, analyzed and optimized.'
  },
  
  guards: {
    background: 'bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-900',
    gradient: 'linear-gradient(135deg, #064e3b 0%, #134e4a 50%, #064e3b 100%)',
    cardBg: 'bg-emerald-800/90',
    cardBgHex: 'rgba(6, 95, 70, 0.9)',
    sidebarBg: 'bg-emerald-900/80',
    sidebarBgHex: 'rgba(6, 78, 59, 0.8)',
    textColor: 'text-emerald-100',
    textColorHex: '#d1fae5',
    headingColor: 'text-white',
    headingColorHex: '#ffffff',
    accentColor: 'text-emerald-400',
    accentHex: '#34d399',
    accent: 'bg-emerald-500',
    accentText: 'text-white',
    secondary: 'bg-teal-600',
    border: 'border-emerald-700',
    borderHex: '#047857',
    mutedText: 'text-emerald-300',
    mutedBg: 'bg-emerald-700',
    hoverBg: 'hover:bg-emerald-700',
    headingFont: 'font-display',
    bodyFont: 'font-body',
    cardAnimation: {
      y: 38,
      scale: 0.91,
      rotateX: 9,
      duration: 0.48,
      stagger: 0.065,
      ease: 'easeOut',
      hoverRotate: 5.5
    },
    imageAnimation: {
      rotateX: 9,
      rotateY: 9
    },
    iconAnimation: {
      rotate: 45,
      scale: 1.18
    },
    cardShadow: '0 16px 32px rgba(52, 211, 153, 0.22)',
    modalShadow: '0 26px 52px rgba(52, 211, 153, 0.28)',
    textShadow: '0 2px 6px rgba(52, 211, 153, 0.4)',
    particles: true,
    tagline: 'Ultimate protection meets intelligent monitoring. Guard your performance.'
  }
};

interface ThemeContextType {
  currentTheme: ThemeConfig;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(themes.all);

  const setTheme = (themeName: string) => {
    const theme = themes[themeName] || themes.all;
    setCurrentTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};