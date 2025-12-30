'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Shield, Zap, Layers, Sigma, ChevronDown, Cpu, Code, Bug,
  RefreshCw, Boxes, Lock, Eye, Settings, CheckCircle, AlertTriangle,
  FileSearch, GitBranch, ShieldCheck, Workflow
} from 'lucide-react'
import ContactFormCTA from '@/components/ContactFormCTA'
import { useTranslations } from '@/i18n'

const PRACTICES = [
  {
    id: "sdl-overview",
    title: "The SDL Program",
    subtitle: "Aligning with IEC 62443-4-1",
    icon: Workflow,
    color: "oxot-blue",
    content: `IEC 62443-4-1 specifies eight distinct "practices" that must be integrated into the product development process. These practices ensure that security is a continuous consideration throughout the entire product lifecycle, from conception to retirement.

Practice 1: Security Management (SM) — This practice is about establishing the governance and organizational foundation for security. Manufacturers must develop a Security Management Plan that outlines the organization's commitment to security, defines the scope of the SDL program, and assigns ownership. Formally designate key security roles, such as a Chief Product Security Officer (CPSO) or a Product Security Team.

Practice 2: Security Requirements Definition (SR) — Ensures that security is a formal requirement from the very beginning of a project. Document the intended use of the product, including the expected operational environment, user types, and data flows. This context is critical for risk assessment.`
  },
  {
    id: "secure-design",
    title: "Architecture & Design",
    subtitle: "Practice 3: Secure Design (SD)",
    icon: GitBranch,
    color: "oxot-blue",
    content: `Practice 3 focuses on architecting the product to be inherently secure, rather than trying to add security as an afterthought. Application of Secure Design Principles: Mandate the use of core security principles like defense-in-depth (layered security), principle of least privilege (default-deny), and attack surface reduction during the architectural design phase.

Perform Threat Modeling — This is arguably the most critical activity in secure design. For every new feature or significant change, the development team must conduct a formal threat modeling exercise. A widely used methodology is STRIDE (Spoofing, Tampering, Repudiation, Info Disclosure, Denial of Service, Elevation of Privilege).

Practice 4: Secure Implementation (SI) — This practice translates the secure design into secure code. Establish and enforce mandatory secure coding standards for all developers. For products developed in C or C++, relevant standards include MISRA C/C++ and SEI CERT C.`
  },
  {
    id: "v&v",
    title: "Verification & Validation",
    subtitle: "Practice 5: Security SVV",
    icon: FileSearch,
    color: "oxot-gold",
    content: `Practice 5 ensures that the implemented product meets its security requirements and is free of discoverable vulnerabilities. Develop a Security Test Plan: Create a comprehensive plan that details the scope, methodologies, and tools for security testing. To ensure objectivity, testing should be performed by a team independent of the developers who wrote the code.

Execute a Multi-Faceted Testing Strategy: Functional Security Testing verifies that security features (e.g., access control, encryption) work as specified. Vulnerability Scanning uses DAST and SCA tools to automatically scan the running application and its dependencies for known vulnerabilities.

Robustness Testing tests how the product behaves when subjected to malformed, unexpected, or excessive inputs (fuzzing) to uncover flaws. Penetration Testing conducts simulated attacks against the product, mimicking the techniques of a real-world adversary.`
  },
  {
    id: "convergence",
    title: "Functional Safety",
    subtitle: "The Convergence of IEC 61508 & 62443",
    icon: ShieldCheck,
    color: "oxot-red",
    content: `For manufacturers producing components intended for use in Safety Instrumented Systems (SIS), compliance with IEC 62443 is not just a security issue—it is a fundamental prerequisite for ensuring functional safety.

The foundational standard for functional safety, IEC 61508, provides a framework for designing systems that reduce the risk of physical harm. Historically, the analysis assumed failures were random or systematic bugs. This assumption is no longer valid. In a connected IACS, a cyberattack can be the direct cause of a hazardous event.

The principle is simple and profound: in a connected environment, a system that is not secure cannot be considered safe. IEC 62443 provides the definitive framework for conducting combined risk assessment: Start with Safety Analysis (HAZOP/LOPA), conduct Cybersecurity Threat Modeling (STRIDE), and integrate the analyses to identify "cyber-to-physical" scenarios.`
  }
];

// Animated timeline component
const TimelineDot = ({ isActive, color }: { isActive: boolean, color: string }) => (
  <div className="relative">
    <div className={`w-4 h-4 rounded-full border-2 ${isActive ? `bg-${color} border-${color}` : 'bg-transparent border-gray-600'} transition-all duration-500`} />
    {isActive && (
      <motion.div
        className={`absolute inset-0 rounded-full bg-${color}`}
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    )}
  </div>
);

