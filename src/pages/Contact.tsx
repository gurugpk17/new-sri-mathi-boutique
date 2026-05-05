import React from 'react';
import { motion } from 'motion/react';
import { Quote, Send, Phone, Mail, Instagram, Facebook, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <main className="pt-40 pb-32 luxury-pattern overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <header className="mb-20">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl mb-4"
          >
            Connect with the <span className="text-gold italic">Atelier</span>
          </motion.h1>
          <div className="w-24 h-px bg-gold" />
          <p className="mt-8 text-gray-400 font-accent text-lg max-w-2xl">
            Whether seeking a bespoke bridal ensemble or exploring our heritage collections, our consultants are here to guide your journey through Indian craftsmanship.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-7 bg-neutral-900/50 backdrop-blur-sm p-10 border border-gold/10"
          >
            <h2 className="text-3xl text-gold pb-10 italic">Service Inquiry</h2>
            <form className="space-y-8" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="font-accent text-[10px] uppercase tracking-widest text-gold/60">Name</label>
                  <input className="w-full bg-transparent border-b border-white/10 focus:border-gold py-2 outline-none font-accent transition-colors" placeholder="Full Name" />
                </div>
                <div className="space-y-2">
                  <label className="font-accent text-[10px] uppercase tracking-widest text-gold/60">WhatsApp</label>
                  <input className="w-full bg-transparent border-b border-white/10 focus:border-gold py-2 outline-none font-accent transition-colors" placeholder="+91 00000 00000" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-accent text-[10px] uppercase tracking-widest text-gold/60">Email Address</label>
                <input className="w-full bg-transparent border-b border-white/10 focus:border-gold py-2 outline-none font-accent transition-colors" placeholder="atelier@example.com" />
              </div>
              <div className="space-y-2">
                <label className="font-accent text-[10px] uppercase tracking-widest text-gold/60">Service Category</label>
                <select className="w-full bg-transparent border-b border-white/10 focus:border-gold py-3 outline-none font-accent transition-colors appearance-none">
                  <option>Bespoke Bridal Wear</option>
                  <option>Heritage Silk Collection</option>
                  <option>Embroidery Restoration</option>
                  <option>Private Viewing Appointment</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-accent text-[10px] uppercase tracking-widest text-gold/60">Message</label>
                <textarea className="w-full bg-transparent border-b border-white/10 focus:border-gold py-2 outline-none font-accent transition-colors resize-none h-32" placeholder="Describe your dream ensemble..." />
              </div>
              <button className="group inline-flex items-center gap-3 border border-gold px-12 py-4 text-gold font-accent uppercase tracking-widest hover:bg-gold hover:text-luxury-bg transition-all duration-500">
                Send Inquiry
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>

          {/* Info */}
          <div className="lg:col-span-5 space-y-16">
            <div className="space-y-10">
              <div>
                <h3 className="font-accent text-[10px] text-gold uppercase tracking-[0.3em] mb-4">The Boutique</h3>
                <p className="text-3xl font-serif leading-tight italic">
                  No. 42 Heritage Lane,<br />
                  Near Old Bus Stand, Dharmapuri,<br />
                  Tamil Nadu - 636701
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-luxury-bg transition-all duration-500">
                    <Phone size={18} />
                  </div>
                  <span className="text-lg font-accent">+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-luxury-bg transition-all duration-500">
                    <Mail size={18} />
                  </div>
                  <span className="text-lg font-accent">atelier@srimathi.com</span>
                </div>
              </div>

              <div>
                <h3 className="font-accent text-[10px] text-gold uppercase tracking-[0.3em] mb-4">Follow Us</h3>
                <div className="flex gap-8">
                  <a href="#" className="font-accent text-xs hover:text-gold transition-colors flex items-center gap-2"><Instagram size={14}/> Instagram</a>
                  <a href="#" className="font-accent text-xs hover:text-gold transition-colors flex items-center gap-2"><Facebook size={14}/> Facebook</a>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative group grayscale hover:grayscale-0 transition-all duration-1000 border border-gold/10">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyBPnzRxIqHYKdm-3eZ8npTUavvkZFJCclm7TsWRhaiLLVSsB94WCzeD4sAzPHrTXNx1dLW0aOuVNcY6aKYBPM2hj-mc-MGOxmNmSlub_yCIgRM-Tfb3-JtXdqqomTCf0JNB_OfOv4RlqSE1mWARt8XnHAGvs0Y-hDcW2Y190wBdJKl2HIWRGkcRPzqcs2y0f78JpQG7Xr5U16ZaKipUiSMHZ1ilvg5wGvuPGoLKmPC3pe9jooz5A_DFRVRy70Kja6tZRIHXxcgsE" 
                alt="Map"
                className="w-full aspect-video object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gold/5 pointer-events-none" />
              <div className="absolute bottom-4 left-4 bg-neutral-950/80 backdrop-blur-md px-4 py-2 border border-gold/20 flex items-center gap-2">
                <MapPin size={12} className="text-gold" />
                <span className="font-accent text-[10px] text-gold tracking-widest uppercase">Atelier Location: Dharmapuri</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
