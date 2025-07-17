import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ProductShowroom from '@/components/ProductShowroom';
import AthleteMode from '@/components/AthleteMode';
import TechStory from '@/components/TechStory';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <section id="hero">
          <Hero />
        </section>
        <section id="products">
          <ProductShowroom />
        </section>
        <section id="athletes">
          <AthleteMode />
        </section>
        <section id="tech">
          <TechStory />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
      <Cart />
    </div>
  );
};

export default Index;
