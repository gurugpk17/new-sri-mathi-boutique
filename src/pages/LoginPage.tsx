import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Lock, ArrowRight, Loader2, Check, Shield, MapPin, ExternalLink } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulate login
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      if (username === 'admin' && password === 'password') {
        setIsSuccess(true);
      } else {
        throw new Error('Invalid identification code or security key.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const backgroundImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuD4SgcurmzgX9ULwLjd80BtD3URT3X8KFCxcY4I5xQhyoSemAJ-aQgoGpJ318Ua9W-VeDjtst489DM8FppYUtOmu2NFRQUVl6RJInG2WZIID_vZpYS83QeQ0OZLCHZK80MnkbI3-G702qsLwmKJkpS053zM-vDzeADD3DnenrF_6mwFTSnEPTfoSq1QwutmLCixAgkHQOlhqSqjcVU6EqrAj7XR9heOT8upo1MEtE67rtI5COPc1M_8DYQTMKh7dbUlHpXc9ZE3ll8";

  return (
    <div id="login_container" className="relative min-h-screen flex flex-col lg:flex-row bg-background overflow-hidden selection:bg-secondary/30">
      {/* Background Decoration */}
      <div className="fixed inset-0 pattern-bg pointer-events-none" />

      {/* Left Side: Editorial Image Section */}
      <div className="relative hidden lg:flex lg:w-1/2 h-screen overflow-hidden group">
        <motion.img 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="h-full w-full object-cover" 
          alt="Intricate Zardosi embroidery" 
          src={backgroundImage} 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/20 to-background" />
        <div className="absolute inset-0 bg-background/40 mix-blend-multiply" />
        
        {/* Minimal Branding in Image Area */}
        <div className="absolute bottom-16 left-16">
          <div className="flex items-center gap-4 rotate-[-90deg] origin-left translate-y-[-100%] opacity-40">
            <span className="font-sans text-[10px] tracking-[0.6em] text-secondary font-semibold whitespace-nowrap">MCMXCII • HERITAGE</span>
            <div className="h-[1px] w-24 bg-secondary" />
          </div>
        </div>
      </div>

      {/* Right Side: Login Content Section */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 lg:px-16 relative z-10">
        
        {/* Mobile Background Image (Only visible on small screens) */}
        <div className="fixed inset-0 lg:hidden opacity-20 pointer-events-none">
          <img 
            alt="" 
            className="h-full w-full object-cover" 
            src={backgroundImage} 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-background/80" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[440px]"
        >
          {/* Brand Logo */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-secondary text-2xl lg:text-3xl tracking-[0.25em] uppercase mb-4">Sri Mathi</h2>
            <div className="h-px w-12 bg-secondary/40 mx-auto" />
          </div>

          {/* Glassmorphism Form Container */}
          <div className="glass-panel border border-secondary/20 p-8 lg:p-12 shadow-[0_40px_100px_-10px_rgba(0,0,0,0.8)] relative overflow-hidden rounded-sm">
            <div className="relative z-10">
              <header className="mb-10">
                <h1 className="font-serif text-3xl text-on-background mb-3">Admin Login</h1>
                <p className="font-sans text-[10px] text-outline tracking-[0.25em] leading-relaxed uppercase font-semibold">
                  ACCESS MANAGEMENT PORTAL
                </p>
              </header>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Input Group: Username */}
                <div className="group">
                  <label className="font-sans text-secondary text-[10px] font-semibold block mb-2 opacity-60 group-focus-within:opacity-100 transition-all duration-300 uppercase">
                    AUTHORIZED USERNAME
                  </label>
                  <div className="relative">
                    <input 
                      id="username"
                      className="w-full bg-transparent border-b border-outline/20 focus:border-secondary transition-all duration-500 py-3 outline-none text-on-background placeholder:text-outline/30 font-sans" 
                      placeholder="Enter Your Username" 
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      autoComplete="username"
                    />
                    <User className="absolute right-0 top-3 w-4 h-4 text-outline/30 group-focus-within:text-secondary transition-colors" />
                  </div>
                </div>

                {/* Input Group: Password */}
                <div className="group">
                  <label className="font-sans text-secondary text-[10px] font-semibold block mb-2 opacity-60 group-focus-within:opacity-100 transition-all duration-300 uppercase">
                    PASSWORD
                  </label>
                  <div className="relative">
                    <input 
                      id="password"
                      className="w-full bg-transparent border-b border-outline/20 focus:border-secondary transition-all duration-500 py-3 outline-none text-on-background placeholder:text-outline/30 font-sans" 
                      placeholder="••••••••" 
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                    />
                    <Lock className="absolute right-0 top-3 w-4 h-4 text-outline/30 group-focus-within:text-secondary transition-colors" />
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-error text-[12px] font-sans tracking-wide"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Form Metadata Row */}
                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-3 cursor-pointer group/check">
                    <div className="relative">
                      <input className="sr-only peer" type="checkbox" />
                      <div className="w-4 h-4 border border-outline/30 rounded-sm flex items-center justify-center transition-all peer-checked:bg-secondary peer-checked:border-secondary group-hover/check:border-secondary">
                        <Check className="w-3 h-3 text-background hidden peer-checked:block" />
                      </div>
                    </div>
                    <span className="font-sans text-[10px] font-semibold text-outline/60 group-hover/check:text-on-background transition-colors uppercase">
                      Keep Session Active
                    </span>
                  </label>
                  <button type="button" className="font-sans text-[10px] font-semibold text-secondary/50 hover:text-secondary transition-all uppercase tracking-tighter">
                    Forgot Password?
                  </button>
                </div>

                {/* Submission Button */}
                <button 
                  id="sign_in_button"
                  disabled={isLoading || isSuccess}
                  className="w-full mt-4 bg-secondary text-background py-5 font-sans font-semibold text-[12px] tracking-[0.4em] hover:bg-white hover:text-black hover:tracking-[0.5em] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-700 flex items-center justify-center gap-4 shadow-[0_10px_30px_-5px_rgba(233,193,118,0.3)] group/btn"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : isSuccess ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <>
                      SIGN IN
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-500" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="mt-12 opacity-40">
            <div className="flex flex-col items-center gap-4">
              <p className="font-sans font-semibold text-[8px] tracking-[0.4em] mt-2 uppercase">SRI MATHI HANDCRAFTED © 2026</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md p-6"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(233,193,118,0.5)]">
                <Check className="w-10 h-10 text-background" />
              </div>
              <h2 className="font-serif text-4xl text-on-background mb-4">Welcome back</h2>
              <p className="font-sans text-secondary/60 tracking-[0.2em] mb-12 uppercase">Authorization protocols complete</p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="inline-flex items-center gap-3 text-white border-b border-white/20 pb-1 hover:border-secondary hover:text-secondary transition-all"
              >
                Access Dashboard <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
