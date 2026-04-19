"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { Compass, GraduationCap, ChevronRight, Sparkles, Search, Globe, Zap, Shield } from "lucide-react";
import { useEffect } from "react";

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <main className="relative min-h-screen bg-[#020202] text-white overflow-hidden flex flex-col items-center">
      
      {/* 1. Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      {/* 2. Top Navigation */}
      <nav className="relative z-50 mt-8">
        <div className="flex items-center gap-6 bg-white/[0.03] backdrop-blur-2xl border border-white/10 px-6 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase">
          <Link href="/" className="text-white">Home</Link>
          <Link href="/colleges" className="text-white/40 hover:text-white transition-colors">Universities</Link>
          <div className="w-[1px] h-3 bg-white/20" />
          <Link href="/ai" className="text-blue-400">AI Beta</Link>
        </div>
      </nav>

      {/* 3. Hero Header */}
      <div className="relative z-10 flex flex-col items-center text-center mt-20 mb-12">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-[10px] text-blue-400 font-bold tracking-[0.5em] uppercase mb-4"
        >
          Career Builder MVP
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-medium tracking-tighter">
          Navigate Your <span className="text-white/40 italic font-light">Future</span>
        </h1>
      </div>

      {/* 4. MAIN CENTERED CARDS */}
      <div className="relative z-20 flex flex-col md:flex-row gap-6 px-6">
        <FloatingActionCard 
          mouseX={mouseX} mouseY={mouseY} factor={30}
          icon={<Search size={22} className="text-blue-400" />}
          title="College Selector"
          tag="Path A"
          desc="Not sure which college to choose? Filter through 500+ Indian universities based on your 12th score."
          link="/knows-branch"
        />

        <FloatingActionCard 
          mouseX={mouseX} mouseY={mouseY} factor={30}
          icon={<Sparkles size={22} className="text-purple-400" />}
          title="AI Navigator"
          tag="Path B"
          desc="Not sure? Let AI analyze your interests and suggest a career."
          link="/exploring"
        />
      </div>

      {/* 5. SIDE DECORATIVE ELEMENTS (Parallax) */}
      {/* Left Side Elements */}
      <SideElement mouseX={mouseX} mouseY={mouseY} factor={15} className="top-1/4 left-10 md:left-20" label="Tier 1" icon={<Shield size={14}/>} />
      <SideElement mouseX={mouseX} mouseY={mouseY} factor={45} className="bottom-1/3 left-5 md:left-40" label="NIRF Ranked" icon={<Globe size={14}/>} />
      
      {/* Right Side Elements */}
      <SideElement mouseX={mouseX} mouseY={mouseY} factor={20} className="top-1/3 right-10 md:right-24" label="High Package" icon={<Zap size={14}/>} />
      <SideElement mouseX={mouseX} mouseY={mouseY} factor={50} className="bottom-1/4 right-5 md:right-32" label="AI Verified" icon={<Sparkles size={14}/>} />

      {/* Footer Text */}
      <div className="mt-auto mb-10 text-[9px] text-white/20 uppercase tracking-[0.5em]">
        Propelling Indian Students Forward
      </div>
    </main>
  );
}

// THE MAIN NAVIGATION CARDS
function FloatingActionCard({ mouseX, mouseY, factor, icon, title, tag, desc, link }: any) {
  const x = useSpring(useTransform(mouseX, (v: number) => v / factor), { stiffness: 150, damping: 30 });
  const y = useSpring(useTransform(mouseY, (v: number) => v / factor), { stiffness: 150, damping: 30 });

  return (
    <motion.div style={{ x, y }} className="group">
      <Link href={link}>
        <div className="w-full md:w-[320px] p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl transition-all duration-500 hover:bg-white/[0.07] hover:border-white/20 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)]">
          <div className="flex justify-between items-start mb-8">
            <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/10">{icon}</div>
            <div className="text-[9px] font-bold text-white/30 tracking-widest uppercase py-1 px-2 border border-white/5 rounded-md">{tag}</div>
          </div>
          <h3 className="text-xl font-medium mb-3 tracking-tight">{title}</h3>
          <p className="text-sm text-white/40 leading-relaxed font-light mb-8">{desc}</p>
          <div className="flex items-center gap-2 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
            Enter Dashboard <ChevronRight size={12} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// THE DECORATIVE SIDE NODES
function SideElement({ mouseX, mouseY, factor, className, label, icon }: any) {
  const x = useSpring(useTransform(mouseX, (v: number) => v / factor), { stiffness: 100, damping: 40 });
  const y = useSpring(useTransform(mouseY, (v: number) => v / factor), { stiffness: 100, damping: 40 });

  return (
    <motion.div 
      style={{ x, y }} 
      className={`absolute hidden lg:flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/[0.01] backdrop-blur-sm opacity-30 ${className}`}
    >
      <div className="text-white/60">{icon}</div>
      <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/40">{label}</span>
    </motion.div>
  );
}