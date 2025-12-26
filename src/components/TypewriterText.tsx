'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TypewriterTextProps {
    text: string
    speed?: number // ms per char
    pause?: number // ms pause at end
    className?: string
}

export default function TypewriterText({ text, speed = 50, pause = 2000, className = "" }: TypewriterTextProps) {
    const [displayedText, setDisplayedText] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        let timeout: NodeJS.Timeout

        const handleTyping = () => {
            setDisplayedText(prev => {
                if (isDeleting) {
                    // DELETING
                    if (prev.length === 0) {
                        setIsDeleting(false)
                        return ""
                    }
                    return prev.slice(0, -1)
                } else {
                    // TYPING
                    if (prev.length === text.length) {
                        // Finished typing, wait then delete
                        timeout = setTimeout(() => setIsDeleting(true), pause)
                        return prev
                    }
                    return text.slice(0, prev.length + 1)
                }
            })

            // Speed control
            if (!isDeleting && displayedText.length === text.length) {
                // Done typing, pause handled inside setDisplayedText callback logic usually, 
                // but setting timeout inside state updater is tricky. 
                // Let's refactor slightly to be safer purely with side effects.
            }
        }

        // Simpler Interval approach requires ref vars, stick to simple timeout loop
        const currentSpeed = isDeleting ? speed / 2 : speed

        timeout = setTimeout(() => {
            if (isDeleting) {
                if (displayedText.length > 0) {
                    setDisplayedText(text.slice(0, displayedText.length - 1))
                } else {
                    setIsDeleting(false)
                }
            } else {
                if (displayedText.length < text.length) {
                    setDisplayedText(text.slice(0, displayedText.length + 1))
                } else {
                    // Wait before deleting
                    timeout = setTimeout(() => setIsDeleting(true), pause)
                    return
                }
            }
        }, currentSpeed)

        return () => clearTimeout(timeout)
    }, [displayedText, isDeleting, text, speed, pause])

    return (
        <span className={className}>
            {displayedText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block ml-1 w-2 h-4 bg-cyan-400 align-middle"
            />
        </span>
    )
}
