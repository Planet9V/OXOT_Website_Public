'use client'

import React from 'react'
import { FunctionSquare } from 'lucide-react'
import { useCoreLink } from '@/components/CoreLinkContext'

export default function EquationSolver() {
    const { transmissionRate, recoveryRate, variableR0, updatePhysicsParams } = useCoreLink()

    return (
        <div className="bg-black/40 border border-white/10 rounded-xl p-6 relative overflow-hidden group hover:border-oxot-blue/50 transition-colors">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-white font-bold uppercase tracking-wider flex items-center gap-2">
                        <FunctionSquare size={16} className="text-oxot-blue" />
                        Epidemic Threshold
                    </h3>
                    <p className="text-[10px] text-gray-500 font-mono mt-1">McKenney-Lacan Propagation Model</p>
                </div>
                <div className={`text-2xl font-black font-mono ${variableR0 > 1 ? 'text-oxot-red' : 'text-green-500'}`}>
                    R₀ = {variableR0}
                </div>
            </div>

            {/* Interactive Equation */}
            <div className="mb-8 font-mono text-center text-lg text-gray-300 bg-black/50 p-4 rounded border border-white/5">
                R₀ = (<span className="text-oxot-blue">β</span> / <span className="text-purple-400">γ</span>) × λ_{'{max}'}(A)
            </div>

            {/* Sliders */}
            <div className="space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between text-xs uppercase tracking-widest text-gray-500">
                        <span>Transmission (β)</span>
                        <span className="text-oxot-blue">{transmissionRate}</span>
                    </div>
                    <input
                        type="range" min="0.01" max="1" step="0.01"
                        value={transmissionRate}
                        onChange={(e) => updatePhysicsParams({ beta: parseFloat(e.target.value) })}
                        className="w-full accent-oxot-blue bg-white/10 h-1 rounded-full appearance-none cursor-pointer"
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between text-xs uppercase tracking-widest text-gray-500">
                        <span>Recovery (γ)</span>
                        <span className="text-purple-400">{recoveryRate}</span>
                    </div>
                    <input
                        type="range" min="0.1" max="1" step="0.01"
                        value={recoveryRate}
                        onChange={(e) => updatePhysicsParams({ gamma: parseFloat(e.target.value) })}
                        className="w-full accent-purple-400 bg-white/10 h-1 rounded-full appearance-none cursor-pointer"
                    />
                </div>
            </div>

            {/* Status Indicator */}
            <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-widest">
                <div className={`w-2 h-2 rounded-full ${variableR0 > 1 ? 'bg-oxot-red animate-pulse' : 'bg-green-500'}`} />
                {variableR0 > 1 ? 'Epidemic Spread Likely' : 'containment Achieved'}
            </div>
        </div>
    )
}
