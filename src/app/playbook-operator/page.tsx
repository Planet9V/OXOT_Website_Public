'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Shield, ChevronDown, Sigma, Users, FileText, Scale,
  Target, Clipboard, ShoppingCart, Search, Lock,
  Building, Handshake, BarChart3, AlertTriangle
} from 'lucide-react'
import { TypewriterEquation } from '@/components/TypewriterEquation'
import ContactFormCTA from '@/components/ContactFormCTA'

const DOSSIERS = [
  {
    id: "shared-responsibility",
    title: "The Shared Responsibility Model",
    subtitle: "From Passive Buyer to Active Governor",
    icon: Handshake,
    color: "oxot-red",
    content: `The cornerstone of the IEC 62443 framework is the concept of shared responsibility, which formally acknowledges that IACS security cannot be achieved by any single entity in isolation. The standards explicitly define three principal roles, each with distinct obligations.

Asset Owner (Operator/Purchaser) — The entity that owns and operates the IACS. This role holds the ultimate accountability for the secure operation of the system and is responsible for defining the overall security requirements and risk tolerance.

Product Supplier — The manufacturer of IACS hardware and software components, such as Programmable Logic Controllers (PLCs), sensors, or Human-Machine Interface (HMI) software. Their primary responsibility is to develop products with security capabilities and to follow a secure development lifecycle process.

Service Provider — The entity responsible for integrating components into a cohesive system (System Integrator) or providing ongoing support and maintenance. Their role is to implement and configure security controls in accordance with the asset owner's requirements.`
  },
  {
    id: "security-levels",
    title: "Understanding Security Levels",
    subtitle: "The Core Language of IEC 62443",
    icon: BarChart3,
    color: "oxot-blue",
    content: `Security Levels are the central metric used within the standard to quantify and communicate security robustness. They provide a qualitative measure of the confidence that a system is free from vulnerabilities and can withstand threats of a certain magnitude. Operators must distinguish between three distinct types of Security Levels.

Target Security Level (SL-T) — This is the desired security state for a system or a part of a system (a "zone" or "conduit"). The operator defines the SL-T based on a thorough risk assessment that considers the potential consequences of a security breach.

Capability Security Level (SL-C) — This is the inherent, native security capability that a product or system can provide "out of the box." The product supplier or system integrator provides the SL-C.

Achieved Security Level (SL-A) — This is the actual, measured security level of the operational system, verified through testing and ongoing assessment. The operator is responsible for ensuring the SL-A is met and maintained.`
  },
  {
    id: "acquisition",
    title: "Phase I: Secure Acquisition",
    subtitle: "Building Security into Procurement",
    icon: ShoppingCart,
    color: "oxot-gold",
    content: `The acquisition phase represents the operator's single greatest point of leverage in the entire IACS security lifecycle. Decisions made during procurement have a cascading effect on the security, cost, and complexity of all subsequent phases.

The Cybersecurity Requirements Specification (CRS) — The foundational document for secure procurement is the Cybersecurity Requirements Specification. The CRS is the formal output of the risk assessment process defined in IEC 62443-3-2. It is the operator's primary instrument for codifying and communicating security expectations to all potential vendors and integrators.

A vague requirement in a Request for Proposal (RFP), such as "the system must be secure," is unenforceable and effectively useless. In contrast, the CRS enables the operator to be highly specific. For example: "The programmable logic controller (PLC) for the primary processing zone (Zone 1, SL-T 2) shall possess a Capability Security Level of SL-C 2 or higher, as defined in IEC 62443-4-2, with compliance verified by an ISASecure CSA Level 2 certification."`
  },
  {
    id: "lifecycle",
    title: "Phase II: Lifecycle Governance",
    subtitle: "Continuous Security Posture Management",
    icon: Target,
    color: "oxot-blue",
    content: `Security is not a one-time event but a continuous process that spans the entire operational lifecycle of the IACS. The operator must establish robust governance mechanisms to maintain the security posture over time.

Continuous Monitoring — Implement real-time monitoring of the IACS environment to detect anomalies, unauthorized access attempts, and potential security incidents. This includes network traffic analysis, log aggregation, and security information and event management (SIEM) integration.

Vulnerability Management — Establish a systematic process for identifying, assessing, and remediating vulnerabilities. This includes regular vulnerability scanning, patch management procedures, and coordination with product suppliers for security updates.

Incident Response — Develop and maintain an incident response plan specific to the IACS environment. This plan should define roles and responsibilities, communication protocols, containment procedures, and recovery processes. Regular tabletop exercises and drills ensure the organization is prepared to respond effectively.`
  }
];

