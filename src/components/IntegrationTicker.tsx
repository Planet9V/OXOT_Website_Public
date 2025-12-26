'use client'

import React from 'react';
import { motion } from 'framer-motion';

const INTEGRATIONS = [
  'Splunk', 'CrowdStrike', 'ServiceNow', 'Jira', 'AWS', 'Azure', 'Google Cloud', 'Palo Alto Networks', 'Fortinet', 'Microsoft Defender'
];

export const IntegrationTicker: React.FC = () => {
  return (
    <div className="w-full overflow-hidden border-l-4 border-primary pl-4 py-2 relative bg-primary/5 rounded-r-sm">
      <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-dark/90 to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-dark/90 to-transparent z-10"></div>

      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-100%'] }}
        transition={{ ease: 'linear', duration: 30, repeat: Infinity }}
      >
        {[...INTEGRATIONS, ...INTEGRATIONS].map((integration, index) => (
          <div key={index} className="flex items-center gap-8 text-xs uppercase tracking-widest text-primary font-mono font-semibold px-4">
            <span className="text-white">{integration}</span>
            <span className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_currentColor]"></span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};