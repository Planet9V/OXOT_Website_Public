
import {
    Brain, Network, Shield, Activity, DollarSign,
    Box, GitMerge, Layers, Cpu, Globe,
    Zap, Lock, Users, Radio, Database,
    Scale, AlertTriangle, Eye, Hexagon, Anchor
} from 'lucide-react';

export type TheoryCategory = 'Structure' | 'Dynamics' | 'Cognition' | 'Security' | 'Economics';

export interface TheoryModule {
    id: string;
    title: string;
    slug: string;
    description: string;
    category: TheoryCategory;
    icon: any;
}

export const THEORY_MODULES: TheoryModule[] = [
    // Cognition
    {
        id: 'active-inference',
        title: 'Active Inference',
        slug: 'active-inference',
        description: 'Minimizing free energy in predictive processing systems.',
        category: 'Cognition',
        icon: Brain
    },
    {
        id: 'cognitive-bias',
        title: 'Cognitive Bias',
        slug: 'cognitive-bias',
        description: 'Mapping systematic deviations in cyber-rationality.',
        category: 'Cognition',
        icon: Eye
    },
    {
        id: 'cognitive-twin',
        title: 'Cognitive Twin',
        slug: 'cognitive-twin',
        description: 'Digital replication of operator decision-making processes.',
        category: 'Cognition',
        icon: Users
    },
    {
        id: 'dark-triad',
        title: 'Dark Triad',
        slug: 'dark-triad',
        description: 'Analyzing malignant personality traits in threat actors.',
        category: 'Cognition',
        icon: AlertTriangle
    },
    {
        id: 'musical-psychometrics',
        title: 'Musical Psychometrics',
        slug: 'musical-psychometrics',
        description: 'Harmonic analysis of team psychological resonance.',
        category: 'Cognition',
        icon: Radio
    },
    {
        id: 'object-petit-a',
        title: 'Object Petit A',
        slug: 'object-petit-a',
        description: 'Lacanian analysis of the unattainable desire in cyber defense.',
        category: 'Cognition',
        icon: Anchor
    },
    {
        id: 'psychometric-tensors',
        title: 'Psychometric Tensors',
        slug: 'psychometric-tensors',
        description: 'Multi-dimensional mapping of human performance metrics.',
        category: 'Cognition',
        icon: Box
    },
    {
        id: 'real-register',
        title: 'The Real Register',
        slug: 'real-register',
        description: 'Encountering the traumatic unrepresentable in cyber warfare.',
        category: 'Cognition',
        icon: Zap
    },
    {
        id: 'team-composition',
        title: 'Team Composition',
        slug: 'team-composition',
        description: 'Optimizing squad dynamics using complementary traits.',
        category: 'Cognition',
        icon: Users
    },
    {
        id: 'enhancement-analysis',
        title: 'Enhancement Analysis',
        slug: 'enhancement-analysis',
        description: 'McKenney-Lacan analysis of system augmentations.',
        category: 'Cognition',
        icon: Cpu
    },

    // Dynamics
    {
        id: 'cliodynamics',
        title: 'Cliodynamics',
        slug: 'cliodynamics',
        description: 'Mathematical modeling of historical cybersecurity cycles.',
        category: 'Dynamics',
        icon: Activity
    },
    {
        id: 'compliance-physics',
        title: 'Compliance Physics',
        slug: 'compliance-physics',
        description: 'Modeling regulatory adherence as physical force fields.',
        category: 'Dynamics',
        icon: Scale
    },
    {
        id: 'edge-physics',
        title: 'Edge Physics',
        slug: 'edge-physics',
        description: 'Thermodynamics of computation at the network periphery.',
        category: 'Dynamics',
        icon: Globe
    },
    {
        id: 'epidemic-r0',
        title: 'Epidemic R0',
        slug: 'epidemic-r0',
        description: 'Viral propagation models applied to malware spread.',
        category: 'Dynamics',
        icon: Activity
    },
    {
        id: 'information-geometry',
        title: 'Information Geometry',
        slug: 'information-geometry',
        description: 'Geometric structures of probability distributions in data.',
        category: 'Dynamics',
        icon: Hexagon
    },
    {
        id: 'ising-soc',
        title: 'Ising SOC',
        slug: 'ising-soc',
        description: 'Self-Organized Criticality in security operations centers.',
        category: 'Dynamics',
        icon: Grid
    },
    {
        id: 'levy-flight',
        title: 'Lévy Flight',
        slug: 'levy-flight',
        description: 'Random walk patterns in threat actor lateral movement.',
        category: 'Dynamics',
        icon: GitMerge
    },
    {
        id: 'probability-field',
        title: 'Probability Field',
        slug: 'probability-field',
        description: 'Quantum-like superposition of potential breach states.',
        category: 'Dynamics',
        icon: Radio
    },
    {
        id: 'quantum-bounds',
        title: 'Quantum Bounds',
        slug: 'quantum-bounds',
        description: 'Theoretical limits of encryption and decryption speeds.',
        category: 'Dynamics',
        icon: Cpu
    },
    {
        id: 'seldon-crisis',
        title: 'Seldon Crisis',
        slug: 'seldon-crisis',
        description: 'Predicting inevitable collapse points in complex systems.',
        category: 'Dynamics',
        icon: AlertTriangle
    },
    {
        id: 'shannon-entropy',
        title: 'Shannon Entropy',
        slug: 'shannon-entropy',
        description: 'Measuring information uncertainty in encrypted traffic.',
        category: 'Dynamics',
        icon: Activity
    },
    {
        id: 'threshold-dynamics',
        title: 'Threshold Dynamics',
        slug: 'threshold-dynamics',
        description: 'Tipping points in system stability and failure cascades.',
        category: 'Dynamics',
        icon: Activity
    },

    // Structure
    {
        id: 'antifragile-topology',
        title: 'Antifragile Topology',
        slug: 'antifragile-topology',
        description: 'Network structures that gain strength from disorder.',
        category: 'Structure',
        icon: Network
    },
    {
        id: 'autopoietic-bulkheads',
        title: 'Autopoietic Bulkheads',
        slug: 'autopoietic-bulkheads',
        description: 'Self-regenerating compartmentalization systems.',
        category: 'Structure',
        icon: Shield
    },
    {
        id: 'borromean-stability',
        title: 'Borromean Stability',
        slug: 'borromean-stability',
        description: 'Interlocked security rings where removing one collapses all.',
        category: 'Structure',
        icon: Disc
    },
    {
        id: 'data-pipeline',
        title: 'Data Pipeline',
        slug: 'data-pipeline',
        description: 'Architecture for high-velocity security telemetry.',
        category: 'Structure',
        icon: Database
    },
    {
        id: 'grand-unification',
        title: 'Grand Unification',
        slug: 'grand-unification',
        description: 'Synthesizing physical and digital security frameworks.',
        category: 'Structure',
        icon: Globe
    },
    {
        id: 'sheaf-cohomology',
        title: 'Sheaf Cohomology',
        slug: 'sheaf-cohomology',
        description: 'Topological analysis of local-to-global data consistency.',
        category: 'Structure',
        icon: Layers
    },
    {
        id: 'spectral-graph',
        title: 'Spectral Graph',
        slug: 'spectral-graph',
        description: 'Eigenvalue analysis of network connectivity matrices.',
        category: 'Structure',
        icon: Network
    },
    {
        id: 'unified-schema',
        title: 'Unified Schema',
        slug: 'unified-schema',
        description: 'Standardized ontology for all cyber entities and events.',
        category: 'Structure',
        icon: Database
    },

    // Security
    {
        id: 'adversarial-creativity',
        title: 'Adversarial Creativity',
        slug: 'adversarial-creativity',
        description: 'Modeling novel and unexpected attack vectors.',
        category: 'Security',
        icon: Zap
    },
    {
        id: 'adversarial-gnn',
        title: 'Adversarial GNN',
        slug: 'adversarial-gnn',
        description: 'Graph Neural Networks designed to deceive AI defenses.',
        category: 'Security',
        icon: Cpu
    },
    {
        id: 'federated-defense',
        title: 'Federated Defense',
        slug: 'federated-defense',
        description: 'Collaborative defense learning without data sharing.',
        category: 'Security',
        icon: Shield
    },
    {
        id: 'ggnn-attack',
        title: 'GGNN Attack',
        slug: 'ggnn-attack',
        description: 'Gated Graph Neural Network based intrusion techniques.',
        category: 'Security',
        icon: Cpu
    },
    {
        id: 'honeypot-avatar',
        title: 'Honeypot Avatar',
        slug: 'honeypot-avatar',
        description: 'Decoy personas to entrap advanced persistent threats.',
        category: 'Security',
        icon: UserX
    },
    {
        id: 'mirror-strike',
        title: 'Mirror Strike',
        slug: 'mirror-strike',
        description: 'Reflecting attack vectors back at the source.',
        category: 'Security',
        icon: Sword
    },

    // Economics
    {
        id: 'cyber-actuarial',
        title: 'Cyber Actuarial',
        slug: 'cyber-actuarial',
        description: 'Calculus of risk pricing and insurance premiums.',
        category: 'Economics',
        icon: DollarSign
    },
    {
        id: 'exploit-economics',
        title: 'Exploit Economics',
        slug: 'exploit-economics',
        description: 'Market dynamics of zero-day vulnerabilities.',
        category: 'Economics',
        icon: DollarSign
    },
    {
        id: 'ma-due-diligence',
        title: 'M&A Due Diligence',
        slug: 'ma-due-diligence',
        description: 'Assessing technical debt and risk in acquisitions.',
        category: 'Economics',
        icon: Scale
    },
    {
        id: 'supply-chain-butterfly',
        title: 'Supply Chain Butterfly',
        slug: 'supply-chain-butterfly',
        description: 'Chaos theory applied to vendor risk propagation.',
        category: 'Economics',
        icon: Globe
    }
];

// Re-export Lucide icons used above to avoid import errors if needed, 
// strictly speaking we imported them at the top.
// We need to make sure Grid, Disc, UserX, Sword exist.
import { Grid, Disc, UserX, Sword } from 'lucide-react';
