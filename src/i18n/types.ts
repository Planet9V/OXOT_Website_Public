// Translation types for type-safe access
export type Locale = 'en' | 'nl' | 'de';

export interface LocaleMeta {
    locale: Locale;
    name: string;
    flag: string;
}

export interface NavTranslations {
    groups: {
        operations: string;
        advisory: string;
        coreSystems: string;
        corporate: string;
        campaigns: string;
    };
    links: {
        goldTeam: string;
        agentRedLeader: string;
        agentBlueTeam: string;
        oxotVision: string;
        nis2Compliance: string;
        iec62443Compliance: string;
        socIntegration: string;
        madueDiligence: string;
        operatorPlaybook: string;
        manufacturerGuide: string;
        aeonCore: string;
        sevenLayerTwin: string;
        sovereignLogic: string;
        conceptHub: string;
        appliedTheory: string;
        aboutOxot: string;
        strategicPlanning: string;
        servicesPortfolio: string;
        osintReport: string;
        apiEnhancements: string;
        brandingGuidelines: string;
        businessPitchDeck: string;
        chatBot: string;
        frieslandCampina: string;
    };
}

export interface BrandTranslations {
    tagline: string;
    uplinkLocation: string;
    mission: string;
    missionSub: string;
    copyright: string;
    secureLattice: string;
    handshake: string;
}

export interface CommonTranslations {
    scrollToExplore: string;
    learnMore: string;
    getStarted: string;
    contact: string;
    readMore: string;
    viewDetails: string;
    close: string;
    loading: string;
}

export interface HomeTranslations {
    heroTitle: string;
    heroSubtitle: string;
    heroTagline: string;
    heroDescription: string;
    whyOxot: string;
    whyOxotTitle: string;
    whyOxotHighlight: string;
    whyOxotDescription: string;
}

export interface CTATranslations {
    defaultHeadline: string;
    defaultSubheadline: string;
    success: {
        title: string;
        message: string;
    };
    threatAdvisory: {
        label: string;
        message: string;
    };
    briefingRequest: {
        prefix: string;
        link: string;
        description: string;
    };
    trustSignals: {
        standards: { title: string; desc: string; };
        sectors: { title: string; desc: string; };
        engagements: { title: string; desc: string; };
    };
    quote: {
        text: string;
        author: string;
        authorTitle: string;
        verified: string;
    };
    form: {
        title: string;
        labels: {
            name: string;
            title: string;
            email: string;
            org: string;
            sector: string;
            region: string;
            service: string;
            concerns: string;
        };
        placeholders: {
            name: string;
            title: string;
            email: string;
            org: string;
            concerns: string;
            selectSector: string;
            selectRegion: string;
        };
        submit: string;
        submitting: string;
        disclaimer: string;
    };
    urgency: {
        label: string;
        value: string;
    };
    sectors: string[];
    regions: string[];
}

export interface SOCTranslations {
    hero: {
        badge: string;
        title: string;
        titleHighlight: string;
        subtitle: string;
        stats: {
            coverage: string;
            mttd: string;
            noiseRef: string;
        };
        scroll: string;
    };
    modules: {
        title: string;
        status: string;
        telemetry: { title: string; desc: string; };
        hunting: { title: string; desc: string; };
        detection: { title: string; desc: string; };
        psychometrics: { title: string; desc: string; };
        blueAI: { title: string; desc: string; };
        redLeader: { title: string; desc: string; };
    };
    architecture: {
        title: string;
        layer: string;
        zones: { title: string; desc: string; };
        sbom: { title: string; desc: string; };
        epss: { title: string; desc: string; };
        twinCore: string;
        canvas: {
            title: string;
            desc: string;
            interaction: string;
        };
        hierarchy: string;
        framework: {
            title: string;
            desc: string;
            now: { title: string; sub: string; action: string; };
            next: { title: string; sub: string; action: string; };
            never: { title: string; sub: string; action: string; };
            inputs: { title: string; };
            note: string;
        };
    };
    engagement: {
        title: string;
        desc: string;
        models: {
            blue: {
                title: string;
                sub: string;
                desc: string;
                optionA: { title: string; desc: string; };
                optionB: { title: string; desc: string; };
                features: string[];
                cta: string;
            };
            gold: {
                title: string;
                sub: string;
                desc: string;
                advisory: { title: string; desc: string; };
                features: string[];
                cta: string;
            };
        };
    };
    cta: {
        headline: string;
        subheadline: string;
        options: {
            blue: string;
            gold: string;
        };
    };
    tags: {
        telemetry: string[];
        hunting: string[];
        detection: string[];
        psychometrics: string[];
        blueAI: string[];
        redLeader: string[];
    };
    architectureLegend: {
        aeonCloud: { title: string; desc: string; };
        blueServer: { title: string; desc: string; };
        dataDiode: { title: string; desc: string; };
        otAssets: { title: string; desc: string; };
    };
    framework: {
        title: string;
        desc: string;
        now: { title: string; sub: string; action: string; bullets: string[]; };
        next: { title: string; sub: string; action: string; bullets: string[]; };
        never: { title: string; sub: string; action: string; bullets: string[]; };
        inputs: { title: string; };
        inputsLegend: {
            blue: { title: string; desc: string; };
            red: { title: string; desc: string; };
            gold: { title: string; desc: string; };
            twin: { title: string; desc: string; };
        };
        note: string;
    };
    meta: {
        serviceId: string;
        globalDeployment: string;
        primaryService: string;
        decisionFramework: string;
    };
}

