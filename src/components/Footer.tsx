import { Link } from 'react-router-dom';
import { Share2, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-gold/10 pt-20 pb-10 flex flex-col items-center px-6">
      <div className="max-w-7xl w-full flex flex-col items-center">
        <Link to="/" className="text-xl font-serif tracking-[0.4em] text-gold mb-8 uppercase hover:text-gold-light transition-colors">
          SRI MATHI
        </Link>
        
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 mb-12 font-accent text-[10px] uppercase tracking-widest text-gray-500">
          <Link to="/story" className="hover:text-gold hover:underline decoration-gold/30 underline-offset-8 transition-all">Heritage</Link>
          <Link to="/gallery" className="hover:text-gold hover:underline decoration-gold/30 underline-offset-8 transition-all">Collections</Link>
          <button className="hover:text-gold hover:underline decoration-gold/30 underline-offset-8 transition-all">Sustainability</button>
          <Link to="/contact" className="hover:text-gold hover:underline decoration-gold/30 underline-offset-8 transition-all">Contact</Link>
        </div>

        <div className="flex gap-6 mb-8 text-gold/60">
          <button className="hover:text-gold transition-colors"><Share2 size={18} /></button>
          <button className="hover:text-gold transition-colors"><Mail size={18} /></button>
        </div>

        <div className="w-full max-w-sm h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-8"></div>

        <p className="text-center font-accent text-[10px] text-gray-500 tracking-widest leading-relaxed">
          © 2026 Sri Mathi Boutique. All rights reserved. Handcrafted with passion in India.
        </p>
      </div>
    </footer>
  );
}
