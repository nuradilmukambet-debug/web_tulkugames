import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Ghost, MonitorPlay, X, Code, Box, Layers } from "lucide-react";

// --- 1. ДАННЫЕ ИГР (Контент для окон) ---
const PROJECTS_DATA = {
  "Hells Bell": {
    engine: "Unity 3D",
    status: "Pre-Alpha",
    description: "Мрачный 3D хоррор. Мы работаем над системой процедурных пугающих событий и оптимизацией освещения для слабых ПК.",
    tasks: ["Запекание света", "Скрипты ИИ монстра", "Запись звуков окружения"],
    logs: "Build 0.2.1: Исправлен баг с проваливанием сквозь текстуры в главном холле."
  },
  "CubikNurika": {
    engine: "Unity 2D",
    status: "Prototyping",
    description: "Минималистичный 2D пазл. Главная цель — сделать управление кубом максимально приятным и тактильным.",
    tasks: ["Дизайн первых 10 уровней", "Система частиц при столкновении", "Меню выбора уровней"],
    logs: "Build 0.1.5: Добавлена новая механика 'Gravity Flip'."
  },
  "Slalgorod": {
    engine: "Unreal Engine 5.4",
    status: "Concept / R&D",
    description: "Масштабный проект. Slalgorod исследует тему выживания в мире, где стерты границы между сном и реальностью.",
    tasks: ["Написание сценария (Глава 1)", "Скульпт главного героя", "Тесты системы Nanite"],
    logs: "Concept Log: Завершена карта мира и основные фракции Slalgorod."
  }
};

// --- 2. ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ ---

const SysMessage = ({ text, delay }) => (
  <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay, duration: 0.5 }}>
    {text}
  </motion.p>
);

