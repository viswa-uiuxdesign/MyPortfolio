// ─────────────────────────────────────────
// Shared TypeScript Types
// Portfolio — Viswa
// ─────────────────────────────────────────

export type ProjectCategory = 'All' | 'Web Apps' | 'Mobile Apps' | 'Websites';

export type ProjectPlatform = 'Web' | 'iOS' | 'Android' | 'Cross-Platform' | 'Responsive Web';

export interface CaseStudySection {
  heading: string;
  body: string;
  images?: string[];
  bullets?: string[];
}

export interface Competitor {
  name: string;
  logo?: string;
  strengths: string[];
  weaknesses: string[];
}

export interface CaseStudy {
  overview: CaseStudySection;
  problem: CaseStudySection;
  competitors?: Competitor[];
  research: CaseStudySection;
  uxProcess: CaseStudySection;
  uiDesign: CaseStudySection;
  designSystem: CaseStudySection;
  challenges: CaseStudySection;
  outcome: CaseStudySection;
}

export type WebsiteStepType = 
  | 'text'
  | 'diagram'
  | 'annotated-screen'
  | 'before-after'
  | 'responsive-preview'
  | 'wireframe-grid'
  | 'strategy-board'
  | 'image-gallery';

export interface WebsiteStoryStep {
  stepNumber: number;
  type: WebsiteStepType;
  title: string;
  description: string;
  content?: any;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: Exclude<ProjectCategory, 'All'>;
  platform: ProjectPlatform;
  industry: string;
  role: string;
  timeline: string;
  team: string;
  shortDescription: string;
  coverImage: string;
  coverAlt: string;
  tags: string[];
  externalLink?: string;
  caseStudy: CaseStudy;
  websiteSteps?: WebsiteStoryStep[];
  customObservanceStory?: {
    overview: { title: string; subtitle: string; metadata: string };
    productContext: { title: string; body: string; points?: { label: string; desc: string }[] };
    challenge: { title: string; body: string; problems: string[] };
    painPoints: { title: string; points: { num: string; question: string; answer: string }[] };
    opportunity: { title: string; body: string; goals: string[] };
    overviewBefore: { title: string; annotations: { num: string | number; title?: string; desc: string; x: number; y: number }[]; userPain?: string; image: string; subtitle?: string };
    overviewAfter: { title: string; annotations: { num: string | number; title?: string; desc: string; x: number; y: number }[]; beforeCallout?: string; afterCallout?: string; image: string; subtitle?: string };
    dashboardBefore: { title: string; annotations: { num: string | number; title?: string; desc: string; x: number; y: number }[]; userPain?: string; image: string; subtitle?: string };
    dashboardAfter: { title: string; annotations: { num: string | number; title?: string; desc: string; x: number; y: number }[]; beforeCallout?: string; afterCallout?: string; image: string; subtitle?: string };
    scanBefore?: { title: string; annotations: { num: string | number; title?: string; desc: string; x: number; y: number }[]; userPain?: string; image: string; subtitle?: string };
    scanAfter?: { title: string; annotations: { num: string | number; title?: string; desc: string; x: number; y: number }[]; beforeCallout?: string; afterCallout?: string; image: string; subtitle?: string };
    viewerBefore: { title: string; annotations: { num: string | number; title?: string; desc: string; x: number; y: number }[]; userPain?: string; image: string; subtitle?: string };
    viewerAfter: { title: string; annotations: { num: string | number; title?: string; desc: string; x: number; y: number }[]; beforeCallout?: string; afterCallout?: string; image: string; subtitle?: string };
    system: { title: string; body: string; patterns: string[] };
    learnings: { title: string; points: { num: string; title: string; desc: string }[] };
  };
}

export interface ExperienceEntry {
  period: string;
  role: string;
  company: string;
  client?: string;
  type?: string;
  isCurrent?: boolean;
}

export interface Tool {
  name: string;
  icon: string;
}

export type FilterOption = {
  label: ProjectCategory;
  count?: number;
};
