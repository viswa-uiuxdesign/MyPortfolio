'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import {
  X, ChevronLeft, ChevronRight, ArrowRight, Maximize2, Minimize2,
  AlertCircle, CheckCircle2, Check, ArrowUpRight, Calendar, Users, Briefcase, Globe,
  HardHat, Camera, Cpu, LineChart, Lightbulb, Zap, Compass, Brain, Microscope
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Project } from '@/lib/types';

// ─────────────────────────────────────────
// 1. Data Types
// ─────────────────────────────────────────

interface PainPoint { frustration: string; impact: string; }
interface FeatureGridItem { featureName: string; problem: string; designResponse: string; whyMade: string; finalOutcome: string; }
interface OutcomeMetric { value: string; title: string; desc: string; }
interface UserFlowStep { label: string; type: 'entry'|'action'|'decision'|'outcome'; desc: string; legacyFriction?: string; redesignedEase?: string; }
interface WorkflowRole { role: string; inputs: string[]; processing: string[]; dependencies: string[]; outputs: string[]; }
interface AnnotatedArea { id: number; top: string; left: string; problem: string; designResponse: string; decision: string; benefit: string; }

interface ProjectMockups {
  heroImage: string; problemImage: string; painPointImage: string;
  userFlowImage: string; workflowImage: string; wireframeImage: string;
  solutionScreen01: string; solutionScreen02: string; annotatedScreen01: string;
  beforeImage: string; afterImage: string; impactImage: string;
}

interface ProjectStory {
  beforeWorkflow: { title: string; desc: string };
  afterWorkflow: { title: string; desc: string };
  painPoints: PainPoint[];
  designFocus: string;
  designPrinciples: string[];
  featuresGrid: FeatureGridItem[];
  outcomeMetrics: OutcomeMetric[];
  takeaways: { letter: string; title: string; desc: string }[];
  userFlowSteps: UserFlowStep[];
  workflowRoles: WorkflowRole[];
  annotatedAreas: AnnotatedArea[];
}

// ─────────────────────────────────────────
// 2. Slide System Types
// ─────────────────────────────────────────

type SlideType =
  | 'cover'|'context'|'problem'|'pain-points'|'workflow'
  | 'user-flow'|'exploration'|'solution'|'feature-01'|'feature-02'
  | 'annotated-screens'|'before-after'|'system-thinking'|'impact'|'learnings'
  // Observance specific custom slides
  | 'obs-logo' | 'obs-cover' | 'obs-context' | 'obs-challenge' | 'obs-pain-points' | 'obs-opportunity'
  | 'obs-overview-before' | 'obs-overview-after' | 'obs-dashboard-before' | 'obs-dashboard-after'
  | 'obs-scan-before' | 'obs-scan-after'
  | 'obs-viewer-before' | 'obs-viewer-after' | 'obs-comparison-overview' | 'obs-comparison-dashboard' | 'obs-comparison-viewer' | 'obs-system' | 'obs-final-story' | 'obs-learnings' | 'thanks';

interface Slide { type: SlideType; label: string; }
interface SlideProps { project: Project; story: ProjectStory; mockups: ProjectMockups; }

function buildSlides(project: Project, story: ProjectStory): Slide[] {
  if (project.id === 'inkers-observance') {
    return [
      { type: 'obs-logo', label: 'Logo' },
      { type: 'obs-context', label: 'Context' },
      { type: 'obs-pain-points', label: 'Pain Points' },
      { type: 'obs-overview-before', label: 'Overview: Before' },
      { type: 'obs-overview-after', label: 'Overview: After' },
      { type: 'obs-dashboard-before', label: 'Dashboard: Before' },
      { type: 'obs-dashboard-after', label: 'Dashboard: After' },
      { type: 'obs-scan-before', label: 'Scan Details: Before' },
      { type: 'obs-scan-after', label: 'Scan Details: After' },
      { type: 'obs-viewer-before', label: 'Viewer: Before' },
      { type: 'obs-viewer-after', label: 'Viewer: After' },
      { type: 'obs-system', label: 'System' },
      { type: 'obs-learnings', label: 'Learnings' },
      { type: 'thanks', label: 'Thank You' }
    ];
  }

  const slides: Slide[] = [
    { type: 'cover', label: 'Cover' },
    { type: 'context', label: 'Context' },
    { type: 'problem', label: 'The Problem' },
    { type: 'pain-points', label: 'Pain Points' },
    { type: 'workflow', label: 'Current Workflow' },
    { type: 'user-flow', label: 'User Flow' },
    { type: 'exploration', label: 'Exploration' },
    { type: 'solution', label: 'Solution' },
  ];
  if (story.featuresGrid.length >= 1) slides.push({ type: 'feature-01', label: story.featuresGrid[0].featureName });
  if (story.featuresGrid.length >= 2) slides.push({ type: 'feature-02', label: story.featuresGrid[1].featureName });
  slides.push({ type: 'annotated-screens', label: 'Annotated Screens' });
  slides.push({ type: 'before-after', label: 'Before & After' });
  const dsBody = project.caseStudy.designSystem?.body ?? '';
  if (dsBody.length > 80) slides.push({ type: 'system-thinking', label: 'System Thinking' });
  slides.push({ type: 'impact', label: 'Impact' });
  slides.push({ type: 'learnings', label: 'Learnings' });
  slides.push({ type: 'thanks', label: 'Thank You' });
  return slides;
}

// ─────────────────────────────────────────
// 3. Project Data
// ─────────────────────────────────────────

const FALLBACK_IMG = '/images/projects/placeholder.png';
const FALLBACK_MOCKUP: ProjectMockups = { heroImage: FALLBACK_IMG, problemImage: FALLBACK_IMG, painPointImage: FALLBACK_IMG, userFlowImage: FALLBACK_IMG, workflowImage: FALLBACK_IMG, wireframeImage: FALLBACK_IMG, solutionScreen01: FALLBACK_IMG, solutionScreen02: FALLBACK_IMG, annotatedScreen01: FALLBACK_IMG, beforeImage: FALLBACK_IMG, afterImage: FALLBACK_IMG, impactImage: FALLBACK_IMG };

const PROJECT_MOCKUPS: Record<string, ProjectMockups> = {
  'inkers-observance': { heroImage: '/images/projects/inkers-observance.jpg', problemImage: '/images/projects/inkers-observance.jpg', painPointImage: '/images/projects/painpoint.jpeg', userFlowImage: '/images/projects/inkers-observance.jpg', workflowImage: '/images/projects/inkers-observance.jpg', wireframeImage: '/images/projects/inkers-observance.jpg', solutionScreen01: '/images/projects/inkers-observance.jpg', solutionScreen02: '/images/projects/inkers-observance.jpg', annotatedScreen01: '/images/projects/inkers-observance.jpg', beforeImage: '/images/projects/inkers-observance.jpg', afterImage: '/images/projects/inkers-observance.jpg', impactImage: '/images/projects/inkers-observance.jpg' },
  'leads-collection-management': { heroImage: '/images/projects/developer-docs-v4.jpg', problemImage: '/images/projects/developer-docs-v3.jpg', painPointImage: '/images/projects/painpoint.jpeg', userFlowImage: '/images/projects/developer-docs.jpg', workflowImage: '/images/projects/developer-docs-v4.jpg', wireframeImage: '/images/projects/developer-docs-v3.jpg', solutionScreen01: '/images/projects/developer-docs-v4.jpg', solutionScreen02: '/images/projects/developer-docs-new.jpg', annotatedScreen01: '/images/projects/developer-docs-v4.jpg', beforeImage: '/images/projects/developer-docs-v3.jpg', afterImage: '/images/projects/developer-docs-v4.jpg', impactImage: '/images/projects/developer-docs.jpg' },
  'unipay': { heroImage: '/images/projects/unipay.png', problemImage: '/images/projects/mobile-banking.jpg', painPointImage: '/images/projects/painpoint.jpeg', userFlowImage: '/images/projects/unipay.png', workflowImage: '/images/projects/mobile-banking.jpg', wireframeImage: '/images/projects/fintech-dashboard.jpg', solutionScreen01: '/images/projects/unipay.png', solutionScreen02: '/images/projects/mobile-banking.jpg', annotatedScreen01: '/images/projects/unipay.png', beforeImage: '/images/projects/fintech-dashboard.jpg', afterImage: '/images/projects/unipay.png', impactImage: '/images/projects/unipay.png' },
  'coreconfig': { heroImage: '/images/projects/coreconfig.png', problemImage: '/images/projects/design-system.jpg', painPointImage: '/images/projects/painpoint.jpeg', userFlowImage: '/images/projects/coreconfig.png', workflowImage: '/images/projects/design-system.jpg', wireframeImage: '/images/projects/ai-product-tool.jpg', solutionScreen01: '/images/projects/coreconfig.png', solutionScreen02: '/images/projects/design-system.jpg', annotatedScreen01: '/images/projects/coreconfig.png', beforeImage: '/images/projects/design-system.jpg', afterImage: '/images/projects/coreconfig.png', impactImage: '/images/projects/coreconfig.png' },
  'lotto-website-design': { heroImage: '/images/projects/lotto.png', problemImage: '/images/projects/saas-landing.jpg', painPointImage: '/images/projects/painpoint.jpeg', userFlowImage: '/images/projects/lotto.png', workflowImage: '/images/projects/saas-landing.jpg', wireframeImage: '/images/projects/agency-portfolio.jpg', solutionScreen01: '/images/projects/lotto.png', solutionScreen02: '/images/projects/saas-landing.jpg', annotatedScreen01: '/images/projects/lotto.png', beforeImage: '/images/projects/saas-landing.jpg', afterImage: '/images/projects/lotto.png', impactImage: '/images/projects/lotto.png' },
  'tharra': { heroImage: '/images/projects/tharra.png', problemImage: FALLBACK_IMG, painPointImage: '/images/projects/painpoint.jpeg', userFlowImage: '/images/projects/tharra.png', workflowImage: '/images/projects/tharra.png', wireframeImage: FALLBACK_IMG, solutionScreen01: '/images/projects/tharra.png', solutionScreen02: '/images/projects/tharra.png', annotatedScreen01: '/images/projects/tharra.png', beforeImage: FALLBACK_IMG, afterImage: '/images/projects/tharra.png', impactImage: '/images/projects/tharra.png' },
};

const getProjectMockups = (id: string): ProjectMockups => PROJECT_MOCKUPS[id] ?? FALLBACK_MOCKUP;

