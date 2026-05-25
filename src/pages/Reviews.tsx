import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote, Star, Loader2, AlertCircle } from "lucide-react";
import { api, Review } from "../services/api";

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [text, setText] = useState("");
  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        const data = await api.getReviews();
        setReviews(data);
      } catch (err) {
        setError("Failed to load testimonials");
      } finally {
        setLoading(false);
      }
    };
    loadReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newReview = await api.addReview({
        name,
        location,
        text,
      });

      setReviews((prev) => [newReview[0], ...prev]);

      setName("");
      setLocation("");
      setText("");
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="pt-40 min-h-screen flex flex-col items-center justify-center text-gold space-y-4">
        <Loader2 className="animate-spin" size={40} />
        <p className="font-accent text-[10px] uppercase tracking-widest">
          Gathering Kind Words...
        </p>
      </div>
    );
  }

  const featured = reviews?.find((r) => r?.featured);

  const regular = reviews?.filter((r) => r && !r.featured);

  return (
    <main className="pt-40 pb-32 embroidery-pattern">
      {/* Title */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-32 text-center">
        <span className="font-accent text-gold uppercase tracking-[0.4em] text-xs block mb-6">
          Client Testimonials
        </span>
        <h1 className="text-5xl md:text-7xl font-serif mb-8 italic text-white">
          Kind Words from our Brides
        </h1>
        <div className="gradient-divider w-64 mx-auto" />
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-32">
        {/* Featured */}
        {featured && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 bg-neutral-900 border border-white/5 overflow-hidden group">
              <img
                src={
                  featured.image ||
                  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800"
                }
                alt={featured.name}
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
              />
            </div>
            <div className="lg:col-span-5 space-y-8">
              <Quote
                size={60}
                fill="#D4AF37"
                className="text-gold opacity-30"
              />
              <p className="text-3xl md:text-4xl italic font-serif leading-relaxed text-gray-200">
                "{featured.text}"
              </p>
              <div>
                <p className="font-accent text-gold font-bold">
                  {featured.name}
                </p>
                <p className="font-accent text-gray-500 text-[10px] tracking-[0.3em] uppercase mt-2">
                  {featured.location}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {regular.map((rev, i) => (
            <React.Fragment key={rev.id}>
              <div className="bg-neutral-900 border border-gold/10 p-12 flex flex-col justify-between">
                <div>
                  <Star size={20} className="text-gold mb-8" />
                  <p className="text-xl italic font-serif text-gray-300 leading-relaxed">
                    "{rev.text}"
                  </p>
                </div>
                <div className="mt-12 text-left">
                  <p className="font-accent text-gold text-xs font-bold uppercase tracking-widest">
                    {rev.name}
                  </p>
                  <p className="font-accent text-gray-500 text-[9px] tracking-[0.4em] uppercase mt-1">
                    {rev.location}
                  </p>
                </div>
              </div>
              {i === 0 && (
                <div className="aspect-[4/5] md:aspect-auto">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlMidGqELPCohgrxCaFvbiGy9BkSirs67bixioDImrqDwrIpYxHwGCqiWJVcmKQJyZjb7sdVMRAOq9WR6LhfXqV42f7RYPeBRqLXBMjOgZhUW_hWSVsy7cWhiAKgT4KZanT1p016JnB5ic8N7Ib67fqjQJ4jdzaPMwPERnr3d8OMQmuXc_NG9vSCWLRojdatavuTEQ-1x6T4hM9z8OHLDaZbLFt-GjZ-JDUDGpuHNQeigqD9jWJun1HyicRPaGOBdbBxvED3z2AiM"
                    className="w-full h-full object-cover border border-white/5 opacity-80"
                    alt="Detail"
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 mt-32">
        <h2 className="text-4xl font-serif mb-10 text-center">
          Share Your Experience
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-neutral-900 border border-gold/10 p-10"
        >
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black border border-white/10 p-4"
            required
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-black border border-white/10 p-4"
            required
          />

          <textarea
            placeholder="Your Review"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-black border border-white/10 p-4 min-h-[140px]"
            required
          />

          <button
            type="submit"
            className="bg-gold text-black px-8 py-4 uppercase tracking-widest"
          >
            Submit Review
          </button>
        </form>
      </section>
    </main>
  );
}
