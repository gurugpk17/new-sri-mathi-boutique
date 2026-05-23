import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Loader2, AlertCircle } from 'lucide-react';

const categories = [
  "All",
  "Luxury Collection",
  "Bridal Couture",
  "Atelier Series",
];

interface Product {
  id: string;
  title: string;
  images: string[];
}

export default function Gallery() {
  
  const [activeCategory, setActiveCategory] =  useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);

        const data = await api.getProducts();

        setProducts(data);

        setError(null);
      } catch (err) {
        console.error(err);

        setError(
          'Our artisans are resting. Please check back later.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts =
  activeCategory === "All"
    ? products
    : products.filter(
        (item) => item.category === activeCategory
      );

  if (loading) {
    return (
      <div className="pt-40 min-h-screen flex flex-col items-center justify-center text-gold space-y-4">
        <Loader2 className="animate-spin" size={40} />

        <p className="font-accent text-[10px] uppercase tracking-widest">
          Entering the Atelier...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-40 min-h-screen flex flex-col items-center justify-center text-gray-500 space-y-4">
        <AlertCircle
          size={40}
          className="text-red-900/50"
        />

        <p className="font-accent text-[10px] uppercase tracking-widest">
          {error}
        </p>
      </div>
    );
  }

  return (
    <main className="pt-40 luxury-pattern min-h-screen">
      {/* Header */}

      <header className="max-w-7xl mx-auto px-6 md:px-12 mb-20 text-center">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-5xl md:text-6xl font-serif mb-4"
        >
          The Atelier Gallery
        </motion.h1>

        <p className="font-accent text-gold uppercase tracking-[0.2em] text-xs">
          A curated showcase of ancestral craftsmanship and
          modern luxury
        </p>

        <div className="mt-12 flex justify-center items-center">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>
      </header>

{/* Category Bar */}

<section className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
  <div className="flex flex-wrap justify-center gap-4">
    {categories.map((category) => (
      <button
        key={category}
        onClick={() =>
          setActiveCategory(category)
        }
        className={`px-6 py-2 border uppercase tracking-widest text-xs transition-all duration-300 ${
          activeCategory === category
            ? "bg-gold text-black border-gold"
            : "border-gold/20 text-gold hover:border-gold"
        }`}
      >
        {category}
      </button>
    ))}
  </div>
</section>

      {/* Products Grid */}

      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-32">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">

            {filteredProducts.flatMap((item) =>
  item.images.map((image, index) => (
    <motion.div
      layout
      key={`${item.id}-${index}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="mb-8 group relative overflow-hidden bg-neutral-900 border border-white/5 cursor-pointer"
    >
      <Link to={`/product/${item.id}`}>
        <img
          src={image || "/placeholder.jpg"}
          alt={item.title}
          className="w-full h-auto grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
        />

        <div className="absolute inset-0 bg-luxury-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 backdrop-blur-sm">
          <h3 className="text-xl text-white mb-4 italic">
            {item.title}
          </h3>

          <div className="h-px w-12 bg-gold mb-4" />

          <span className="font-accent text-[10px] text-white/50 uppercase tracking-widest group-hover:text-gold transition-colors">
            View Detail
          </span>
        </div>
      </Link>
    </motion.div>
  ))
)}
          </AnimatePresence>
        </motion.div>
      </section>
    </main>
  );
}