const PROJECT_STORY_DATA: Record<string, ProjectStory> = {
  'inkers-observance': {
    beforeWorkflow: { title: 'Manual Visual Tracking (Old)', desc: 'Site inspectors spent 4+ hours daily manually documenting progress on paper. Disconnect between site photo logs and 3D CAD/BIM blueprints meant errors went unnoticed for weeks.' },
    afterWorkflow: { title: 'Dual-Viewport BIM Hub (New)', desc: 'Dual-viewport comparison workspace overlays real-time site photos directly onto 3D blueprints. Logging exceptions takes under 3 clicks with automated status mapping.' },
    painPoints: [
      { frustration: 'Slow visual inspections across massive concrete structures.', impact: 'Inspectors spend 4+ hours per day compiling reports, introducing data lag.' },
      { frustration: 'Disconnected 3D CAD design blueprints and actual site photos.', impact: 'Discrepancies remain undetected for weeks, causing expensive structural re-work.' },
    ],
    designFocus: 'Sensory Hierarchy & Precision',
    designPrinciples: ['Maximize BIM viewport: Minimal controls keep the 3D model canvas wide and readable.', 'Floating context panels: Shift detailed logs to slide-out cards to prevent view clutter.'],
    featuresGrid: [
      { featureName: 'Dual-Viewport Compare', problem: 'Site photos are static while 3D models require active orbital navigation.', designResponse: 'Synchronized viewport presets matching camera angles and timeline logs.', whyMade: 'Enables immediate side-by-side verification of design versus reality.', finalOutcome: 'Slashed verification reporting from hours to 15 minutes.' },
      { featureName: '3D Space Gizmo & Pins', problem: 'Describing the exact spatial location of construction issues in text is highly prone to error.', designResponse: 'Interactive status pins placed directly on 3D BIM coordinates.', whyMade: 'Establishes precise, double-clickable visual markers for site remediation.', finalOutcome: '22% reduction in construction alignment discrepancies.' },
    ],
    outcomeMetrics: [
      { value: '15m', title: 'Inspection Time', desc: 'Daily progress logging reduced from 4 hours to just 15 minutes.' },
      { value: '-22%', title: 'Alignment Errors', desc: 'Fewer architectural mismatches and structural re-work cycles.' },
      { value: '3-Click', title: 'Logging Speed', desc: 'Users log and verify anomalies with zero keyboard inputs.' },
    ],
    takeaways: [
      { letter: 'A', title: 'Simplify complex orbital systems', desc: 'Field supervisors prefer quick toggle controls and camera presets over complex CAD manipulation.' },
      { letter: 'B', title: 'Tie data to spatial anchors', desc: 'Overlaying alerts onto 3D surfaces minimizes description errors and improves cross-team clarity.' },
    ],
    userFlowSteps: [
      { label: 'Site Entry', type: 'entry', desc: 'Inspector arrives at construction sector and opens BIM Viewport app.', legacyFriction: 'Carrying rolls of physical blueprints and clipboard tables.', redesignedEase: 'Instant biometric login with context-aware sector routing.' },
      { label: 'Align Viewpoint', type: 'action', desc: 'Inspectors align camera view presets to match structural pillars.', legacyFriction: 'Slow manual estimation of coordinates and orientation checks.', redesignedEase: 'AR orientation helper maps physical photos to 3D models.' },
      { label: 'Verify Discrepancies', type: 'decision', desc: 'Decide if construction matches CAD parameters or requires error logging.', legacyFriction: 'Filing multi-page paper logs that lag for days before manager reviews.', redesignedEase: 'Single-click pinning on 3D models to trigger instant system flags.' },
      { label: 'Submit Report', type: 'outcome', desc: 'Submit validated structural checkpoint logs directly to sub-contractors.', legacyFriction: '4-hour office report assembly shifts and data re-entry errors.', redesignedEase: 'Instant dashboard dispatch with automated status reporting metrics.' },
    ],
    workflowRoles: [{ role: 'Field Inspector', inputs: ['Rugged tablet specs', 'Sector status schedules', 'Real-time site photography'], processing: ['BIM viewport alignment', 'Exception pin placement', 'Interactive checklist validation'], dependencies: ['BIM model loading stability', 'WiFi coverage in active sectors'], outputs: ['Discrepancies log reports', 'Production timeline updates'] }],
    annotatedAreas: [
      { id: 1, top: '35%', left: '25%', problem: 'Inspectors got lost navigating complex 3D CAD model orbit tools.', designResponse: 'Preset camera angles mapped to structural milestones.', decision: 'Use one-tap navigation presets instead of full orbital controls.', benefit: 'Reduces navigation frustration and keeps UI focused.' },
      { id: 2, top: '65%', left: '70%', problem: 'Entering anomaly descriptions on virtual keyboards is slow and error-prone.', designResponse: 'Pre-populated contextual exception dropdown tags.', decision: 'Enforce dropdown selectors with optional comment panels.', benefit: 'Ensures data consistency and allows quick field selections.' },
    ],
  },
  'leads-collection-management': {
    beforeWorkflow: { title: 'Excel Lists & Blindspots (Old)', desc: 'Ground agents navigated confusing call lists. Managers manually uploaded spreadsheets, resulting in a 48-hour lag in pipeline status and cash collection visibility.' },
    afterWorkflow: { title: 'Role-Based CRM Dashboard (New)', desc: 'Ground agents access one-click prioritized actions and call logs. Managers view live, auto-updating pipeline health charts and agent progress metrics.' },
    painPoints: [
      { frustration: 'Fragmented pipelines and manual spreadsheet reporting.', impact: 'Payment indicators lag by 48+ hours, creating pipeline blindspots.' },
      { frustration: 'Cluttered, uniform task lists for busy ground agents.', impact: 'Missed client follow-ups, payment friction, and lower recovery rates.' },
    ],
    designFocus: 'Data Density & Visual Prioritization',
    designPrinciples: ['High-density layout controls: Display client metadata without horizontal scrolling.', 'Urgency tags: Dynamic status-colored borders highlight accounts requiring instant follow-ups.'],
    featuresGrid: [
      { featureName: 'Priority Call Lists', problem: 'Agents lose time deciding which customer account to dial next.', designResponse: 'Priority queues structured by severity, size, and next follow-up date.', whyMade: 'Focuses agent actions on accounts with the highest recovery probability.', finalOutcome: '34% increase in daily completed agent calls.' },
      { featureName: 'Radial Pipeline Analytics', problem: 'Managers lack real-time insights into team performance and cash metrics.', designResponse: 'Vibrant metrics cards and pipeline status progress rings.', whyMade: 'Replaces manual spreadsheet uploads with automated reporting parameters.', finalOutcome: 'Payment updates synced in real-time, eliminating operational lag.' },
    ],
    outcomeMetrics: [
      { value: '+34%', title: 'Agent Capacity', desc: 'Boosted the volume of structured client calls executed daily.' },
      { value: 'Real-time', title: 'Sync Speed', desc: 'Replaced manual manager spreadsheet uploads with automatic updates.' },
      { value: '3 Views', title: 'Tailored Roles', desc: 'Individual UI systems for Admins, Managers, and Agents.' },
    ],
    takeaways: [
      { letter: 'A', title: 'Tailor UI to operational stress', desc: 'Ground agents need fast mobile actions, whereas managers need wide desktop data screens.' },
      { letter: 'B', title: 'Collapsible rows save layout space', desc: 'Using expanders for client histories keeps tables clean while preserving secondary details.' },
    ],
    userFlowSteps: [
      { label: 'Dashboard Entry', type: 'entry', desc: 'Agent logs in and views their dynamic Priority Call Queue list.', legacyFriction: 'Sifting through hundreds of raw Excel rows on share drives.', redesignedEase: 'Automatic queue assignment sorted by payment urgency values.' },
      { label: 'Customer Call', type: 'action', desc: 'Agent triggers quick call dialing directly from the application card.', legacyFriction: 'Copy-pasting phone numbers to softphones manually.', redesignedEase: 'Single-click dial triggers system call logging parameters.' },
      { label: 'Log Outcome', type: 'decision', desc: 'Decide callback dates or record payment settlement targets.', legacyFriction: 'Entering raw notes in a separate sheet with no tracking rules.', redesignedEase: 'Quick status tags auto-generate future reminder cards.' },
      { label: 'Pipeline Update', type: 'outcome', desc: 'System syncs collection metrics to the Manager dashboard.', legacyFriction: '48-hour lag while managers compile daily logs manually.', redesignedEase: 'Real-time radial charts updates showing immediate values.' },
    ],
    workflowRoles: [{ role: 'Lead Agent', inputs: ['Assigned collections lists', 'Client histories', 'Payment statuses'], processing: ['Trigger dial flows', 'Record payment commitments', 'Schedule follow-up tasks'], dependencies: ['Manager queue assignments'], outputs: ['Completed call records', 'Logged payment promises'] }],
    annotatedAreas: [
      { id: 1, top: '25%', left: '20%', problem: 'Managers could not see agent progress without daily team syncs.', designResponse: 'Radial performance rings showing completed vs remaining targets.', decision: 'Place radial metrics cards directly at the top layout of dashboard.', benefit: 'Reduces management overhead and guides team direction.' },
      { id: 2, top: '70%', left: '60%', problem: 'Client list tables contained too many columns, requiring horizontal scroll.', designResponse: 'Collapsible details drawer displaying deep transaction records.', decision: 'Prioritize table cells to 4 core parameters and use detail drawers.', benefit: 'Keeps layout clean while preserving access to metadata.' },
    ],
  },
  'unipay': {
    beforeWorkflow: { title: 'Flat Banking Statements (Old)', desc: 'Financial transactions rendered in flat, text-heavy statements. Credit limit status and budgeting features were buried under deep submenus.' },
    afterWorkflow: { title: 'Swipable Cards & Live Spend (New)', desc: 'Interactive card display maps limits immediately. Real-time spend analytics auto-categorize purchases into clean visual radial components.' },
    painPoints: [
      { frustration: 'Cluttered transaction lists offering no insight on spending habits.', impact: 'Users fail to follow budgets due to manual logging friction.' },
      { frustration: 'Billing configurations and limit controls buried in settings.', impact: 'Accidental card limit breaches and credit card payment delays.' },
    ],
    designFocus: 'Dynamic Minimalism & Tactile Motion',
    designPrinciples: ['Touch-first card layouts: Swipable digital cards represent physical assets.', 'Auto-visual analytics: Beautiful visual rings category tracking without manual entries.'],
    featuresGrid: [
      { featureName: 'Automated Category Ring', problem: 'Users ignore personal finance tracking if logging requires effort.', designResponse: 'Clean visual radial rings that group spend automatically.', whyMade: 'Converts transactional details into interactive visual context.', finalOutcome: '48% increase in active personal budget tracking.' },
      { featureName: 'Card Limit Sliders', problem: 'Adjusting payment thresholds requires navigation and call requests.', designResponse: 'Interactive overlay slider directly beneath the selected card.', whyMade: 'Gives users direct, low-friction control over credit parameters.', finalOutcome: 'Significant drop in payment limit breaches and card declines.' },
    ],
    outcomeMetrics: [
      { value: '+48%', title: 'Budgeting Active Usage', desc: 'Higher user engagement with personal finance categorizations.' },
      { value: '4.8\u2605', title: 'App Store Rating', desc: 'Achieved high user satisfaction during private iOS beta release.' },
      { value: '<60s', title: 'Control Actions', desc: 'Card limits can be adjusted and bills paid in a single session.' },
    ],
    takeaways: [
      { letter: 'A', title: 'Simplify primary dashboard views', desc: 'Mobile users check financial apps for balance and credit first. Keep these details front and center.' },
      { letter: 'B', title: 'Leverage subtle micro-interactions', desc: 'Smooth card transitions and success animations make payments feel reliable and premium.' },
    ],
    userFlowSteps: [
      { label: 'Open App Wallet', type: 'entry', desc: 'User opens UniPay and faces their dynamic physical-feel card slider view.', legacyFriction: 'Entering bank portal pages requiring layout pincodes every time.', redesignedEase: 'Zero-delay FaceID loading directly into the dashboard context.' },
      { label: 'Tap Limit Config', type: 'action', desc: 'User taps the active card to configure maximum transaction bounds.', legacyFriction: 'Navigating deep profiles config sections and submitting requests.', redesignedEase: 'Smooth bottom sheet sliding up with a touch drag slider control.' },
      { label: 'Confirm Limits', type: 'decision', desc: 'Decide payment limits and lock parameter controls in place.', legacyFriction: 'Waiting for SMS verification codes and approval lag cycles.', redesignedEase: 'Direct biometric confirm validates parameters instantly.' },
      { label: 'Spend Audit', type: 'outcome', desc: 'Make checkouts securely and review spending allocations on radial ring graphs.', legacyFriction: 'Manually calculating category lists at month end.', redesignedEase: 'Instant status category tracking notifications.' },
    ],
    workflowRoles: [{ role: 'App User', inputs: ['Account funds', 'Interactive limits configs', 'Category preferences'], processing: ['Adjusting limit sliders', 'Verifying active transaction categories', 'Executing touch checkouts'], dependencies: ['Secure banking core API'], outputs: ['Real-time spending notifications', 'Adjusted limits profiles'] }],
    annotatedAreas: [
      { id: 1, top: '30%', left: '50%', problem: 'Users could not easily connect digital settings with their physical card parameters.', designResponse: 'Interactive 3D skew credit card model acting as settings toggle.', decision: 'Utilize physical card layouts to anchor all settings sections.', benefit: 'Builds direct spatial mapping and makes configuring cards intuitive.' },
      { id: 2, top: '80%', left: '50%', problem: 'Category charts were hard to read on mobile screen layouts.', designResponse: 'Segmented progress rings with dynamic visual highlights.', decision: 'Group minor spending categories into a shared other category toggle.', benefit: 'Maximizes graph scanning speeds and reduces visual clutter.' },
    ],
  },
  'coreconfig': {
    beforeWorkflow: { title: 'Fragmented Custom Layouts (Old)', desc: 'Individual product teams styled custom inputs and settings buttons independently, causing styling drift, developer rework, and user errors.' },
    afterWorkflow: { title: 'Tokenized Component Suite (New)', desc: 'Shared design system of 50+ standardized components. Styling updates sync directly from design file variables to code setup parameters.' },
    painPoints: [
      { frustration: 'Styling fragmentation across configuration input forms.', impact: 'Visual inconsistencies and slow, error-prone developer handoff cycles.' },
      { frustration: 'Long, vertical settings pages without structural guidance.', impact: 'Users make setup mistakes, triggering high support ticket rates.' },
    ],
    designFocus: 'Modular Systematics & Handoff Accuracy',
    designPrinciples: ['Systematic reusability: Build modular, flexible components that work across teams.', 'Programmatic token sync: Design tokens scale colors and sizes uniformly.'],
    featuresGrid: [
      { featureName: 'Design Token System', problem: 'Designers and engineers manually coordinate styling dimensions, causing drift.', designResponse: 'Exportable JSON design tokens mapping variables directly to code.', whyMade: 'Eliminates guesswork and guarantees visual consistency across layouts.', finalOutcome: 'Slashed design-to-development setup time by 65%.' },
      { featureName: 'Collapsible Settings Grid', problem: 'Dense configurations result in vertical scrolling fatigue and input errors.', designResponse: 'Reusable accordion modules and segmented setup tabs.', whyMade: 'Presents complex configuration parameters in clean, digestible layouts.', finalOutcome: '30% drop in user layout configuration errors.' },
    ],
    outcomeMetrics: [
      { value: '50+', title: 'Reusable Widgets', desc: 'Standardized components documented and active across teams.' },
      { value: '-65%', title: 'Handoff Duration', desc: 'Accelerated engineer assembly speed for settings pages.' },
      { value: '-30%', title: 'User Setup Errors', desc: 'Simplified layout parameters reduced validation failures.' },
    ],
    takeaways: [
      { letter: 'A', title: 'Unify design tokens early', desc: 'Defining color and spacing parameters together keeps code and design files perfectly synced.' },
      { letter: 'B', title: 'Prioritize settings ergonomics', desc: 'Complex configuration screens require structured grid systems to reduce user cognitive load.' },
    ],
    userFlowSteps: [
      { label: 'Access Config View', type: 'entry', desc: 'Developer or user navigates to settings dashboard to update server routing.', legacyFriction: 'Divergent settings modules styled independently by various teams.', redesignedEase: 'Consistent layouts powered by the shared CoreConfig package.' },
      { label: 'Select Config Block', type: 'action', desc: 'User expands configuration categories to locate advanced server limits.', legacyFriction: 'Scrolling through endless vertical screens with no section divisions.', redesignedEase: 'Collapsible settings grids grouping relevant variables cleanly.' },
      { label: 'Input Param Check', type: 'decision', desc: 'Input custom strings and evaluate real-time validation warnings.', legacyFriction: 'Confusing backend validation messages appearing post form submit.', redesignedEase: 'Instant inline indicators tracking character states as user inputs.' },
      { label: 'Deploy Variable Sync', type: 'outcome', desc: 'Submit configs and watch settings apply across production nodes.', legacyFriction: 'Manual deployment delays and input layout drifts.', redesignedEase: 'Standardized output schema formats reducing configuration errors.' },
    ],
    workflowRoles: [{ role: 'Developer / Engineer', inputs: ['Design specs', 'JSON variables schedules', 'UI token mappings'], processing: ['Assemble forms from CoreConfig components', 'Sync variables parameters', 'Execute UI updates'], dependencies: ['Figma library version consistency'], outputs: ['Consolidated interface pages', 'Zero manual CSS code builds'] }],
    annotatedAreas: [
      { id: 1, top: '30%', left: '30%', problem: 'Form input states look different across teams.', designResponse: 'Standardized design tokens controlling focus rings and borders.', decision: 'Enforce global border color tokens on input focus events.', benefit: 'Ensures standard user feedback patterns and speeds dev implementation.' },
      { id: 2, top: '75%', left: '70%', problem: 'Errors on complex setting strings only show up after clicking submit.', designResponse: 'Inline validation cards matching input fields instantly.', decision: 'Provide dynamic help blocks on active parameter inputs.', benefit: 'Guides users transparently, reducing invalid configurations.' },
    ],
  },
  'lotto-website-design': {
    beforeWorkflow: { title: 'Cluttered & Ad-Heavy (Old)', desc: 'Cluttered, ad-heavy layouts with confusing cart flows. Users struggled to trust the platform or customize ticket parameters easily.' },
    afterWorkflow: { title: 'Credible, Guided Flow (New)', desc: 'Clean whitespace-heavy customizer interface. Step-by-step cart portal, clear visual indicators, and transparent secure paths.' },
    painPoints: [
      { frustration: 'Ad-heavy layouts triggering brand credibility concerns.', impact: 'High bounce rates and cart drop-offs from first-time visitors.' },
      { frustration: 'Small number-picking matrices causing errors on mobile.', impact: 'Frustrated user inputs and wrong numbers selected prior to checkout.' },
    ],
    designFocus: 'Trust & Touch Ergonomics',
    designPrinciples: ['Whitespace first layouts: Clear room around interactions to convey visual safety.', 'Touch-friendly selectors: Increase click target size on numeric selectors.'],
    featuresGrid: [
      { featureName: 'Guided Ticket Customizer', problem: 'Users get overwhelmed choosing numbers and selecting lottery structures.', designResponse: 'Clear numeric grids with manual selection and quick-fill triggers.', whyMade: 'Breaks down checkout configuration decisions into easy visual steps.', finalOutcome: '38% boost in new user checkout conversions.' },
      { featureName: 'Trust-focused Checkout Portal', problem: 'Security features and purchase confirmations feel obscure and hidden.', designResponse: 'Explicit checkout badges, clear terms, and immediate SMS receipts.', whyMade: 'Reduces purchasing anxiety and establishes brand credibility.', finalOutcome: '15% increase in returning mobile customer ticket sales.' },
    ],
    outcomeMetrics: [
      { value: '+38%', title: 'Checkout Conversion', desc: 'More visitors successfully completing the ticket purchase loop.' },
      { value: '+15%', title: 'Customer Return', desc: 'Improved trust leads to repeat visits on mobile devices.' },
      { value: '<60s', title: 'Purchase Journey', desc: 'Users can pick numbers and checkout in less than a minute.' },
    ],
    takeaways: [
      { letter: 'A', title: 'Simplify the visual noise', desc: 'Lottery sites build trust by looking clean and transparent, not by displaying flashing banners.' },
      { letter: 'B', title: 'Design for mobile thumbs', desc: 'Compact numeric inputs must have generous padding to prevent mis-clicks.' },
    ],
    userFlowSteps: [
      { label: 'Land on Site', type: 'entry', desc: 'New customer enters the landing page and chooses a jackpot game.', legacyFriction: 'Spammy advertisements flashing alongside complex schedules.', redesignedEase: 'Clean layout framing jackpot options with direct visual guides.' },
      { label: 'Pick Numbers', type: 'action', desc: 'User interacts with the number matrix to pick their custom lottery set.', legacyFriction: 'Tiny buttons that make selecting specific numbers on mobile painful.', redesignedEase: 'Generous click targets with dynamic color feedback.' },
      { label: 'Review Cart', type: 'decision', desc: 'Verify chosen numbers and select quick-add multipliers.', legacyFriction: 'Hidden fees and obscure checkout paths raising alarm signals.', redesignedEase: 'Transparent summary showing fees, odds, and returns plainly.' },
      { label: 'Transaction Complete', type: 'outcome', desc: 'Confirm secure payment and receive immediate digital transaction receipt.', legacyFriction: 'Unconfirmed payment screens leaving users worried.', redesignedEase: 'Instant receipt confirmation backed by SMS notification.' },
    ],
    workflowRoles: [{ role: 'Lotto Participant', inputs: ['Target ticket specifications', 'Preferred numbers', 'Payment details'], processing: ['Interactive matrix selections', 'Purchase terms audit', 'Checkout execution'], dependencies: ['Secure payment gateway connectivity'], outputs: ['Registered ticket number', 'Verified digital payment receipts'] }],
    annotatedAreas: [
      { id: 1, top: '40%', left: '50%', problem: 'Choosing ticket numbers was confusing and time-consuming.', designResponse: 'Large interactive grids with direct quick-pick automation.', decision: 'Introduce rapid randomizer helpers to allow single-click picks.', benefit: 'Reduces setup time and helps undecided users check out.' },
      { id: 2, top: '85%', left: '30%', problem: 'Users worried about whether ticket bookings were authentic.', designResponse: 'Explicit trust badges and instant confirmation details.', decision: 'Render compliance notices and guarantees directly in checkout cards.', benefit: 'Establishes credibility, boosting successful transaction conversions.' },
    ],
  },
  'tharra': {
    beforeWorkflow: { title: 'Flat, Catalog Layouts (Old)', desc: 'Standard landing pages treated premium craft bottles as simple database items, failing to convey spirits heritage or craftsmanship.' },
    afterWorkflow: { title: 'Cinematic Narrative Scroll (New)', desc: 'Immersive, storytelling layouts utilizing smooth parallax scroll transitions, ingredient highlights, and rich visual presentation details.' },
    painPoints: [
      { frustration: 'Generic, flat interfaces failing to convey premium craft stories.', impact: 'High bounce rates as premium users fail to connect with the brand.' },
      { frustration: 'Large lifestyle imagery causing page layout slowdowns.', impact: 'Lagging scroll performance ruins the fluid, premium user experience.' },
    ],
    designFocus: 'Tactile Brand Storytelling',
    designPrinciples: ['Serif typography & spacing: Editorial styling that echoes luxury print layouts.', 'Parallax visual layers: Depth animations highlighting physical bottle elements.'],
    featuresGrid: [
      { featureName: 'Narrative Scroll Journey', problem: 'Standard layouts fail to showcase the craftsmanship of the bottles.', designResponse: 'Immersive scroll pathways highlighting history, ingredients, and design.', whyMade: 'Engages visitors emotionally by mimicking a high-end physical editorial.', finalOutcome: '2.5x increase in active session time on brand pages.' },
      { featureName: 'Optimized Media Pipeline', problem: 'Rich visual files cause slow loads and page scroll stutter.', designResponse: 'Next-gen WebP compression coupled with lazy-rendered scroll containers.', whyMade: 'Ensures the visual-heavy experience remains buttery smooth.', finalOutcome: '42% reduction in website bounce rates.' },
    ],
    outcomeMetrics: [
      { value: '-42%', title: 'Bounce Rate', desc: 'Slashed website bounce rates with immersive visual storytelling.' },
      { value: '2.5x', title: 'Session Time', desc: 'Increased time spent on the brand origin page.' },
      { value: 'Premium', title: 'Brand Perception', desc: 'Successfully elevated the premium online presence.' },
    ],
    takeaways: [
      { letter: 'A', title: 'Visual-first storytelling sells brands', desc: 'High-end products need environments that reflect their quality, not just show their features.' },
      { letter: 'B', title: 'Performance is part of the experience', desc: 'A laggy premium site destroys the luxury illusion. Media optimization is non-negotiable.' },
    ],
    userFlowSteps: [
      { label: 'Brand Discovery', type: 'entry', desc: 'Visitor lands on the homepage immersed in cinematic full-screen visual.', legacyFriction: 'Generic landing page with no emotional connection.', redesignedEase: 'Full-bleed hero with parallax animation setting the tone immediately.' },
      { label: 'Explore Story', type: 'action', desc: 'User scrolls through narrative sections about origin, ingredients, and craft.', legacyFriction: 'Plain text paragraphs about the distillery with no visual support.', redesignedEase: 'Staggered reveal animations timed to scroll progression.' },
      { label: 'Select Bottle Model', type: 'decision', desc: 'User decides to explore detailed flavor profiles and batch specs.', legacyFriction: 'Opening new tabs that break the immersive editorial connection.', redesignedEase: 'Fluid modal overlay showing craft timelines and local availability.' },
      { label: 'Locate Retailer', type: 'outcome', desc: 'User matches local craft retailers and plans physical collection.', legacyFriction: 'Entering search parameters on generic map widgets.', redesignedEase: 'One-tap locator matching current location data instantly.' },
    ],
    workflowRoles: [{ role: 'Site Visitor', inputs: ['Interactive browser screen', 'Location data preferences'], processing: ['Engaging with scroll timelines', 'Selecting flavor profiles', 'Querying local stock lists'], dependencies: ['Browser rendering capability', 'High-resolution asset load speeds'], outputs: ['Interactive session logs', 'Retailer search choices'] }],
    annotatedAreas: [
      { id: 1, top: '25%', left: '25%', problem: 'Standard headers failed to capture the luxury branding style.', designResponse: 'Large serif typography with generous whitespace boundaries.', decision: 'Utilize high-contrast spacing layouts and dynamic font sizing rules.', benefit: 'Conveys premium editorial styling, immediately capturing interest.' },
      { id: 2, top: '65%', left: '75%', problem: "Static images didn't convey physical glass craftsmanship.", designResponse: 'Layered bottle mockups reacting to scroll offsets.', decision: 'Build parallax scroll groups mapping position to CSS animations.', benefit: 'Creates tactile sensory feedback, making the design feel interactive.' },
    ],
  },
};

