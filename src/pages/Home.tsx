import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, PenTool, Sparkles, PhoneCall, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Product } from '../data/products';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <main className="luxury-pattern">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCR0bBX6VR1g154lk3pCiqARAdCKB4iV6aw4zE4SfxdnoHNnHGEOjwiGpPmoCKzX9tFQBCaBp91icqpqOTpAGxiP1IZIP9mGZcrM5DVAF0zUH9IrUnzgjdC0YMScJsGxaWAn5kZGDkY_0HrttftBkfxnxuFiIpvRCgIXyiuLiXBUIAy2DFoANpWmmjeZcfuoUhvs-L-C2fdJuCFCcGNhzj9G4EJpkrYIbJTxaYr3eG6wngSDSA151QD3qduD1JGudcpcF4_T-iYhZ8" 
            className="w-full h-full object-cover opacity-60"
            alt="Hero background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-bg/40 via-luxury-bg/20 to-luxury-bg" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-serif leading-tight mb-6"
          >
            Timeless Artistry.<br />
            <span className="italic text-gold">Handcrafted Elegance.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-xl text-gray-400 font-accent max-w-2xl mx-auto mb-12"
          >
            Bespoke Bridal Blouses & Exquisite Embroidery from the heart of Dharmapuri.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link 
              to="/gallery" 
              className="group inline-flex items-center gap-4 px-12 py-4 border border-gold text-gold font-accent uppercase tracking-widest hover:bg-gold hover:text-luxury-bg transition-all duration-500"
            >
              Explore Collections
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Masterpieces Section */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gold/10 pb-8">
          <div>
            <span className="font-accent text-gold uppercase tracking-[0.3em] text-xs block mb-4">Curated Selections</span>
            <h2 className="text-4xl md:text-5xl">Masterpieces</h2>
          </div>
          <Link to="/gallery" className="hidden md:block font-accent text-gold/60 hover:text-gold underline underline-offset-8 decoration-gold/20 hover:decoration-gold transition-all uppercase text-[10px] tracking-widest">
            View All Designs
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 min-h-[400px]">
          {loading ? (
             <div className="col-span-full flex items-center justify-center text-gold">
               <Loader2 className="animate-spin" />
             </div>
          ) : (
            products.map((item, idx) => (
              <motion.div 
                key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className={`group flex flex-col space-y-6 ${idx === 1 ? 'md:translate-y-12' : ''}`}
            >
              <Link to={`/product/${item.id}`} className="block">
                <div className="aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/5 relative">
                  <img 
                    src={item.images[0]} 
                    alt={item.title}
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-luxury-bg/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8 backdrop-blur-[2px]">
                     <span className="font-accent text-white uppercase text-[10px] tracking-widest">View details</span>
                  </div>
                </div>
              </Link>
              <div className="space-y-2">
                <span className="font-accent text-[10px] text-gold/60 uppercase tracking-widest">{item.category}</span>
                <Link to={`/product/${item.id}`}>
                  <h3 className="text-xl group-hover:text-gold transition-colors">{item.title}</h3>
                </Link>
                <div className="w-12 h-px bg-gold/30 group-hover:w-full transition-all duration-700" />
              </div>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-neutral-950 border-y border-gold/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none embroidery-pattern" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-16 text-center relative z-10">
          <div className="space-y-6 group">
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full border border-gold/20 group-hover:bg-gold/10 transition-all duration-500 text-gold">
              <Sparkles size={28} strokeWidth={1} />
            </div>
            <h4 className="text-2xl text-gold">Bridal Blouses</h4>
            <p className="text-gray-500 leading-relaxed font-accent">Exquisite, hand-tailored blouses featuring heavy bridal aari and zardosi work.</p>
          </div>
          <div className="space-y-6 group">
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full border border-gold/20 group-hover:bg-gold/10 transition-all duration-500 text-gold">
              <PenTool size={28} strokeWidth={1} />
            </div>
            <h4 className="text-2xl text-gold">Digital Embroidery</h4>
            <p className="text-gray-500 leading-relaxed font-accent">Modern precision-driven designs that blend traditional motifs with digital execution.</p>
          </div>
          <div className="space-y-6 group">
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full border border-gold/20 group-hover:bg-gold/10 transition-all duration-500 text-gold">
              <Star size={28} strokeWidth={1} />
            </div>
            <h4 className="text-2xl text-gold">Custom Aari</h4>
            <p className="text-gray-500 leading-relaxed font-accent">Unique, bespoke designs conceptualized and handcrafted by our master artisans.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block p-4 bg-gold/5 border border-gold/15 mb-8">
            <div className="w-px h-12 bg-gold mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl mb-4">Start Your Journey</h2>
            <p className="text-gray-400 font-accent mb-12">Experience the pinnacle of bespoke tailoring. Let's create your masterpiece together.</p>
          </div>
          <div>
            <a 
              href="https://wa.me/919786316017" 
              className="inline-flex items-center gap-4 px-10 py-5 bg-gold text-luxury-bg font-accent font-bold uppercase tracking-widest hover:bg-gold-light transition-all shadow-xl shadow-gold/10"
            >
              <PhoneCall size={20} />
              Connect via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
