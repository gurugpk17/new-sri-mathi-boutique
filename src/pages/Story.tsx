import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Diamond, History, Brush } from 'lucide-react';

export default function Story() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover opacity-40 shadow-inner" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkRVucw8o848G-zzZOcEPT6oZkt30FF_smjNmuZnxcseziMhItc2lCv-QKeR7rNAWSDJwevZrVMqLmgY_3E7jaYXCTiLlO8X_hLH8eNKMp9cR_NFe4ehcy2Kw0xhOHTW8UEJtLanaV7snsbFwigpsc0w3S7b4Wm62h-YmN8qTtsjZVodhY_i97ym291pPef7BAtmPDXQJ2waf1SJnz8mpUV3Cczbf_SW_512nDzEEq2FdAo64_u3fE7fayDL1L13K3V9NOoxFQQFs" 
            alt="Artisanal Heritage"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-bg via-transparent to-luxury-bg" />
        </div>
        <div className="relative z-10 space-y-6 max-w-4xl">
          <p className="font-accent text-xs text-gold uppercase tracking-[0.4em]">The Digital Atelier</p>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl leading-tight"
          >
            Woven in Tradition,<br /><span className="italic text-gold">Tailored for Today.</span>
          </motion.h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-8" />
        </div>
      </section>

      {/* Heritage Content */}
      <section className="px-6 md:px-12 py-32 max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center">
        <div className="relative group">
          <div className="absolute -inset-4 border border-gold/10 transition-all duration-700 group-hover:inset-0" />
          <img 
            className="w-full aspect-[4/5] object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBicq3omhvgCgEJXz9jAez0UegAABKyRfnr-GkRhuHt0hPEael6Zsg4fwRSYC5Xc8vrkhbDXwuQDEQXj4bGgijHy3GQjc-61CIHzHDd-DqgtdMzUox4liBKyPZbCz4y1mq8D1z10mJWH9Ps0XA4_eND6fHrGQXTozQbz8_0FBrtOj7Qmc09awzXejSCysQbFqFNOWSVPKrJC9cy5KpTGJutj71DsYUZEzPtcWbcD4T7yRJB0JTqzRidjB6xi3Ji-_4T6daBKGtHoM" 
            alt="Heritage scene"
          />
        </div>
        <div className="space-y-8">
          <h2 className="text-4xl md:text-5xl">Our Heritage</h2>
          <div className="space-y-6 text-gray-400 font-accent text-lg leading-relaxed">
            <p>Rooted in the ancient landscapes of Dharmapuri, Sri Mathi began as a quiet tribute to the forgotten rhythms of the handloom. For generations, our family has lived amidst the gentle clacking of wooden shuttles.</p>
            <p>What started as a small community of weavers has evolved into a global atelier, preserving the sacred geometry of South Indian textiles while embracing modern luxury.</p>
          </div>
          <button className="border border-gold px-10 py-4 font-accent text-[10px] text-gold hover:bg-gold hover:text-luxury-bg transition-all duration-500 uppercase tracking-widest">
            Discover Dharmapuri
          </button>
        </div>
      </section>

      {/* Craft Section */}
      <section className="bg-neutral-950 py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl">The Craft of Aari</h2>
            <p className="text-gray-500 font-accent max-w-2xl mx-auto italic">A meditative dance of needle and thread, where every stitch tells a story of patience.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto">
            <div className="md:col-span-8 relative overflow-hidden group aspect-video md:aspect-auto">
              <img 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7eAmyPwewBqVStjnoNDo4f8tRgfdIUXZePff4IDXDpN41Plm62oG8Ei7yfFNqvs9Og_0qnIQ7K7B9BycwB2zvPGk3L65xA5q1rjXyjb9joAsbrxW1jJhosinHYCj5Kk4SnkuV_SBd5O0BL7xmPr5mQ-SbYDQoCuo444eXZIG1Z0WOHl4FKWcXzXvfbACIZ-2dvnpNjYAir-Ob9JUSutbziR9D82v8oxbaUlMa-dhTwhlVvshEDeq49l1MIxz_j4A-KEVL_ubUY58" 
                alt="Embroidery work"
              />
              <div className="absolute inset-0 bg-neutral-950/40 flex items-end p-12">
                <div>
                  <h3 className="text-3xl mb-2 italic">Sacred Geometry</h3>
                  <p className="text-gray-300 font-accent">Intricate patterns derived from ancient temple carvings.</p>
                </div>
              </div>
            </div>
            <div className="md:col-span-4 flex flex-col gap-8">
              <div className="flex-1 min-h-[300px]">
                <img 
                  className="w-full h-full object-cover grayscale" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7KBjsnf5CnsPbim1KoXuVvPRLEE2g9DlpBi6IcBEoNvlIrNMis4jQYdp7wX7z3FwDm3AaIwqLSipZ_nqxjbuSY-mW1xIh2THQ4L-brRI8dg0J6pB-YcQrbtKcPmTUNrVtgVqqVOSKqbhkTG7_TtOpiqPnAUmeJKoXxyHBh7koplIX0XLEejpEMPKw3rhQrA0jJg4y-g_wkgb5PSkn4n158i85ZiuoBp7ULUJaN6tfJKpEy5kbjJYvcx-EPTqdi1ckWOjUkzLQ31Y" 
                  alt="Materials"
                />
              </div>
              <div className="flex-1 bg-neutral-900 p-12 flex flex-col justify-center border border-gold/10">
                <Brush size={32} className="text-gold mb-6" />
                <h3 className="text-2xl mb-4 italic">Hand Embroidery</h3>
                <p className="text-gray-500 font-accent text-sm">Each bespoke piece requires over 200 hours of manual labor by our master artisans.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 px-6 md:px-12 bg-luxury-bg">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-16">
          {[
            { icon: Leaf, title: "Ethical Sourcing", desc: "We partner directly with weavers to ensure fair wages." },
            { icon: Diamond, title: "Unrivaled Quality", desc: "Only the finest silk and genuine metallic threads." },
            { icon: History, title: "Living Archive", desc: "Maintaining ancestral patterns to prevent them from fading." }
          ].map((val, idx) => (
            <div key={idx} className="flex-1 min-w-[280px] text-center space-y-4">
              <val.icon className="mx-auto text-gold" size={36} strokeWidth={1} />
              <h4 className="text-2xl italic">{val.title}</h4>
              <p className="text-gray-500 font-accent text-sm leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