const getProjectStory = (project: Project): ProjectStory => {
  if (PROJECT_STORY_DATA[project.id]) return PROJECT_STORY_DATA[project.id];
  const cs = project.caseStudy;
  return {
    beforeWorkflow: { title: 'Existing Process (Before)', desc: cs.problem.body || 'Fragmented workflows and manual tasks occupied hours of daily work.' },
    afterWorkflow: { title: 'Optimized System (After)', desc: cs.uxProcess.body || 'Simplified layouts and unified specifications reduced operations friction.' },
    painPoints: [
      { frustration: cs.problem.heading || 'Manual coordination issues.', impact: cs.problem.body || 'Increased errors and layout delays.' },
      { frustration: 'Styling and layout fragmentation.', impact: 'Slower development speeds and visual inconsistencies.' },
    ],
    designFocus: 'Cohesive Layout & Clarity',
    designPrinciples: [cs.uiDesign.heading || 'Sensory Hierarchy UI Design', cs.designSystem.heading || 'Data-Dense Design Foundations'],
    featuresGrid: [
      { featureName: cs.uxProcess.heading || 'User Journey', problem: 'Lack of unified structural flow.', designResponse: cs.uxProcess.body || 'Created step-by-step custom layout.', whyMade: 'Guides users transparently through complex tasks.', finalOutcome: 'Higher conversion and alignment.' },
      { featureName: cs.uiDesign.heading || 'Visual Hierarchy', problem: 'Overwhelming interface information and cluttered fields.', designResponse: cs.uiDesign.body || 'Clean borders and consistent status indicators.', whyMade: 'Reduces user cognitive load.', finalOutcome: cs.outcome.body || 'Improved operational tracking.' },
    ],
    outcomeMetrics: (cs.outcome.bullets && cs.outcome.bullets.length >= 3) ? [
      { value: cs.outcome.bullets[0].split(' ')[0] || 'Clean', title: 'Outcome 01', desc: cs.outcome.bullets[0] },
      { value: cs.outcome.bullets[1].split(' ')[0] || 'Fast', title: 'Outcome 02', desc: cs.outcome.bullets[1] },
      { value: cs.outcome.bullets[2].split(' ')[0] || 'Sync', title: 'Outcome 03', desc: cs.outcome.bullets[2] },
    ] : [
      { value: '30%', title: 'Efficiency Gain', desc: 'Faster output completion.' },
      { value: 'Real-time', title: 'Visual Sync', desc: 'Eliminated manual status lags.' },
      { value: '99%', title: 'Accuracy Rate', desc: 'Reduced setup errors.' },
    ],
    takeaways: [
      { letter: 'A', title: 'Collaborate and align early', desc: 'Engage stakeholders early to define parameters and layout targets.' },
      { letter: 'B', title: 'Optimize for responsive screens', desc: 'Provide adaptive grids that work seamlessly on both mobile and wider views.' },
    ],
    userFlowSteps: [
      { label: 'Entry Point', type: 'entry', desc: 'User logs in and locates primary operational targets.', legacyFriction: 'Slow lookup speeds and cluttered dashboard navigation paths.', redesignedEase: 'Tailored dynamic dashboard sections prioritizing workflows.' },
      { label: 'Trigger Action', type: 'action', desc: 'User executes key operational update checks.', legacyFriction: 'Manual tracking forms requiring secondary confirmation.', redesignedEase: 'Inline verification alerts guiding user inputs.' },
      { label: 'Approve Parameter', type: 'decision', desc: 'Review inputs and confirm variable adjustments.', legacyFriction: 'Slow feedback loops and high correction workloads.', redesignedEase: 'Automated warnings showing validation results instantly.' },
      { label: 'Workflow Success', type: 'outcome', desc: 'Confirm details and update local system records.', legacyFriction: 'Delayed database sync causing visual drift.', redesignedEase: 'Instant background uploads ensuring live updates.' },
    ],
    workflowRoles: [{ role: 'Standard User', inputs: ['Raw task parameters', 'Assigned checklists'], processing: ['Audit form parameters', 'Validate compliance checks'], dependencies: ['System status sync'], outputs: ['Verified task schedules'] }],
    annotatedAreas: [{ id: 1, top: '30%', left: '40%', problem: 'Key task details were hard to scan.', designResponse: 'Clear visual status badges placed alongside identifiers.', decision: 'Emphasize primary details with bold typographic layouts.', benefit: 'Speeds tracking and reduces cognitive fatigue.' }],
  };
};

