// OXOT Services Portfolio Data
// Structured data for the 13 AEON Cyber Digital Twin services

// Regional pricing configuration
export interface Region {
    id: string;
    name: string;
    multiplier: number;
    currency: string;
    symbol: string;
}

export const regions: Record<string, Region> = {
    EU: { id: 'EU', name: 'Europe', multiplier: 1.0, currency: 'EUR', symbol: '€' },
    NA: { id: 'NA', name: 'North America', multiplier: 1.0, currency: 'USD', symbol: '$' },
    APAC: { id: 'APAC', name: 'Asia-Pacific', multiplier: 0.85, currency: 'USD', symbol: '$' },
    LATAM: { id: 'LATAM', name: 'Latin America', multiplier: 0.7, currency: 'USD', symbol: '$' }
};

// Get price for a specific region and client size
export const getRegionalPrice = (
    service: ServiceData,
    regionId: string,
    clientSize: 'small' | 'medium' | 'enterprise'
): { min: number; max: number; currency: string; symbol: string } => {
    const region = regions[regionId] || regions.EU;
    const basePrice = service.pricing[clientSize];
    return {
        min: Math.round(basePrice.min * region.multiplier),
        max: Math.round(basePrice.max * region.multiplier),
        currency: region.currency,
        symbol: region.symbol
    };
};