export default function ManufacturerPlaybookPage() {
  const { t } = useTranslations()
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
          <div className="inline-block mb-6 px-6 py-2 border-l-2 border-oxot-blue bg-white/5 backdrop-blur-sm">
            <span className="text-oxot-blue font-mono text-sm uppercase tracking-[0.3em] font-black">Product Engineering Dossier // IEC 62443-4-1</span>
          </div>

          <h1 className="text-6xl md:text-[8rem] font-black text-white mb-6 tracking-tighter uppercase leading-none">
            The Manufacturer<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-oxot-blue to-white">Guide</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed mb-12 normal-case">
            From secure-by-design to lifecycle management. A strategic imperative for global market access and product stewardship.
          </p>

          <div className="flex flex-wrap gap-8 justify-center text-[11px] font-mono uppercase tracking-widest text-gray-400">
            <div className="space-y-1 border-l-2 border-oxot-blue pl-4 text-left">
              <div className="text-white/40">Context</div>
              <div className="text-white">Secure Development Lifecycle</div>
            </div>
            <div className="space-y-1 border-l-2 border-oxot-blue pl-4 text-left">
              <div className="text-white/40">Standard Reference</div>
              <div className="text-white">IEC 62443-4-1 / 4-2</div>
            </div>
            <div className="space-y-1 border-l-2 border-oxot-blue pl-4 text-left">
              <div className="text-white/40">Mandate</div>
              <div className="text-white">Product Stewardship</div>
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

      {/* MAIN CONTENT WITH TIMELINE */}
      <div className="relative max-w-[1400px] mx-auto px-6">

        {/* Animated Center Timeline */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-800 to-transparent" />
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-oxot-blue via-oxot-blue to-oxot-red"
            style={{ height: lineHeight }}
          />
        </div>

        {/* Practices - Alternating Layout */}
        <div className="space-y-32 pt-24">
          {PRACTICES.map((practice, idx) => {
            const isLeft = idx % 2 === 0;
            const Icon = practice.icon;

            return (
              <motion.section
                key={practice.id}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center ${isLeft ? '' : 'lg:flex-row-reverse'}`}>

                  {/* Content Side */}
                  <div className={`space-y-6 ${isLeft ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 lg:order-2'}`}>
                    {/* Number Badge */}
                    <div className={`inline-flex items-center gap-3 ${isLeft ? 'lg:flex-row-reverse' : ''}`}>
                      <span className={`text-${practice.color} font-mono text-4xl font-black`}>0{idx + 1}</span>
                      <div className={`h-px w-12 bg-${practice.color}/50`} />
                    </div>

                    {/* Title */}
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
                      {practice.title}
                    </h2>

                    {/* Subtitle */}
                    <div className={`text-sm font-mono text-${practice.color} uppercase tracking-widest`}>
                      {practice.subtitle}
                    </div>

                    {/* Content - Academic Style */}
                    <div className={`text-gray-300 text-base leading-[1.9] font-light space-y-6 normal-case ${isLeft ? 'lg:text-right' : 'lg:text-left'}`}>
                      {practice.content.split('\n\n').map((para, pIdx) => (
                        <p key={pIdx} className="text-gray-400">
                          {para.trim()}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Visual Side */}
                  <div className={`relative ${isLeft ? 'lg:order-2' : 'lg:order-1 lg:pr-16'}`}>
                    {/* Center Timeline Dot (Desktop) */}
                    <div className={`absolute top-1/2 ${isLeft ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'} -translate-y-1/2 hidden lg:block z-20`}>
                      <div className={`w-6 h-6 rounded-full bg-${practice.color} border-4 border-black shadow-lg shadow-${practice.color}/50`} />
                    </div>

                    {/* Decorative Card */}
                    <div className={`relative p-8 md:p-12 bg-gradient-to-br from-gray-900/80 to-black border border-white/10 rounded-3xl overflow-hidden group hover:border-${practice.color}/30 transition-all duration-500`}>
                      {/* Background Glow */}
                      <div className={`absolute inset-0 bg-${practice.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                      {/* Icon Display */}
                      <div className="relative z-10 flex flex-col items-center justify-center min-h-[300px] space-y-8">
                        <div className={`p-6 rounded-2xl bg-${practice.color}/10 border border-${practice.color}/30`}>
                          <Icon size={64} className={`text-${practice.color}`} />
                        </div>

                        {/* Key Metrics */}
                        <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                          <div className="text-center p-4 bg-black/50 rounded-xl border border-white/5">
                            <div className={`text-2xl font-black text-${practice.color}`}>{idx + 1}/4</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Practice</div>
                          </div>
                          <div className="text-center p-4 bg-black/50 rounded-xl border border-white/5">
                            <div className="text-2xl font-black text-white">{['SM', 'SD', 'SVV', 'FS'][idx]}</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Code</div>
                          </div>
                        </div>

                        {/* Animated Border */}
                        <div className={`absolute inset-0 rounded-3xl border border-${practice.color}/20 animate-pulse`} />
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
            headline={t.playbookManufacturer.cta.headline}
            subheadline={t.playbookManufacturer.cta.subheadline}
            serviceOptions={[
              { value: 'gold', label: t.playbookManufacturer.cta.serviceOptions.advisory, color: 'yellow' },
              { value: 'blue', label: t.playbookManufacturer.cta.serviceOptions.review, color: 'cyan' }
            ]}
          />
        </section>
      </div>
    </div>
  )
}