export default function OperatorPlaybookPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={containerRef} className="pb-64">
      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-4 text-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="inline-block mb-6 px-6 py-2 border-l-2 border-oxot-red bg-white/5 backdrop-blur-sm">
            <span className="text-oxot-red font-mono text-sm uppercase tracking-[0.3em] font-black">Strategic Intelligence Dossier // 2025 Edition</span>
          </div>

          <h1 className="text-6xl md:text-[8rem] font-black text-white mb-6 tracking-tighter uppercase leading-none">
            The Operator<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-oxot-red to-white">Playbook</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed mb-12 normal-case">
            A lifecycle approach to IACS cybersecurity with IEC 62443. Establishing the active governance of complex cyber-physical security systems.
          </p>

          <div className="flex flex-wrap gap-8 justify-center text-[11px] font-mono uppercase tracking-widest text-gray-400">
            <div className="space-y-1 border-l-2 border-oxot-red pl-4 text-left">
              <div className="text-white/40">Authored By</div>
              <div className="text-white">OT Strategy Group</div>
            </div>
            <div className="space-y-1 border-l-2 border-oxot-red pl-4 text-left">
              <div className="text-white/40">Standard Reference</div>
              <div className="text-white">ISA/IEC 62443</div>
            </div>
            <div className="space-y-1 border-l-2 border-oxot-red pl-4 text-left">
              <div className="text-white/40">Mandate</div>
              <div className="text-white">Infrastructure Resilience</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 flex flex-col items-center gap-2 text-gray-600"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll to Initialize</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </section>

      {/* CORE EQUATION SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-[1400px] mx-auto px-6 py-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              The Fundamental Condition
            </h2>
            <p className="text-lg text-gray-400 font-light leading-relaxed normal-case">
              The interplay between Security Levels forms the fundamental economic and risk-transfer narrative of the entire IACS lifecycle. The operator's primary objective is to ensure that the final, operational system meets this condition.
            </p>
            <div className="space-y-4">
              {[
                { label: 'SL-A', desc: 'Achieved Security Level (Verified)', color: 'text-oxot-gold' },
                { label: 'SL-T', desc: 'Target Security Level (Required)', color: 'text-oxot-red' },
                { label: 'SL-C', desc: 'Capability Security Level (Provided)', color: 'text-oxot-blue' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/5 hover:border-white/20 transition-all">
                  <div className={`font-mono font-black text-xl ${item.color}`}>{item.label}</div>
                  <div className="text-sm text-gray-400 normal-case">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-oxot-red/10 blur-[80px] rounded-full" />
            <div className="relative p-12 bg-black/60 border border-white/10 rounded-3xl text-center space-y-8">
              <Sigma className="w-16 h-16 text-oxot-red mx-auto" />
              <div className="text-5xl md:text-6xl font-black text-white font-mono tracking-wider">
                SL<sub className="text-oxot-blue">A</sub> ≥ SL<sub className="text-oxot-red">T</sub>
              </div>
              <p className="text-sm font-mono text-gray-500 uppercase tracking-[0.2em] max-w-xs mx-auto leading-relaxed">
                The fundamental condition for Sovereign Operational Resilience
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* MAIN CONTENT WITH TIMELINE */}
      <div className="relative max-w-[1400px] mx-auto px-6">

        {/* Animated Center Timeline */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-800 to-transparent" />
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-oxot-red via-oxot-blue to-oxot-blue"
            style={{ height: lineHeight }}
          />
        </div>

        {/* Dossiers - Alternating Layout */}
        <div className="space-y-32 pt-12">
          {DOSSIERS.map((dossier, idx) => {
            const isLeft = idx % 2 === 0;
            const Icon = dossier.icon;

            return (
              <motion.section
                key={dossier.id}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center`}>

                  {/* Content Side */}
                  <div className={`space-y-6 ${isLeft ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 lg:order-2'}`}>
                    {/* Number Badge */}
                    <div className={`inline-flex items-center gap-3 ${isLeft ? 'lg:flex-row-reverse' : ''}`}>
                      <span className={`text-${dossier.color} font-mono text-4xl font-black`}>0{idx + 1}</span>
                      <div className={`h-px w-12 bg-${dossier.color}/50`} />
                    </div>

                    {/* Title */}
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
                      {dossier.title}
                    </h2>

                    {/* Subtitle */}
                    <div className={`text-sm font-mono text-${dossier.color} uppercase tracking-widest`}>
                      {dossier.subtitle}
                    </div>

                    {/* Content - Academic Style */}
                    <div className={`text-gray-400 text-base leading-[1.9] font-light space-y-6 normal-case ${isLeft ? 'lg:text-right' : 'lg:text-left'}`}>
                      {dossier.content.split('\n\n').map((para, pIdx) => (
                        <p key={pIdx}>
                          {para.trim()}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Visual Side */}
                  <div className={`relative ${isLeft ? 'lg:order-2' : 'lg:order-1 lg:pr-16'}`}>
                    {/* Center Timeline Dot (Desktop) */}
                    <div className={`absolute top-1/2 ${isLeft ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'} -translate-y-1/2 hidden lg:block z-20`}>
                      <div className={`w-6 h-6 rounded-full bg-${dossier.color} border-4 border-black shadow-lg shadow-${dossier.color}/50`} />
                    </div>

                    {/* Decorative Card */}
                    <div className={`relative p-8 md:p-12 bg-gradient-to-br from-gray-900/80 to-black border border-white/10 rounded-3xl overflow-hidden group hover:border-${dossier.color}/30 transition-all duration-500`}>
                      {/* Background Glow */}
                      <div className={`absolute inset-0 bg-${dossier.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                      {/* Icon Display */}
                      <div className="relative z-10 flex flex-col items-center justify-center min-h-[300px] space-y-8">
                        <div className={`p-6 rounded-2xl bg-${dossier.color}/10 border border-${dossier.color}/30`}>
                          <Icon size={64} className={`text-${dossier.color}`} />
                        </div>

                        {/* Key Info */}
                        <div className="text-center space-y-2">
                          <div className="text-white font-bold text-lg">{dossier.title}</div>
                          <div className={`text-${dossier.color} text-sm font-mono uppercase tracking-widest`}>
                            Phase {idx + 1} of 4
                          </div>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                          <div className="text-center p-4 bg-black/50 rounded-xl border border-white/5">
                            <div className={`text-2xl font-black text-${dossier.color}`}>{['∞', 'SL', 'CRS', 'CM'][idx]}</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Focus</div>
                          </div>
                          <div className="text-center p-4 bg-black/50 rounded-xl border border-white/5">
                            <div className="text-2xl font-black text-white">{['Gov', 'Req', 'Proc', 'Ops'][idx]}</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Domain</div>
                          </div>
                        </div>

                        {/* Animated Border */}
                        <div className={`absolute inset-0 rounded-3xl border border-${dossier.color}/20 animate-pulse`} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            );
          })}
        </div>

        {/* Call to Action */}
        <section id="contact-cta" className="pt-32">
          <ContactFormCTA
            variant="gold"
            headline="Every Compliance Gap Is an Attack Surface."
            subheadline="IEC 62443 isn't paperwork—it's your operational foundation. Let's close the gaps."
            serviceOptions={[
              { value: 'gold', label: 'IEC 62443 Advisory', color: 'yellow' },
              { value: 'blue', label: 'Blue Team Operations', color: 'cyan' }
            ]}
          />
        </section>
      </div>
    </div>
  )
}