// ─────────────────────────────────────────
// 4. Animation Variants
// ─────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.28, ease: [0, 0, 0.2, 1] as const } },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] as const } }),
};

// ─────────────────────────────────────────
// 5. Shared Primitives
// ─────────────────────────────────────────

function SectionLabel({ number, text, color = 'primary' }: { number: string; text: string; color?: 'primary'|'red'|'amber'|'green'|'purple' }) {
  const colorMap: Record<string, string> = { primary: 'text-[var(--primary)] bg-[var(--primary-subtle)]', red: 'text-red-600 bg-red-50', amber: 'text-amber-600 bg-amber-50', green: 'text-emerald-600 bg-emerald-50', purple: 'text-purple-600 bg-purple-50' };
  return <span className={cn('text-xs uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full w-fit', colorMap[color])}>{number} / {text}</span>;
}

function tcls(type: UserFlowStep['type']): string {
  const m: Record<string, string> = { entry: 'bg-blue-50 text-blue-700 border border-blue-100', action: 'bg-purple-50 text-purple-700 border border-purple-100', decision: 'bg-amber-50 text-amber-700 border border-amber-200', outcome: 'bg-emerald-50 text-emerald-700 border border-emerald-100' };
  return m[type] ?? '';
}

// ─────────────────────────────────────────
// 6. Slide Components
// ─────────────────────────────────────────

