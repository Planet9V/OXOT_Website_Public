'use client'

import React from 'react'
import Link from 'next/link'
import { MessageSquare } from 'lucide-react'

export default function ChatInterface() {
    return (
        <div className="flex flex-col h-[600px] bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative items-center justify-center">
            <Link
                href="/corporate/chat"
                className="flex flex-col items-center gap-4 text-center p-8 hover:scale-105 transition-transform"
            >
                <MessageSquare className="w-16 h-16 text-cyan-400" />
                <span className="text-xl font-semibold text-white">AI Assistant</span>
                <span className="text-sm text-gray-400">Click to access the Neural Interface</span>
            </Link>
        </div>
    )
}