export interface VisionTranslations {
    hero: {
        title: string;
        subtitle: string;
        versionStatus: string;
    };
    cta: {
        headline: string;
        subheadline: string;
        serviceOptions: {
            consult: string;
            demo: string;
            access: string;
        };
    };
}

export interface AgentBlueTranslations {
    cta: {
        headline: string;
        subheadline: string;
    };
}

export interface AgentRedTranslations {
    hero: {
        title: string;
        subtitle: string;
        description: string;
        scroll: string;
    };
    predator: {
        badge: string;
        title: string;
        titleHighlight: string;
        description: string;
        cards: {
            kali: { title: string; desc: string; };
            gnn: { title: string; desc: string; };
            swarm: { title: string; desc: string; };
        };
        terminal: {
            init: string;
            target: string;
            analysis: string;
            scan: string;
            optimization: string;
            instantiating: string;
        };
    };
    squad: {
        tickerLabel: string;
        ticker: {
            critical: string;
            warning: string;
            alert: string;
            system: string;
            intel: string;
        };
        title: string;
        sections: {
            personas: {
                title: string;
                desc: string;
                agents: {
                    wraith: { role: string; desc: string; };
                    phantom: { role: string; desc: string; };
                    mole: { role: string; desc: string; };
                    sandbox: { role: string; desc: string; };
                };
            };
            provisioning: {
                title: string;
                desc: string;
                items: {
                    global: { title: string; desc: string; };
                    tool: { title: string; desc: string; };
                    code: { title: string; desc: string; };
                };
            };
            simulation: {
                title: string;
                desc: string;
                cards: {
                    sandbox: { title: string; desc: string; };
                    exploit: { title: string; desc: string; };
                    validation: { title: string; desc: string; };
                };
            };
        };
    };
    graph: {
        title: string;
        titleHighlight: string;
        cards: {
            osint: {
                title: string;
                items: {
                    rfp: { title: string; desc: string; };
                    jobs: { title: string; desc: string; };
                    profiling: { title: string; desc: string; };
                    darkweb: { title: string; desc: string; };
                };
            };
            supply: {
                title: string;
                items: {
                    suppliers: { title: string; desc: string; };
                    manuals: { title: string; desc: string; };
                };
            };
        };
        sectors: {
            title: string;
            desc: string;
        };
    };
    traversal: {
        badge: string;
        title: string;
        titleHighlight: string;
        suffix: string;
        description: string;
        cards: {
            l0: { title: string; desc: string; };
            l1: { title: string; desc: string; };
            ggnn: { title: string; desc: string; };
        };
        complexity: {
            title: string;
            l1: { label: string; desc: string; };
            l5: { label: string; desc: string; };
            l10: { label: string; desc: string; };
            l20: { label: string; desc: string; };
            hops: string;
            hopsDesc: string;
        };
        chain: {
            title: string;
            steps: {
                vuln: string;
                deps: string;
                servers: string;
                bridge: string;
                impact: string;
            };
        };
    };
    scenarios: {
        badge: string;
        title: string;
        titleHighlight: string;
        description: string;
        killChainTitle: string;
        impactTitle: string;
        cards: {
            supply: {
                title: string;
                desc: string;
                steps: {
                    recon: { label: string; desc: string; };
                    weaponize: { label: string; desc: string; };
                    deliver: { label: string; desc: string; };
                    exploit: { label: string; desc: string; };
                };
                impact: string;
            };
            insider: {
                title: string;
                desc: string;
                steps: {
                    access: { label: string; desc: string; };
                    collection: { label: string; desc: string; };
                    staging: { label: string; desc: string; };
                    exfil: { label: string; desc: string; };
                };
                impact: string;
            };
            ransomware: {
                title: string;
                desc: string;
                steps: {
                    access: { label: string; desc: string; };
                    lateral: { label: string; desc: string; };
                    inhibit: { label: string; desc: string; };
                    impact: { label: string; desc: string; };
                };
                impact: string;
            };
            ot: {
                title: string;
                desc: string;
                steps: {
                    access: { label: string; desc: string; };
                    discovery: { label: string; desc: string; };
                    pivot: { label: string; desc: string; };
                    control: { label: string; desc: string; };
                };
                impact: string;
            };
        };
    };
    cta: {
        headline: string;
        subheadline: string;
    };
}

