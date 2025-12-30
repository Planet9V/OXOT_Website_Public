// AEON API Enhancements Index
// Organized data for the 27 API enhancements grouped by tier

export type EnhancementStatus = 'COMPLETE' | 'IN_PROGRESS' | 'PLANNED' | 'RESEARCH';
export type EnhancementTier = 'foundation' | 'visualization' | 'economic' | 'psychological' | 'synthesis';

export interface Enhancement {
    id: string;
    name: string;
    tier: EnhancementTier;
    status: EnhancementStatus;
    businessValue: 1 | 2 | 3 | 4 | 5;
    technicalComplexity: 1 | 2 | 3 | 4 | 5;
    description: string;
    capabilities: string[];
    dependencies: string[];
    estimatedEffort: string;
    apiEndpoints?: string[];
}

export interface EnhancementTierInfo {
    id: EnhancementTier;
    name: string;
    description: string;
    color: string;
    icon: string;
}

export const tiers: EnhancementTierInfo[] = [
    {
        id: 'foundation',
        name: 'Tier 1: Foundation',
        description: 'Core threat intelligence and data processing capabilities',
        color: '#3B82F6',
        icon: 'Database'
    },
    {
        id: 'visualization',
        name: 'Tier 2: Visualization & Compliance',
        description: 'Security operations dashboards and regulatory framework integration',
        color: '#10B981',
        icon: 'BarChart3'
    },
    {
        id: 'economic',
        name: 'Tier 3: Economic & Strategic',
        description: 'Financial modeling, risk quantification, and strategic analysis',
        color: '#06B6D4', // Cyan
        icon: 'TrendingUp'
    },
    {
        id: 'psychological',
        name: 'Tier 4: Psychological & Organizational',
        description: 'Human factors, insider threat, and organizational dynamics',
        color: '#94A3B8', // Slate
        icon: 'Brain'
    },
    {
        id: 'synthesis',
        name: 'Tier 5: Synthesis',
        description: 'Unified psychohistory engine combining all capabilities',
        color: '#F59E0B', // Gold/Amber (OXOT Brand)
        icon: 'Sparkles'
    }
];

