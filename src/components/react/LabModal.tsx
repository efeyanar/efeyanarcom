import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SnakeGame from '@react/SnakeGame';

export default function LabModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-99999 flex items-center justify-center p-4 md:p-6 bg-[#080807]/95 backdrop-blur-2xl text-[#E8E8E3]"
        >
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative z-100000 w-full max-w-2xl bg-[#121211] border border-[#E8E8E3]/10 rounded-[2.5rem] md:rounded-[3rem] p-6 pt-20 md:p-14 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-y-auto max-h-[95vh]"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 md:top-8 md:right-8 text-[10px] font-black uppercase tracking-[0.2em] text-[#E8E8E3]/40 hover:text-[#E8E8E3] transition-all py-2 px-4 border border-[#E8E8E3]/10 rounded-full hover:bg-[#E8E8E3]/5 cursor-pointer"
            >
              Exit ×
            </button>

            <div className="flex flex-col items-center gap-8 md:gap-12">
              <div className="text-center space-y-3">
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-[#E8E8E3]">
                  Experimental <span className="text-[#E8E8E3]/20">Lab</span>
                </h2>
                <div className="flex items-center justify-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  <p className="text-[9px] text-[#E8E8E3]/40 uppercase tracking-[0.4em] font-bold">System Status: Online</p>
                </div>
              </div>
              
              <div className="w-full flex justify-center p-4 md:p-8 bg-[#080807] rounded-4xl border border-[#E8E8E3]/5 shadow-inner">
                 <SnakeGame />
              </div>

              <div className="text-center space-y-2 opacity-50">
                 <p className="text-[9px] text-[#E8E8E3]/60 uppercase tracking-[0.2em] font-medium italic">
                  "The obsidian serpent follows your command."
                </p>
                <div className="h-px w-8 bg-[#E8E8E3]/20 mx-auto"></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        animate={{
          backgroundColor: ["#E8E8E3", "#080807"], 
          color: ["#080807", "#E8E8E3"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        className="
          relative px-5 py-2 border border-[#080807]/20 rounded-full 
          text-[11px] font-black uppercase tracking-[0.3em] 
          flex items-center gap-3 group z-101
          shadow-[0_0_20px_rgba(0,0,0,0.05)] cursor-pointer
        "
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
        </span>
        <span className="relative z-10">Lab</span>
      </motion.button>

      {mounted && createPortal(modalContent, document.body)}
    </>
  );
}