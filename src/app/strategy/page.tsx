'use client'

import React from 'react'
import { Globe, Shield, FileText, CheckCircle, ArrowRight } from 'lucide-react'
import { useTranslations } from '@/i18n'

export default function StrategyPage() {
  const { t } = useTranslations()

  return (
    <div className="max-w-5xl mx-auto space-y-24 pb-20">
      {/* Hero */}
      <section className="space-y-8">
        <div className="text-[10px] font-mono text-oxot-blue uppercase tracking-[0.4em]">
          {t.strategic.hero.badge}
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
          {t.strategic.hero.title}<br />
          <span className="text-oxot-red font-light italic text-4xl md:text-6xl uppercase tracking-widest">{t.strategic.hero.titleHighlight}</span>
        </h1>
        <p className="text-xl text-grey max-w-3xl font-light leading-relaxed">
          {t.strategic.hero.description}
        </p>
      </section>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: t.strategic.services.nis2.title,
            icon: <Shield size={20} />,
            color: "oxot-blue",
            desc: t.strategic.services.nis2.desc
          },
          {
            title: t.strategic.services.advisory.title,
            icon: <Globe size={20} />,
            color: "oxot-red",
            desc: t.strategic.services.advisory.desc
          },
          {
            title: t.strategic.services.retainers.title,
            icon: <FileText size={20} />,
            color: "grey",
            desc: t.strategic.services.retainers.desc
          },
        ].map((s, i) => (
          <div key={i} className="p-8 bg-white/5 border border-white/5 rounded-2xl space-y-4 hover:border-oxot-red transition-all group">
            <div className={`text-${s.color} mb-4`}>{s.icon}</div>
            <h4 className="font-bold uppercase tracking-widest text-sm">{s.title}</h4>
            <p className="text-grey text-xs font-light leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* NIS2 / 62443 Focus */}
      <section className="p-12 bg-charcoal border-4 border-grey rounded-3xl space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="md:w-2/3">
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-6">{t.strategic.focus.title}</h3>
            <p className="text-grey text-lg font-light leading-relaxed">
              {t.strategic.focus.desc}
            </p>
          </div>
          <div className="md:w-1/3 flex flex-col gap-4 font-mono text-[10px] uppercase">
            <div className="p-4 bg-white/5 rounded-lg border-l-4 border-oxot-blue flex items-center gap-3">
              <CheckCircle size={14} className="text-oxot-blue" /> {t.strategic.focus.certified}
            </div>
            <div className="p-4 bg-white/5 rounded-lg border-l-4 border-oxot-red flex items-center gap-3">
              <CheckCircle size={14} className="text-oxot-red" /> {t.strategic.focus.compliant}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-grey/20">
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase text-white tracking-widest">{t.strategic.global.title}</h4>
            <p className="text-grey text-sm font-light">
              {t.strategic.global.desc}
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase text-white tracking-widest">{t.strategic.partnerships.title}</h4>
            <p className="text-grey text-sm font-light">
              {t.strategic.partnerships.desc}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
