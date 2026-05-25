import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Heart, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import logo from "../assets/logo2.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { wishlist } = useWishlist();

  const navLinks = [
    { name: 'Collections', path: '/' },
    { name: 'Artisanal Story', path: '/story' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-gold/10 shadow-[0_4px_20px_rgba(212,175,55,0.05)]">
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-4 md:py-6 flex justify-between items-center gap-4">
        <Link to="/" className="text-lg md:text-2xl font-serif tracking-[0.2em] md:tracking-[0.3em] text-gold hover:text-gold-light transition-colors uppercase flex items-center gap-1 md:gap-2 flex-shrink-0">
          <img src={logo} alt="Sri Mathi Logo" className="h-8 md:h-10" />
          <h5 className="hidden sm:block text-sm md:text-base">Sri Mathi</h5>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `font-accent uppercase tracking-[0.2em] text-[10px] transition-all duration-500 hover:text-gold ${
                  isActive ? 'text-gold border-b border-gold pb-1' : 'text-gray-400'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4 md:gap-6 text-gold">
          <Link to="/wishlist" className="hover:text-gold-light transition-colors relative">
            <Heart size={18} className="md:w-5 md:h-5" strokeWidth={1.5} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-luxury-bg text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/login" className="hover:text-gold-light transition-colors hidden sm:block">
            <User size={18} className="md:w-5 md:h-5" strokeWidth={1.5} />
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-neutral-900 border-b border-gold/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="font-accent uppercase tracking-[0.2em] text-xs text-gray-400 hover:text-gold"
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
