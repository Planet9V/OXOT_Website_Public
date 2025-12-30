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
        apiEnhancements: string;
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
    cta: {
        headline: string;
        subheadline: string;
    };
}

export interface AgentBlueTranslations {
    cta: {
        headline: string;
        subheadline: string;
    };
}

export interface AgentRedTranslations {
    cta: {
        headline: string;
        subheadline: string;
    };
}

export interface GoldTeamTranslations {
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
    cta: {
        headline: string;
        subheadline: string;
        serviceOptions: {
            copilot: string;
            autopilot: string;
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
}
