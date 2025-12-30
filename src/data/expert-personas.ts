// Expert Personas for Multi-Agent Strategic Analysis
// 11 expert agents providing different perspectives on OXOT strategy

export interface ExpertPersona {
    id: string;
    name: string;
    title: string;
    organization: string;
    avatar: string; // Emoji or icon identifier
    expertise: string[];
    perspective: string;
    keyRecommendation: string;
    detailedAnalysis: {
        strengths: string[];
        concerns: string[];
        recommendations: string[];
        priorityServices: number[]; // Service IDs
    };
    quote: string;
}

export const expertPersonas: ExpertPersona[] = [
    {
        id: 'cmo',
        name: 'Dr. Elena Vasquez',
        title: 'Chief Marketing Officer',
        organization: 'Global Cybersecurity Alliance',
        avatar: '🎯',
        expertise: ['Brand Positioning', 'Market Messaging', 'Category Creation', 'Go-to-Market Strategy'],
        perspective: 'Marketing & Brand Strategy',
        keyRecommendation: 'Lead with "Predict the Future of Your Security" narrative—position AEON as the first true cyber psychohistory platform.',
        detailedAnalysis: {
            strengths: [
                'Unique positioning as category creator in cyber psychohistory',
                'Compelling elevator pitches for each service',
                'Clear differentiation from reactive security vendors'
            ],
            concerns: [
                'Psychohistory concept may need simplification for mainstream market',
                'Gold tier services require careful ethical messaging',
                'Risk of being perceived as "too academic" for enterprise buyers'
            ],
            recommendations: [
                'Create a "Future of Security" thought leadership campaign',
                'Develop case studies showing 90-day prediction accuracy',
                'Position psychometric services as "augmentation, not surveillance"'
            ],
            priorityServices: [1, 4, 7, 9]
        },
        quote: 'The market is crying out for prediction over reaction. AEON owns the "what happens next" narrative—this is category-defining positioning.'
    },
    {
        id: 'business-analyst',
        name: 'Marcus Chen',
        title: 'Senior Business Analyst',
        organization: 'Deloitte Cyber Practice',
        avatar: '📊',
        expertise: ['ROI Modeling', 'Financial Projections', 'Unit Economics', 'Market Sizing'],
        perspective: 'Financial & Business Analysis',
        keyRecommendation: 'Bundle high-readiness P1 services for Year 1 launch—target €350K average deal size with 3-year contracts.',
        detailedAnalysis: {
            strengths: [
                'Strong unit economics with 70%+ gross margins',
                'Subscription model provides predictable ARR',
                'Pricing positioned at premium tier justified by unique capabilities'
            ],
            concerns: [
                'Year 1 customer acquisition cost may be high for new category',
                'Some services require significant implementation investment',
                'Enterprise sales cycle could extend to 9-12 months'
            ],
            recommendations: [
                'Offer 90-day pilot programs at reduced rate to prove value',
                'Create service bundles with 15-20% discount to increase ACV',
                'Target 15 enterprise customers in Year 1 with land-and-expand strategy'
            ],
            priorityServices: [1, 4, 7, 11]
        },
        quote: 'The financial model is solid—€42B TAM with 20% CAGR and first-mover advantage. Conservative Year 1 target of €3.2M ARR is achievable.'
    },
    {
        id: 'services-vp',
        name: 'Sarah Mitchell',
        title: 'VP of Professional Services',
        organization: 'Mandiant (Google Cloud)',
        avatar: '🛠️',
        expertise: ['Service Delivery', 'Implementation', 'Customer Success', 'Capacity Planning'],
        perspective: 'Delivery & Operations',
        keyRecommendation: 'Start with services rated 4+ readiness—On-Premise TI, Neural Physics, and Team Composition are production-ready.',
        detailedAnalysis: {
            strengths: [
                'Five P1 services have readiness rating of 4 or higher',
                'Clear implementation dependencies mapped',
                'Strong research foundation (RSCH papers) for each service'
            ],
            concerns: [
                'Readiness 2-3 services need 6-9 months more development',
                'Psychometric services require consent frameworks before deployment',
                'Limited bench of trained delivery consultants'
            ],
            recommendations: [
                'Hire 8-10 implementation consultants before launch',
                'Create standardized 30/60/90-day implementation playbooks',
                'Develop partner certification program for scale'
            ],
            priorityServices: [1, 4, 9, 11]
        },
        quote: 'Readiness-4 services can go to market immediately. The 8-second ransomware containment is a showstopper demo—lead with Neural Physics.'
    },
    {
        id: 'market-research',
        name: 'Dr. James Weber',
        title: 'Market Research Director',
        organization: 'Gartner Security Practice',
        avatar: '🔬',
        expertise: ['Market Analysis', 'Competitive Intelligence', 'Trend Forecasting', 'Industry Research'],
        perspective: 'Market & Competitive Intelligence',
        keyRecommendation: 'AEON has 3-5 year sustainable moat—no direct competitors in cyber psychohistory. Move fast to establish category leadership.',
        detailedAnalysis: {
            strengths: [
                'Zero direct competitors in digital twin cybersecurity for OT',
                'NIS2 and SEC regulations driving massive demand',
                'Building systems/OT market underserved by existing vendors'
            ],
            concerns: [
                'CrowdStrike/SentinelOne may attempt to acquire or replicate',
                'Market education required for psychohistory concept',
                'Adjacent vendors may position as "digital twin" competitors'
            ],
            recommendations: [
                'Publish thought leadership to establish category ownership',
                'File provisional patents on key algorithms',
                'Target analyst briefings with Gartner, Forrester, IDC in Q1'
            ],
            priorityServices: [3, 7, 8, 9]
        },
        quote: 'In 15 years of research, I haven\'t seen a platform this differentiated. The psychohistory engine is genuinely novel—protect it aggressively.'
    },
    {
        id: 'strategic-planner',
        name: 'Alexander Petrov',
        title: 'Strategic Planning Officer',
        organization: 'McKinsey Digital',
        avatar: '🎯',
        expertise: ['Roadmap Planning', 'Resource Allocation', 'Dependency Analysis', 'Portfolio Strategy'],
        perspective: 'Strategic Planning & Phasing',
        keyRecommendation: 'Phase 1 (0-3 months): Launch 5 P1 services. Phase 2 (3-9 months): Add P2 services. Phase 3 (9-12 months): Full portfolio.',
        detailedAnalysis: {
            strengths: [
                'Clear tiering (Gold/Blue/Red) enables phased rollout',
                'Dependencies well-mapped for implementation sequencing',
                'E27 synthesis engine provides integration backbone'
            ],
            concerns: [
                'Aggressive timeline may strain development resources',
                'P2/P3 services have external dependencies (carrier partnerships)',
                'Market timing pressure from regulatory deadlines (NIS2 Oct 2024)'
            ],
            recommendations: [
                'Lock Phase 1 services by end of Q1 2025',
                'Establish insurance carrier partnerships for Service 7 in parallel',
                'Create dedicated team for compliance services given NIS2'
            ],
            priorityServices: [1, 4, 7, 9, 11]
        },
        quote: 'The portfolio is strategically sound. Execute Phase 1 flawlessly, prove value, then expand. Don\'t try to boil the ocean.'
    },
    {
        id: 'sales-director',
        name: 'Victoria Torres',
        title: 'Sales Director EMEA',
        organization: 'Palo Alto Networks',
        avatar: '💼',
        expertise: ['Enterprise Sales', 'EMEA Markets', 'Pricing Strategy', 'Channel Development'],
        perspective: 'Sales & Revenue',
        keyRecommendation: 'Price in Euros for EMEA market. Offer 3-month proof-of-value pilots at €50K to accelerate pipeline.',
        detailedAnalysis: {
            strengths: [
                'Premium pricing justified by unique capabilities',
                'Compliance pressure (NIS2) creates urgency in EU',
                'Strong value props for CISO, CFO, and Facilities personas'
            ],
            concerns: [
                'New category may extend sales cycle to 9+ months',
                'Need local language support for key EU markets',
                'Procurement may require GDPR/data residency guarantees'
            ],
            recommendations: [
                'Recruit 4-6 enterprise sales reps with OT/ICS background',
                'Create ROI calculator for each buyer persona',
                'Develop reference customer program with early adopters'
            ],
            priorityServices: [1, 4, 7, 11]
        },
        quote: 'EMEA is hungry for this. NIS2 compliance alone will drive €100M+ in demand. Price at premium—the differentiation justifies it.'
    },
    {
        id: 'technical-architect',
        name: 'Dr. Thomas Kruger',
        title: 'Chief Technical Architect',
        organization: 'Siemens Digital Industries',
        avatar: '⚙️',
        expertise: ['System Architecture', 'OT/ICS Security', 'Integration Engineering', 'Platform Design'],
        perspective: 'Technical Feasibility',
        keyRecommendation: 'E27 Psychohistory Engine is complete—build all services on this foundation. On-premise deployment is production-ready.',
        detailedAnalysis: {
            strengths: [
                '94% digital twin completion rate',
                'E27 synthesis engine provides unified foundation',
                'Strong API design with 54 documented endpoints'
            ],
            concerns: [
                'Some services require customer SIEM/SOAR integration',
                'On-premise deployment needs hardening for air-gapped environments',
                'Signal Physics Zero-Day needs additional R&D'
            ],
            recommendations: [
                'Prioritize on-premise appliance packaging',
                'Create integration SDKs for major SIEM platforms',
                'Establish security operations partnership for 24/7 support'
            ],
            priorityServices: [1, 4, 5, 9]
        },
        quote: 'The architecture is sound. E27 is the crown jewel—everything flows from the psychohistory engine. Ship what\'s ready.'
    },
    {
        id: 'compliance-director',
        name: 'Dr. Anna Schmidt',
        title: 'Compliance Director',
        organization: 'European Cybersecurity Agency',
        avatar: '📜',
        expertise: ['Regulatory Compliance', 'GDPR', 'NIS2', 'Ethics & Privacy'],
        perspective: 'Regulatory & Ethics',
        keyRecommendation: 'Implement privacy-by-design for all psychometric services. Create Ethics Board before launch.',
        detailedAnalysis: {
            strengths: [
                'Services map cleanly to NIS2 requirements',
                'Strong privacy positioning (on-premise, data never leaves)',
                'GDPR compliance built into architecture'
            ],
            concerns: [
                'Psychometric services require explicit consent frameworks',
                'Insider threat analysis has legal implications in some EU countries',
                'Need Data Protection Impact Assessments for Gold tier'
            ],
            recommendations: [
                'Establish independent Ethics Advisory Board',
                'Create consent templates for HR-integrated services',
                'Document DPIA for services 9, 10, 11 before launch'
            ],
            priorityServices: [1, 4, 8, 12]
        },
        quote: 'Privacy is a feature, not a constraint. Position the psychometric services as employee empowerment, not surveillance.'
    },
    {
        id: 'cfo',
        name: 'Robert Andersson',
        title: 'Chief Financial Officer',
        organization: 'ABB Industrial Automation',
        avatar: '💰',
        expertise: ['Financial Planning', 'Investment Analysis', 'Risk Management', 'Capital Allocation'],
        perspective: 'Financial Risk & Investment',
        keyRecommendation: 'Conservative Year 1 target: €3.2M ARR from 15 customers. Requires €8M investment for full launch.',
        detailedAnalysis: {
            strengths: [
                'High gross margins (70%+) support aggressive reinvestment',
                'Subscription model provides revenue predictability',
                'Multiple revenue streams reduce customer concentration risk'
            ],
            concerns: [
                'Cash burn during market education phase',
                '12-month sales cycle impacts cash flow planning',
                'Need reserve for potential regulatory changes'
            ],
            recommendations: [
                'Secure 18-month runway before launch',
                'Target 40% of Year 1 revenue from pilots converting to full contracts',
                'Establish line of credit for opportunistic expansion'
            ],
            priorityServices: [1, 7, 9, 11]
        },
        quote: 'The unit economics work. Focus on services with fastest time-to-revenue and highest margins. Leave the moonshots for Year 2.'
    },
    {
        id: 'customer-success',
        name: 'Maria Santos',
        title: 'VP Customer Success',
        organization: 'Recorded Future',
        avatar: '🤝',
        expertise: ['Customer Success', 'Value Realization', 'Retention', 'Expansion'],
        perspective: 'Customer Value & Retention',
        keyRecommendation: 'Lead with services delivering fastest time-to-value. Neural Physics shows value in first week; prioritize it.',
        detailedAnalysis: {
            strengths: [
                'Clear value metrics for each service (MTTD, MTTR, etc.)',
                'Strong ROI stories for executive sponsors',
                'Multiple quick wins possible in initial deployment'
            ],
            concerns: [
                'Psychometric services may take 6+ months to show full value',
                'Customer education required for psychohistory concepts',
                'Risk of scope creep in initial engagements'
            ],
            recommendations: [
                'Create "First 30 Days" success playbook for each service',
                'Assign dedicated CSM to every enterprise customer',
                'Establish quarterly business reviews with executive sponsors'
            ],
            priorityServices: [1, 4, 5, 11]
        },
        quote: 'Neural Physics shows ROI in week one—8-second containment is visceral. Lead with that, expand to the platform.'
    },
    {
        id: 'industry-analyst',
        name: 'David Blackwood',
        title: 'Principal Industry Analyst',
        organization: 'Forrester Research',
        avatar: '📈',
        expertise: ['Industry Analysis', 'Vendor Positioning', 'Market Waves', 'Technology Trends'],
        perspective: 'Analyst & Market Positioning',
        keyRecommendation: 'Create the "Cyber Psychohistory" market category. First-mover can define the narrative and evaluation criteria.',
        detailedAnalysis: {
            strengths: [
                'Category-creating technology with defensible moat',
                'Multiple analyst briefing opportunities',
                'Strong differentiation story for competitive research'
            ],
            concerns: [
                'New category takes time to gain analyst recognition',
                'Risk of being miscategorized as SIEM or SOAR competitor',
                'Need proof points before analyst evaluation cycles'
            ],
            recommendations: [
                'Brief Gartner, Forrester, IDC in Q1 2025',
                'Submit for inclusion in emerging technology reports',
                'Create competitive displacement guide for sales team'
            ],
            priorityServices: [3, 7, 9, 10]
        },
        quote: 'This is a Wave-defining platform. The question isn\'t whether AEON gets noticed—it\'s whether you can execute fast enough to own the category.'
    }
];