export interface GoldTeamTranslations {
    hero: {
        title: string;
        tagline: string;
        subtitle: string;
        subtitleHighlight: string;
        description: string;
        scroll: string;
    };
    why: {
        badge: string;
        title: string;
        highlight: string;
        description: string;
        cards: {
            expert: { title: string; desc: string; };
            ai: { title: string; desc: string; };
            global: { title: string; desc: string; };
            executive: { title: string; desc: string; };
        };
    };
    services: {
        title: string;
        iec: {
            title: string;
            desc: string;
            link: string;
        };
        nis2: {
            title: string;
            desc: string;
            personalLiability: string;
            link: string;
            badges: { article: string; liability: string; };
        };
        ma: { title: string; desc: string; };
        warGaming: { title: string; desc: string; };
        soc: { title: string; desc: string; };
        digital: { title: string; desc: string; };
    };
    program: {
        badge: string;
        title: string;
        highlight: string;
        description: string;
        report: string;
        plan: string;
        handover: string;
        note: string;
        lifecycleTitle: string;
        phases: { phase: string; desc: string; }[];
    };
    testing: {
        product: {
            title: string;
            desc: string;
            badges: string[];
        };
        integrator: {
            title: string;
            desc: string;
            badges: string[];
        };
    };
    sectors: {
        title: string;
        desc: string;
        list: {
            energy: string;
            rail: string;
            water: string;
            manufacturing: string;
            defense: string;
        };
    };
    lattice: {
        badge: string;
        title: string;
        highlight: string;
        description: string;
        badges: {
            compliance: string;
            zeroTrust: string;
        };
        liveLabel: string;
    };
    cta: {
        headline: string;
        subheadline: string;
    };
}

export interface NIS2Translations {
    cta: {
        headline: string;
        subheadline: string;
        serviceOptions: {
            assessment: string;
            implementation: string;
            audit: string;
        };
    };
}

export interface IEC62443Translations {
    cta: {
        headline: string;
        subheadline: string;
        serviceOptions: {
            prep: string;
            assessment: string;
        };
    };
}

export interface WorkshopTranslations {
    hero: {
        badge: string;
        title: string;
        titleHighlight: string;
        subtitle: string;
    };
    architecture: {
        title: string;
        subtitle: string;
        cards: {
            zones: { title: string; desc: string; };
            traceability: { title: string; desc: string; };
            epss: { title: string; desc: string; };
        };
        twinCore: {
            label: string;
        };
    };
    workflow: {
        title: string;
        desc: string;
        badge: string;
    };
    canvas: {
        title: string;
        desc: string;
        legend: {
            aeon: { title: string; desc: string; };
            blue: { title: string; desc: string; };
            diode: { title: string; desc: string; };
            ot: { title: string; desc: string; };
        };
        interaction: string;
    };
    editor: {
        title: string;
        desc: string;
    };
    compliance: {
        title: string;
        desc: string;
    };
    cta: {
        headline: string;
        subheadline: string;
        serviceOptions: {
            workshop: string;
            program: string;
        };
    };
}

export interface PlaybookOperatorTranslations {
    cta: {
        headline: string;
        subheadline: string;
        serviceOptions: {
            advisory: string;
            operations: string;
        };
    };
}


export interface AcquisitionsTranslations {
    hero: {
        badge: string;
        title: string;
        titleHighlight: string;
        subtitle: string;
        description: string;
    };
    simulator: {
        badge: string;
        title: string;
        titleHighlight: string;
    };
    quantifiedRisk: {
        badge: string;
        title: string;
        titleHighlight: string;
        description: string;
    };
    timeline: {
        badge: string;
        title: string;
        specialtyAdvantage: string;
        daysVsMonths: string;
    };
    expertise: {
        badge: string;
        title: string;
        subtitle: string;
        description: string;
    };
    cta: {
        headline: string;
        subheadline: string;
        serviceOptions: {
            full: string;
            lite: string;
            premium: string;
        };
    };
}

