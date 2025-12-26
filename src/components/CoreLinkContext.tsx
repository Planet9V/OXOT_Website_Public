'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type SystemStatus = 'NOMINAL' | 'WARNING' | 'CRITICAL' | 'BREACH'

interface CoreState {
    // Physics State
    entropy: number
    transmissionRate: number // Beta
    recoveryRate: number    // Gamma
    variableR0: number      // Calculated R0

    // Global Risk State
    riskLevel: number       // 0-100
    systemStatus: SystemStatus

    // Actions
    updatePhysicsParams: (params: { beta?: number, gamma?: number }) => void
    triggerSimulatedEvent: (event: string) => void
}

const CoreLinkContext = createContext<CoreState | undefined>(undefined)

export function CoreLinkProvider({ children }: { children: React.ReactNode }) {
    const [beta, setBeta] = useState(0.5)
    const [gamma, setGamma] = useState(0.2)
    const [entropy, setEntropy] = useState(4.82)

    // Derived State
    const r0 = parseFloat(((beta / gamma) * 1.5).toFixed(2))

    // Determine System Status based on Physics
    const systemStatus: SystemStatus =
        r0 > 2.0 ? 'BREACH' :
            r0 > 1.0 ? 'CRITICAL' :
                r0 > 0.8 ? 'WARNING' :
                    'NOMINAL'

    // Simulate Entropy fluctuations
    useEffect(() => {
        const interval = setInterval(() => {
            setEntropy(prev => {
                const noise = (Math.random() - 0.5) * 0.1
                // Entropy increases if R0 is high (system disorder)
                const drift = r0 > 1 ? 0.05 : -0.01
                return parseFloat((prev + noise + drift).toFixed(2))
            })
        }, 2000)
        return () => clearInterval(interval)
    }, [r0])

    const updatePhysicsParams = ({ beta, gamma }: { beta?: number, gamma?: number }) => {
        if (beta !== undefined) setBeta(beta)
        if (gamma !== undefined) setGamma(gamma)
    }

    const triggerSimulatedEvent = (event: string) => {
        console.log(`[CORE_LINK] Event Triggered: ${event}`)
        // Placeholder for future event simulation logic
    }

    return (
        <CoreLinkContext.Provider value={{
            entropy,
            transmissionRate: beta,
            recoveryRate: gamma,
            variableR0: r0,
            riskLevel: Math.min(100, r0 * 20), // Simple mapping
            systemStatus,
            updatePhysicsParams,
            triggerSimulatedEvent
        }}>
            {children}
        </CoreLinkContext.Provider>
    )
}

export function useCoreLink() {
    const context = useContext(CoreLinkContext)
    if (context === undefined) {
        throw new Error('useCoreLink must be used within a CoreLinkProvider')
    }
    return context
}
