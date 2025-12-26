'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BOOT_LOGS = [
  '[SYSTEM] INITIALIZING SOVEREIGN CORE...',
  '[RESOLVING] LAYER 0 COMPONENT ONTOLOGY...',
  '[CALIBRATING] BIFURCATION MODELS...',
  '[CONNECTING] AEON DIGITAL TWIN LATTICE...',
  '[SYNC] 16 CRITICAL SECTORS IDENTIFIED...',
  '[AUTH] VALIDATING MCKENNEY-LACAN CALCULUS...',
  '[EXEC] ESTABLISHING COMMAND LINK...',
]

interface BootSequenceProps {
  onComplete: () => void
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([])
  const indexRef = useRef(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const onCompleteRef = useRef(onComplete)

  // Keep onComplete ref fresh
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  const addNextLog = useCallback(() => {
    if (indexRef.current < BOOT_LOGS.length) {
      const log = BOOT_LOGS[indexRef.current]
      setLogs(prev => [...prev, log!])
      indexRef.current += 1
      timeoutRef.current = setTimeout(addNextLog, 400 + Math.random() * 600)
    } else {
      // All logs done, call onComplete after a short delay
      timeoutRef.current = setTimeout(() => {
        onCompleteRef.current()
      }, 1000)
    }
  }, [])

  useEffect(() => {
    // Start the sequence
    timeoutRef.current = setTimeout(addNextLog, 500)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [addNextLog])

  const isComplete = indexRef.current >= BOOT_LOGS.length

  return (
    <motion.div
      key="boot-sequence"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-charcoal z-[100] flex flex-col items-center justify-center p-8 font-mono"
    >
      <div className="w-full max-w-2xl space-y-2">
        <AnimatePresence>
          {logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[12px] md:text-sm text-oxot-red"
            >
              <span className="opacity-50">[{new Date().toLocaleTimeString()}]</span> {log}
            </motion.div>
          ))}
        </AnimatePresence>
        {!isComplete && (
          <motion.div
            animate={{ opacity: [0, 1] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="w-2 h-4 bg-oxot-red inline-block ml-2"
          />
        )}
      </div>

      <div className="absolute bottom-8 right-8 text-[10px] text-grey uppercase tracking-[0.3em]">
        Status: Initializing_Handshake
      </div>
    </motion.div>
  )
}

export default BootSequence