// Helper functions
export const getPersonaById = (id: string): ExpertPersona | undefined =>
    expertPersonas.find(p => p.id === id);

export const getPersonasByPrioritizedService = (serviceId: number): ExpertPersona[] =>
    expertPersonas.filter(p => p.detailedAnalysis.priorityServices.includes(serviceId));

export const getConsensusServices = (): number[] => {
    const serviceVotes: Record<number, number> = {};

    expertPersonas.forEach(persona => {
        persona.detailedAnalysis.priorityServices.forEach(serviceId => {
            serviceVotes[serviceId] = (serviceVotes[serviceId] || 0) + 1;
        });
    });

    return Object.entries(serviceVotes)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([id]) => parseInt(id));
};

// Aggregated recommendations
export const strategicConsensus = {
    topPriorityServices: [1, 4, 7, 9, 11],
    Year1Target: {
        arr: 3_200_000,
        customers: 15,
        averageDealSize: 213_000
    },
    keyMessages: [
        'Lead with Neural Physics (8-second containment) for immediate impact',
        'Position as "Cyber Psychohistory" category creator',
        'Emphasize on-premise deployment for privacy-conscious enterprises',
        'Bundle P1 services for €350K average deal size',
        'Target NIS2 compliance urgency in EU market'
    ],
    criticalSuccessFactors: [
        'Hire 8-10 implementation consultants',
        'Establish Ethics Advisory Board for psychometric services',
        'Secure 18-month runway before launch',
        'Brief major analysts in Q1 2025',
        'Create ROI calculators for each buyer persona'
    ]
};
