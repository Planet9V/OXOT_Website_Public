import type { Metadata } from 'next';
import AttackerView from '@/components/osint/AttackerView';

export const metadata: Metadata = {
    title: 'Red Team Dossier | OFI OSINT Report',
    description: 'Adversarial awareness and attacker perspective analysis for OFI digital footprint',
};

export default function AttackerViewPage() {
    return <AttackerView />;
}