export const enhancements: Enhancement[] = [
    // Tier 1: Foundation (E01-E05)
    {
        id: 'E01',
        name: 'CVE-KEV Intelligence Integration',
        tier: 'foundation',
        status: 'COMPLETE',
        businessValue: 5,
        technicalComplexity: 2,
        description: 'Real-time CISA Known Exploited Vulnerabilities integration with automatic correlation to asset inventory.',
        capabilities: ['KEV feed integration', 'Asset vulnerability mapping', 'Exploit deadline tracking', 'Compliance reporting'],
        dependencies: [],
        estimatedEffort: '2-3 weeks',
        apiEndpoints: ['/api/kev/vulnerabilities', '/api/kev/assets/{assetId}']
    },
    {
        id: 'E02',
        name: 'EPSS Scoring Engine',
        tier: 'foundation',
        status: 'COMPLETE',
        businessValue: 5,
        technicalComplexity: 3,
        description: 'Exploit Prediction Scoring System integration for probabilistic vulnerability prioritization.',
        capabilities: ['EPSS score ingestion', 'Probability trending', 'Risk-based prioritization', 'SLA generation'],
        dependencies: ['E01'],
        estimatedEffort: '3-4 weeks',
        apiEndpoints: ['/api/epss/scores', '/api/epss/probability/{cveId}']
    },
    {
        id: 'E03',
        name: 'MITRE ATT&CK Navigator',
        tier: 'foundation',
        status: 'COMPLETE',
        businessValue: 4,
        technicalComplexity: 3,
        description: 'Interactive ATT&CK framework mapping with technique coverage analysis and gap identification.',
        capabilities: ['Technique mapping', 'Coverage heatmaps', 'Gap analysis', 'Detection rule linking'],
        dependencies: ['E01'],
        estimatedEffort: '4-5 weeks',
        apiEndpoints: ['/api/attack/techniques', '/api/attack/coverage']
    },
    {
        id: 'E04',
        name: 'Threat Actor Profiling',
        tier: 'foundation',
        status: 'COMPLETE',
        businessValue: 4,
        technicalComplexity: 3,
        description: 'Comprehensive threat actor database with TTP correlation and targeting analysis.',
        capabilities: ['Actor database', 'TTP correlation', 'Industry targeting', 'Campaign tracking'],
        dependencies: ['E03'],
        estimatedEffort: '4-6 weeks',
        apiEndpoints: ['/api/actors/{actorId}', '/api/actors/targeting']
    },
    {
        id: 'E05',
        name: 'Real-Time IOC Processing',
        tier: 'foundation',
        status: 'COMPLETE',
        businessValue: 5,
        technicalComplexity: 4,
        description: 'High-throughput indicator of compromise processing with deduplication and enrichment.',
        capabilities: ['IOC ingestion', 'Enrichment pipeline', 'Deduplication', 'Feed aggregation'],
        dependencies: ['E01', 'E04'],
        estimatedEffort: '5-6 weeks',
        apiEndpoints: ['/api/ioc/ingest', '/api/ioc/enrich']
    },

    // Tier 2: Visualization & Compliance (E06-E09)
    {
        id: 'E06',
        name: 'SOC Operations Dashboard',
        tier: 'visualization',
        status: 'COMPLETE',
        businessValue: 4,
        technicalComplexity: 3,
        description: 'Real-time security operations center dashboard with incident tracking and analyst metrics.',
        capabilities: ['Incident overview', 'Analyst workload', 'MTTR/MTTD tracking', 'Shift handoff'],
        dependencies: ['E05'],
        estimatedEffort: '4-5 weeks',
        apiEndpoints: ['/api/soc/dashboard', '/api/soc/incidents']
    },
    {
        id: 'E07',
        name: 'NIST CSF Mapping',
        tier: 'visualization',
        status: 'COMPLETE',
        businessValue: 4,
        technicalComplexity: 2,
        description: 'NIST Cybersecurity Framework control mapping with maturity scoring and gap analysis.',
        capabilities: ['Control mapping', 'Maturity scoring', 'Gap identification', 'Remediation tracking'],
        dependencies: ['E03'],
        estimatedEffort: '3-4 weeks',
        apiEndpoints: ['/api/compliance/nist', '/api/compliance/maturity']
    },
    {
        id: 'E08',
        name: 'IEC 62443 Integration',
        tier: 'visualization',
        status: 'COMPLETE',
        businessValue: 5,
        technicalComplexity: 4,
        description: 'Industrial cybersecurity standard mapping for OT/ICS environments.',
        capabilities: ['Zone/conduit mapping', 'SL-T assessment', 'Requirement tracking', 'Certificate prep'],
        dependencies: ['E07'],
        estimatedEffort: '5-6 weeks',
        apiEndpoints: ['/api/compliance/iec62443', '/api/ot/zones']
    },
    {
        id: 'E09',
        name: 'Threat Landscape Visualization',
        tier: 'visualization',
        status: 'COMPLETE',
        businessValue: 4,
        technicalComplexity: 4,
        description: '3D visualization of organizational threat landscape with attack vector mapping.',
        capabilities: ['3D threat map', 'Attack vectors', 'Risk hotspots', 'Temporal analysis'],
        dependencies: ['E04', 'E05'],
        estimatedEffort: '6-8 weeks',
        apiEndpoints: ['/api/viz/landscape', '/api/viz/vectors']
    },

    // Tier 3: Economic & Strategic (E10-E13)
    {
        id: 'E10',
        name: 'Risk Quantification Engine',
        tier: 'economic',
        status: 'COMPLETE',
        businessValue: 5,
        technicalComplexity: 4,
        description: 'Monte Carlo simulation-based cyber risk quantification with financial impact modeling.',
        capabilities: ['Monte Carlo simulation', 'VaR calculation', 'Loss exceedance curves', 'Scenario modeling'],
        dependencies: ['E02', 'E05'],
        estimatedEffort: '6-8 weeks',
        apiEndpoints: ['/api/risk/quantify', '/api/risk/var']
    },
    {
        id: 'E11',
        name: 'Investment ROI Calculator',
        tier: 'economic',
        status: 'COMPLETE',
        businessValue: 5,
        technicalComplexity: 3,
        description: 'Security investment return on investment calculation with payback period analysis.',
        capabilities: ['ROI modeling', 'Payback calculation', 'NPV analysis', 'Tool comparison'],
        dependencies: ['E10'],
        estimatedEffort: '4-5 weeks',
        apiEndpoints: ['/api/economics/roi', '/api/economics/compare']
    },
    {
        id: 'E12',
        name: 'Insurance Premium Optimizer',
        tier: 'economic',
        status: 'IN_PROGRESS',
        businessValue: 5,
        technicalComplexity: 4,
        description: 'Cyber insurance premium optimization based on security posture improvements.',
        capabilities: ['Premium estimation', 'Posture correlation', 'Improvement recommendations', 'Carrier benchmarking'],
        dependencies: ['E10', 'E11'],
        estimatedEffort: '5-6 weeks',
        apiEndpoints: ['/api/insurance/premium', '/api/insurance/optimize']
    },
    {
        id: 'E13',
        name: 'Board Reporting Suite',
        tier: 'economic',
        status: 'COMPLETE',
        businessValue: 4,
        technicalComplexity: 2,
        description: 'Executive and board-level cybersecurity reporting with business context translation.',
        capabilities: ['Executive dashboards', 'Risk translation', 'Trend analysis', 'Benchmark comparison'],
        dependencies: ['E10', 'E11'],
        estimatedEffort: '3-4 weeks',
        apiEndpoints: ['/api/reports/board', '/api/reports/executive']
    },

    // Tier 4: Psychological & Organizational (E14-E26)
    {
        id: 'E14',
        name: 'Analyst Fatigue Detection',
        tier: 'psychological',
        status: 'COMPLETE',
        businessValue: 4,
        technicalComplexity: 4,
        description: 'Real-time detection of SOC analyst fatigue patterns using behavioral indicators.',
        capabilities: ['Fatigue scoring', 'Performance correlation', 'Intervention triggers', 'Shift optimization'],
        dependencies: ['E06'],
        estimatedEffort: '5-6 weeks',
        apiEndpoints: ['/api/psych/fatigue', '/api/psych/intervention']
    },
    {
        id: 'E15',
        name: 'Decision Quality Modeling',
        tier: 'psychological',
        status: 'COMPLETE',
        businessValue: 5,
        technicalComplexity: 5,
        description: 'Predictive modeling of security decision quality based on cognitive load and context.',
        capabilities: ['Decision scoring', 'Quality prediction', 'Bias detection', 'Recommendations'],
        dependencies: ['E14'],
        estimatedEffort: '6-8 weeks',
        apiEndpoints: ['/api/psych/decision', '/api/psych/quality']
    },
    {
        id: 'E16',
        name: 'MICE Risk Profiling',
        tier: 'psychological',
        status: 'COMPLETE',
        businessValue: 5,
        technicalComplexity: 5,
        description: 'Insider threat risk assessment using Money, Ideology, Coercion, Ego framework.',
        capabilities: ['MICE scoring', 'Risk indicators', 'Behavioral patterns', 'Alert generation'],
        dependencies: ['E14', 'E15'],
        estimatedEffort: '6-8 weeks',
        apiEndpoints: ['/api/insider/mice', '/api/insider/risk']
    },
    {
        id: 'E17',
        name: 'Lacanian Dissonance Meter',
        tier: 'psychological',
        status: 'COMPLETE',
        businessValue: 4,
        technicalComplexity: 5,
        description: 'Organizational security policy vs. practice gap measurement using Lacanian framework.',
        capabilities: ['Dissonance quantification', 'Gap analysis', 'Cultural assessment', 'Change tracking'],
        dependencies: ['E16'],
        estimatedEffort: '5-6 weeks',
        apiEndpoints: ['/api/lacan/dissonance', '/api/lacan/gaps']
    },
    {
        id: 'E18',
        name: 'Team Dynamics Analyzer',
        tier: 'psychological',
        status: 'COMPLETE',
        businessValue: 4,
        technicalComplexity: 4,
        description: 'Security team composition analysis using DISC×OCEAN tensors.',
        capabilities: ['Team profiling', 'Collaboration scoring', 'Conflict prediction', 'Optimization recommendations'],
        dependencies: ['E14', 'E15'],
        estimatedEffort: '5-6 weeks',
        apiEndpoints: ['/api/team/dynamics', '/api/team/optimize']
    },
    {
        id: 'E19',
        name: 'Organizational Resilience Index',
        tier: 'psychological',
        status: 'COMPLETE',
        businessValue: 5,
        technicalComplexity: 4,
        description: 'Holistic organizational cyber resilience measurement across technical and human dimensions.',
        capabilities: ['Resilience scoring', 'Dimension breakdown', 'Benchmark comparison', 'Improvement roadmap'],
        dependencies: ['E17', 'E18'],
        estimatedEffort: '5-6 weeks',
        apiEndpoints: ['/api/org/resilience', '/api/org/benchmark']
    },
    {
        id: 'E20',
        name: 'Security Culture Assessment',
        tier: 'psychological',
        status: 'COMPLETE',
        businessValue: 4,
        technicalComplexity: 3,
        description: 'Quantitative security culture measurement with department-level granularity.',
        capabilities: ['Culture scoring', 'Department analysis', 'Trend tracking', 'Training correlation'],
        dependencies: ['E17'],
        estimatedEffort: '4-5 weeks',
        apiEndpoints: ['/api/culture/assess', '/api/culture/trends']
    },
    {
        id: 'E21',
        name: 'Phishing Susceptibility Predictor',
        tier: 'psychological',
        status: 'COMPLETE',
        businessValue: 4,
        technicalComplexity: 4,
        description: 'Individual and group phishing susceptibility prediction based on behavioral patterns.',
        capabilities: ['Susceptibility scoring', 'Campaign targeting', 'Training optimization', 'Risk reduction tracking'],
        dependencies: ['E20'],
        estimatedEffort: '4-5 weeks',
        apiEndpoints: ['/api/phishing/predict', '/api/phishing/campaign']
    },
    {
        id: 'E22',
        name: 'Cognitive Load Monitor',
        tier: 'psychological',
        status: 'COMPLETE',
        businessValue: 4,
        technicalComplexity: 5,
        description: 'Real-time cognitive load estimation for security personnel with intervention recommendations.',
        capabilities: ['Load estimation', 'Performance correlation', 'Alert suppression', 'Workload balancing'],
        dependencies: ['E14', 'E15'],
        estimatedEffort: '6-8 weeks',
        apiEndpoints: ['/api/cognitive/load', '/api/cognitive/balance']
    },
    {
        id: 'E23',
        name: 'Stress Response Patterns',
        tier: 'psychological',
        status: 'IN_PROGRESS',
        businessValue: 4,
        technicalComplexity: 5,
        description: 'Analysis of security team stress response patterns during incidents.',
        capabilities: ['Stress detection', 'Response patterns', 'De-escalation triggers', 'Support automation'],
        dependencies: ['E14', 'E22'],
        estimatedEffort: '5-6 weeks',
        apiEndpoints: ['/api/stress/patterns', '/api/stress/support']
    },
    {
        id: 'E24',
        name: 'Leadership Decision Support',
        tier: 'psychological',
        status: 'PLANNED',
        businessValue: 5,
        technicalComplexity: 4,
        description: 'AI-assisted decision support for security leadership during crisis situations.',
        capabilities: ['Decision trees', 'Scenario analysis', 'Consequence modeling', 'Recommendation engine'],
        dependencies: ['E15', 'E19'],
        estimatedEffort: '6-8 weeks',
        apiEndpoints: ['/api/leadership/decide', '/api/leadership/scenarios']
    },
    {
        id: 'E25',
        name: 'Change Resistance Predictor',
        tier: 'psychological',
        status: 'PLANNED',
        businessValue: 4,
        technicalComplexity: 4,
        description: 'Prediction of organizational resistance to security policy changes.',
        capabilities: ['Resistance scoring', 'Stakeholder mapping', 'Change strategy', 'Adoption tracking'],
        dependencies: ['E17', 'E20'],
        estimatedEffort: '4-5 weeks',
        apiEndpoints: ['/api/change/predict', '/api/change/strategy']
    },
    {
        id: 'E26',
        name: 'Social Engineering Defense',
        tier: 'psychological',
        status: 'COMPLETE',
        businessValue: 5,
        technicalComplexity: 5,
        description: 'Comprehensive social engineering defense system with real-time intervention.',
        capabilities: ['Attack detection', 'Real-time blocking', 'User coaching', 'Campaign analysis'],
        dependencies: ['E16', 'E21'],
        estimatedEffort: '6-8 weeks',
        apiEndpoints: ['/api/soceng/detect', '/api/soceng/block']
    },

    // Tier 5: Synthesis (E27)
    {
        id: 'E27',
        name: 'Entity Expansion & Psychohistory Synthesis',
        tier: 'synthesis',
        status: 'COMPLETE',
        businessValue: 5,
        technicalComplexity: 5,
        description: 'Unified psychohistory engine combining all enhancements for predictive threat prevention.',
        capabilities: [
            'Unified threat prediction',
            '90-day forecast window',
            'Multi-dimensional risk modeling',
            'Intervention optimization',
            'Cross-domain correlation',
            'Entity expansion modeling',
            'Cascade prediction',
            'ROI-based prioritization'
        ],
        dependencies: ['E01', 'E02', 'E03', 'E04', 'E05', 'E10', 'E15', 'E16', 'E17', 'E18', 'E19', 'E26'],
        estimatedEffort: '8-12 weeks',
        apiEndpoints: ['/api/psychohistory/predict', '/api/psychohistory/intervene', '/api/psychohistory/simulate']
    }
];

// Helper functions
export const getEnhancementsByTier = (tier: EnhancementTier): Enhancement[] =>
    enhancements.filter(e => e.tier === tier);

export const getEnhancementsByStatus = (status: EnhancementStatus): Enhancement[] =>
    enhancements.filter(e => e.status === status);

export const getEnhancementById = (id: string): Enhancement | undefined =>
    enhancements.find(e => e.id === id);

export const getTierInfo = (tier: EnhancementTier): EnhancementTierInfo | undefined =>
    tiers.find(t => t.id === tier);

export const getCompletedCount = (): number =>
    enhancements.filter(e => e.status === 'COMPLETE').length;

export const getTotalCount = (): number => enhancements.length;

export const getCompletionPercentage = (): number =>
    Math.round((getCompletedCount() / getTotalCount()) * 100);

// Summary stats
export const enhancementStats = {
    total: 27,
    complete: 23,
    inProgress: 2,
    planned: 2,
    tiers: 5,
    totalApiEndpoints: 54,
    averageBusinessValue: 4.4,
    averageComplexity: 3.8
};
