'use client'

import dynamic from 'next/dynamic'

// Dynamic import to avoid SSR issues with complex stateful component
const IEC62443UnifiedWorkshop = dynamic(
    () => import('@/components/IEC62443UnifiedWorkshop'),
    { ssr: false }
)

export default function IEC62443WorkshopPage() {
    return <IEC62443UnifiedWorkshop />
}
