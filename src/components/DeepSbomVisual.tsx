'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, FileJson, Code, AlertCircle, Box, GitBranch } from 'lucide-react';

export default function DeepSbomVisual() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[500px] w-full bg-black/20 rounded-3xl border border-white/5 overflow-hidden flex items-center justify-center p-8">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #7C7C7C 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="relative w-full max-w-3xl h-64 flex items-center justify-between">
        
        {/* Step 1: Equipment */}
        <motion.div 
          animate={{ scale: activeStep === 0 ? 1.1 : 0.9, opacity: activeStep === 0 ? 1 : 0.4 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="w-20 h-20 rounded-2xl bg-charcoal border-2 border-grey/50 flex items-center justify-center shadow-2xl">
            <Box className="text-grey w-10 h-10" />
          </div>
          <span className="text-[10px] font-mono text-grey uppercase tracking-widest">Equipment</span>
        </motion.div>

        {/* Connector 1 */}
        <div className="flex-1 h-px bg-gradient-to-r from-grey/20 via-oxot-blue/50 to-grey/20 mx-4 relative">
          {activeStep >= 1 && (
            <motion.div 
              initial={{ left: 0 }}
              animate={{ left: '100%' }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-oxot-blue rounded-full blur-sm"
            />
          )}
        </div>

        {/* Step 2: SBOM */}
        <motion.div 
          animate={{ scale: activeStep === 1 ? 1.1 : 0.9, opacity: activeStep === 1 ? 1 : 0.4 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="w-20 h-20 rounded-full bg-oxot-blue/20 border-2 border-oxot-blue flex items-center justify-center shadow-[0_0_30px_rgba(0,66,214,0.3)]">
            <FileJson className="text-oxot-blue w-10 h-10" />
          </div>
          <span className="text-[10px] font-mono text-oxot-blue uppercase tracking-widest">DNA_Decomposition</span>
        </motion.div>

        {/* Connector 2 */}
        <div className="flex-1 h-px bg-gradient-to-r from-grey/20 via-oxot-red/50 to-grey/20 mx-4 relative">
          {activeStep >= 2 && (
            <motion.div 
              initial={{ left: 0 }}
              animate={{ left: '100%' }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-oxot-red rounded-full blur-sm"
            />
          )}
        </div>

        {/* Step 3: Libraries */}
        <div className="flex flex-col gap-4">
          <motion.div 
            animate={{ x: activeStep === 2 ? 10 : 0, opacity: activeStep === 2 ? 1 : 0.4 }}
            className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg"
          >
            <Code size={14} className="text-oxot-red" />
            <span className="text-[10px] font-mono text-white">OpenSSL v1.0.2k</span>
          </motion.div>
          <motion.div 
            animate={{ x: activeStep === 2 ? 10 : 0, opacity: activeStep === 2 ? 1 : 0.4 }}
            className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg"
          >
            <Code size={14} className="text-oxot-blue" />
            <span className="text-[10px] font-mono text-white">Log4j v2.14.1</span>
          </motion.div>
        </div>

        {/* Connector 3 */}
        <div className="flex-1 h-px bg-gradient-to-r from-grey/20 via-white/50 to-grey/20 mx-4 relative">
           {activeStep >= 3 && (
            <motion.div 
              initial={{ left: 0 }}
              animate={{ left: '100%' }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full blur-sm"
            />
          )}
        </div>

        {/* Step 4: Risk */}
        <motion.div 
          animate={{ scale: activeStep === 3 ? 1.2 : 0.9, opacity: activeStep === 3 ? 1 : 0.4 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="w-20 h-20 rounded-full bg-oxot-red flex items-center justify-center shadow-[0_0_50px_rgba(214,0,0,0.5)] animate-pulse">
            <AlertCircle className="text-white w-10 h-10" />
          </div>
          <span className="text-[10px] font-mono text-oxot-red font-bold uppercase tracking-widest">Toxic_Atom_Found</span>
        </motion.div>

      </div>

      {/* Status Overlay */}
      <div className="absolute bottom-8 left-8 flex gap-4 font-mono text-[8px] uppercase text-grey opacity-50">
        <div>[SCAN_DEPTH: 5_LEVELS]</div>
        <div>[MODELS: STRIDE / MITRE]</div>
        <div>[STATE: RESOLVING_DEPENDENCIES]</div>
      </div>
    </div>
  );
}
