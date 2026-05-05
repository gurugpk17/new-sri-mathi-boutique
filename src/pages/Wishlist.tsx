import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom';
import { Trash2, MessageSquare, ArrowRight, ShoppingBag } from 'lucide-react';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  const handleBulkInquiry = () => {
    const items = wishlist.map(p => p.title).join(', ');
    const message = `Hello Sri Mathi Boutique, I'm interested in the following masterpieces: ${items}. Please provide more details.`;
    window.open(`https://wa.me/919000000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (wishlist.length === 0) {
    return (
      <main className="pt-40 pb-32 max-w-7xl mx-auto px-6 md:px-12 text-center min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-neutral-900 rounded-full flex items-center justify-center text-gray-700 mb-8 border border-white/5">
          <ShoppingBag size={40} strokeWidth={1} />
        </div>
        <h1 className="text-4xl font-serif mb-4 italic">Your Wishlist is Empty</h1>
        <p className="text-gray-500 font-accent max-w-md mx-auto mb-12">
          Discover our curated masterpieces and save your favorite designs for a personalized consultation.
        </p>
        <Link 
          to="/gallery" 
          className="inline-flex items-center gap-4 px-12 py-4 border border-gold text-gold font-accent uppercase tracking-widest hover:bg-gold hover:text-luxury-bg transition-all duration-500"
        >
          Explore Collections
          <ArrowRight size={16} />
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-40 pb-32 max-w-7xl mx-auto px-6 md:px-12 min-h-screen">
      <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <span className="font-accent text-gold uppercase tracking-[0.4em] text-xs block mb-4">Saved Designs</span>
          <h1 className="text-5xl md:text-6xl font-serif italic">Your Wishlist</h1>
        </div>
        <button 
          onClick={handleBulkInquiry}
          className="inline-flex items-center gap-4 bg-gold text-luxury-bg px-10 py-5 font-accent font-bold uppercase tracking-widest hover:bg-gold-light transition-all shadow-xl shadow-gold/10"
        >
          <MessageSquare size={18} />
          Inquire About All ({wishlist.length})
        </button>
      </header>

      <div className="grid grid-cols-1 gap-12">
        <AnimatePresence mode="popLayout">
          {wishlist.map((product) => (
            <motion.div 
              layout
              key={product.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col md:flex-row gap-8 bg-neutral-900/30 border border-white/5 p-8 group hover:border-gold/20 transition-all"
            >
              <div className="w-full md:w-48 aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/5">
                <img 
                  src={product.images[0]} 
                  alt={product.title} 
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="flex-grow flex flex-col justify-between py-2">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] text-gold font-accent uppercase tracking-widest mb-2 block">{product.category}</span>
                      <Link to={`/product/${product.id}`}>
                        <h2 className="text-3xl font-serif italic hover:text-gold transition-colors">{product.title}</h2>
                      </Link>
                    </div>
                    <button 
                      onClick={() => removeFromWishlist(product.id)}
                      className="text-gray-600 hover:text-red-500 transition-colors p-2"
                      title="Remove from wishlist"
                    >
                      <Trash2 size={20} strokeWidth={1.5} />
                    </button>
                  </div>
                  <p className="text-gray-400 font-accent text-sm mt-4 max-w-xl leading-relaxed">
                    {product.description}
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex gap-3">
                    {product.features.slice(0, 2).map((feat, i) => (
                      <span key={i} className="text-[9px] uppercase tracking-widest font-accent border border-white/10 px-3 py-1 text-gray-500">
                        {feat}
                      </span>
                    ))}
                  </div>
                  <Link 
                    to={`/product/${product.id}`}
                    className="text-gold font-accent text-[10px] uppercase tracking-widest hover:underline underline-offset-8 flex items-center gap-2"
                  >
                    View Details <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-20 p-12 border border-gold/10 bg-neutral-950 text-center space-y-8">
        <h3 className="text-2xl italic font-serif text-gray-300">A Personal Invitation</h3>
        <p className="text-gray-500 font-accent max-w-2xl mx-auto leading-relaxed">
          Your saved designs are the beginning of a custom journey. Each inquiry is handled personally by our head designer to ensure your ensemble is unique to your story.
        </p>
        <div className="flex justify-center gap-12">
           <div className="text-center">
             <p className="text-gold font-serif text-3xl mb-1">98%</p>
             <p className="text-[9px] text-gray-600 uppercase tracking-widest font-accent">Client Joy</p>
           </div>
           <div className="h-12 w-px bg-gold/10" />
           <div className="text-center">
             <p className="text-gold font-serif text-3xl mb-1">15+</p>
             <p className="text-[9px] text-gray-600 uppercase tracking-widest font-accent">Master Artisans</p>
           </div>
           <div className="h-12 w-px bg-gold/10" />
           <div className="text-center">
             <p className="text-gold font-serif text-3xl mb-1">Avg 200h</p>
             <p className="text-[9px] text-gray-600 uppercase tracking-widest font-accent">Per Masterpiece</p>
           </div>
        </div>
      </div>
    </main>
  );
}