export interface StrategicTranslations {
    hero: {
        badge: string;
        title: string;
        titleHighlight: string;
        description: string;
    };
    services: {
        nis2: { title: string; desc: string; };
        advisory: { title: string; desc: string; };
        retainers: { title: string; desc: string; };
    };
    focus: {
        title: string;
        desc: string;
        certified: string;
        compliant: string;
    };
    global: { title: string; desc: string; };
    partnerships: { title: string; desc: string; };
    cta: {
        headline: string;
        subheadline: string;
        serviceOptions: {
            pilot: string;
            assessment: string;
            briefing: string;
        };
    };
}

export interface NIS2Translations {
    hero: {
        badge: string;
        title: string;
        subtitle: string;
        description: string;
    };
    services: {
        gap: { title: string; desc: string; };
        policy: { title: string; desc: string; };
        tech: { title: string; desc: string; };
        incident: { title: string; desc: string; };
        supply: { title: string; desc: string; };
        audit: { title: string; desc: string; };
    };
    differentiators: {
        experience: string;
        certified: string;
        clients: string;
        response: string;
    };
    cta: {
        headline: string;
        subheadline: string;
        serviceOptions: {
            assessment: string;
            implementation: string;
            audit: string;
        };
    };
}

export interface IEC62443Translations {
    hero: {
        badge: string;
        title: string;
        highlight: string;
        subtitle: string;
        stats: {
            documents: { value: string; label: string; };
            level: { value: string; label: string; };
            requirements: { value: string; label: string; };
        };
        scroll: string;
    };
    cta: {
        headline: string;
        subheadline: string;
        serviceOptions: {
            prep: string;
            assessment: string;
        };
    };
}

export interface PlaybookManufacturerTranslations {
    cta: {
        headline: string;
        subheadline: string;
        serviceOptions: {
            advisory: string;
            review: string;
        };
    };
}

export interface AboutTranslations {
    hero: {
        badge: string;
        title: string;
        titleHighlight: string;
        description: string;
        locations: {
            hq: string;
            global: string;
            sectors: string;
        };
    };
    origin: {
        title: string;
        subtitle: string;
        p1: string;
        p2: string;
        p3: string;
    };
    leadership: {
        title: string;
        subtitle: string;
        roles: {
            ceo: { name: string; title: string; bio: string; credibility: string; };
            cto: { name: string; title: string; bio: string; credibility: string; };
            cio: { name: string; title: string; bio: string; credibility: string; };
            coo: { name: string; title: string; bio: string; credibility: string; };
        };
    };
    values: {
        title: string;
        subtitle: string;
        list: {
            sovereignty: { title: string; desc: string; };
            privacy: { title: string; desc: string; };
            resilience: { title: string; desc: string; };
            transparency: { title: string; desc: string; };
        };
    };
    cta: {
        headline: string;
        subheadline: string;
        serviceOptions: {
            blue: string;
            gold: string;
            red: string;
            general: string;
        };
    };
}

export interface SOCV2Translations {
    hero: {
        mind: {
            badge: string;
            title: string;
            subtitle: string;
        };
        synapse: {
            predictive: string;
            telemetry: string;
        };
        body: {
            badge: string;
            title: string;
            subtitle: string;
        };
        overlay: {
            bicameral: string;
            defense: string;
        };
    };
    origins: {
        badge: string;
        title: string;
        p1: string;
        p2: string;
        p3: string;
        card: {
            title: string;
            edge: { label: string; desc: string; };
            cloud: { label: string; desc: string; };
        };
    };
    calculus: {
        badge: string;
        title: string;
        desc: string;
        real: { label: string; desc: string; };
        stability: { label: string; desc: string; };
    };
    multiplier: {
        title: string;
        titleHighlight: string;
        desc: string;
        toggles: {
            copilot: string;
            autopilot: string;
        };
        copilot: {
            badge: string;
            title: string;
            desc: string;
            features: string[];
            stat: { value: string; label: string; };
        };
        autopilot: {
            badge: string;
            title: string;
            desc: string;
            features: string[];
            stat: { value: string; label: string; };
        };
    };
    modules: {
        title: string;
        badge: string;
        cards: {
            telemetry: { title: string; desc: string; tags: string[] };
            profiling: { title: string; desc: string; tags: string[] };
            validation: { title: string; desc: string; tags: string[] };
        };
    };
    cta: {
        headline: string;
        subheadline: string;
        serviceOptions: {
            copilot: string;
            autopilot: string;
        };
    };
}

