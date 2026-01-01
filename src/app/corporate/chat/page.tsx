'use client'

import React from 'react'
import Script from 'next/script'
import { PageHeader } from '@/components/branding'


export default function ChatPage() {
    return (
        <div className="min-h-screen space-y-12 pb-20">
            {/* ElevenLabs ConvAI Widget Script - loads only on this page */}
            <Script
                src="https://unpkg.com/@elevenlabs/convai-widget-embed"
                strategy="afterInteractive"
            />

            <div className="space-y-4">
                <PageHeader
                    title="AI ASSISTANT"
                    subtitle="Interactive Neural Interface"
                    variant="default"
                    accent="blue"
                />
                <p className="max-w-2xl text-gray-400 leading-relaxed border-l-2 border-cyan-500/30 pl-6">
                    Interact with the AEON Cyber Digital Twin&apos;s knowledge base. Voice interaction provided by ElevenLabs ConvAI.
                </p>
            </div>

            <div className="w-full min-h-[700px] rounded-2xl overflow-hidden border border-white/10 bg-black/50 relative flex items-center justify-center">
                {/* ElevenLabs ConvAI Widget */}
                {/* @ts-expect-error - Custom element not fully typed in CI environment */}
                <elevenlabs-convai agent-id="agent_9601kdvywwtvfgx89pqyy9ex8s3h"></elevenlabs-convai>
            </div>
        </div>
    )
}
