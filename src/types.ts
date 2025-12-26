
export enum ViewState {
  CONTEXT = 'CONTEXT',
  ARCHITECTURE = 'ARCHITECTURE',
  CALCULUS = 'CALCULUS',
  LOGIC = 'LOGIC',
  FRAMEWORK = 'FRAMEWORK',
  TIMELINE = 'TIMELINE',
  AGENT_RED = 'AGENT_RED',
  CONCEPT_HUB = 'CONCEPT_HUB',
  SIX_LEVEL_ARCHITECTURE = 'SIX_LEVEL_ARCHITECTURE',
  COMPREHENSIVE_ARCHITECTURE = 'COMPREHENSIVE_ARCHITECTURE',
  LEVELS_OVERVIEW = 'LEVELS_OVERVIEW',
  ONTOLOGY_VIEW = 'ONTOLOGY_VIEW',
  DEEP_SBOM_VIEW = 'DEEP_SBOM_VIEW',
  PSYCHOHISTORY_VIEW = 'PSYCHOHISTORY_VIEW',
  PSYCHOHISTORY_DIAGRAMS = 'PSYCHOHISTORY_DIAGRAMS',
  CYBER_EPIDEMICS = 'CYBER_EPIDEMICS',
  ARCHITECTURE_EXPLAINED_VIEW = 'ARCHITECTURE_EXPLAINED_VIEW',
  E27_VIEW = 'E27_VIEW',
  AGENT_RED_OVERVIEW = 'AGENT_RED_OVERVIEW',
  EXPRESS_ATTACK_BRIEF = 'EXPRESS_ATTACK_BRIEF',
  INVESTOR_BRIEFING = 'INVESTOR_BRIEFING',
  AEON_CORE = 'AEON_CORE',
  THREAT_HUNTER = 'THREAT_HUNTER',
  AGENT_BLUE = 'AGENT_BLUE',
  WEBGPU_DEMO = 'WEBGPU_DEMO', // WebGPU Visualization Demo
  REQUEST_ACCESS = 'REQUEST_ACCESS', // New view for lead capture
}

export interface SimulationParams {
  // Represents the resistance of the population to change (Mass)
  socialInertia: number;
  // Represents the chaos/randomness in the system (Heat)
  systemEntropy: number;
  // Represents the friction of organizational culture (Viscosity)
  culturalViscosity: number;
  // Represents the speed of technical adaptation (Velocity)
  adaptationRate: number;
}

export interface NodeData {
  id: string;
  label: string;
  description: string;
  x: number;
  y: number;
  status: 'active' | 'latent' | 'critical';
}

export interface ArchitectureLayerProps {
  level: number;
  title: string;
  description: string;
  details: string[];
}

export interface DataFeedItem {
  id: string;
  source: 'NVD' | 'REUTERS' | 'INT' | 'DARKWEB';
  timestamp: string;
  content: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  impactParameter: keyof SimulationParams | 'general';
}