function SlideCover({ project, mockups }: SlideProps) {
  return (
    <div className="h-full flex flex-col md:flex-row">
      <div className="w-full md:w-[42%] flex flex-col justify-center px-10 md:px-14 lg:px-20 py-10 gap-6 bg-[var(--surface)]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs uppercase tracking-[0.18em] font-semibold text-[var(--primary)] px-3 py-1 bg-[var(--primary-subtle)] rounded-full">{project.category}</span>
            <span className="text-xs uppercase tracking-[0.18em] font-semibold text-[var(--text-tertiary)] px-3 py-1 bg-[var(--surface-secondary)] rounded-full border border-[var(--border-primary)]">{project.industry}</span>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-[var(--text-primary)] leading-[1.05] tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>{project.title}</h1>
            <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed max-w-sm font-medium">{project.shortDescription}</p>
          </div>
        </div>
        <div className="pt-6 border-t border-[var(--border-secondary)] flex flex-col gap-3.5">
          {[{ Icon: Calendar, label: 'Timeline', value: project.timeline }, { Icon: Users, label: 'Team', value: project.team }, { Icon: Briefcase, label: 'Role', value: project.role }, { Icon: Globe, label: 'Platform', value: project.platform }].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-sm">
              <item.Icon className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
              <span className="text-[var(--text-tertiary)] font-medium w-16 shrink-0">{item.label}</span>
              <span className="font-semibold text-[var(--text-primary)]">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full md:w-[58%] relative min-h-[40vh] md:min-h-0 bg-[var(--surface-secondary)]">
        <Image src={mockups.heroImage} alt={`${project.title} — hero`} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 58vw" />
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[var(--surface)] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

function SlideContext({ project, mockups }: SlideProps) {
  const cs = project.caseStudy;
  return (
    <div className="h-full flex flex-col md:flex-row">
      <div className="w-full md:w-[45%] flex flex-col justify-center px-10 md:px-14 lg:px-20 py-10 gap-6">
        <div className="flex flex-col gap-5">
          <SectionLabel number="02" text="Context" />
          <h2 className="text-3xl md:text-4xl font-semibold font-heading text-[var(--text-primary)] leading-tight">What is {project.title}?</h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">{cs.overview.body}</p>
        </div>
        <div className="flex flex-wrap gap-2">{project.tags.map((tag, i) => <span key={i} className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-secondary)] text-[var(--text-secondary)]">{tag}</span>)}</div>
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[var(--border-secondary)]">
          {[{ label: 'Industry', value: project.industry }, { label: 'Platform', value: project.platform }, { label: 'Timeline', value: project.timeline }].map((item, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-[9px] uppercase tracking-widest font-semibold text-[var(--text-tertiary)]">{item.label}</span>
              <span className="text-sm font-semibold text-[var(--text-primary)]">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full md:w-[55%] h-full flex items-center justify-center bg-[var(--surface-secondary)] p-6 md:p-10">
        <div className="relative w-full max-w-2xl aspect-[16/10] rounded-2xl overflow-hidden border border-[var(--border-secondary)] shadow-lg">
          <Image src={mockups.heroImage} alt={`${project.title} context`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 55vw" />
        </div>
      </div>
    </div>
  );
}

function SlideProblem({ project, story, mockups }: SlideProps) {
  const cs = project.caseStudy;
  return (
    <div className="h-full flex flex-col md:flex-row">
      <div className="w-full md:w-[50%] flex flex-col justify-center px-10 md:px-14 lg:px-20 py-10 gap-6">
        <div className="flex flex-col gap-6">
          <SectionLabel number="03" text="The Problem" color="red" />
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold font-heading text-[var(--text-primary)] leading-tight">"{cs.problem.heading}"</h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">{cs.problem.body}</p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-widest font-semibold text-red-600">Resulting Problems</p>
          <div className="flex flex-col gap-2.5">
            {story.painPoints.map((pp, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-red-50 border border-red-100">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span className="text-sm text-red-700 font-medium leading-relaxed">{pp.frustration}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
      <div className="w-full md:w-[50%] relative min-h-[40vh] md:min-h-0 bg-[var(--surface-secondary)]">
        <Image src={mockups.problemImage} alt="problem visualization" fill className="object-cover grayscale opacity-70" sizes="50vw" />
        <div className="absolute inset-0 bg-red-900/10 mix-blend-multiply pointer-events-none" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-red-100 shadow-lg">
            <p className="text-xs uppercase tracking-widest font-semibold text-red-600 mb-1">Before Redesign</p>
            <p className="text-sm text-[var(--text-secondary)] font-medium leading-relaxed">{story.beforeWorkflow.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlidePainPoints({ story, mockups }: SlideProps) {
  return (
    <div className="h-full flex flex-col md:flex-row">
      <div className="w-full md:w-[48%] flex flex-col justify-center px-10 md:px-14 lg:px-20 py-10 gap-6">
        <div className="flex flex-col gap-3">
          <SectionLabel number="04" text="User Pain Points" color="red" />
          <h2 className="text-3xl md:text-4xl font-semibold font-heading text-[var(--text-primary)] leading-tight">Core friction points</h2>
        </div>
        <div className="flex flex-col gap-4">
          {story.painPoints.map((pp, i) => (
            <div key={i} className="flex gap-4 p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-primary)] shadow-xs hover:shadow-sm transition-shadow">
              <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 font-semibold font-mono text-sm flex items-center justify-center shrink-0">{String(i + 1).padStart(2, '0')}</div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold text-[var(--text-primary)] leading-snug">{pp.frustration}</p>
                <div className="flex items-start gap-1.5">
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-red-500 mt-0.5 shrink-0">Impact</span>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{pp.impact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 pt-4 border-t border-[var(--border-secondary)]">
          <p className="text-xs uppercase tracking-widest font-semibold text-[var(--text-tertiary)]">Design Focus</p>
          <p className="text-base font-semibold text-[var(--primary)]">{story.designFocus}</p>
        </div>
      </div>
      <div className="w-full md:w-[52%] relative min-h-[40vh] md:min-h-0 bg-[var(--surface-secondary)]">
        <Image src={mockups.painPointImage} alt="Pain point visualization" fill className="object-cover" sizes="52vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

function SlideWorkflow({ story }: SlideProps) {
  return (
    <div className="h-full flex flex-col px-10 md:px-14 lg:px-20 py-10 gap-6">
      <div className="flex flex-col gap-3">
        <SectionLabel number="05" text="Current Workflow" color="amber" />
        <h2 className="text-3xl md:text-4xl font-semibold font-heading text-[var(--text-primary)] leading-tight">How it worked before</h2>
        <p className="text-base text-[var(--text-secondary)] max-w-2xl">{story.beforeWorkflow.desc}</p>
      </div>
      <div className="flex-1 flex flex-col md:flex-row gap-3 items-stretch overflow-hidden pb-2">
        {story.userFlowSteps.map((step, idx) => (
          <React.Fragment key={idx}>
            {/* Card */}
            <div key={`card-${idx}`} className="flex-1 min-w-[180px] flex flex-col gap-3 bg-[var(--surface-elevated)] border border-[var(--border-secondary)] rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between gap-2">
                <span className={cn('text-[9px] font-mono font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full', tcls(step.type))}>{step.type}</span>
                <span className="text-[9px] font-mono text-[var(--text-tertiary)]">0{idx + 1}</span>
              </div>
              <div>
                <h5 className="text-sm font-semibold text-[var(--text-primary)]">{step.label}</h5>
                <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">{step.desc}</p>
              </div>
              {step.legacyFriction && (
                <div className="mt-auto pt-3 border-t border-red-100 bg-red-50/60 -mx-5 -mb-5 px-4 py-3 rounded-b-2xl">
                  <span className="text-[8px] font-semibold uppercase tracking-wider text-red-500 block mb-0.5">Friction</span>
                  <p className="text-xs text-red-700 leading-relaxed">{step.legacyFriction}</p>
                </div>
              )}
            </div>
            {/* Arrow between cards */}
            {idx < story.userFlowSteps.length - 1 && (
              <div key={`arrow-${idx}`} className="hidden md:flex items-center justify-center shrink-0 self-center w-8">
                <div className="w-6 h-6 rounded-full border border-[var(--border-secondary)] bg-[var(--surface)] flex items-center justify-center shadow-xs">
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

    </div>
  );
}


function SlideUserFlow({ story }: SlideProps) {
  return (
    <div className="h-full flex flex-col px-10 md:px-14 lg:px-20 py-10 gap-6">
      <div className="flex flex-col gap-3">
        <SectionLabel number="06" text="User Flow" />
        <h2 className="text-3xl md:text-4xl font-semibold font-heading text-[var(--text-primary)] leading-tight">The redesigned experience</h2>
        <p className="text-sm text-[var(--text-secondary)] max-w-2xl">{story.afterWorkflow.desc}</p>
      </div>
      <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-0 items-stretch overflow-hidden pb-2">
        {story.userFlowSteps.map((step, idx) => (
          <div key={idx} className="flex md:flex-col items-stretch gap-0 flex-1 min-w-[180px]">
            <div className="flex-1 flex flex-col gap-3 p-5 bg-[var(--surface-elevated)] border border-[var(--border-secondary)] md:rounded-none first:rounded-t-2xl last:rounded-b-2xl md:first:rounded-l-2xl md:last:rounded-r-2xl shadow-xs">
              <span className={cn('text-[9px] font-mono font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full w-fit', tcls(step.type))}>{step.type}</span>
              <div>
                <h5 className="text-sm font-semibold text-[var(--text-primary)]">{step.label}</h5>
                <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">{step.desc}</p>
              </div>
              {step.redesignedEase && (
                <div className="mt-auto pt-3 border-t border-emerald-100 bg-emerald-50/60 -mx-5 -mb-5 px-4 py-3 rounded-b-2xl">
                  <span className="text-[8px] font-semibold uppercase tracking-wider text-emerald-600 block mb-0.5">Improvement</span>
                  <p className="text-xs text-emerald-800 leading-relaxed">{step.redesignedEase}</p>
                </div>
              )}
            </div>
            {idx < story.userFlowSteps.length - 1 && (
              <div className="hidden md:flex items-center justify-center w-8 shrink-0 self-center">
                <ChevronRight className="w-4 h-4 text-[var(--text-tertiary)]" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideExploration({ project, mockups }: SlideProps) {
  const cs = project.caseStudy;
  const explorations = [
    { label: 'Exploration 01', subtitle: 'Initial Wireframes', image: mockups.wireframeImage, note: 'What we explored', desc: cs.research.body.slice(0, 100) + '\u2026', className: 'grayscale opacity-80' },
    { label: 'Exploration 02', subtitle: 'Refined Direction', image: mockups.problemImage, note: 'What we refined', desc: cs.uxProcess.body.slice(0, 100) + '\u2026', className: '[filter:grayscale(50%)]' },
    { label: 'Final Direction', subtitle: 'Production-Ready UI', image: mockups.solutionScreen01, note: 'Why this worked', desc: cs.uiDesign.body.slice(0, 100) + '\u2026', className: '' },
  ];
  return (
    <div className="h-full flex flex-col px-10 md:px-14 lg:px-20 py-10 gap-6">
      <div className="flex flex-col gap-3">
        <SectionLabel number="07" text="Design Exploration" />
        <h2 className="text-3xl md:text-4xl font-semibold font-heading text-[var(--text-primary)] leading-tight">How we arrived at the solution</h2>
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-5">
        {explorations.map((exp, i) => (
          <div key={i} className="flex flex-col gap-3">
            <div className="relative flex-1 min-h-[120px] rounded-2xl overflow-hidden border border-[var(--border-secondary)] bg-[var(--surface-secondary)]">
              <Image src={exp.image} alt={exp.label} fill className={cn('object-cover', exp.className)} sizes="33vw" />
              <div className="absolute top-3 left-3">
                <span className={cn('text-[9px] font-mono font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full', i === 2 ? 'bg-[var(--primary)] text-white' : 'bg-white/80 text-[var(--text-secondary)]')}>{exp.label}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-xs font-semibold text-[var(--text-primary)]">{exp.subtitle}</p>
              <p className="text-xs uppercase tracking-wider font-semibold text-[var(--text-tertiary)]">{exp.note}</p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{exp.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideSolution({ project, story, mockups }: SlideProps) {
  const cs = project.caseStudy;
  return (
    <div className="h-full flex flex-col md:flex-row">
      <div className="w-full md:w-[35%] flex flex-col justify-center px-10 md:px-14 lg:px-16 py-10 gap-6 bg-[var(--surface)]">
        <div className="flex flex-col gap-6">
          <SectionLabel number="08" text="The Solution" />
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading text-[var(--text-primary)] leading-[1.05] tracking-tight">The Solution</h2>
            <div className="w-12 h-0.5 bg-[var(--primary)]" />
          </div>
          <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">{cs.uiDesign.body}</p>
        </div>
        <div className="flex flex-col gap-3">
          {story.designPrinciples.slice(0, 2).map((p, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{p}</p>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t border-[var(--border-secondary)]">
          <p className="text-[9px] uppercase tracking-widest font-semibold text-[var(--text-tertiary)] mb-2">Redesigned Approach</p>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{story.afterWorkflow.desc}</p>
        </div>
      </div>
      <div className="w-full md:w-[65%] relative min-h-[40vh] md:min-h-0 bg-[var(--surface-secondary)]">
        <Image src={mockups.solutionScreen01} alt={`${project.title} — solution`} fill className="object-cover" sizes="65vw" />
      </div>
    </div>
  );
}

function SlideFeatureDeepDive({ project, story, mockups, featureIndex }: SlideProps & { featureIndex: number }) {
  const feature = story.featuresGrid[featureIndex];
  if (!feature) return null;
  const slideNum = featureIndex === 0 ? '10' : '11';
  const image = featureIndex === 0 ? mockups.solutionScreen01 : mockups.solutionScreen02;
  return (
    <div className="h-full flex flex-col md:flex-row">
      <div className="w-full md:w-[36%] flex flex-col justify-center px-10 md:px-14 lg:px-16 py-10 gap-6">
        <div className="flex flex-col gap-5">
          <SectionLabel number={slideNum} text="Feature Deep Dive" />
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-semibold font-mono text-[var(--primary)]/20">{String(featureIndex + 1).padStart(2, '0')}</span>
            <h2 className="text-2xl md:text-3xl font-semibold font-heading text-[var(--text-primary)] leading-tight">{feature.featureName}</h2>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {[{ label: 'Problem', text: feature.problem, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' }, { label: 'Design Decision', text: feature.designResponse, color: 'text-[var(--primary)]', bg: 'bg-[var(--primary-subtle)]', border: 'border-[var(--primary)]/10' }, { label: 'Rationale', text: feature.whyMade, color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-100' }, { label: 'Outcome', text: feature.finalOutcome, color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-100' }].map((item, i) => (
            <div key={i} className={cn('p-4 rounded-xl border', item.bg, item.border)}>
              <p className={cn('text-[9px] uppercase tracking-widest font-semibold mb-1.5', item.color)}>{item.label}</p>
              <p className="text-sm text-[var(--text-primary)] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full md:w-[64%] relative min-h-[40vh] md:min-h-0 bg-[var(--surface-secondary)]">
        <Image src={image} alt={`${feature.featureName} — feature screen`} fill className="object-cover" sizes="64vw" />
      </div>
    </div>
  );
}

function SlideAnnotatedScreens({ project, story, mockups }: SlideProps) {
  const [selectedId, setSelectedId] = useState<number>(story.annotatedAreas[0]?.id ?? 1);
  const active = story.annotatedAreas.find((a) => a.id === selectedId) ?? story.annotatedAreas[0];
  return (
    <div className="h-full flex flex-col md:flex-row">
      <div className="flex-1 relative min-h-[40vh] bg-[var(--surface-secondary)] flex items-center justify-center p-6 md:p-10">
        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[var(--border-secondary)] shadow-lg">
          <Image src={mockups.annotatedScreen01} alt={`${project.title} — annotated screen`} fill className="object-cover" sizes="65vw" />
          {story.annotatedAreas.map((ann) => (
            <button key={ann.id} type="button" onClick={() => setSelectedId(ann.id)} className={cn('absolute w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold font-mono shadow-lg transition-all -translate-x-1/2 -translate-y-1/2 border-2', selectedId === ann.id ? 'bg-[var(--primary)] text-white border-white scale-110 ring-4 ring-[var(--primary)]/30' : 'bg-white text-[var(--text-primary)] border-[var(--border-secondary)] hover:scale-105 hover:border-[var(--primary)]')} style={{ top: ann.top, left: ann.left }}>{ann.id}</button>
          ))}
        </div>
      </div>
      <div className="w-full md:w-[300px] lg:w-[340px] flex flex-col justify-between px-6 py-8 border-t md:border-t-0 md:border-l border-[var(--border-primary)] bg-[var(--surface-elevated)]">
        <div className="flex flex-col gap-2 mb-4">
          <SectionLabel number="11" text="Annotated Screens" />
          <h3 className="text-xl font-semibold font-heading text-[var(--text-primary)]">UI Annotation</h3>
          <p className="text-xs text-[var(--text-secondary)]">Click a hotspot to view details</p>
        </div>
        {active && (
          <div className="flex-1 flex flex-col gap-5 overflow-hidden">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[var(--border-primary)]">
              <span className="w-7 h-7 rounded-full bg-[var(--primary)] text-white text-xs font-semibold flex items-center justify-center">{active.id}</span>
              <span className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">Annotation {active.id}</span>
            </div>
            {[{ label: 'Problem', text: active.problem, color: 'text-red-600' }, { label: 'Design Response', text: active.designResponse, color: 'text-[var(--primary)]' }, { label: 'Decision', text: active.decision, color: 'text-amber-600' }, { label: 'Benefit', text: active.benefit, color: 'text-emerald-600' }].map((item, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className={cn('text-[8px] font-mono font-semibold uppercase tracking-widest', item.color)}>{item.label}</span>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2 mt-4 flex-wrap">
          {story.annotatedAreas.map((ann) => (
            <button key={ann.id} type="button" onClick={() => setSelectedId(ann.id)} className={cn('w-8 h-8 rounded-lg text-xs font-semibold font-mono transition-all', selectedId === ann.id ? 'bg-[var(--primary)] text-white' : 'bg-[var(--surface)] border border-[var(--border-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]')}>{ann.id}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideBeforeAfter({ project, story, mockups }: SlideProps) {
  return (
    <div className="h-full flex flex-col px-10 md:px-14 lg:px-20 py-10 gap-6">
      <div className="flex flex-col gap-3">
        <SectionLabel number="12" text="Before & After" />
        <h2 className="text-3xl md:text-4xl font-semibold font-heading text-[var(--text-primary)] leading-tight">The transformation</h2>
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-3 min-h-0">
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500" /><span className="text-xs font-semibold uppercase tracking-widest text-red-600">Before</span></div>
          <div className="flex-1 relative rounded-2xl overflow-hidden border-2 border-red-200 bg-[var(--surface-secondary)]">
            <Image src={mockups.beforeImage} alt="Before redesign" fill className="object-cover grayscale opacity-80" sizes="50vw" />
            <div className="absolute inset-0 bg-red-900/10 mix-blend-multiply pointer-events-none" />
            {story.painPoints.slice(0, 2).map((pp, i) => (
              <div key={i} className="absolute bg-red-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg" style={{ top: `${25 + i * 35}%`, left: '10%' }}>&times; {pp.frustration.slice(0, 30)}&hellip;</div>
            ))}
          </div>
          <p className="text-sm text-[var(--text-secondary)] font-medium">{story.beforeWorkflow.desc.slice(0, 100)}&hellip;</p>
        </div>
        <div className="flex flex-col gap-3 min-h-0">
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500" /><span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">After</span></div>
          <div className="flex-1 relative rounded-2xl overflow-hidden border-2 border-emerald-300 bg-[var(--surface-secondary)] shadow-md">
            <Image src={mockups.afterImage} alt="After redesign" fill className="object-cover" sizes="50vw" />
            {story.outcomeMetrics.slice(0, 2).map((kpi, i) => (
              <div key={i} className="absolute bg-emerald-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg" style={{ top: `${25 + i * 35}%`, right: '10%' }}>&checkmark; {kpi.title}: {kpi.value}</div>
            ))}
          </div>
          <p className="text-sm text-[var(--text-secondary)] font-medium">{story.afterWorkflow.desc.slice(0, 100)}&hellip;</p>
        </div>
      </div>
    </div>
  );
}

function SlideSystemThinking({ project, mockups }: SlideProps) {
  const cs = project.caseStudy;
  return (
    <div className="h-full flex flex-col md:flex-row">
      <div className="w-full md:w-[42%] flex flex-col justify-center px-10 md:px-14 lg:px-16 py-10 gap-6">
        <div className="flex flex-col gap-4">
          <SectionLabel number="12" text="System Thinking" color="purple" />
          <h2 className="text-3xl md:text-4xl font-semibold font-heading text-[var(--text-primary)] leading-tight">{cs.designSystem.heading}</h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">{cs.designSystem.body}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[{ label: 'Components', icon: '\u25C6' }, { label: 'Tokens', icon: '\u25CF' }, { label: 'Patterns', icon: '\u25C8' }, { label: 'Relationships', icon: '\u25C9' }].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-secondary)] shadow-xs">
              <span className="text-[var(--primary)] text-base">{item.icon}</span>
              <span className="text-sm font-semibold text-[var(--text-primary)]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full md:w-[58%] relative min-h-[40vh] md:min-h-0 bg-[var(--surface-secondary)] p-6 md:p-10 flex items-center justify-center">
        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[var(--border-secondary)] shadow-lg">
          <Image src={mockups.solutionScreen02} alt={`${project.title} — design system`} fill className="object-cover" sizes="58vw" />
        </div>
      </div>
    </div>
  );
}

function SlideImpact({ project, story, mockups }: SlideProps) {
  const cs = project.caseStudy;
  return (
    <div className="h-full flex flex-col px-10 md:px-14 lg:px-20 py-10 gap-6">
      <div className="flex flex-col gap-3">
        <SectionLabel number="13" text="Impact" color="green" />
        <h2 className="text-3xl md:text-4xl font-semibold font-heading text-[var(--text-primary)] leading-tight">{cs.outcome.heading}</h2>
        <p className="text-base text-[var(--text-secondary)] max-w-2xl">{cs.outcome.body}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {story.outcomeMetrics.map((kpi, idx) => (
          <div key={idx} className="flex flex-col gap-3 p-6 rounded-2xl bg-gradient-to-b from-emerald-50 to-[var(--surface-elevated)] border border-emerald-200 shadow-xs">
            <span className="text-4xl md:text-5xl font-extrabold font-heading text-emerald-600 leading-none tracking-tight">{kpi.value}</span>
            <div className="flex flex-col gap-1">
              <h4 className="text-base font-semibold text-[var(--text-primary)]">{kpi.title}</h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{kpi.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 relative min-h-[80px] rounded-2xl overflow-hidden border border-[var(--border-secondary)] bg-[var(--surface-secondary)]">
        <Image src={mockups.impactImage} alt={`${project.title} — impact`} fill className="object-cover opacity-80" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-transparent pointer-events-none" />
        {cs.outcome.bullets && (
          <div className="absolute bottom-4 left-6 right-6 flex gap-3 flex-wrap">
            {cs.outcome.bullets.map((bullet, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-emerald-100">
                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                <span className="text-xs font-semibold text-[var(--text-primary)]">{bullet}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SlideLearnings({ project, story, onClose }: SlideProps & { onClose: () => void }) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-10 md:px-14 lg:px-20 py-10 gap-5">
      <div className="flex flex-col items-center gap-4 text-center">
        <SectionLabel number="14" text="Key Learnings" color="purple" />
        <h2 className="text-3xl md:text-4xl font-semibold font-heading text-[var(--text-primary)] leading-tight">What this project taught me</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-4xl">
        {story.takeaways.map((takeaway, i) => (
          <div key={i} className="flex flex-col gap-4 p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-primary)] shadow-xs">
            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 font-semibold text-lg flex items-center justify-center font-mono">{String(i + 1).padStart(2, '0')}</div>
            <div className="flex flex-col gap-2">
              <h4 className="text-base font-semibold text-[var(--text-primary)] font-heading">{takeaway.title}</h4>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{takeaway.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center gap-4 text-center mt-2">
        <p className="text-xl md:text-2xl font-semibold text-[var(--text-primary)] font-heading italic">Thanks for exploring.</p>
        <p className="text-sm text-[var(--text-secondary)]">{project.title} &middot; {project.role}</p>
        <button type="button" onClick={onClose} className="flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:underline mt-2 transition-colors cursor-pointer">
          <ArrowUpRight className="w-4 h-4" />Back to Projects
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// Observance Custom Slides
// ─────────────────────────────────────────

function SlideObsLogo() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[var(--bg-primary)]">
      <div className="relative w-72 md:w-96 h-24 md:h-32">
        <Image 
          src="/images/projects/observance-logo.png"
          alt="Observance Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}

function SlideObsCover({ project }: any) {
  const data = project.customObservanceStory.overview;
  return (
    <div className="w-full h-full flex flex-col lg:flex-row bg-[var(--bg-primary)] overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-[var(--border-secondary)] bg-[size:32px_32px] opacity-20 pointer-events-none z-0" />
      
      {/* Left Text Panel */}
      <div className="w-full lg:w-[45%] p-8 lg:p-12 xl:p-16 flex flex-col justify-center relative z-10 min-h-0 lg:min-h-full shrink-0">
        <div className="max-w-xl">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight text-[var(--text-primary)] mb-6 font-heading leading-tight">
            {data.title.split('—')[0].trim()}
            <span className="block text-[var(--text-tertiary)] text-2xl lg:text-3xl mt-3 font-normal">{data.title.split('—')[1]?.trim()}</span>
          </h1>
          <p className="text-lg lg:text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
            {data.subtitle}
          </p>
          {data.metadata && (
            <p className="text-xs font-semibold text-[var(--text-tertiary)] tracking-widest uppercase">
              {data.metadata}
            </p>
          )}
        </div>
      </div>
      
      {/* Right Image Panel */}
      <div className="w-full lg:w-[55%] flex-1 lg:h-full flex items-center justify-center relative z-10 pl-8 lg:pl-0 pt-0 lg:pt-16 overflow-hidden">
        <div className="w-full h-full rounded-none rounded-tl-2xl border-t border-l border-[var(--border-secondary)] shadow-2xl relative bg-[var(--bg-tertiary)] overflow-hidden transform translate-y-4 lg:translate-y-0 lg:translate-x-8">
          <img src={project.customObservanceStory.overviewAfter.image} alt="Hero" className="object-cover object-left-top w-full h-full" />
        </div>
      </div>
    </div>
  );
}

function SlideObsContext({ project }: any) {
  const data = project.customObservanceStory.productContext;
  return (
    <div className="w-full h-full flex flex-col lg:flex-row bg-[var(--bg-secondary)] overflow-hidden">
      {/* Left Content Panel */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center p-8 md:p-12 lg:p-16 min-h-0 gap-6 lg:gap-8 overflow-hidden">
        {/* Header */}
        <div className="flex flex-col gap-2 shrink-0 border-b border-[var(--border-secondary)] pb-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-[var(--text-primary)] font-heading">
            {data.title}
          </h2>
        </div>
        
        <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed shrink-0">
          {data.body}
        </p>

        {/* Content Cards */}
        <div className="flex flex-col gap-4 shrink-0 pb-4">
          {data.points.map((pt: any, i: number) => (
            <div 
              key={i} 
              className="relative flex flex-col sm:flex-row gap-4 items-start p-5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-secondary)] overflow-hidden group hover:border-blue-500/30 hover:shadow-sm transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center text-sm font-semibold font-heading shadow-sm group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-colors duration-300 shrink-0">
                {i + 1}
              </div>
              <div className="flex flex-col gap-1.5 mt-1">
                <h3 className="text-base font-semibold text-[var(--text-primary)] font-heading leading-snug group-hover:text-blue-600 transition-colors duration-300">
                  {pt.label}
                </h3>
                <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed font-medium">
                  {pt.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Right Image Panel */}
      <div className="w-full lg:w-[55%] h-64 lg:h-full relative border-t lg:border-t-0 lg:border-l border-[var(--border-secondary)] shrink-0 lg:shrink">
        <img 
          src="/images/projects/inkers-construction-site.jpg" 
          alt="Inkers Construction Site Context" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

function SlideObsChallenge({ project }: any) {
  const data = project.customObservanceStory.challenge;
  return (
    <div className="w-full h-full flex flex-col lg:flex-row bg-[var(--bg-primary)] overflow-hidden">
      <div className="w-full lg:w-1/3 p-6 lg:px-10 lg:py-6 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[var(--border-secondary)] min-h-0">
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-[var(--text-primary)] mb-4 font-heading shrink-0">
          {data.title}
        </h2>
        <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed shrink-0">
          {data.body}
        </p>
        <div className="flex flex-col gap-3 overflow-hidden pr-2">
          {data.problems.map((prob: string, i: number) => (
            <div key={i} className="flex items-start gap-3">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500/10 text-red-500 text-xs font-semibold shrink-0 mt-0.5">{i+1}</span>
              <span className="text-sm text-[var(--text-primary)]">{prob}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full lg:w-2/3 bg-[var(--bg-tertiary)] p-6 lg:px-10 lg:py-6 flex items-center justify-center relative overflow-hidden min-h-0">
        <div className="relative w-full h-full max-w-4xl rounded-xl overflow-hidden border border-[var(--border-secondary)] shadow-xl flex items-center justify-center bg-[var(--bg-primary)]">
          <img src={project.customObservanceStory.dashboardBefore.image} alt="Original Dashboard" className="object-contain w-full h-full opacity-80" />
          
          <div className="absolute top-[20%] left-[20%] w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs shadow-lg ring-4 ring-white/20">1</div>
          <div className="absolute top-[40%] left-[50%] w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs shadow-lg ring-4 ring-white/20">2</div>
          <div className="absolute top-[70%] left-[30%] w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs shadow-lg ring-4 ring-white/20">3</div>
          <div className="absolute top-[30%] right-[20%] w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs shadow-lg ring-4 ring-white/20">4</div>
          <div className="absolute top-[60%] right-[30%] w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs shadow-lg ring-4 ring-white/20">5</div>
        </div>
      </div>
    </div>
  );
}

function SlideObsPainPoints({ project }: any) {
  const data = project.customObservanceStory.painPoints;
  return (
    <div className="w-full h-full flex flex-col p-6 lg:px-12 lg:py-6 bg-[var(--bg-secondary)] overflow-hidden">
      <div className="max-w-6xl mx-auto w-full h-full flex flex-col justify-center min-h-0 gap-4 lg:gap-6">
        
        {/* Header */}
        <div className="flex flex-col gap-2 shrink-0 border-b border-[var(--border-secondary)] pb-4">
          <span className="text-xs font-semibold tracking-widest text-red-500 uppercase flex items-center gap-2">
            Pain Points
          </span>
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-[var(--text-primary)] font-heading max-w-2xl">
            {data.title}
          </h2>
        </div>
        
        {/* Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-5 min-h-0 overflow-hidden pb-2 shrink-0">
          {data.points.map((pt: any) => {
            const renderIcon = () => {
              switch (pt.num) {
                case '01': return <AlertCircle size={16} />;
                case '02': return <LineChart size={16} />;
                case '03': return <Camera size={16} />;
                case '04': return <Microscope size={16} />;
                default: return <AlertCircle size={16} />;
              }
            };
            
            return (
              <div 
                key={pt.num} 
                className="relative flex flex-col justify-center p-5 lg:p-6 rounded-3xl bg-[var(--bg-primary)] border border-[var(--border-secondary)] overflow-hidden group hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-300"
              >
                <div className="relative z-10 flex flex-col gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 border border-red-100 flex items-center justify-center font-semibold shadow-sm group-hover:bg-red-500 group-hover:text-white group-hover:border-red-500 transition-colors duration-300 shrink-0">
                    {renderIcon()}
                  </div>
                  <h3 className="text-base lg:text-lg font-semibold text-[var(--text-primary)] font-heading leading-snug group-hover:text-red-500 transition-colors duration-300">
                    {pt.question}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-medium">
                    {pt.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </div>
  );
}

function SlideObsOpportunity({ project }: any) {
  const data = project.customObservanceStory.opportunity;
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-6 lg:px-12 lg:py-8 bg-[var(--bg-primary)] text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-[var(--border-secondary)] bg-[size:48px_48px] opacity-10 pointer-events-none" />
      <div className="relative z-10 w-full h-full max-w-4xl flex flex-col items-center justify-center min-h-0">
        <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)] mb-6 font-heading shrink-0">
          {data.title}
        </h2>
        <p className="text-lg text-[var(--text-secondary)] mb-6 shrink-0">
          {data.body}
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-8 shrink-0">
          {data.goals.map((goal: string) => {
            const Icon = goal === 'Discover' ? Compass : goal === 'Understand' ? Brain : goal === 'Investigate' ? Microscope : Zap;
            return (
              <span key={goal} className="flex items-center gap-2 px-5 py-2 text-sm rounded-full bg-[var(--bg-secondary)] text-[var(--text-primary)] font-medium border border-[var(--border-secondary)] shadow-sm">
                <Icon className="w-4 h-4 text-[var(--text-tertiary)]" />
                {goal}
              </span>
            );
          })}
        </div>
        
        <div className="w-full max-w-5xl flex flex-col md:flex-row justify-center items-stretch min-h-0 gap-3 md:gap-4 mt-4 lg:mt-8 shrink-0">
          
          <div className="flex-1 w-full md:w-auto bg-blue-500/5 hover:bg-blue-500/10 transition-colors border border-blue-500/20 p-6 lg:p-8 rounded-2xl flex flex-col items-center justify-center text-center h-full min-h-[140px] shadow-sm">
            <span className="text-xs md:text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3 block">Project Overview</span>
            <span className="text-base md:text-lg text-[var(--text-primary)] font-medium leading-snug">What needs my attention?</span>
          </div>
          
          <div className="hidden md:flex flex-col items-center justify-center px-1">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500/40">
               <line x1="5" y1="12" x2="19" y2="12"></line>
               <polyline points="12 5 19 12 12 19"></polyline>
             </svg>
          </div>
          <div className="flex md:hidden h-6 w-px bg-blue-500/30 relative mx-auto my-1">
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rotate-45 border-b border-r border-blue-500/50"></div>
          </div>

          <div className="flex-1 w-full md:w-auto bg-blue-500/5 hover:bg-blue-500/10 transition-colors border border-blue-500/20 p-6 lg:p-8 rounded-2xl flex flex-col items-center justify-center text-center h-full min-h-[140px] shadow-sm">
            <span className="text-xs md:text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3 block">Project Dashboard</span>
            <span className="text-base md:text-lg text-[var(--text-primary)] font-medium leading-snug">How is the project performing?</span>
          </div>

          <div className="hidden md:flex flex-col items-center justify-center px-1">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500/40">
               <line x1="5" y1="12" x2="19" y2="12"></line>
               <polyline points="12 5 19 12 12 19"></polyline>
             </svg>
          </div>
          <div className="flex md:hidden h-6 w-px bg-blue-500/30 relative mx-auto my-1">
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rotate-45 border-b border-r border-blue-500/50"></div>
          </div>

          <div className="flex-1 w-full md:w-auto bg-blue-500/5 hover:bg-blue-500/10 transition-colors border border-blue-500/20 p-6 lg:p-8 rounded-2xl flex flex-col items-center justify-center text-center h-full min-h-[140px] shadow-sm">
            <span className="text-xs md:text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3 block">3D Viewer</span>
            <span className="text-base md:text-lg text-[var(--text-primary)] font-medium leading-snug">Where exactly is it happening?</span>
          </div>
          
        </div>
      </div>
    </div>
  );
}

function SlideObsBeforeAfterView({ data, type }: { data: any, type: 'before' | 'after' }) {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row bg-[var(--bg-primary)] overflow-hidden">
      <div className="w-full lg:w-[35%] p-8 md:p-10 lg:px-10 lg:py-16 flex flex-col justify-start border-b lg:border-b-0 lg:border-r border-[var(--border-secondary)] bg-[var(--bg-secondary)] min-h-0">
        <div className="flex-1 min-h-0 flex flex-col overflow-y-hidden overflow-x-hidden pr-2">
          {/* Header */}
          <div className="flex flex-col gap-3 shrink-0 border-b border-[var(--border-secondary)] pb-4 mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-semibold tracking-tight text-[var(--text-primary)] font-heading leading-tight whitespace-nowrap">
                {data.title}
              </h2>
              <span className={`shrink-0 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-full border ${type === 'before' ? 'bg-red-500/10 text-red-600 border-red-500/20' : 'bg-green-500/10 text-green-600 border-green-500/20'}`}>
                {type === 'before' ? 'Existing' : 'Redesigned'}
              </span>
            </div>
          </div>
          
          <div className="shrink-0 mt-4">
            {type === 'before' && data.userPain && (
              <div className="p-4 bg-red-500/5 rounded-lg border border-red-500/10 mb-6">
                <span className="text-xs font-semibold text-red-500 tracking-widest uppercase mb-1.5 block">User Pain</span>
                <p className="text-sm font-medium text-[var(--text-primary)]">{data.userPain}</p>
              </div>
            )}
            
            {type === 'after' && data.beforeCallout && data.afterCallout && (
              <div className="flex flex-col gap-3 mb-6">
                <div className="p-4 bg-green-500/5 rounded-lg border border-green-500/20 shadow-sm">
                  <span className="text-xs font-semibold text-green-600 tracking-widest uppercase mb-1 block">Improvement</span>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{data.afterCallout}</p>
                </div>
              </div>
            )}

            {/* Annotations List */}
            {data.annotations && data.annotations.length > 0 && (
              <div className="flex flex-col gap-3 mt-6">
                <div className="text-xs font-semibold text-[var(--text-tertiary)] tracking-widest uppercase border-b border-[var(--border-secondary)] pb-2 mb-1">Key Observations</div>
                {data.annotations.map((ann: any, i: number) => (
                  <div key={i} className="flex gap-3 items-center group cursor-default">
                    <span className={`shrink-0 flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold transition-colors ${type === 'before' ? 'bg-red-500/10 text-red-500 border border-red-500/20 group-hover:bg-red-500 group-hover:text-white' : 'bg-green-500/10 text-green-600 border border-green-500/20 group-hover:bg-green-500 group-hover:text-white'}`}>
                      {ann.num}
                    </span>
                    <div className="flex-1 min-w-0 flex items-center">
                      <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                        {ann.title || ann.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="w-full lg:w-[65%] h-full bg-[var(--bg-primary)] flex flex-col p-2 md:p-4 lg:p-6 overflow-hidden min-h-0 border-t lg:border-t-0 border-[var(--border-secondary)]">
        <div className="flex-1 w-full min-h-0 relative flex items-center justify-center">
          <div className="relative max-w-full max-h-full flex inline-flex">
            <img src={data.image} alt="Screenshot" className="max-w-full max-h-full object-contain shadow-[0_0_1px_rgba(0,0,0,0.1)] block" />
          
          {/* Interactive Annotations Container */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            {data.annotations.map((ann: any, i: number) => (
              <div 
                key={i} 
                className="absolute group z-10 hover:z-50 pointer-events-auto cursor-pointer"
              style={{ left: `${ann.x}%`, top: `${ann.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              {/* Dot */}
              <div className={`relative flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full shadow-lg text-xs md:text-xs font-semibold ring-4 transition-transform group-hover:scale-110 ${type === 'before' ? 'bg-red-500 text-white ring-red-500/30' : 'bg-green-500 text-white ring-green-500/30'}`}>
                {ann.num}
                <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-current"></span>
              </div>
              
              {/* Tooltip */}
              <div 
                className={`absolute w-48 md:w-56 p-3 rounded-lg bg-white border border-gray-200 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 ${
                  ann.y > 60 ? 'bottom-full mb-3' : 'top-full mt-3'
                } ${
                  ann.x < 20 ? 'left-0' : ann.x > 80 ? 'right-0' : 'left-1/2 -translate-x-1/2'
                }`}
              >
                {ann.title && <span className="block text-xs md:text-sm font-semibold text-gray-900 mb-1">{ann.title}</span>}
                <span className="block text-xs md:text-xs text-gray-600 font-medium leading-relaxed">{ann.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>
);
}

function SlideObsOverviewBefore({ project }: any) { return <SlideObsBeforeAfterView data={project.customObservanceStory.overviewBefore} type="before" />; }
function SlideObsOverviewAfter({ project }: any) { return <SlideObsBeforeAfterView data={project.customObservanceStory.overviewAfter} type="after" />; }
function SlideObsDashboardBefore({ project }: any) { return <SlideObsBeforeAfterView data={project.customObservanceStory.dashboardBefore} type="before" />; }
function SlideObsDashboardAfter({ project }: any) { return <SlideObsBeforeAfterView data={project.customObservanceStory.dashboardAfter} type="after" />; }
function SlideObsScanBefore({ project }: any) { return <SlideObsBeforeAfterView data={project.customObservanceStory.scanBefore} type="before" />; }
function SlideObsScanAfter({ project }: any) { return <SlideObsBeforeAfterView data={project.customObservanceStory.scanAfter} type="after" />; }
function SlideObsViewerBefore({ project }: any) { return <SlideObsBeforeAfterView data={project.customObservanceStory.viewerBefore} type="before" />; }
function SlideObsViewerAfter({ project }: any) { return <SlideObsBeforeAfterView data={project.customObservanceStory.viewerAfter} type="after" />; }

function SlideObsComparisonSingle({ project, index }: any) {
  const d = project.customObservanceStory;
  const pairs = [
    { title: 'Project Overview', before: d.overviewBefore.image, after: d.overviewAfter.image, bLabel: 'List', aLabel: 'Actionable overview' },
    { title: 'Project Dashboard', before: d.dashboardBefore.image, after: d.dashboardAfter.image, bLabel: 'Fragmented data', aLabel: 'Project intelligence' },
    { title: '3D Viewer', before: d.viewerBefore.image, after: d.viewerAfter.image, bLabel: 'Tool-heavy', aLabel: 'Focused investigation' },
  ];
  const pair = pairs[index];
  
  return (
    <div className="w-full h-full flex flex-col p-6 lg:px-12 lg:py-8 bg-[var(--bg-secondary)] overflow-hidden">
      <div className="flex flex-col mb-6 shrink-0">
        <h3 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] font-heading">{pair.title}</h3>
      </div>
      
      <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-6 lg:gap-10 min-h-0">
         {/* Before */}
         <div className="flex-1 flex flex-col gap-3 min-h-0 min-w-0">
           <div className="flex items-center justify-between shrink-0 px-2">
             <span className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">Before</span>
             <span className="text-sm font-medium text-[var(--text-secondary)]">{pair.bLabel}</span>
           </div>
           <div className="flex-1 bg-[var(--bg-tertiary)] rounded-2xl border border-[var(--border-secondary)] overflow-hidden min-h-0 relative shadow-sm">
             <img src={pair.before} alt="Before" className="absolute inset-0 w-full h-full object-cover object-left-top opacity-80 mix-blend-luminosity grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
           </div>
         </div>
         {/* After */}
         <div className="flex-1 flex flex-col gap-3 min-h-0 min-w-0">
           <div className="flex items-center justify-between shrink-0 px-2">
             <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider">After</span>
             <span className="text-sm font-semibold text-[var(--text-primary)]">{pair.aLabel}</span>
           </div>
           <div className="flex-1 bg-[var(--bg-primary)] rounded-2xl border-2 border-blue-500/30 overflow-hidden shadow-2xl ring-4 ring-blue-500/10 min-h-0 relative">
             <img src={pair.after} alt="After" className="absolute inset-0 w-full h-full object-cover object-left-top" />
           </div>
         </div>
      </div>
    </div>
  );
}

function SlideObsSystem({ project }: any) {
  const data = project.customObservanceStory.system;
  return (
    <div className="w-full h-full flex flex-col p-8 md:p-12 lg:p-16 bg-[var(--bg-secondary)] relative overflow-hidden">
      <div className="max-w-6xl w-full flex flex-col justify-start h-full min-h-0 gap-6 lg:gap-8">
        
        {/* Header */}
        <div className="flex flex-col gap-2 shrink-0 border-b border-[var(--border-secondary)] pb-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-[var(--text-primary)] font-heading max-w-4xl">
            {data.title}
          </h2>
        </div>
        
        <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed shrink-0 max-w-4xl">
          {data.body}
        </p>
        
        <div className="flex flex-wrap justify-start gap-3 shrink-0">
          {data.patterns.map((pattern: string) => (
            <div key={pattern} className="px-4 py-2 bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-full text-xs md:text-sm font-medium text-[var(--text-primary)] shadow-sm hover:border-blue-500/30 transition-colors duration-300">
              {pattern}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideObsFinalStory({ project }: any) {
  const d = project.customObservanceStory;
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-6 lg:px-12 lg:py-8 bg-[var(--bg-secondary)] overflow-hidden">
      <h2 className="text-xl md:text-3xl font-medium tracking-tight text-[var(--text-primary)] mb-8 font-heading text-center max-w-2xl shrink-0">
        From project discovery to spatial investigation
      </h2>
      
      <div className="flex-1 w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8 min-h-0">
        <div className="flex-1 flex flex-col items-center gap-3 text-center h-full min-h-0 justify-center">
          <div className="w-full flex-1 min-h-0 rounded-xl overflow-hidden border border-[var(--border-secondary)] shadow-lg relative max-h-[40vh]">
            <img src={d.overviewAfter.image} alt="Overview" className="absolute inset-0 w-full h-full object-cover object-top" />
          </div>
          <div className="shrink-0">
            <span className="block text-xs font-semibold text-blue-500 tracking-widest uppercase mb-1">Project Overview</span>
            <span className="block text-sm text-[var(--text-primary)] font-medium">“What needs my attention?”</span>
          </div>
        </div>
        
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-tertiary)] shrink-0 hidden md:block">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>

        <div className="flex-1 flex flex-col items-center gap-3 text-center h-full min-h-0 justify-center">
          <div className="w-full flex-1 min-h-0 rounded-xl overflow-hidden border border-[var(--border-secondary)] shadow-lg relative max-h-[40vh]">
            <img src={d.dashboardAfter.image} alt="Dashboard" className="absolute inset-0 w-full h-full object-cover object-top" />
          </div>
          <div className="shrink-0">
            <span className="block text-xs font-semibold text-blue-500 tracking-widest uppercase mb-1">Project Dashboard</span>
            <span className="block text-sm text-[var(--text-primary)] font-medium">“How is my project performing?”</span>
          </div>
        </div>
        
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-tertiary)] shrink-0 hidden md:block">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>

        <div className="flex-1 flex flex-col items-center gap-3 text-center h-full min-h-0 justify-center">
          <div className="w-full flex-1 min-h-0 rounded-xl overflow-hidden border border-[var(--border-secondary)] shadow-lg relative max-h-[40vh]">
            <img src={d.viewerAfter.image} alt="Viewer" className="absolute inset-0 w-full h-full object-cover object-top" />
          </div>
          <div className="shrink-0">
            <span className="block text-xs font-semibold text-blue-500 tracking-widest uppercase mb-1">3D Viewer</span>
            <span className="block text-sm text-[var(--text-primary)] font-medium">“Where exactly is it happening?”</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-xs md:text-xs font-semibold tracking-[0.2em] uppercase text-[var(--text-secondary)] shrink-0">
        <span>Discover</span> <span className="text-blue-500">→</span> 
        <span>Understand</span> <span className="text-blue-500">→</span> 
        <span>Investigate</span> <span className="text-blue-500">→</span> 
        <span className="text-[var(--text-primary)]">Act</span>
      </div>
    </div>
  );
}

function SlideObsLearnings({ project }: any) {
  const comparisons = [
    {
      before: "Information overload and weak visual hierarchy",
      after: "Clear hierarchy balancing high-level overview with deep technical depth"
    },
    {
      before: "Fragmented workflows scattered across isolated tools",
      after: "A unified, seamless experience enriched with contextual information"
    },
    {
      before: "Understanding project health required deep, manual investigation",
      after: "At-a-glance project health metrics and instantly actionable insights"
    },
    {
      before: "Complex 3D viewer exposing all capabilities simultaneously",
      after: "Spatial-first viewer featuring progressive tool disclosure"
    }
  ];

  return (
    <div className="w-full h-full flex flex-col p-8 md:p-12 lg:p-16 bg-[var(--bg-secondary)] overflow-hidden">
      <div className="max-w-7xl w-full flex flex-col min-h-0 gap-6 lg:gap-8 mx-auto h-full justify-center">
        
        {/* Evolution Cards Grid */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 overflow-hidden pt-2">
          {comparisons.map((item, i) => (
            <div 
              key={i} 
              className="relative flex flex-col justify-center p-6 lg:p-8 rounded-3xl bg-[var(--bg-primary)] border border-[var(--border-secondary)] overflow-hidden group hover:border-[var(--border-primary)] hover:shadow-xl transition-all duration-500"
            >
              {/* Subtle hover gradient fill */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              {/* Existing State */}
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 border border-red-100 shadow-sm mt-1">
                  <X className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col gap-1.5 mt-1">
                  <span className="text-xs font-semibold uppercase tracking-widest text-red-500/80">Existing</span>
                  <p className="text-sm md:text-base text-[var(--text-secondary)] font-medium leading-relaxed">
                    {item.before}
                  </p>
                </div>
              </div>

              {/* Transformation Connector */}
              <div className="relative z-10 flex flex-col items-start pl-[19px] my-2">
                <div className="w-0.5 h-8 bg-gradient-to-b from-red-200 to-green-400 rounded-full opacity-60" />
              </div>

              {/* Redesigned State */}
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0 border border-green-200 shadow-sm mt-1 transition-colors duration-500">
                  <Check className="w-5 h-5" strokeWidth={3} />
                </div>
                <div className="flex flex-col gap-1.5 mt-1">
                  <span className="text-xs font-semibold uppercase tracking-widest text-green-600/80">Redesigned</span>
                  <p className="text-base md:text-lg text-[var(--text-primary)] font-semibold leading-relaxed">
                    {item.after}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}


function SlideThanks({ onClose }: { onClose?: () => void }) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-8 bg-[var(--bg-primary)] relative overflow-hidden">
      
      {/* Ambient Gradient Glows */}
      <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[70%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] -right-[10%] w-[50%] h-[80%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center justify-center gap-6 text-center max-w-xl">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-[var(--text-primary)] to-[var(--text-tertiary)] font-heading pb-2">
          Thank You
        </h2>
        <p className="text-base md:text-lg lg:text-xl text-[var(--text-secondary)] font-medium leading-relaxed max-w-md mx-auto">
          Thanks for taking the time to review this case study. I'd love to chat more about this project or any future opportunities.
        </p>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────
// 7. Slide Renderer
// ─────────────────────────────────────────

function renderSlide(slide: Slide, project: Project, story: ProjectStory, mockups: ProjectMockups, onClose: () => void) {
  const props: SlideProps = { project, story, mockups };
  switch (slide.type) {
    case 'thanks': return <SlideThanks onClose={onClose} />;
    case 'cover': return <SlideCover {...props} />;
    case 'context': return <SlideContext {...props} />;
    case 'problem': return <SlideProblem {...props} />;
    case 'pain-points': return <SlidePainPoints {...props} />;
    case 'workflow': return <SlideWorkflow {...props} />;
    case 'user-flow': return <SlideUserFlow {...props} />;
    case 'exploration': return <SlideExploration {...props} />;
    case 'solution': return <SlideSolution {...props} />;
    case 'feature-01': return <SlideFeatureDeepDive {...props} featureIndex={0} />;
    case 'feature-02': return <SlideFeatureDeepDive {...props} featureIndex={1} />;
    case 'annotated-screens': return <SlideAnnotatedScreens {...props} />;
    case 'before-after': return <SlideBeforeAfter {...props} />;
    case 'system-thinking': return <SlideSystemThinking {...props} />;
    case 'impact': return <SlideImpact {...props} />;
    case 'learnings': return <SlideLearnings {...props} onClose={onClose} />;

    // Observance custom slides
    case 'obs-logo': return <SlideObsLogo />;
    case 'obs-cover': return <SlideObsCover {...props} />;
    case 'obs-context': return <SlideObsContext {...props} />;
    case 'obs-challenge': return <SlideObsChallenge {...props} />;
    case 'obs-pain-points': return <SlideObsPainPoints {...props} />;
    case 'obs-opportunity': return <SlideObsOpportunity {...props} />;
    case 'obs-overview-before': return <SlideObsOverviewBefore {...props} />;
    case 'obs-overview-after': return <SlideObsOverviewAfter {...props} />;
    case 'obs-dashboard-before': return <SlideObsDashboardBefore {...props} />;
    case 'obs-dashboard-after': return <SlideObsDashboardAfter {...props} />;
    case 'obs-scan-before': return <SlideObsScanBefore {...props} />;
    case 'obs-scan-after': return <SlideObsScanAfter {...props} />;
    case 'obs-viewer-before': return <SlideObsViewerBefore {...props} />;
    case 'obs-viewer-after': return <SlideObsViewerAfter {...props} />;
    case 'obs-comparison-overview': return <SlideObsComparisonSingle {...props} index={0} />;
    case 'obs-comparison-dashboard': return <SlideObsComparisonSingle {...props} index={1} />;
    case 'obs-comparison-viewer': return <SlideObsComparisonSingle {...props} index={2} />;
    case 'obs-system': return <SlideObsSystem {...props} />;
    case 'obs-final-story': return <SlideObsFinalStory {...props} />;
    case 'obs-learnings': return <SlideObsLearnings {...props} />;
    default: return null;
  }
}

// ─────────────────────────────────────────
// 8. CaseStudyPresentation — Main Export
// ─────────────────────────────────────────

interface CaseStudyPresentationProps {
  project: Project;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export function CaseStudyPresentation({ project, onClose, onNavigate, hasPrev, hasNext }: CaseStudyPresentationProps) {
  const story = getProjectStory(project);
  const mockups = getProjectMockups(project.id);
  const slides = buildSlides(project, story);
  const [[currentSlide, direction], setSlideState] = useState<[number, number]>([0, 0]);
  const [isPresentMode, setIsPresentMode] = useState(false);
  const totalSlides = slides.length;
  const prevProjectId = useRef(project.id);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement && !(document as any).webkitFullscreenElement) {
        if (containerRef.current?.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        } else if ((containerRef.current as any)?.webkitRequestFullscreen) {
          await (containerRef.current as any).webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        }
      }
    } catch (err) {
      console.warn("Fullscreen API failed, falling back to simulated full screen", err);
      setIsPresentMode(v => !v);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsPresentMode(!!document.fullscreenElement || !!(document as any).webkitFullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (prevProjectId.current !== project.id) {
      setSlideState([0, 0]);
      prevProjectId.current = project.id;
    }
  }, [project.id]);

  const goToSlide = useCallback((target: number) => {
    setSlideState((prev) => {
      const [current] = prev;
      if (target === current) return prev;
      return [target, target > current ? 1 : -1];
    });
  }, []);

  const nextSlide = useCallback(() => {
    setSlideState((prev) => {
      const [current] = prev;
      return current < totalSlides - 1 ? [current + 1, 1] : prev;
    });
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setSlideState((prev) => {
      const [current] = prev;
      return current > 0 ? [current - 1, -1] : prev;
    });
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); nextSlide(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prevSlide(); }
      else if (e.key === 'Escape') { 
        if (isPresentMode) {
          if (!document.fullscreenElement && !(document as any).webkitFullscreenElement) {
            setIsPresentMode(false);
          }
        } else {
          onClose();
        }
      }
      else if (e.key === 'p' || e.key === 'P') toggleFullscreen();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [nextSlide, prevSlide, isPresentMode, onClose, toggleFullscreen]);

  const slide = slides[currentSlide];
  const isFirst = currentSlide === 0;
  const isLast = currentSlide === totalSlides - 1;

  const paginationDots = (
    <>
      <div className="flex items-center gap-1.5">
        {slides.map((s, idx) => (
          <button key={idx} type="button" onClick={() => goToSlide(idx)} title={s.label} aria-label={`Go to ${s.label}`} className={cn('rounded-full transition-all duration-200 cursor-pointer hover:opacity-100 shrink-0', idx === currentSlide ? 'w-5 h-2 bg-[var(--primary)] opacity-100' : idx < currentSlide ? 'w-2 h-2 bg-[var(--primary)] opacity-35 hover:opacity-60' : 'w-2 h-2 bg-[var(--text-tertiary)] opacity-25 hover:opacity-50')} />
        ))}
      </div>
      <span className="text-xs font-mono font-medium text-[var(--text-tertiary)] bg-[var(--surface-primary)] px-2 py-0.5 rounded-full border border-[var(--border-primary)] shadow-sm shrink-0">
        {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
      </span>
    </>
  );

  return (
    <div ref={containerRef} className="flex flex-col h-full bg-[var(--surface)]">
      {/* Header */}
      <div className="flex-none flex items-center justify-between gap-4 px-4 md:px-6 border-b border-[var(--border-primary)] bg-[var(--surface-elevated)]" style={{ height: '52px' }}>
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <span className="text-sm font-semibold text-[var(--text-primary)] truncate">{project.title}</span>
        </div>
        <div className="flex items-center gap-1.5 min-w-[100px] justify-end">
          <button type="button" onClick={toggleFullscreen} title={isPresentMode ? 'Exit Present Mode (P)' : 'Present Mode (P)'} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-all cursor-pointer group">
            {isPresentMode ? <Minimize2 className="w-3.5 h-3.5 -mr-0.5" /> : <Maximize2 className="w-3.5 h-3.5 -mr-0.5" />}
            <span className="hidden md:inline">{isPresentMode ? 'Exit' : 'Present'}</span>
            <span className="hidden xl:flex items-center justify-center max-w-0 opacity-0 overflow-hidden group-hover:max-w-[24px] group-hover:opacity-100 group-hover:ml-0.5 transition-all duration-300 ease-out">
              <kbd className="inline-flex items-center justify-center h-[18px] px-1 bg-[var(--surface-primary)] border border-[var(--border-primary)] rounded-full text-[9px] font-sans font-medium text-[var(--text-tertiary)] shadow-sm uppercase shrink-0">P</kbd>
            </span>
          </button>
          <button type="button" onClick={onClose} className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--text-secondary)] hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer border border-transparent hover:border-red-100 group">
            <X className="w-3.5 h-3.5 -mr-0.5" />
            <span className="hidden sm:inline">Close</span>
            <span className="hidden xl:flex items-center justify-center max-w-0 opacity-0 overflow-hidden group-hover:max-w-[30px] group-hover:opacity-100 group-hover:ml-0.5 transition-all duration-300 ease-out">
              <kbd className="inline-flex items-center justify-center h-[18px] px-1 bg-[var(--surface-primary)] border border-[var(--border-primary)] rounded-full text-[9px] font-sans font-medium text-[var(--text-tertiary)] shadow-sm group-hover:text-red-500 group-hover:border-red-200 shrink-0">Esc</kbd>
            </span>
          </button>
        </div>
      </div>

      {/* Slide Canvas */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div 
            key={`${project.id}-${currentSlide}`} 
            custom={direction} 
            variants={slideVariants} 
            initial="enter" 
            animate="center" 
            exit="exit" 
            className={cn("absolute inset-0 overflow-hidden overflow-x-hidden", isPresentMode && "cursor-pointer")} 
            style={{ willChange: 'transform, opacity' }}
            onClick={(e) => {
              if (isPresentMode) {
                // don't advance if clicking on an interactive element like a button or link
                const target = e.target as HTMLElement;
                if (!target.closest('button') && !target.closest('a')) {
                  nextSlide();
                }
              }
            }}
          >
            {renderSlide(slide, project, story, mockups, onClose)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="flex-none flex items-center justify-between gap-4 px-4 md:px-6 border-t border-[var(--border-primary)] bg-[var(--surface-elevated)]" style={{ height: '60px' }}>
        
        {/* Left Side */}
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <AnimatePresence mode="popLayout" initial={false}>
            {!isPresentMode ? (
              <motion.div 
                key="project-nav"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-1.5"
              >
                <button type="button" onClick={() => onNavigate('prev')} disabled={!hasPrev} className={cn('flex items-center px-2 py-1.5 rounded-full text-xs font-semibold transition-all group', hasPrev ? 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] cursor-pointer' : 'text-[var(--text-tertiary)] cursor-not-allowed opacity-40')}>
                  <ChevronLeft className="w-4 h-4 shrink-0" />
                  <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[110px] group-hover:opacity-100 group-hover:ml-1 group-hover:mr-1 transition-all duration-300 ease-out whitespace-nowrap">Previous Project</span>
                </button>
                <button type="button" onClick={() => onNavigate('next')} disabled={!hasNext} className={cn('flex items-center px-2 py-1.5 rounded-full text-xs font-semibold transition-all group', hasNext ? 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] cursor-pointer' : 'text-[var(--text-tertiary)] cursor-not-allowed opacity-40')}>
                  <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[100px] group-hover:opacity-100 group-hover:mr-1 group-hover:ml-1 transition-all duration-300 ease-out whitespace-nowrap text-right">Next Project</span>
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="dots-left"
                layoutId="pagination-dots"
                transition={{ duration: 0.4, type: "spring", bounce: 0.15 }}
                className="hidden lg:flex items-center gap-3"
              >
                {paginationDots}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4 shrink-0">
          
          {/* Pagination Dots (Normal Mode) */}
          <AnimatePresence mode="popLayout" initial={false}>
            {!isPresentMode && (
              <motion.div 
                key="dots-right"
                layoutId="pagination-dots"
                transition={{ duration: 0.4, type: "spring", bounce: 0.15 }}
                className="hidden lg:flex items-center gap-3 pr-2 border-r border-[var(--border-secondary)] mr-2"
              >
                {paginationDots}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-2">
            <button type="button" onClick={prevSlide} disabled={isFirst} className={cn('flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all border group', !isFirst ? 'text-[var(--text-secondary)] border-[var(--border-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] cursor-pointer' : 'text-[var(--text-tertiary)] border-transparent cursor-not-allowed opacity-30')}>
              <ChevronLeft className="w-4 h-4 -ml-1" />
              <span className="hidden sm:inline">Prev</span>
              <span className="hidden md:flex items-center justify-center max-w-0 opacity-0 overflow-hidden group-hover:max-w-[24px] group-hover:opacity-100 group-hover:ml-1 transition-all duration-300 ease-out">
                <kbd className="inline-flex items-center justify-center h-5 px-1 bg-[var(--surface-primary)] border border-[var(--border-primary)] rounded-full text-[9px] font-sans font-medium text-[var(--text-tertiary)] shadow-sm shrink-0">←</kbd>
              </span>
            </button>
            
            <button type="button" onClick={isLast ? onClose : nextSlide} className={cn('flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all border group cursor-pointer', isLast ? 'text-[var(--primary)] border-[var(--primary)]/20 bg-[var(--primary-subtle)] hover:bg-[var(--primary-subtle)]/80' : 'text-[var(--text-secondary)] border-[var(--border-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]')}>
              <span className="hidden sm:inline">{isLast ? 'Finish' : 'Next'}</span>
              {!isLast && (
                <span className="hidden md:flex items-center justify-center max-w-0 opacity-0 overflow-hidden group-hover:max-w-[24px] group-hover:opacity-100 group-hover:mr-1 transition-all duration-300 ease-out">
                  <kbd className="inline-flex items-center justify-center h-5 px-1 bg-[var(--surface-primary)] border border-[var(--border-primary)] rounded-full text-[9px] font-sans font-medium text-[var(--text-tertiary)] shadow-sm shrink-0">→</kbd>
                </span>
              )}
              {isLast ? <ArrowUpRight className="w-4 h-4 -mr-1" /> : <ChevronRight className="w-4 h-4 -mr-1" />}
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