export interface OsintTranslations {
    navigation: {
        securityIntelligence: string;
        strategicAnalysis: string;
        corporateStructure: string;
        technicalDeepDives: string;
        securityHub: string;
        securityHubDesc: string;
        redTeamDossier: string;
        redTeamDossierDesc: string;
        technologyIntel: string;
        technologyIntelDesc: string;
        strategicMindMap: string;
        strategicMindMapDesc: string;
        nis2: string;
        nis2Desc: string;
        gtmStrategy: string;
        gtmStrategyDesc: string;
        cyberThreatGtm: string;
        cyberThreatGtmDesc: string;
        executiveReport: string;
        executiveReportDesc: string;
        shanghaiFeed: string;
        shanghaiFeedDesc: string;
        groupStructure: string;
        groupStructureDesc: string;
        structureIntel: string;
        structureIntelDesc: string;
        aiPartnerships: string;
        aiPartnershipsDesc: string;
        braincube: string;
        braincubeDesc: string;
        thirdPartyRisk: string;
        thirdPartyRiskDesc: string;
        dairyFacility: string;
        dairyFacilityDesc: string;
        menuTitle: string;
        menuSubtitle: string;
        returnToOverview: string;
        new: string;
    };
    report: {
        title: string;
        subtitle: string;
        company: {
            name: string;
            shortName: string;
            industry: string;
            sector: string;
            founded: string;
            incorporated: string;
            headquarters: string;
            employees: string;
            revenue: string;
            ebit: string;
            parent: string;
            website: string;
            classification: string;
            reportDate: string;
            reportId: string;
        };
        labels: {
            companyOverview: string;
            financialHealth: string;
            globalFootprint: string;
            digitalRiskProfile: string;
            keyLeadership: string;
            strategicPriorities: string;
            subsidiaries: string;
            techStack: string;
            riskAssessment: string;
        };
        metrics: {
            revenue: string;
            ebit: string;
            employees: string;
            countries: string;
            processingFacilities: string;
            innovationCentres: string;
            externalIPs: string;
            exposedServices: string;
            leakedCredentials: string;
        };
        risk: {
            critical: string;
            high: string;
            medium: string;
            low: string;
        };
        footer: {
            title: string;
            endOfReport: string;
        };
    };
    intelligence: {
        title: string;
        subtitle: string;
        executive: {
            title: string;
            identity: string;
            purpose: string;
            platforms: {
                cocoa: string;
                coffee: string;
                dairy: string;
                nuts: string;
                spices: string;
            };
            scale: {
                plants: string;
                innovation: string;
                farmers: string;
            };
        };
        entities: {
            title: string;
            ofi: { role: string; focus: string; };
            mindsprint: { role: string; focus: string; };
            jiva: { role: string; focus: string; };
            terrascope: { role: string; focus: string; };
        };
        subsidiaries: {
            title: string;
            headers: { name: string; location: string; function: string; };
            list: {
                clubCoffee: { function: string; };
                seda: { function: string; };
                unicao: { function: string; };
                macao: { function: string; };
                na: { function: string; };
                cocoaBV: { function: string; };
                cocoaDE: { function: string; };
                locations: {
                    toronto: string;
                    palencia: string;
                    abidjan: string;
                    valencia: string;
                    chicago: string;
                    netherlands: string;
                    germany: string;
                };
            };
        };
        facilities: {
            title: string;
            regions: {
                na: string;
                europe: string;
                apac: string;
                africaLatam: string;
            };
        };
        chronology: {
            title: string;
            events: {
                compass: string;
                ofiEst: string;
                tokoroa: string;
                mightyEarth: string;
                salic: string;
                jivaClose: string;
                eudr: string;
            };
        };
        discrepancies: {
            title: string;
            intro: string;
            fields: {
                employees: string;
                farmers: string;
                innovation: string;
            };
        };
    };
    groupStructure: {
        header: {
            title: string;
            subtitle: string;
            back: string;
        };
        hierarchy: {
            title: string;
            desc: string;
        };
        digitalLayer: {
            title: string;
            desc: string;
            link: string;
        };
        geoComplexity: {
            title: string;
            desc: string;
            link: string;
        };
    };
    orgMap: {
        root: { label: string; role: string; };
        ofi: { label: string; role: string; };
        agri: { label: string; role: string; };
        remaining: { label: string; role: string; };
        divisions: {
            cocoa: { label: string; role: string; };
            coffee: { label: string; role: string; };
            dairy: { label: string; role: string; };
            spices: { label: string; role: string; };
            grains: { label: string; role: string; };
            freight: { label: string; role: string; };
            cotton: { label: string; role: string; };
            mindsprint: { label: string; role: string; };
            nupo: { label: string; role: string; };
        };
        interaction: string;
    };
    executive: {
        title: string;
        subtitle: string;
        backButton: string;
        summary: {
            title: string;
            intro: string;
            coreIdentity: { title: string; desc: string; };
            operationalScale: { title: string; desc: string; };
            strategicDirection: { title: string; desc: string; };
            keyRisks: { title: string; desc: string; };
        };
        anatomy: {
            title: string;
            hierarchy: { title: string; desc: string; };
            leadership: {
                title: string;
                columns: { name: string; title: string; unit: string; };
            };
        };
        footprint: {
            title: string;
            hq: {
                title: string;
                corporate: { title: string; desc: string; };
                na: { title: string; desc: string; };
                csc: { title: string; };
            };
            subsidiaries: { title: string; };
        };
        tech: {
            title: string;
            it: {
                title: string;
                sap: { title: string; desc: string; };
                atSource: { title: string; desc: string; };
                guardian: { title: string; desc: string; };
            };
            ot: {
                title: string;
                braincube: { title: string; desc: string; };
                rockwell: { title: string; desc: string; };
                aveva: { title: string; desc: string; };
            };
        };
        chronology: { title: string; };
        discrepancies: { title: string; intro: string; };
        data: {
            orgEntities: {
                ofi: { desc: string; };
                mindsprint: { desc: string; };
                jiva: { desc: string; };
                terrascope: { desc: string; };
            };
            subsidiaries: {
                clubCoffee: string;
                seda: string;
                unicao: string;
                spain: string;
                na: string;
                cocoaBV: string;
                cocoaDE: string;
            };
            chronology: {
                compass: string;
                ofiEst: string;
                tokoroa: string;
                mightyEarth: string;
                salic: string;
                jivaClose: string;
                eudr: string;
            };
            discrepancies: {
                employee: string;
                farmer: string;
                innovation: string;
                stock: string;
            };
        };
    };
    security: {
        title: string;
        subtitle: string;
        backLink: string;
        overview: {
            riskLevel: string;
            sectorAttacks: string;
            mitreTechniques: string;
            criticalCves: string;
            iecStatus: string;
            statusInProgress: string;
            statusPending: string;
            statusCertified: string;
        };
        threatActors: {
            title: string;
            description: string;
        };
        techRisks: {
            title: string;
            risks: {
                braincube: { reason: string; };
                rockwell: { reason: string; };
                sap: { reason: string; };
                siemens: { reason: string; };
            };
        };
        criticalAlert: {
            title: string;
            description: string;
            tags: {
                poisoning: string;
                injection: string;
                exfiltration: string;
                supplyChain: string;
            };
        };
        subpages: {
            header: string;
            mitre: { title: string; description: string; };
            sectors: { title: string; description: string; };
            technology: { title: string; description: string; };
            iec62443: { title: string; description: string; };
            attacker: { title: string; description: string; };
        };
        compliance: {
            title: string;
            iec: { label: string; desc: string; };
            nis2: { label: string; desc: string; };
            fssc: { label: string; desc: string; };
        };
    };
}

export interface Translations {
    meta: LocaleMeta;
    nav: NavTranslations;
    brand: BrandTranslations;
    common: CommonTranslations;
    home: HomeTranslations;
    vision: VisionTranslations;
    agentBlue: AgentBlueTranslations;
    agentRed: AgentRedTranslations;
    goldTeam: GoldTeamTranslations;
    nis2: NIS2Translations;
    iec62443: IEC62443Translations;
    workshop: WorkshopTranslations;
    playbookOperator: PlaybookOperatorTranslations;
    playbookManufacturer: PlaybookManufacturerTranslations;
    about: AboutTranslations;
    socV2: SOCV2Translations;
    acquisitions: AcquisitionsTranslations;
    strategic: StrategicTranslations;
    cta: CTATranslations;
    soc: SOCTranslations;
    osint: OsintTranslations;
}
