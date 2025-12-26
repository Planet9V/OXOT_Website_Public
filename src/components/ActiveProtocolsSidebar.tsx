'use client'

import React from 'react'
import { motion } from 'framer-motion'

const protocols = [
  { id: '01', name: 'ACQUISITION_INTEL', label: 'M&A Due Diligence' },
  { id: '02', name: 'COMMAND_LINK', label: 'SOC Integration' },
  { id: '03', name: 'STRATEGIC_ALIGNMENT', label: 'Workshop' },
]

const ActiveProtocolsSidebar: React.FC = () => {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 p-4 z-50">
      <div className="text-[10px] text-grey mb-2 uppercase tracking-widest text-right">
        [ACTIVE_PROTOCOLS]
      </div>
      {protocols.map((p) => (
        <motion.button
          key={p.id}
          whileHover={{ scale: 1.05, x: -10 }}
          whileTap={{ scale: 0.95 }}
          className="bg-charcoal border border-grey hover:border-oxot-red p-3 text-left group transition-colors"
        >
          <div className="text-[10px] text-oxot-red font-bold">{p.id}_{p.name}</div>
          <div className="text-[8px] text-grey group-hover:text-white transition-colors">{p.label}</div>
        </motion.button>
      ))}
    </div>
  )
}

export default ActiveProtocolsSidebar