// Format price for display
export const formatPrice = (amount: number, symbol: string = '€'): string => {
    if (amount >= 1_000_000) {
        return `${symbol}${(amount / 1_000_000).toFixed(1)}M`;
    }
    return `${symbol}${(amount / 1000).toFixed(0)}k`;
};
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
    theoryLink?: string; // Link to theory page for detailed scientific explanation
    disruptionLevel: 'Medium' | 'High' | 'Very High' | 'Disruptor';
    pricing: {
        small: { min: number; max: number };
        medium: { min: number; max: number };
        enterprise: { min: number; max: number };
        currency: 'EUR';
        model: 'subscription' | 'project' | 'hybrid' | 'retainer';
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
    competition?: {
        name: string;
        type: string;
        gap: string;
    };
    competitorAnalysis?: {
        name: string;
        tier: 'Market Leader' | 'Challenger' | 'Niche';
        pricePoint: 'High' | 'Medium' | 'Low';
        notes: string;
        swot: {
            strengths: string[];
            weaknesses: string[];
            opportunities: string[];
            threats: string[];
        };
    }[];
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
        theoryLink: '/theory/active-inference',
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
        competitorAnalysis: [
            {
                name: 'CrowdStrike',
                tier: 'Market Leader',
                pricePoint: 'High',
                notes: 'Dominant endpoint market share, but cloud-reliant.',
                swot: {
                    strengths: ['Market Leadership & Innovation', 'Strong Financial Performance'],
                    weaknesses: ['Premium Pricing', 'Dependency on Cloud Connectivity'],
                    opportunities: ['Expansion into Identity/Cloud Security', 'AI-Driven Security'],
                    threats: ['Aggressive Bundling by Microsoft', 'Evolving Threat Landscape']
                }
            },
            {
                name: 'SentinelOne',
                tier: 'Challenger',
                pricePoint: 'Medium',
                notes: 'Strong autonomy, but often higher false positive rates.',
                swot: {
                    strengths: ['AI-Powered Autonomous Platform', 'Comprehensive Capabilities (XDR)'],
                    weaknesses: ['Intense Competition', 'Potential for False Positives'],
                    opportunities: ['Expanding Cybersecurity Market', 'AI Innovation (Purple AI)'],
                    threats: ['Rapidly Evolving AI-Powered Attacks', 'Price Pressure']
                }
            }
        ],
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
        theoryLink: '/theory/adversarial-creativity',
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
        competitorAnalysis: [
            {
                name: 'Mandiant (Google Cloud)',
                tier: 'Market Leader',
                pricePoint: 'High',
                notes: 'Gold standard for human-led threat intel and IR.',
                swot: {
                    strengths: ['Elite Threat Intelligence', 'Incident Response Prowess'],
                    weaknesses: ['Premium Cost', 'Less Productized/Scalable'],
                    opportunities: ['Cloud Security Demand', 'AI/ML Synergy with Google'],
                    threats: ['Talent Scarcity', 'Rapidly Evolving Threats']
                }
            },
            {
                name: 'Recorded Future',
                tier: 'Market Leader',
                pricePoint: 'High',
                notes: 'Excellent data breadth, but distinct from predictive physics.',
                swot: {
                    strengths: ['Vast Data Collection', 'Strong Brand'],
                    weaknesses: ['Alert Fatigue', 'High Cost'],
                    opportunities: ['AI Analysis', 'Integration'],
                    threats: ['Commoditization of Feed Data']
                }
            }
        ],
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
        theoryLink: '/theory/edge-physics',
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
        competitorAnalysis: [
            {
                name: 'Darktrace',
                tier: 'Challenger',
                pricePoint: 'High',
                notes: 'Uses "AI immune system" approach, closest conceptual rival.',
                swot: {
                    strengths: ['Self-Learning AI', 'Predictive Cybersecurity'],
                    weaknesses: ['High Implementation Cost', 'High False Positives'],
                    opportunities: ['Growing AI Security Demand', 'Predictive Capabilities'],
                    threats: ['Intense Competition', 'AI-Driven Attacks']
                }
            }
        ],
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
        theoryLink: '/theory/spectral-graph',
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
        competitorAnalysis: [
            {
                name: 'Palo Alto Networks',
                tier: 'Market Leader',
                pricePoint: 'High',
                notes: 'Excellent inline blocking, but less effective at internal lateral movement containment.',
                swot: {
                    strengths: ['Comprehensive Platform (Prisma)', 'Market Leadership (NGFW)'],
                    weaknesses: ['Product Complexity', 'Premium Pricing'],
                    opportunities: ['Zero Trust Adoption', 'Platformization'],
                    threats: ['Complexity Management', 'Talent Shortage']
                }
            }
        ],
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
        theoryLink: '/theory/ggnn-attack',
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
            technical: "AEON uses **Gated Graph Neural Networks (gGNNs)** (Li et al., 2016) to model vulnerability propagation. Where $h_v^{(t)} = GRU(h_v^{(t-1)}, \sum W \cdot h_u^{(t-1)})$, nodes update their 'Infection State' based on neighbors. We predict 'Time to Pwn' by iterating graph state over time steps $T$, achieving $O(T \times |E|)$ complexity vs exponential full traversal."
        },
        financialImpact: [
            { metric: 'Critical Path Discovery', without: '40%', with: '95%', improvement: '137% improvement' }
        ],
        competitorAnalysis: [
            {
                name: 'XM Cyber',
                tier: 'Market Leader',
                pricePoint: 'High',
                notes: 'Strong attack path management, but can be complex to deploy.',
                swot: {
                    strengths: ['Established Market Presence', 'Detailed Path Visualization'],
                    weaknesses: ['High Cost', 'Resource Intensive'],
                    opportunities: ['Cloud Security Integration', 'Automated Remediation'],
                    threats: ['Emerging GNN Approaches', 'Integration Complexity']
                }
            },
            {
                name: 'SafeBreach',
                tier: 'Challenger',
                pricePoint: 'Medium',
                notes: 'Focuses on breach and attack simulation (BAS).',
                swot: {
                    strengths: ['Comprehensive Attack Playbooks', 'Validation Focus'],
                    weaknesses: ['Reactive vs Predictive', 'Agent Management'],
                    opportunities: ['Continuous Validation', 'Threat Intel Integration'],
                    threats: ['Market Saturation', 'Native Cloud Tools']
                }
            }
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
        theoryLink: '/theory/antifragile-topology',
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
            business: "AEON moves beyond 'Resilience' (bouncing back) to **Antifragility** (gaining from disorder). We model the network not as a static graph, but as a dynamic game where the system *improves* under stress ($f''(S) > 0$).",
            technical: "Using a **Stochastic Rewiring Strategy** guided by **Nash Equilibrium**, the network optimizes topology $\dot{A}(t)$ in real-time. Under attack, we spawn shadow-clones and rewire ingress via **Consistent Hashing Rings**, ensuring defense capacity $C_{def}$ grows proportional to attack intensity ($C_{def} \propto S$)."
        },
        financialImpact: [
            { metric: 'Attack Resilience', without: 'Degraded', with: 'Improved', improvement: 'Net positive' }
        ],
        competitorAnalysis: [
            {
                name: 'Cloudflare',
                tier: 'Market Leader',
                pricePoint: 'Low',
                notes: 'Massive scale and global network, widely adopted.',
                swot: {
                    strengths: ['Global Scale', 'Free/Low Cost Tiers'],
                    weaknesses: ['Generic Rules', 'Less Specialized for Niche Attacks'],
                    opportunities: ['Zero Trust Expansion', 'Edge Computing'],
                    threats: ['Commoditization', 'Regulatory Hurdles']
                }
            },
            {
                name: 'Akamai',
                tier: 'Market Leader',
                pricePoint: 'High',
                notes: 'Enterprise-grade reliability and performance.',
                swot: {
                    strengths: ['Proven Enterprise Track Record', 'Deep Visibility'],
                    weaknesses: ['High Cost', 'Legacy Perception'],
                    opportunities: ['Security Services Growth', 'Cloud Computing'],
                    threats: ['Cloudflare Aggression', 'Hyperscaler Entry']
                }
            }
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
        theoryLink: '/theory/cyber-actuarial',
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
            business: "The cyber insurance market faces **information asymmetry** and **adverse selection**. AEON replaces annual questionnaires with **continuous graph-based risk assessment**, enabling 'Pay-as-you-Risk' policies where premiums adjust hourly.",
            technical: "The **AEON Risk Score (ARS)** combines: 1) **Spectral Radius** (Contagion $\\lambda_{max}$), 2) **Cascade Probability** (Granovetter), 3) **Human Risk** (Psychometric Tensor $P_u^T \cdot T \cdot A$), and 4) **Hygiene Telemetry**. Premium calculation: $P(t) = P_{base} \\times \\exp(\\alpha \\cdot (ARS(t) - ARS_{baseline}))$. Validated to outperform questionnaires by 3.2x in loss-ratio prediction."
        },
        financialImpact: [
            { metric: 'Loss Ratio', without: '67%', with: '48%', improvement: '28% reduction' },
            { metric: 'Pricing Accuracy', without: '40%', with: '82%', improvement: '105% improvement' }
        ],
        competitorAnalysis: [
            {
                name: 'CyberCube',
                tier: 'Market Leader',
                pricePoint: 'High',
                notes: 'Leading cyber risk analytics for the insurance industry.',
                swot: {
                    strengths: ['Industry Standard Models', 'Strong Insurance Data'],
                    weaknesses: ['Complexity for Non-Actuaries', 'Cost'],
                    opportunities: ['Expansion to Enterprise Risk', 'Real-Time Data Integration'],
                    threats: ['New Entrants with AI Models', 'Data Privacy Regulations']
                }
            },
            {
                name: 'SecurityScorecard',
                tier: 'Challenger',
                pricePoint: 'Medium',
                notes: 'Outside-in risk ratings, easy to understand.',
                swot: {
                    strengths: ['Ease of Use', 'Vendor Risk Management'],
                    weaknesses: ['Limited Inside-Out View', 'False Positives'],
                    opportunities: ['Marketplace Ecosystem', 'Supply Chain Focus'],
                    threats: ['Competitor Accuracy', 'Legal Challenges to Ratings']
                }
            }
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
        theoryLink: '/theory/supply-chain-butterfly',
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
            business: "Vulnerabilities don't appear spontaneously; they emerge from maintainer burnout, entropy, and fragmentation. The **Butterfly Effect** means a single 4th-order dependency issue can cascade globally (e.g., Log4j).",
            technical: "We model the supply chain as a **Diffusion Network (DAG)** where concentration $u_i(t)$ evolves via $\\frac{du_i}{dt} = \\sum D_{ij}(u_j - u_i)$. Using the **Hawkes Process** $\\lambda_i(t)$ to model cascading disclosures, we monitor leading indicators (commit drops, turnover) to predict vulnerabilities with a 3-week lead time."
        },
        financialImpact: [
            { metric: 'Supply Chain Breach Prevention', without: '0', with: '73%', improvement: 'Major risk reduction' }
        ],
        competitorAnalysis: [
            {
                name: 'RiskRecon',
                tier: 'Market Leader',
                pricePoint: 'Medium',
                notes: 'Mastercard company, strong assessments.',
                swot: {
                    strengths: ['Backed by Mastercard', 'Actionable Insights'],
                    weaknesses: ['Focus on Snapshot Assessments', 'Less Predictive'],
                    opportunities: ['Financial Service Integration', 'SME Market'],
                    threats: ['Continuous Monitoring Competitors', 'AI-Based Prediction']
                }
            },
            {
                name: 'BitSight',
                tier: 'Market Leader',
                pricePoint: 'High',
                notes: 'Pioneer in security ratings.',
                swot: {
                    strengths: ['Market Recognition', 'Large Database'],
                    weaknesses: ['Static Scoring Model', 'Disputes on Methodology'],
                    opportunities: ['Attack Surface Management', 'Board Reporting'],
                    threats: ['Regulatory Scrutiny', 'Commoditization']
                }
            }
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
        theoryLink: '/theory/cognitive-twin',
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
            business: "Humans are the critical point of failure. AEON predicts **Defender Errors** (cognitive overload, panic, fatigue) to optimize IR. We demonstrate 35% faster response times by optimizing for the human in the loop.",
            technical: "Defenders are modeled as agents: $Agent_d = (Skills_d, Personality_d, State_d(t))$. We use **Yerkes-Dodson** curves to model performance vs arousal. Playbooks are optimized as **MDP Policies** $\\pi^*$ maximizing reward $R'$ while penalizing Cognitive Load, preventing burnout and panic-induced misconfigurations."
        },
        financialImpact: [
            { metric: 'Mean Time to Respond', without: '4.5 hours', with: '2.9 hours', improvement: '36% faster' },
            { metric: 'Analyst Turnover', without: '35%/year', with: '18%/year', improvement: '49% reduction' }
        ],
        competitorAnalysis: [
            {
                name: 'Splunk SOAR',
                tier: 'Market Leader',
                pricePoint: 'High',
                notes: 'Automation focused, less emphasis on the human analyst state.',
                swot: {
                    strengths: ['Extensive Integrations', 'Visual Playbook Editor'],
                    weaknesses: ['Complexity', 'High Licensing Costs'],
                    opportunities: ['Data Lake Integration', 'AI Automation'],
                    threats: ['Leaner SOAR Competitors', 'XDR Built-ins']
                }
            }
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
        theoryLink: '/theory/dark-triad',
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
            business: "Insider threats often originate from internal motivation (Sabotage, Fraud, Espionage) rather than external manipulation. Standard models miss this. AEON incorporates the **Dark Triad** to predict self-initiated malicious behavior.",
            technical: "We extend the psychometric tensor $T_{ij}$ to include **Machiavellianism (Manipulation)**, **Narcissism (Grandiosity)**, and **Psychopathy (Impulsivity)**. By mapping these traits to attack vectors and monitoring behavioral telemetry (sentiment, access anomalies), we achieve 78% accuracy in predicting insider incidents."
        },
        financialImpact: [
            { metric: 'Insider Incident Prevention', without: '30%', with: '78%', improvement: '160% improvement' }
        ],
        competitorAnalysis: [
            {
                name: 'DTEX Systems',
                tier: 'Challenger',
                pricePoint: 'Medium',
                notes: 'Focuses on workforce cyber intelligence and privacy.',
                swot: {
                    strengths: ['Privacy-by-Design', 'Insider Risk Specialization'],
                    weaknesses: ['Niche Focus', 'Requires Agent'],
                    opportunities: ['Remote Work Security', 'Behavioral Analytics'],
                    threats: ['Broader DLP Solutions', 'Endpoint Prevention Tools']
                }
            },
            {
                name: 'Securonix',
                tier: 'Market Leader',
                pricePoint: 'High',
                notes: 'SIEM/UEBA approach to insider threats.',
                swot: {
                    strengths: ['Advanced Analytics', 'Cloud-Native'],
                    weaknesses: ['deployment Complexity', 'Cost'],
                    opportunities: ['Converged SIEM/XDR', 'Managed Services'],
                    threats: ['Cloud Providers (Azure Sentinel)', 'Splunk']
                }
            }
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
        theoryLink: '/theory/team-composition',
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
            business: "Hire for harmony, not just talent. Traditional hiring fails to account for **team dynamics**. AEON treats personnel selection as **Psychometric Orchestration**, modeling teams as polyphonic ensembles to maximize performance.",
            technical: "We model the team as a **ferromagnetic Ising lattice** ($H = -\\sum J_{ij} \\sigma_i \\sigma_j$) and a **Musical Ensemble** (DISC=Instrument, OCEAN=Dynamics). The algorithm ('The Chef') selects candidates $\\mathbf{P}^*$ that minimize **Group Dissonance** $D_{team}$ while maintaining sufficient **Magnetization** (alignment), improving team metrics by 38%."
        },
        financialImpact: [
            { metric: 'Bad Hire Cost', without: '€240K', with: '€88K', improvement: '63% reduction' },
            { metric: 'Time to Productivity', without: '5 months', with: '3.2 months', improvement: '36% faster' }
        ],
        competitorAnalysis: [
            {
                name: 'Predictive Index',
                tier: 'Market Leader',
                pricePoint: 'Medium',
                notes: 'General behavioral assessment, not security-specific.',
                swot: {
                    strengths: ['Widespread HR Adoption', 'Simple Methodology'],
                    weaknesses: ['Generic', 'Not Tuned for InfoSec Stress'],
                    opportunities: ['Talent Optimization', 'Integration with HRIS'],
                    threats: ['AI-Based Recruiting', 'Specialized Assessments']
                }
            }
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
        theoryLink: '/theory/compliance-physics',
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
        ],
        competitorAnalysis: [
            {
                name: 'Vanta',
                tier: 'Market Leader',
                pricePoint: 'Medium',
                notes: 'Automated compliance monitoring, very popular.',
                swot: {
                    strengths: ['Automation', 'Startup Friendly'],
                    weaknesses: ['Limited to Standard Frameworks', 'Check-box Focus'],
                    opportunities: ['Enterprise Expansion', 'Trust Management'],
                    threats: ['Drata', 'Manual Audit Firms']
                }
            },
            {
                name: 'Drata',
                tier: 'Challenger',
                pricePoint: 'Medium',
                notes: 'Strong automation competitor.',
                swot: {
                    strengths: ['Continuous Monitoring', 'Integrations'],
                    weaknesses: ['Market Saturation', 'Differentiation'],
                    opportunities: ['GRC Expansion', 'Partner Ecosystem'],
                    threats: ['Vanta', 'Consolidation']
                }
            }
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
        theoryLink: '/theory/federated-defense',
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
        ],
        competitorAnalysis: [
            {
                name: 'FS-ISAC',
                tier: 'Market Leader',
                pricePoint: 'Medium',
                notes: 'Industry standard for financial services sharing.',
                swot: {
                    strengths: ['Trust Community', 'High Quality Data'],
                    weaknesses: ['Manual Processes', 'Siloed to Industry'],
                    opportunities: ['Automated Sharing', 'Cross-Sector Expansion'],
                    threats: ['Private Threat Intel', 'Regulation']
                }
            }
        ]
    },

    // --- GOLD TEAM EXPANSION ---
    {
        id: 14,
        name: 'IEC 62443: Supplier',
        tier: 'Gold',
        tierColor: '#FFD700',
        readiness: 1,
        priority: 'P1',
        description: 'Guided compliance and certification roadmap for OT/ICS suppliers ensuring secure product development lifecycles.',
        elevatorPitch: 'Certification-ready secure development lifecycle for suppliers targeting critical infrastructure markets.',
        research: 'RSCH-IEC-S',
        theoryLink: '/theory/compliance-architecture',
        disruptionLevel: 'Medium',
        pricing: {
            small: { min: 45000, max: 75000 },
            medium: { min: 90000, max: 150000 },
            enterprise: { min: 200000, max: 350000 },
            currency: 'EUR',
            model: 'project'
        },
        timeline: { threeMonths: 'Gap Analysis', nineMonths: 'Audit Readiness', oneYear: 'Certification' },
        competitors: ['TÜV SÜD', 'Exida'],
        differentiator: 'Integrated with Digital Twin for continuous compliance validation.',
        compliance: ['IEC 62443-4-1', 'IEC 62443-4-2'],
        integration: ['Jira', 'GitLab'],
        financialImpact: [
            { metric: 'Market Access', without: 'Restricted', with: 'Global', improvement: 'Unlock EU/US Markets' }
        ],
        competitorAnalysis: [],
        competition: { name: 'TÜV', type: 'Certifier', gap: 'No Engineering Support' }
    },
    {
        id: 15,
        name: 'IEC 62443: Integrator',
        tier: 'Gold',
        tierColor: '#FFD700',
        readiness: 1,
        priority: 'P1',
        description: 'System security design and integration validation for OT builders and system integrators.',
        elevatorPitch: 'Prove your systems are secure by design. Essential for winning critical infrastructure tenders.',
        research: 'RSCH-IEC-I',
        theoryLink: '/theory/secure-integration',
        disruptionLevel: 'Medium',
        pricing: {
            small: { min: 60000, max: 90000 },
            medium: { min: 120000, max: 200000 },
            enterprise: { min: 300000, max: 500000 },
            currency: 'EUR',
            model: 'project'
        },
        timeline: { threeMonths: 'Design Review', nineMonths: 'FAT/SAT Support', oneYear: 'Full Compliance' },
        competitors: ['KPMG', 'DNV'],
        differentiator: 'Automated verification vectors for FAT/SAT.',
        compliance: ['IEC 62443-3-3', 'IEC 62443-2-4'],
        integration: ['Engineering Workstations'],
        financialImpact: [
            { metric: 'Tender Win Rate', without: '15%', with: '45%', improvement: '+200% Win Rate' }
        ],
        competitorAnalysis: [],
        competition: { name: 'Big 4', type: 'Consulting', gap: 'Low Technical Depth' }
    },
    {
        id: 16,
        name: 'NIS2 Directive Program',
        tier: 'Gold',
        tierColor: '#FFD700',
        readiness: 1,
        priority: 'P1',
        description: 'Comprehensive NIS2 compliance acceleration for EU entities, covering governance, risk, and reporting.',
        elevatorPitch: 'Turn regulatory burden into operational excellence. Guaranteed NIS2 audit readiness.',
        research: 'RSCH-NIS2',
        theoryLink: '/theory/regulatory-governance',
        disruptionLevel: 'Medium',
        pricing: {
            small: { min: 35000, max: 60000 },
            medium: { min: 80000, max: 120000 },
            enterprise: { min: 250000, max: 400000 },
            currency: 'EUR',
            model: 'retainer'
        },
        timeline: { threeMonths: 'Gap Analysis', nineMonths: 'Remediation', oneYear: 'Maintenance' },
        competitors: ['Deloitte', 'PwC'],
        differentiator: 'Automated reporting pipeline to EU authorities.',
        compliance: ['NIS2', 'ISO 27001'],
        integration: ['GRC Platforms'],
        financialImpact: [
            { metric: 'Non-Compliance Risk', without: '10M EUR', with: '0 EUR', improvement: 'Avoid Fine & Liability' }
        ],
        competitorAnalysis: [],
        competition: { name: 'Deloitte', type: 'Consulting', gap: 'Paper-based only' }
    },
    {
        id: 17,
        name: 'M&A Cyber Due Diligence',
        tier: 'Gold',
        tierColor: '#FFD700',
        readiness: 1,
        priority: 'P1',
        description: 'Rapid, deep-dive assessment of target acquisition cyber posture, focusing on hidden technical debt and compromise.',
        elevatorPitch: 'Know what you are buying. Uncover hidden breaches and technical debt before you sign.',
        research: 'RSCH-MA-DD',
        theoryLink: '/theory/risk-quantification',
        disruptionLevel: 'Medium',
        pricing: {
            small: { min: 25000, max: 40000 },
            medium: { min: 60000, max: 90000 },
            enterprise: { min: 150000, max: 250000 },
            currency: 'EUR',
            model: 'project'
        },
        timeline: { threeMonths: 'Assessment', nineMonths: 'N/A', oneYear: 'N/A' },
        competitors: ['Kroll', 'A&M'],
        differentiator: 'Code-level and dark web analysis included standard.',
        compliance: ['N/A'],
        integration: ['Data Room'],
        financialImpact: [
            { metric: 'Deal Valuation', without: 'Risk Premium', with: 'Adjusted', improvement: '10-20% Price Correction' }
        ],
        competitorAnalysis: [],
        competition: { name: 'Kroll', type: 'Forensic', gap: 'Slow Turnaround' }
    },
    {
        id: 18,
        name: 'Crisis War Gaming',
        tier: 'Gold',
        tierColor: '#FFD700',
        readiness: 1,
        priority: 'P2',
        description: 'Executive-level tabletop exercises simulating catastrophic cyber-physical attacks to test decision making.',
        elevatorPitch: 'Train like you fight. Executive stress testing for worst-case scenarios.',
        research: 'RSCH-WARGAME',
        theoryLink: '/theory/crisis-management',
        disruptionLevel: 'Medium',
        pricing: {
            small: { min: 20000, max: 30000 },
            medium: { min: 45000, max: 70000 },
            enterprise: { min: 100000, max: 150000 },
            currency: 'EUR',
            model: 'project'
        },
        timeline: { threeMonths: 'Scenario Design', nineMonths: 'Execution', oneYear: 'Review' },
        competitors: ['IBM X-Force', 'Mandiant'],
        differentiator: 'Hyper-realistic injection of deepfakes and media pressure.',
        compliance: ['ISO 22301'],
        integration: ['N/A'],
        financialImpact: [
            { metric: 'Crisis Response Time', without: '48h', with: '4h', improvement: '90% Faster Decisions' }
        ],
        competitorAnalysis: [],
        competition: { name: 'IBM', type: 'Service', gap: 'Generic Scenarios' }
    },
    {
        id: 19,
        name: 'SOC Modernization',
        tier: 'Gold',
        tierColor: '#FFD700',
        readiness: 2,
        priority: 'P2',
        description: 'Architectural overhaul of legacy SOCs to support AI-driven detection, automation, and OT integration.',
        elevatorPitch: 'Transform your alert fatigue into automated response. Next-gen SOC architecture.',
        research: 'RSCH-SOCM',
        theoryLink: '/theory/secops-automation',
        disruptionLevel: 'Medium',
        pricing: {
            small: { min: 60000, max: 90000 },
            medium: { min: 150000, max: 250000 },
            enterprise: { min: 400000, max: 800000 },
            currency: 'EUR',
            model: 'project'
        },
        timeline: { threeMonths: 'Assessment', nineMonths: 'Implementation', oneYear: 'Transition' },
        competitors: ['Accenture', 'Capgemini'],
        differentiator: 'Vendor-agnostic automation fabric design.',
        compliance: ['SOC2'],
        integration: ['SIEM', 'SOAR'],
        financialImpact: [
            { metric: 'Analyst Efficiency', without: '100 alerts/day', with: '1000 alerts/day', improvement: '10x Throughput' }
        ],
        competitorAnalysis: [],
        competition: { name: 'Accenture', type: 'Consulting', gap: 'High Cost' }
    },
    {
        id: 20,
        name: 'Digital Transformation',
        tier: 'Gold',
        tierColor: '#FFD700',
        readiness: 2,
        priority: 'P2',
        description: 'Secure digital transformation strategy ensuring new technologies (Cloud, IIoT) are secure by default.',
        elevatorPitch: 'Innovate without fear. We ensure your digital leap is a secure landing.',
        research: 'RSCH-DT',
        theoryLink: '/theory/secure-by-design',
        disruptionLevel: 'Medium',
        pricing: {
            small: { min: 50000, max: 80000 },
            medium: { min: 120000, max: 200000 },
            enterprise: { min: 300000, max: 600000 },
            currency: 'EUR',
            model: 'retainer'
        },
        timeline: { threeMonths: 'Strategy', nineMonths: 'Architecture', oneYear: 'Governance' },
        competitors: ['McKinsey', 'BCG'],
        differentiator: 'Technical engineering embedded in strategy.',
        compliance: ['N/A'],
        integration: ['Cloud Platforms'],
        financialImpact: [
            { metric: 'Time to Market', without: '18mo', with: '9mo', improvement: '50% Acceleration' }
        ],
        competitorAnalysis: [],
        competition: { name: 'McKinsey', type: 'Strategy', gap: 'No Implementation' }
    },

    // --- RED TEAM EXPANSION ---
    {
        id: 21,
        name: 'Agent Red Leader',
        tier: 'Red',
        tierColor: '#FF0000',
        readiness: 1,
        priority: 'P1',
        description: 'Autonomous AI-driven penetration testing agent that continuously probes perimeter and internal assets.',
        elevatorPitch: 'A 24/7 Red Team that never sleeps. Autonomous, safe, and continuous validation.',
        research: 'RSCH-ARL-01',
        theoryLink: '/theory/autonomous-offense',
        disruptionLevel: 'Disruptor',
        pricing: {
            small: { min: 25000, max: 40000 },
            medium: { min: 60000, max: 100000 },
            enterprise: { min: 150000, max: 300000 },
            currency: 'EUR',
            model: 'subscription'
        },
        timeline: { threeMonths: 'Training', nineMonths: 'Expansion', oneYear: 'Full Auto' },
        competitors: ['Horizon3.ai', 'Pentera'],
        differentiator: 'Goal-oriented cognitive architecture, not just exploit replay.',
        compliance: ['DORA', 'TIBER-EU'],
        integration: ['EASM', 'Vuln Scanners'],
        financialImpact: [
            { metric: 'Testing Frequency', without: 'Annual', with: 'Hourly', improvement: 'Continuous Validation' }
        ],
        details: {
            technical: 'Uses reinforced learning to adapt to defensive measures without disrupting business logic.',
            business: 'Drastically reduces the window of exposure by identifying exploitable paths in real-time.'
        },
        competitorAnalysis: [],
        competition: { name: 'Pentera', type: 'Auto-Pentest', gap: 'Script-based' }
    },
    {
        id: 22,
        name: 'Red Leader Squadron',
        tier: 'Red',
        tierColor: '#FF0000',
        readiness: 2,
        priority: 'P1',
        description: 'Multi-agent coordinated simulations mimicking complex Nation-State APT campaigns (Scenario-based).',
        elevatorPitch: 'Test your defense against a Wolfpack. Coordinated, multi-vector AI attack simulations.',
        research: 'RSCH-RLS-02',
        theoryLink: '/theory/swarm-intelligence',
        disruptionLevel: 'Disruptor',
        pricing: {
            small: { min: 50000, max: 80000 },
            medium: { min: 120000, max: 200000 },
            enterprise: { min: 300000, max: 600000 },
            currency: 'EUR',
            model: 'subscription'
        },
        timeline: { threeMonths: 'Scenario Build', nineMonths: 'Campaigns', oneYear: 'Adv. Evasion' },
        competitors: ['None direct'],
        differentiator: 'Swarm intelligence allows agents to coordinate diversion and extraction simultaneously.',
        compliance: ['TIBER-EU'],
        integration: ['Cyber Range'],
        financialImpact: [
            { metric: 'Detection Gap', without: '6 months', with: '2 days', improvement: 'Rapid Maturity Growth' }
        ],
        details: {
            technical: 'Swarm intelligence protocol allowing individual agents to share state and coordinate objectives.',
            business: 'Validates defense mechanisms against sophisticated, coordinated human-like adversaries.'
        },
        competitorAnalysis: [],
        competition: { name: 'Human Red Teams', type: 'Service', gap: 'Expensive/Slow' }
    },

    // --- BLUE TEAM EXPANSION (DIGITAL TWIN PATTERNS) ---
    {
        id: 23,
        name: 'Cyber Digital Twin: Pattern #1 (Island)',
        tier: 'Blue',
        tierColor: '#0042D6',
        readiness: 1,
        priority: 'P1',
        description: 'On-premise autonomous deployment. Builds local twin, feeds alerts outbound to AEON Core. Ideal for sensitive, air-gapped integration.',
        elevatorPitch: 'Autonomous onsite intelligence. Your private digital twin that calls for backup only when needed.',
        research: 'RSCH-CDT-P1',
        theoryLink: '/theory/digital-twin-island',
        disruptionLevel: 'Disruptor',
        pricing: {
            small: { min: 80000, max: 120000 },
            medium: { min: 200000, max: 350000 },
            enterprise: { min: 500000, max: 900000 },
            currency: 'EUR',
            model: 'subscription'
        },
        timeline: { threeMonths: 'Sensor Deploy', nineMonths: 'Twin Calibration', oneYear: 'Auto-Response' },
        competitors: ['Dragos', 'Claroty'],
        differentiator: 'One-way outbound only. Zero inbound risk. Interactive Twin for simulation.',
        compliance: ['IEC 62443', 'NIS2'],
        integration: ['Local Historians', 'SPAN Ports'],
        financialImpact: [
            { metric: 'Incident Cost', without: '€2M avg', with: '€200k', improvement: '90% Risk Reduction' }
        ],
        details: {
            technical: 'Local Blue Team AI node builds asset graph locally. One-way encrypted MQTT stream to AEON Core for heavy compute assistance.',
            business: 'Maintains extreme privacy and security isolation while leveraging global intelligence for critical alerts.'
        },
        competitorAnalysis: [],
        competition: { name: 'Dragos', type: 'OT Security', gap: 'Passive Only' }
    },
    {
        id: 24,
        name: 'Cyber Digital Twin: Pattern #2 (Bi-Directional)',
        tier: 'Blue',
        tierColor: '#0042D6',
        readiness: 1,
        priority: 'P1',
        description: 'Private Bi-Directional deployment. Receives live threat intel, vulns, and news from AEON Core. Scales to multiple specialized locations.',
        elevatorPitch: 'The best of both worlds. Private infrastructure with global real-time intelligence injection.',
        research: 'RSCH-CDT-P2',
        theoryLink: '/theory/digital-twin-bidirectional',
        disruptionLevel: 'Disruptor',
        pricing: {
            small: { min: 100000, max: 150000 },
            medium: { min: 250000, max: 400000 },
            enterprise: { min: 600000, max: 1200000 },
            currency: 'EUR',
            model: 'subscription'
        },
        timeline: { threeMonths: 'Link Establish', nineMonths: 'Intel Flow', oneYear: 'Predictive Ops' },
        competitors: ['Palantir'],
        differentiator: 'Real-time injection of global threat data into local context models.',
        compliance: ['GDPR', 'NIS2'],
        integration: ['AEON Core', 'Local SOC'],
        financialImpact: [
            { metric: 'Mean Time To Know', without: 'Weeks', with: 'Minutes', improvement: 'Instant Context' }
        ],
        details: {
            technical: 'Encrypted Bi-Directional tunnel. Local node pulls configuration and threat packets from Core. Pushes telemetry to Core for synthesis.',
            business: 'Continuous immunity upgrades. As soon as AEON Core learns a threat, your local instance is vaccinated.'
        },
        competitorAnalysis: [],
        competition: { name: 'Palantir', type: 'Data Platform', gap: 'High Maintenance' }
    },
    {
        id: 25,
        name: 'Cyber Digital Twin: Pattern #3 (Multi-Tenant)',
        tier: 'Blue',
        tierColor: '#0042D6',
        readiness: 1,
        priority: 'P1',
        description: 'Distributed "Islands" architecture with centralized command. Optimization of resources for risk/threats. Full AEON Cyber Core capacity.',
        elevatorPitch: 'Enterprise-scale immunity. Manage hundreds of sites as a single living organism.',
        research: 'RSCH-CDT-P3',
        theoryLink: '/theory/digital-twin-distributed',
        disruptionLevel: 'Disruptor',
        pricing: {
            small: { min: 150000, max: 250000 },
            medium: { min: 400000, max: 800000 },
            enterprise: { min: 1000000, max: 3000000 },
            currency: 'EUR',
            model: 'subscription'
        },
        timeline: { threeMonths: 'Rollout', nineMonths: 'Federation', oneYear: 'Global Protect' },
        competitors: ['Microsoft Sentinel'],
        differentiator: 'Distributed processing (Edge Intelligence) reducing cloud costs and latency.',
        compliance: ['GDPR', 'Cross-Border'],
        integration: ['Cloud Native', 'Edge Nodes'],
        financialImpact: [
            { metric: 'Ops Overhead', without: 'Linear', with: 'Logarithmic', improvement: 'Scale without Staff' }
        ],
        details: {
            technical: 'Distributed mesh of Blue Team nodes. Local processing for speed, centralized synthesis for patterns. Dynamic resource allocation.',
            business: 'The ultimate enterprise shield. Centralized visibility with localized survivability.'
        },
        competitorAnalysis: [],
        competition: { name: 'MS Sentinel', type: 'SIEM', gap: 'Cloud Dependent' }
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
