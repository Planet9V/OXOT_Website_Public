// OXOT Services Portfolio Data
// Structured data for the 13 AEON Cyber Digital Twin services

export interface ServiceData {
    id: number;
    name: string;
    tier: 'Gold' | 'Blue' | 'Red';
    tierColor: string;
    readiness: 1 | 2 | 3 | 4 | 5;
    priority: 'P1' | 'P2' | 'P3';
    description: string;
    elevatorPitch: string;
    research: string;
    disruptionLevel: 'Medium' | 'High' | 'Very High' | 'Disruptor';
    pricing: {
        small: { min: number; max: number };
        medium: { min: number; max: number };
        enterprise: { min: number; max: number };
        currency: 'EUR';
        model: 'subscription' | 'project' | 'hybrid';
    };
    timeline: {
        threeMonths: string;  // What's achievable in 3 months
        nineMonths: string;   // What's achievable in 9 months  
        oneYear: string;      // What's achievable in 1 year
    };
    competitors: string[];
    differentiator: string;
    compliance: string[];
    integration: string[];
    details?: {
        business: string;
        technical: string;
    };
    financialImpact: {
        metric: string;
        without: string;
        with: string;
        improvement: string;
    }[];
}

export const services: ServiceData[] = [
    {
        id: 1,
        name: 'On-Premise Threat Intelligence',
        tier: 'Blue',
        tierColor: '#0042D6',
        readiness: 4,
        priority: 'P1',
        description: 'Enterprise-grade AI threat detection that never sends your data outside your network.',
        elevatorPitch: 'Enterprise-grade AI threat detection that never sends your data outside your network—because privacy isn\'t optional for critical infrastructure.',
        research: 'RSCH-13',
        disruptionLevel: 'High',
        pricing: {
            small: { min: 50000, max: 100000 },
            medium: { min: 150000, max: 300000 },
            enterprise: { min: 300000, max: 500000 },
            currency: 'EUR',
            model: 'subscription'
        },
        timeline: { threeMonths: 'POC deployed', nineMonths: 'Full production', oneYear: 'Multi-site rollout' },
        competitors: ['CrowdStrike', 'SentinelOne'],
        differentiator: 'Only autonomous on-premise solution with multi-agent AI coordination',
        compliance: ['HIPAA', 'NERC CIP', 'PCI DSS', 'GDPR', 'NIS2', 'SOX'],
        integration: ['Syslog/CEF', 'Active Directory', 'Historian'],
        details: {
            business: "This deployment pattern supports our 'On-premise' but 'private' Blue team autonomous deployment, which only receives feed in, for data privacy, from our AEON Core. The Blue team sits on the facility network, with the local digital twin built, acquiring local telemetry from sources such as historian, logging, siem, firewalls, devices, active directory, wireless etc. This enables bi-directional communication (Secure) to manage incidents and utilize massive cloud-based resources to 'solve' the problem.",
            technical: "We replace the single-agent 'Active Inference' model with a **Multi-Agent Reinforcement Learning (MARL)** framework utilizing **Graph Convolutional Communication (GCC)**. Security agents are modeled as cooperative agents learning a shared policy that minimizes the collective Free Energy of the network. We employ **Centralized Training, Decentralized Execution (CTDE)** to ensure scalability."
        },
        financialImpact: [
            { metric: 'Mean Time to Detect', without: '280 days', with: '4 hours', improvement: '99% faster' },
            { metric: 'SOC Analyst FTEs', without: '8 analysts', with: '3 analysts', improvement: '63% reduction' }
        ]
    },
    {
        id: 2,
        name: 'Novel TTP Emergence Prediction',
        tier: 'Blue',
        tierColor: '#0042D6',
        readiness: 3,
        priority: 'P2',
        description: 'Predict novel attack techniques before they emerge using pattern analysis.',
        elevatorPitch: 'Stay ahead of attackers by predicting new TTPs before they become weaponized.',
        research: 'RSCH-08',
        disruptionLevel: 'Very High',
        pricing: {
            small: { min: 75000, max: 150000 },
            medium: { min: 200000, max: 500000 },
            enterprise: { min: 500000, max: 1000000 },
            currency: 'EUR',
            model: 'subscription'
        },
        timeline: { threeMonths: 'Model training', nineMonths: 'Beta predictions', oneYear: 'Production with validation' },
        competitors: ['Recorded Future', 'Mandiant'],
        differentiator: 'Psychohistory-based prediction using behavioral patterns',
        compliance: ['NERC CIP', 'NIS2'],
        integration: ['STIX/TAXII', 'MITRE ATT&CK'],
        details: {
            business: "Novel TTPs, by definition, have no prior instances. Traditional machine learning requires training data, making true novelty prediction theoretically impossible. AEON Core shifts from 'prediction' to 'generation': If our generated space contains the eventual attack, we have effectively 'predicted' it.",
            technical: "AEON Core uses two key engines: 1) **Adversarial Creativity Engine (ACE)**, a systematic framework for anticipating novel TTPs. 2) **Novel TTP Emergence** targeting 'The Gibson Heuristic' (Sci-Fi Mining) and 'Semantic Graph Collision' to find impossible edges in the digital twin."
        },
        financialImpact: [
            { metric: 'Early Warning Time', without: '0 days', with: '90 days', improvement: '90-day lead' }
        ]
    },
    {
        id: 3,
        name: 'Signal Physics Zero-Day Detection',
        tier: 'Blue',
        tierColor: '#0042D6',
        readiness: 3,
        priority: 'P2',
        description: 'Detect zero-day attacks using physics-based signal analysis.',
        elevatorPitch: 'Detect the undetectable—find zero-days through physics-based anomaly detection.',
        research: 'RSCH-15',
        disruptionLevel: 'Disruptor',
        pricing: {
            small: { min: 150000, max: 300000 },
            medium: { min: 500000, max: 1000000 },
            enterprise: { min: 1000000, max: 2000000 },
            currency: 'EUR',
            model: 'subscription'
        },
        timeline: { threeMonths: 'Research phase', nineMonths: 'POC deployment', oneYear: 'Production ready' },
        competitors: ['None direct'],
        differentiator: 'Unique physics-based detection, no signature required',
        compliance: ['NERC CIP', 'NIS2'],
        integration: ['Network TAP', 'SPAN ports'],
        details: {
            business: "Traditional SOCs assume if they ingest enough logs, they will cover the universe. This is mathematically impossible due to **Gödel's Incompleteness**. Defense must operate in the reflex, not just the analysis.",
            technical: "Does not rely on ingesting logs approaching infinity. Instead, Agent Blue Team operates on **Signal Physics**. The 'real' is detected only by its 'effects' on the glitch—the perturbation in entropy or latency that precedes the log entry. When a Zero Day strikes, we detect the physics, not the signature."
        },
        financialImpact: [
            { metric: 'Zero-Day Detection', without: '0%', with: '78%', improvement: '78% detection' }
        ]
    },
    {
        id: 4,
        name: 'Neural Physics Propagation Control',
        tier: 'Blue',
        tierColor: '#0042D6',
        readiness: 4,
        priority: 'P1',
        description: 'Stop ransomware in 8 seconds using epidemic math to isolate super-spreader machines.',
        elevatorPitch: 'Stop ransomware in 8 seconds, not 45 minutes—using epidemic math to isolate super-spreader machines before infection spreads.',
        research: 'RSCH-03, RSCH-04',
        disruptionLevel: 'High',
        pricing: {
            small: { min: 40000, max: 80000 },
            medium: { min: 100000, max: 200000 },
            enterprise: { min: 200000, max: 300000 },
            currency: 'EUR',
            model: 'subscription'
        },
        timeline: { threeMonths: 'Full production', nineMonths: 'Optimized + tuned', oneYear: 'Enterprise-wide' },
        competitors: ['Palo Alto XDR', 'Microsoft Defender'],
        differentiator: 'Mathematical containment guarantees using spectral radius analysis',
        compliance: ['HIPAA', 'NERC CIP', 'PCI DSS', 'GDPR', 'NIS2'],
        integration: ['SIEM', 'Firewall APIs', 'NAC'],
        details: {
            business: "Relying purely on reactive devices (firewalls/AV) often fails because controls are defined by the attacker. A robust defense focuses on reflex and topology, which are controlled by the defender. If a machine is infected, Agent Blue team isolates it in seconds.",
            technical: "AEON Core focuses on the **Spectral Radius** (largest eigenvalue) of the network adjacency matrix. We apply standard **SIR epidemiological models** to Cognitive Network Defense. By dynamically 'cutting' edges on high-centrality nodes (Seldon Points), we lower the spectral radius below the critical threshold ($R_0 < 1$), forcing mathematical virus extinction."
        },
        financialImpact: [
            { metric: 'Containment Time', without: '45 minutes', with: '8 seconds', improvement: '99.7% faster' },
            { metric: 'Machines Encrypted', without: '1,200', with: '3', improvement: '99.8% reduction' }
        ]
    },
    {
        id: 5,
        name: 'Attack Path Prediction (GGNN)',
        tier: 'Red',
        tierColor: '#D60000',
        readiness: 4,
        priority: 'P3',
        description: 'Predict attack paths using Graph Neural Networks on your network topology.',
        elevatorPitch: 'See your network through an attacker\'s eyes—predict the paths they will take.',
        research: 'RSCH-12',
        disruptionLevel: 'Medium',
        pricing: {
            small: { min: 30000, max: 60000 },
            medium: { min: 75000, max: 150000 },
            enterprise: { min: 150000, max: 200000 },
            currency: 'EUR',
            model: 'project'
        },
        timeline: { threeMonths: 'Production ready', nineMonths: 'Continuous scanning', oneYear: 'Automated remediation' },
        competitors: ['XM Cyber', 'SafeBreach'],
        differentiator: 'Graph Neural Network approach with topology awareness',
        compliance: ['PCI DSS', 'SOX'],
        integration: ['Network scanner', 'Asset inventory'],
        details: {
            business: "Traditional Attack Graphs are combinatorial explosions ($2^{X+Y}$ states). Calculating 'shortest path' is NP-hard. AEON's GGNN allows for linear complexity prediction of attack paths, enabling **Real-Time Risk Scoring**.",
            technical: "AEON uses **Gated Graph Neural Networks (gGNNs)** to model vulnerability propagation. Unlike static analysis, gGNNs use message-passing (GRUs/LSTMs) to propagate 'Infection State' across the graph. We predict 'Time to Pwn' by iterating the graph state over time steps $T$."
        },
        financialImpact: [
            { metric: 'Critical Path Discovery', without: '40%', with: '95%', improvement: '137% improvement' }
        ]
    },
    {
        id: 6,
        name: 'DDoS Antifragile Protection',
        tier: 'Blue',
        tierColor: '#0042D6',
        readiness: 2,
        priority: 'P3',
        description: 'Network that gets stronger under DDoS attack using antifragile principles.',
        elevatorPitch: 'Turn attacks into strength—your network learns and improves from every DDoS attempt.',
        research: 'RSCH-07',
        disruptionLevel: 'High',
        pricing: {
            small: { min: 75000, max: 150000 },
            medium: { min: 200000, max: 400000 },
            enterprise: { min: 400000, max: 800000 },
            currency: 'EUR',
            model: 'subscription'
        },
        timeline: { threeMonths: 'Research complete', nineMonths: 'POC deployment', oneYear: 'Beta release' },
        competitors: ['Cloudflare', 'Akamai'],
        differentiator: 'Antifragile architecture that strengthens under stress',
        compliance: ['NIS2'],
        integration: ['CDN', 'Load Balancer', 'Firewall'],
        details: {
            business: "AEON moves beyond 'Resilience' (bouncing back) to **Antifragility** (gaining from disorder). We model the network as a dynamic game where the system *improves* under stress.",
            technical: "We use a **Stochastic Rewiring Strategy** guided by the **Nash Equilibrium** of a zero-sum game. When attacked, the network spawns shadow-clones and rewires ingress using a **Consistent Hashing Ring**. The topology shifts to maximize the 'Cost of Attack' while defense capacity grows with attack intensity."
        },
        financialImpact: [
            { metric: 'Attack Resilience', without: 'Degraded', with: 'Improved', improvement: 'Net positive' }
        ]
    },
    {
        id: 7,
        name: 'Real-Time Insurance Underwriting',
        tier: 'Gold',
        tierColor: '#FFD700',
        readiness: 4,
        priority: 'P1',
        description: 'Continuous risk assessment replacing annual questionnaires for cyber insurance.',
        elevatorPitch: 'Replace annual questionnaires with continuous risk assessment—premiums that adjust hourly based on actual security posture, not self-reported checkboxes.',
        research: 'RSCH-26',
        disruptionLevel: 'Disruptor',
        pricing: {
            small: { min: 150000, max: 300000 },
            medium: { min: 500000, max: 1500000 },
            enterprise: { min: 1500000, max: 5000000 },
            currency: 'EUR',
            model: 'hybrid'
        },
        timeline: { threeMonths: 'Carrier integration', nineMonths: 'Live underwriting', oneYear: 'Multi-carrier platform' },
        competitors: ['CyberCube', 'SecurityScorecard'],
        differentiator: 'Only platform combining psychometric (human) risk with network topology',
        compliance: ['GDPR'],
        integration: ['Insurance carrier platforms', 'Risk databases'],
        details: {
            business: "The cyber insurance market faces **information asymmetry** and **adverse selection** due to reliance on annual questionnaires. AEON replaces this with **continuous graph-based risk assessment**, where premiums adjust hourly based on actual defensive posture.",
            technical: "The **AEON Risk Score (ARS)** aggregates four components: 1) **Spectral** (contagion potential), 2) **Cascade** (Granovetter probability), 3) **Human** (Psychometric tensor), and 4) **Hygiene** (Telemetry). The real-time premium is calculated dynamically: $P(t) = P_{base} \\times \\exp(\\alpha \\cdot (ARS(t) - ARS_{baseline}))$."
        },
        financialImpact: [
            { metric: 'Loss Ratio', without: '67%', with: '48%', improvement: '28% reduction' },
            { metric: 'Pricing Accuracy', without: '40%', with: '82%', improvement: '105% improvement' }
        ]
    },
    {
        id: 8,
        name: 'Supply Chain Butterfly Radar',
        tier: 'Gold',
        tierColor: '#FFD700',
        readiness: 3,
        priority: 'P2',
        description: 'Detect supply chain vulnerabilities before they cascade using chaos theory.',
        elevatorPitch: 'Spot the butterfly that causes the hurricane—detect supply chain risks before they cascade.',
        research: 'RSCH-18',
        disruptionLevel: 'Disruptor',
        pricing: {
            small: { min: 60000, max: 100000 },
            medium: { min: 150000, max: 300000 },
            enterprise: { min: 300000, max: 500000 },
            currency: 'EUR',
            model: 'subscription'
        },
        timeline: { threeMonths: 'Vendor mapping', nineMonths: 'Risk scoring live', oneYear: 'Cascade prediction active' },
        competitors: ['RiskRecon', 'BitSight'],
        differentiator: 'Chaos theory-based cascade prediction',
        compliance: ['NIS2', 'SOX'],
        integration: ['SBOM', 'Vendor management'],
        details: {
            business: "The 'Butterfly Effect' in software supply chains means a single vulnerability in a 4th-order dependency can cascade globally (e.g., Log4j). Vulnerabilities emerge from maintainer burnout, entropy, and fragmentation, which are observable *before* disclosure.",
            technical: "We model the supply chain as a **Diffusion Network (DAG)** where vulnerability concentration evolves over time. We use the **Hawkes Process** to model cascading disclosures and monitor leading indicators like commit rate drops, maintainer turnover, and fork proliferation to predict vulnerabilities 3 weeks in advance."
        },
        financialImpact: [
            { metric: 'Supply Chain Breach Prevention', without: '0', with: '73%', improvement: 'Major risk reduction' }
        ]
    },
    {
        id: 9,
        name: 'Cognitive Digital Twin (IR)',
        tier: 'Gold',
        tierColor: '#FFD700',
        readiness: 4,
        priority: 'P1',
        description: 'Model and predict SOC analyst decision quality to optimize incident response.',
        elevatorPitch: 'Predict when your SOC analysts will make mistakes—and intervene before they do. Model your defenders as carefully as you model your network.',
        research: 'RSCH-31',
        disruptionLevel: 'Disruptor',
        pricing: {
            small: { min: 100000, max: 200000 },
            medium: { min: 300000, max: 600000 },
            enterprise: { min: 600000, max: 1000000 },
            currency: 'EUR',
            model: 'subscription'
        },
        timeline: { threeMonths: 'Analyst profiling', nineMonths: 'Prediction active', oneYear: 'Full IR optimization' },
        competitors: ['Splunk SOAR'],
        differentiator: 'Only solution modeling human defenders as first-class entities',
        compliance: ['GDPR'],
        integration: ['SIEM', 'SOAR', 'HR systems'],
        details: {
            business: "No matter how sophisticated the technology, humans remain in the loop and are potential points of failure. AEON predicts **Defender Errors** (cognitive overload, panic, fatigue) to optimize incident response.",
            technical: "We model defenders as agents with **Skills**, **Personality** (Big Five), and **Dynamic State** (Load, Fatigue, Arousal). Using **Yerkes-Dodson** curves and **Cognitive Load Theory**, we simulate decision-making under stress. Playbooks are optimized as **MDP Policies** that penalize actions causing cognitive overload."
        },
        financialImpact: [
            { metric: 'Mean Time to Respond', without: '4.5 hours', with: '2.9 hours', improvement: '36% faster' },
            { metric: 'Analyst Turnover', without: '35%/year', with: '18%/year', improvement: '49% reduction' }
        ]
    },
    {
        id: 10,
        name: 'Insider Threat Analysis',
        tier: 'Gold',
        tierColor: '#FFD700',
        readiness: 3,
        priority: 'P2',
        description: 'Predict insider threat risk using psychometric analysis and behavioral patterns.',
        elevatorPitch: 'Know your insider risk before it becomes an incident—without invasive surveillance.',
        research: 'RSCH-29',
        disruptionLevel: 'High',
        pricing: {
            small: { min: 75000, max: 150000 },
            medium: { min: 200000, max: 400000 },
            enterprise: { min: 400000, max: 600000 },
            currency: 'EUR',
            model: 'subscription'
        },
        timeline: { threeMonths: 'Baseline collection', nineMonths: 'Risk scoring', oneYear: 'Predictive prevention' },
        competitors: ['DTEX', 'Securonix'],
        differentiator: 'Psychometric profiling without invasive monitoring',
        compliance: ['GDPR'],
        integration: ['HR systems', 'DLP', 'SIEM'],
        details: {
            business: "Insider threats often originate from internal motivation (Sabotage, Fraud, Espionage). Standard models miss this. AEON incorporates the **Dark Triad** (Machiavellianism, Narcissism, Psychopathy) into the psychometric tensor to predict *self-initiated* malicious behavior.",
            technical: "We value the **Dark Triad** traits alongside the Big Five to map personality to attack vectors (e.g., Social Engineering, Data Theft). We monitor behavioral indicators like specific communication patterns and access anomalies, updating the risk score in real-time."
        },
        financialImpact: [
            { metric: 'Insider Incident Prevention', without: '30%', with: '78%', improvement: '160% improvement' }
        ]
    },
    {
        id: 11,
        name: 'Team Composition Optimization',
        tier: 'Gold',
        tierColor: '#FFD700',
        readiness: 4,
        priority: 'P1',
        description: 'Build optimal security teams using psychometric orchestration and team dynamics.',
        elevatorPitch: 'Hire for team harmony, not just individual talent. Use psychometric orchestration to build security teams that perform like symphonies, not garage bands.',
        research: 'RSCH-38',
        disruptionLevel: 'Disruptor',
        pricing: {
            small: { min: 40000, max: 80000 },
            medium: { min: 100000, max: 250000 },
            enterprise: { min: 250000, max: 400000 },
            currency: 'EUR',
            model: 'subscription'
        },
        timeline: { threeMonths: 'Team assessment', nineMonths: 'Optimization deployed', oneYear: 'Full HR integration' },
        competitors: ['Predictive Index', 'Hogan'],
        differentiator: 'Mathematical team dynamics using DISC×OCEAN tensors',
        compliance: ['GDPR', 'EEOC'],
        integration: ['HRIS', 'Assessment platforms'],
        details: {
            business: "Traditional hiring (resume, 'culture fit') fails to account for **team dynamics**. AEON treats personnel selection as **Psychometric Orchestration**, modeling teams as polyphonic ensembles to maximize performance.",
            technical: "We model the team as a **ferromagnetic Ising lattice** (spins, coupling, temperature) and a **Musical Ensemble** (Voice, Instrument, Harmony). The algorithm serves as 'The Chef', selecting candidates ($\\mathbf{P}^*$) that maximize utility by balancing **Dissonance** and **Magnetization** (cohesion) using DISCxOCEAN tensors."
        },
        financialImpact: [
            { metric: 'Bad Hire Cost', without: '€240K', with: '€88K', improvement: '63% reduction' },
            { metric: 'Time to Productivity', without: '5 months', with: '3.2 months', improvement: '36% faster' }
        ]
    },
    {
        id: 12,
        name: 'Compliance Physics Engine',
        tier: 'Gold',
        tierColor: '#FFD700',
        readiness: 3,
        priority: 'P3',
        description: 'Predict compliance drift and automatically maintain regulatory posture.',
        elevatorPitch: 'Compliance that maintains itself—predict and prevent drift before auditors arrive.',
        research: 'RSCH-22',
        disruptionLevel: 'Medium',
        pricing: {
            small: { min: 60000, max: 100000 },
            medium: { min: 150000, max: 250000 },
            enterprise: { min: 250000, max: 400000 },
            currency: 'EUR',
            model: 'subscription'
        },
        timeline: { threeMonths: 'Framework mapping', nineMonths: 'Drift detection', oneYear: 'Self-healing active' },
        competitors: ['Vanta', 'Drata'],
        differentiator: 'Physics-based drift prediction and self-healing',
        compliance: ['HIPAA', 'SOX', 'PCI DSS', 'SOC2'],
        integration: ['GRC platforms', 'Cloud providers'],
        financialImpact: [
            { metric: 'Audit Prep Time', without: '6 weeks', with: '1 week', improvement: '83% reduction' }
        ]
    },
    {
        id: 13,
        name: 'Federated Defense Network',
        tier: 'Blue',
        tierColor: '#0042D6',
        readiness: 2,
        priority: 'P3',
        description: 'Create a collective defense network with privacy-preserving threat sharing.',
        elevatorPitch: 'Collective defense without exposing your data—federated learning for shared intelligence.',
        research: 'RSCH-35',
        disruptionLevel: 'High',
        pricing: {
            small: { min: 40000, max: 80000 },
            medium: { min: 100000, max: 300000 },
            enterprise: { min: 300000, max: 500000 },
            currency: 'EUR',
            model: 'subscription'
        },
        timeline: { threeMonths: 'Architecture design', nineMonths: 'Pilot network', oneYear: 'Regional federation' },
        competitors: ['None direct'],
        differentiator: 'Federated learning with full privacy preservation',
        compliance: ['GDPR', 'NIS2'],
        integration: ['ISAC feeds', 'Peer networks'],
        financialImpact: [
            { metric: 'Threat Intelligence Coverage', without: '1x', with: '10x', improvement: '10x improvement' }
        ]
    }
];

// Helper functions
export const getServicesByTier = (tier: 'Gold' | 'Blue' | 'Red') =>
    services.filter(s => s.tier === tier);

export const getServicesByPriority = (priority: 'P1' | 'P2' | 'P3') =>
    services.filter(s => s.priority === priority);

export const getPriorityServices = () => services.filter(s => s.priority === 'P1');

export const calculateTotalARR = (selectedServices: ServiceData[], clientSize: 'small' | 'medium' | 'enterprise') => {
    return selectedServices.reduce((total, service) => {
        const pricing = service.pricing[clientSize];
        return total + (pricing.min + pricing.max) / 2;
    }, 0);
};

// Market summary
export const marketSummary = {
    totalAddressableMarket: 42_000_000_000, // $42B+
    serviceableAddressableMarket: 10_000_000_000, // $10B
    serviceableObtainableMarket: 500_000_000, // $500M 5-year
    marketGrowthRate: 0.20, // 20% CAGR
    averageDealSize: {
        year1: 217_000,
        year2: 350_000,
        year3: 350_000
    },
    targetCustomers: {
        year1: 15,
        year2: 50,
        year3: 150
    }
};
