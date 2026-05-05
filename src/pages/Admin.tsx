import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  MessageSquare, 
  Layers, 
  ArrowUpRight, 
  Bell, 
  Search,
  Plus,
  RefreshCw,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import { api } from '../services/api';

export default function Admin() {
  const [stats, setStats] = useState({
    products: 0,
    reviews: 0,
    inquiries: 450, // mock
    uploads: 24 // mock
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [products, reviews] = await Promise.all([
          api.getProducts(),
          api.getReviews()
        ]);
        setStats(prev => ({
          ...prev,
          products: products.length,
          reviews: reviews.length
        }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  const statsDisplay = [
    { label: 'Total Designs', value: stats.products, icon: Layers, trend: '+12%' },
    { label: 'Total Inquiries', value: stats.inquiries, icon: MessageSquare, trend: '+5%' },
    { label: 'Total Reviews', value: stats.reviews, icon: Users, trend: '+8%' },
    { label: 'Recent Uploads', value: stats.uploads, icon: ImageIcon, trend: '+15%' },
  ];

  const recentInquiries = [
    { name: 'Ananya S.', service: 'Bridal Aari Work', state: 'Pending', time: '2 mins ago' },
    { name: 'Megha R.', service: 'Machine Embroidery', state: 'Responded', time: '1 hour ago' },
    { name: 'Sanya V.', service: 'Custom Tassels', state: 'Scheduled', time: '3 hours ago' },
    { name: 'Ritu P.', service: 'Bespoke Saree', state: 'Completed', time: 'Yesterday' },
  ];

  if (loading) {
    return (
      <div className="pt-40 min-h-screen flex flex-col items-center justify-center text-gold space-y-4">
        <Loader2 className="animate-spin" size={40} />
        <p className="font-accent text-[10px] uppercase tracking-widest">Accessing Atelier Dashboard...</p>
      </div>
    );
  }

  return (
    <main className="pt-32 pb-20 bg-neutral-950 min-h-screen px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl text-white font-serif italic">Admin Dashboard</h1>
            <p className="text-gray-500 font-accent text-sm tracking-widest uppercase">Executive Management Overview</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => window.location.reload()}
              className="p-3 bg-neutral-900 border border-gold/20 text-gold rounded-full hover:bg-gold/10 transition-colors"
            >
              <RefreshCw size={18} />
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-gold text-luxury-bg font-accent uppercase tracking-widest text-[10px] font-bold hover:bg-gold-light transition-all">
              <Plus size={14} /> New Design
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsDisplay.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-neutral-900 border border-white/5 p-8 group hover:border-gold/30 transition-all"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-gold/5 text-gold border border-gold/10">
                  <stat.icon size={20} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-accent text-emerald-500 flex items-center gap-1">
                  <ArrowUpRight size={10} /> {stat.trend}
                </span>
              </div>
              <h3 className="text-gray-500 font-accent text-[10px] uppercase tracking-widest mb-2">{stat.label}</h3>
              <p className="text-4xl font-serif text-white italic">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Inquiries */}
          <div className="lg:col-span-8 bg-neutral-900 border border-white/5">
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-xl italic">Recent Inquiries</h3>
              <div className="flex bg-neutral-800 p-1 rounded-full px-4 gap-2 text-gray-500">
                <Search size={14} className="mt-1" />
                <input className="bg-transparent text-[10px] uppercase tracking-widest outline-none" placeholder="Search Atelier..." />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 font-accent text-[9px] uppercase tracking-[0.2em] text-gray-500">
                    <th className="p-8">Client</th>
                    <th className="p-8">Requested Service</th>
                    <th className="p-8">Status</th>
                    <th className="p-8">Activity</th>
                  </tr>
                </thead>
                <tbody className="font-accent text-xs">
                  {recentInquiries.map((inq, idx) => (
                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors group cursor-pointer">
                      <td className="p-8 font-bold text-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-[10px] text-gold">
                            {inq.name[0]}
                          </div>
                          {inq.name}
                        </div>
                      </td>
                      <td className="p-8 text-gray-400 italic font-serif text-sm">{inq.service}</td>
                      <td className="p-8">
                        <span className={`px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold ${
                          inq.state === 'Pending' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 
                          inq.state === 'Responded' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                          inq.state === 'Scheduled' ? 'bg-purple-500/10 text-purple-500 border border-purple-500/20' :
                          'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                        }`}>
                          {inq.state}
                        </span>
                      </td>
                      <td className="p-8 text-gray-500 text-[10px] uppercase tracking-widest">{inq.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-8 text-center">
              <button className="font-accent text-[10px] uppercase tracking-[0.3em] text-gold hover:underline underline-offset-4">View All Business Activity</button>
            </div>
          </div>

          {/* Quick Actions / Notifications */}
          <div className="lg:col-span-4 space-y-8">
             <div className="bg-neutral-900 border border-white/5 p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl italic">Quick Alerts</h3>
                  <div className="relative">
                    <Bell size={18} className="text-gold" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-gold rounded-full" />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="p-4 bg-gold/5 border-l-2 border-gold flex gap-4">
                    <div className="min-w-[40px] h-10 bg-gold/10 flex items-center justify-center text-gold">
                      <ImageIcon size={14} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-300 font-accent leading-relaxed">Storage at 85%. Consider upgrading for high-res design vault.</p>
                      <span className="text-[9px] text-gray-500 uppercase tracking-widest mt-2 block">10 mins ago</span>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 border-l-2 border-white/20 flex gap-4">
                    <div className="min-w-[40px] h-10 bg-white/10 flex items-center justify-center text-gray-400">
                      <Users size={14} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-300 font-accent leading-relaxed">3 new reviews pending approval for publication.</p>
                      <span className="text-[9px] text-gray-500 uppercase tracking-widest mt-2 block">2 hours ago</span>
                    </div>
                  </div>
                </div>
             </div>

             <div className="bg-gold border border-gold p-8 text-luxury-bg shadow-2xl shadow-gold/20">
                <h3 className="text-2xl font-serif italic mb-2">Upgrade Atelier Space</h3>
                <p className="text-[10px] uppercase tracking-widest font-black mb-6 opacity-60">Unlock Infinite Designs</p>
                <div className="flex justify-between items-end">
                   <p className="text-sm font-accent opacity-80 max-w-[150px]">Get access to priority AI design tools & cloud vault.</p>
                   <button className="bg-luxury-bg text-gold p-3 rounded-full hover:scale-110 transition-transform">
                     <ArrowUpRight size={20} />
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}
