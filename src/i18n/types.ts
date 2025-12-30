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
    headline: string;
    subheadline: string;
}

export interface Translations {
    meta: LocaleMeta;
    nav: NavTranslations;
    brand: BrandTranslations;
    common: CommonTranslations;
    home: HomeTranslations;
    cta: CTATranslations;
}