const DevModal = ({ isOpen, onClose, projectTitle }) => {
    const data = PROJECTS_DATA[projectTitle];
    if (!data) return null;
  
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-2xl"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 30, opacity: 0 }} 
              animate={{ scale: 1, y: 0, opacity: 1 }} 
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              className="bg-[#0a0a0a] border border-white/10 w-full max-w-6xl h-[85vh] overflow-hidden rounded-[40px] flex flex-col shadow-[0_0_100px_rgba(249,115,22,0.15)]"
            >
              {/* ВЕРХНЯЯ ПАНЕЛЬ (Header) */}
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <div className="flex items-center gap-6">
                  <div className="px-4 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full">
                     <span className="text-[10px] font-mono font-bold text-orange-500 uppercase tracking-[0.4em]">Project_Access_Granted</span>
                  </div>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">{projectTitle}</h2>
                </div>
                <button 
                  onClick={onClose} 
                  className="w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-full transition-all text-white border border-white/5"
                >
                  <X size={24} />
                </button>
              </div>
  
              {/* ОСНОВНОЙ КОНТЕНТ (Скроллируемый) */}
              <div className="flex-1 overflow-y-auto p-10 md:p-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                  
                  {/* ЛЕВАЯ КОЛОНКА (Инфо) - 7 частей из 12 */}
                  <div className="lg:col-span-7 space-y-12">
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <span className="px-4 py-2 bg-white/5 text-white/80 text-[10px] font-black rounded-xl border border-white/10 uppercase tracking-widest italic">{data.engine}</span>
                        <span className="px-4 py-2 bg-orange-600 text-white text-[10px] font-black rounded-xl uppercase tracking-widest shadow-lg shadow-orange-600/20">{data.status}</span>
                      </div>
                      <p className="text-2xl text-white/60 leading-relaxed font-light italic uppercase tracking-tight">
                        {data.description}
                      </p>
                    </div>
  
                    {/* ТЕРМИНАЛ / ЛОГИ */}
                    <div className="bg-black rounded-3xl p-8 border border-white/5 font-mono text-[12px] relative group overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                         <Code size={20} className="text-orange-500" />
                      </div>
                      <p className="text-orange-500 mb-6 uppercase tracking-[0.3em] font-bold underline decoration-orange-500/30 underline-offset-8 text-[10px]">>> Latest_System_Log:</p>
                      <div className="space-y-2 text-white/90 leading-relaxed">
                        <p className="opacity-40">[09:41:22] Initializing build verification...</p>
                        <p className="opacity-40">[09:41:25] Assets compression: 100%</p>
                        <p className="text-orange-400 font-bold">{data.logs}</p>
                        <p className="animate-pulse text-orange-500 inline-block w-2 h-4 bg-orange-500 ml-1 translate-y-1"></p>
                      </div>
                    </div>
                  </div>
  
                  {/* ПРАВАЯ КОЛОНКА (Задачи) - 5 частей из 12 */}
                  <div className="lg:col-span-5">
                    <div className="bg-white/[0.02] border border-white/10 rounded-[32px] p-10 space-y-10 sticky top-0">
                      <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                         <Box size={20} className="text-orange-500" />
                         <h4 className="text-[12px] font-black uppercase tracking-[0.4em] text-white/40">Current_Sprint_Tasks</h4>
                      </div>
                      
                      <div className="space-y-6">
                        {data.tasks.map((task, i) => (
                          <div key={i} className="flex items-center gap-5 group cursor-default">
                            <div className="w-6 h-6 rounded-lg border-2 border-orange-500/30 flex items-center justify-center group-hover:border-orange-500 transition-colors">
                               <div className="w-2 h-2 bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-sm" />
                            </div>
                            <span className="text-xs font-mono uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">{task}</span>
                          </div>
                        ))}
                      </div>
  
                      <div className="pt-10">
                        <div className="flex justify-between text-[10px] font-mono text-white/30 uppercase mb-4 tracking-widest">
                           <span>Global_Stability</span>
                           <span className="text-orange-500">Normal</span>
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 2, delay: 0.5 }} className="h-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.6)]" />
                        </div>
                      </div>
                    </div>
                  </div>
  
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };
// --- 3. ГЛАВНОЕ ПРИЛОЖЕНИЕ ---

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div key="loader" exit={{ opacity: 0 }} transition={{ duration: 1 }} className="fixed inset-0 z-[300] bg-black text-white flex flex-col items-center justify-center font-mono">
            <motion.div animate={{ scale: [0.95, 1, 0.95], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="text-6xl font-black text-orange-500 italic mb-20 uppercase tracking-tighter">TULKU</motion.div>
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-8 relative">
              <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 2.5 }} className="absolute inset-0 bg-orange-500" />
            </div>
            <div className="text-[10px] text-white/40 uppercase tracking-[0.2em] space-y-2 text-center">
              <SysMessage text=">> Initializing Systems..." delay={0.2} />
              <SysMessage text=">> Connecting to MukamCore... OK" delay={0.8} />
              <SysMessage text=">> System Ready." delay={2} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <DevModal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} projectTitle={selectedProject} />

      <div className="min-h-screen bg-[#fafaf8] text-black font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden">
        
        {/* NAV */}
        <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-8 z-[150] bg-[#fafaf8]/80 backdrop-blur-md border-b border-black/[0.03]">
          <div className="text-2xl font-black tracking-tighter text-orange-500 uppercase italic">TULKU<span className="text-black">GAMES</span></div>
          <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.3em] font-bold text-black/40">
            {['Games', 'Studio', 'Vision'].map((item) => (
              <a key={item} href="#" className="hover:text-black transition-colors">{item}</a>
            ))}
          </div>
          <button className="px-8 py-2.5 bg-black text-white text-[10px] uppercase tracking-[0.2em] rounded-full hover:bg-orange-600 transition-all">Community</button>
        </nav>

        {/* HERO */}
        <section className="container mx-auto px-6 md:px-12 pt-44 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            <h1 className="text-[10vw] lg:text-[7.5rem] font-black leading-[0.85] tracking-tighter mb-8 uppercase text-black">
              Cybernetic<br /><span className="text-black/20">Wilderness</span>
            </h1>
            <p className="text-xl text-black/60 max-w-sm font-light leading-relaxed mb-10">Мы создаем современные миры, где древние мифы сталкиваются с технологиями.</p>
            <button onClick={() => document.getElementById('games').scrollIntoView({ behavior: 'smooth' })} className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] py-4 pr-6 border-b border-black/10 hover:border-orange-500 transition-all">
              Explore Projects <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform text-orange-500" />
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }} className="relative aspect-square flex items-center justify-center">
            <motion.img src="/src/assets/hero-art.png" className="relative z-10 w-full h-full object-contain" />
            <div className="absolute w-full h-full bg-black/5 rounded-full blur-3xl" />
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] italic font-black text-[120px] lg:text-[200px] uppercase text-black">TULKU</div>
          </motion.div>
        </section>

        {/* GAMES SECTION */}
        <section id="games" className="py-24 bg-black text-white relative border-t border-white/5">
          <div className="container mx-auto px-6 md:px-12 space-y-20">
            <motion.div {...fadeIn} className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-12 gap-8">
              <div>
                <p className="text-orange-500 font-mono text-[10px] tracking-[0.4em] mb-4 uppercase text-orange-500">// Status: Active_Dev</p>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">Development<br/>Log</h2>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.keys(PROJECTS_DATA).map((title, index) => (
                <motion.div 
                  key={title} {...fadeIn} transition={{ delay: index * 0.1 }}
                  className="bg-white/5 rounded-3xl border border-white/[0.08] p-8 flex flex-col justify-between group hover:border-orange-500/50 transition-all duration-500"
                >
                  <div>
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-12 h-12 bg-orange-500/10 text-orange-500 rounded-2xl flex items-center justify-center border border-orange-500/20">
                        {index === 0 ? <Ghost /> : index === 1 ? <Zap /> : <MonitorPlay />}
                      </div>
                      <span className="text-[9px] font-mono text-orange-500 border border-orange-500/30 px-3 py-1 rounded uppercase">{PROJECTS_DATA[title].status}</span>
                    </div>
                    <h3 className="text-3xl font-black mb-3 uppercase group-hover:text-orange-500 transition-colors">{title}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-white/30 mb-6 font-bold">{PROJECTS_DATA[title].engine}</p>
                    <p className="text-xs text-white/50 leading-relaxed font-light mb-10">{PROJECTS_DATA[title].description}</p>
                  </div>
                  <button onClick={() => setSelectedProject(title)} className="w-full py-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-orange-600 transition-all text-[9px] font-bold uppercase tracking-[0.2em]">Check Build Status</button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="container mx-auto px-12 py-12 flex justify-between items-center text-black">
          <div className="flex gap-12">
            <div><p className="text-4xl font-black">+14K</p><p className="text-[10px] uppercase font-bold text-black/40">Souls</p></div>
            <div><p className="text-4xl font-black">03</p><p className="text-[10px] uppercase font-bold text-black/40">Realms</p></div>
          </div>
          <div className="flex gap-4 font-mono font-bold text-[10px]">
             <div className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center">GH</div>
             <div className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center">IN</div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;