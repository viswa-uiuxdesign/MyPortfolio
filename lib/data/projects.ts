import type { Project, ExperienceEntry, Tool } from '../types';

// ─────────────────────────────────────────
// Experience Data
// ─────────────────────────────────────────

export const experience: ExperienceEntry[] = [
  {
    period: 'March 2024 — Present',
    role: 'Product Designer',
    company: 'Sketch Brahma Technologies',
    isCurrent: true,
  },
];

// ─────────────────────────────────────────
// Tools Data
// ─────────────────────────────────────────

export const tools: Tool[] = [
  { name: 'Figma', icon: '✦' },
  { name: 'Framer', icon: '◉' },
  { name: 'Claude', icon: '◆' },
  { name: 'ChatGPT', icon: '❖' },
  { name: 'Antigravity', icon: '▲' },
  { name: 'Mobbin', icon: '■' },
  { name: 'Lovable', icon: '❤' },
  { name: 'MagicPath', icon: '◰' },
  { name: 'Miro', icon: '◇' },
];

// ─────────────────────────────────────────
// Projects Data
// ─────────────────────────────────────────

export const projects: Project[] = [
  {
    id: 'inkers-observance',
    slug: 'inkers-observance',
    title: 'Inkers Observance',
    category: 'Web Apps',
    platform: 'Web',
    industry: 'Enterprise Computer Vision',
    role: 'Product Designer',
    timeline: '2024',
    team: 'Product Design & Technical Team',
    shortDescription:
      'Designed a 3D Viewer module for construction progress monitoring, replacing manual documentation with structured visual stakeholder reporting.',
    coverImage: '/images/projects/inkers-observance.jpg',
    coverAlt: 'Inkers Observance construction progress 3D dashboard',
    tags: ['3D Viewer', 'Construction Tech', 'Dashboard', 'Stakeholder Reporting'],
    caseStudy: {
      overview: {
        heading: 'Visual Computer Vision Construction Tracking',
        body: 'Inkers Observance is an AI-powered enterprise computer vision platform that automates construction site monitoring by matching real-time feeds with design blueprints and 3D BIM models.',
      },
      problem: {
        heading: 'Slow manual logging and disconnected blueprint coordination',
        body: 'Site inspectors spent 4+ hours daily manually documenting progress. With no central way to overlay actual site photos onto 3D models, discrepancies went unnoticed for weeks, causing costly re-work and major milestone delays.',
      },
      research: {
        heading: 'User Research & Insights',
        body: 'Shadowed site supervisors and project managers. We discovered that site inspectors did not need complex BIM editing features; they needed a simple tool to compare design vs. reality and log exceptions in under 3 clicks.',
      },
      uxProcess: {
        heading: 'Simplifying the 3D BIM Workspace',
        body: 'Designed a dual-viewport comparison workspace. On the left: the interactive 3D model with camera presets. On the right: chronological site photos and anomaly logs. Heavy CAD interactions were simplified into toggle actions.',
      },
      uiDesign: {
        heading: 'Sensory Hierarchy UI Design',
        body: 'Minimal controls allow the 3D model viewport to claim maximum screen space. High-contrast indicators point to anomalies directly in 3D space, shifting details to floating context panels.',
        images: ['/images/projects/inkers-observance.jpg'],
      },
      designSystem: {
        heading: 'Viewport Design Elements',
        body: 'Developed specialized viewport UI assets, including 3D space gizmos, camera state controls, and status badges that work seamlessly against bright 3D model canvases.',
      },
      challenges: {
        heading: 'Viewport Interaction Constraints',
        body: 'Ensuring that complex 3D orbital camera rotations did not conflict with general dashboard scroll parameters, resolved by establishing explicit modal bounds and touch-friendly controls.',
      },
      outcome: {
        heading: 'Operational Story & Project Outcomes',
        body: 'Transformed slow documentation habits into a cohesive visual reporting system.',
        bullets: [
          'Dual-viewport compare model launched successfully',
          'Slashed daily inspection reporting time from 4 hours to 15 minutes',
          'Reduced construction alignment errors by 22%',
        ],
      },
    },
    customObservanceStory: {
      overview: {
        title: 'Inkers Observance — Construction Intelligence Platform',
        subtitle: 'Redesigning construction intelligence for clearer project decisions.',
        metadata: ''
      },
      productContext: {
        title: 'Introduction to Inkers',
        body: 'Inkers is a technology company specializing in AI-driven visual intelligence. Their flagship product, Observance, brings together construction project information, site scans, progress data, and 3D intelligence into one platform.',
        points: [
          { label: 'The Platform', desc: 'Observance captures and analyzes construction site data, turning massive 3D scans and BIM models into actionable project intelligence.' },
          { label: 'The Objective', desc: 'To completely redesign the Observance platform, transforming it from a complex, engineering-heavy tool into an intuitive, user-friendly workspace for project managers.' }
        ]
      },
      challenge: {
        title: 'Powerful construction data, difficult experience',
        body: 'The existing Observance product contained valuable construction information, but the experience made that information difficult to consume and act upon.',
        problems: [
          'Information overload',
          'Weak information hierarchy',
          'Fragmented workflows',
          'Limited contextual information',
          'Complex 3D interactions'
        ]
      },
      painPoints: {
        title: 'What made the experience difficult?',
        points: [
          { num: '01', question: 'Which projects need my attention?', answer: 'Project status and priority were not immediately clear.' },
          { num: '02', question: 'How is my project performing?', answer: 'Users had to explore different areas to build a complete picture of project health.' },
          { num: '03', question: 'What happened on site?', answer: 'Scan information wasn\'t always strongly connected with the wider project context.' },
          { num: '04', question: 'How do I investigate the site?', answer: 'The 3D viewer exposed many tools and provided limited spatial context.' }
        ]
      },
      opportunity: {
        title: 'From information-heavy screens to an actionable construction workspace',
        body: 'Make complex construction intelligence easier to:',
        goals: ['Discover', 'Understand', 'Investigate', 'Act upon']
      },
      overviewBefore: {
        title: 'Project Overview',
        annotations: [
          { num: '1', desc: 'Limited project-level context is provided upfront.', x: 20, y: 10 },
          { num: '2', desc: 'Metrics lack actionable portfolio-level context.', x: 50, y: 25 },
          { num: '3', desc: 'Project cards only function as basic navigation links.', x: 30, y: 65 },
          { num: '4', desc: 'Excessive whitespace reduces overall information density.', x: 80, y: 50 },
          { num: '5', desc: 'Project priority and health status are hard to identify.', x: 70, y: 80 }
        ],
        userPain: 'Which project should I look at first?',
        image: '/images/projects/observance-overview-before.png'
      },
      overviewAfter: {
        title: 'Project Overview',
        annotations: [
          { num: '01', desc: 'Top-level metrics provide immediate portfolio context.', x: 40, y: 20 },
          { num: '02', desc: 'Segmented tabs make project discovery much easier.', x: 30, y: 40 },
          { num: '03', desc: 'Cards combine identity, location, scan status, and progress.', x: 50, y: 60 },
          { num: '04', desc: 'Visual tags make project health immediately scannable.', x: 20, y: 80 }
        ],
        beforeCallout: 'Projects primarily functioned as a list of destinations.',
        afterCallout: 'Projects become a source of actionable context.',
        image: '/images/projects/observance-overview-after.png'
      },
      dashboardBefore: {
        title: 'Project Dashboard',
        annotations: [
          { num: '1', desc: 'Project details and statistics compete for attention.', x: 20, y: 20 },
          { num: '2', desc: 'Progress trackers lack meaningful comparison data.', x: 60, y: 30 },
          { num: '3', desc: '3D scan data is isolated from wider project context.', x: 30, y: 50 },
          { num: '4', desc: 'Poor layout structure reduces the information density.', x: 70, y: 70 },
          { num: '5', desc: 'Critical project health signals are buried in the UI.', x: 40, y: 80 }
        ],
        userPain: 'How is my project performing overall?',
        image: '/images/projects/observance-dashboard-before.jpg'
      },
      dashboardAfter: {
        title: 'Project Dashboard',
        annotations: [
          { num: '01', desc: 'Unified trackers make discipline progress easy to compare.', x: 25, y: 25 },
          { num: '02', desc: 'Scan data is enriched with location, date, and imagery.', x: 70, y: 25 },
          { num: '03', desc: 'Surfaces materials, workforce, and floor-level insights.', x: 50, y: 50 },
          { num: '04', desc: 'Timeline visualizes schedule status and expected completion.', x: 30, y: 75 },
          { num: '05', desc: 'Summary data is upfront, with depth available on click.', x: 70, y: 80 }
        ],
        beforeCallout: 'Users had to explore different sections to construct an understanding of project health.',
        afterCallout: 'The dashboard brings multiple dimensions of project intelligence into one workspace.',
        image: '/images/projects/observance-dashboard-after.png'
      },
      scanBefore: {
        title: 'Scan Details',
        annotations: [
          { num: '1', desc: 'Scan information feels disconnected from the rest of the project.', x: 30, y: 30 },
          { num: '2', desc: 'Layout is sparse and lacks visual hierarchy.', x: 70, y: 50 },
          { num: '3', desc: 'Key actions are hard to find among secondary data.', x: 40, y: 70 }
        ],
        userPain: 'What exactly am I looking at in this scan?',
        image: '/images/projects/observance-scan-before.png'
      },
      scanAfter: {
        title: 'Scan Details',
        annotations: [
          { num: '01', desc: 'Clean, structured layout organizes scan metadata intuitively.', x: 25, y: 35 },
          { num: '02', desc: 'Visual hierarchy emphasizes the most critical scan metrics.', x: 75, y: 45 },
          { num: '03', desc: 'Primary actions are grouped and easily accessible.', x: 50, y: 80 }
        ],
        beforeCallout: 'Scan details were hard to parse and lacked structure.',
        afterCallout: 'Structured intelligence providing immediate clarity.',
        image: '/images/projects/observance-scan-after.png'
      },
      viewerBefore: {
        title: '3D Viewer',
        annotations: [
          { num: '1', desc: 'Intrusive permanent toolbar consumes valuable screen space.', x: 10, y: 50 },
          { num: '2', desc: 'Showing all tools simultaneously increases cognitive load.', x: 20, y: 60 },
          { num: '3', desc: 'Users lack a strong sense of spatial orientation.', x: 80, y: 20 },
          { num: '4', desc: 'The 3D canvas layout wastes available screen real estate.', x: 50, y: 40 },
          { num: '5', desc: 'It is unclear which tools are relevant to the current task.', x: 30, y: 80 },
          { num: '6', desc: 'Missing contextual metadata about the current scan view.', x: 40, y: 15 }
        ],
        userPain: 'Where am I, and what can I do here?',
        image: '/images/projects/observance-viewer-before.png'
      },
      viewerAfter: {
        title: '3D Viewer',
        annotations: [
          { num: '01', desc: 'Project, scan date, and level are visible persistently.', x: 25, y: 15 },
          { num: '02', desc: 'A minimap helps users understand their location in the model.', x: 85, y: 15 },
          { num: '03', desc: 'The 3D model takes center stage with maximum emphasis.', x: 50, y: 50 },
          { num: '04', desc: 'Frequently used tools are grouped in a contextual floating bar.', x: 50, y: 85 },
          { num: '05', desc: 'Global actions are separated from model manipulation controls.', x: 85, y: 85 }
        ],
        beforeCallout: 'The viewer exposed many capabilities at once.',
        afterCallout: 'The viewer prioritizes spatial context first, with tools available when needed.',
        image: '/images/projects/observance-viewer-after.png'
      },
      system: {
        title: 'Designing a consistent language for a complex product',
        patterns: [
          'Navigation', 'KPI cards', 'Project cards', 'Status indicators',
          'Progress components', 'Data visualizations', 'Filters', 'Viewer controls',
          'Toolbars', 'Buttons', 'Cards', 'Empty states'
        ],
        body: 'The redesign was not only about improving individual screens. It established reusable patterns for presenting complex construction information consistently across the product.'
      },
      learnings: {
        title: 'What I learned',
        points: [
          { num: '01', title: 'Complex products need strong hierarchy', desc: 'More information doesn\'t necessarily mean more clarity.' },
          { num: '02', title: 'Context is critical', desc: 'Construction data becomes more useful when users can understand where and when it applies.' },
          { num: '03', title: 'Good enterprise UX balances overview and depth', desc: 'Users need quick answers first, with deeper information available when required.' }
        ]
      }
    }
  },
  {
    id: 'leads-collection-management',
    slug: 'leads-collection-management',
    title: 'Leads & Collection Management',
    category: 'Web Apps',
    platform: 'Web',
    industry: 'Enterprise FinTech',
    role: 'Product Designer',
    timeline: '2024',
    team: 'Product Design Team',
    shortDescription:
      'Built a role-based platform with tailored dashboards for Admin, Manager, and Lead Agent users, improving pipeline visibility and reducing workflow friction.',
    coverImage: '/images/projects/developer-docs-v4.jpg',
    coverAlt: 'Leads and Collection dashboard showing stats and pipeline analytics',
    tags: ['Dashboard', 'Role-Based UI', 'Pipeline Visibility', 'Enterprise'],
    caseStudy: {
      overview: {
        heading: 'Enterprise Collections CRM & Pipeline Dashboards',
        body: 'A comprehensive, role-based pipeline management system built for financial organizations to streamline the collection workflow across administrators, managers, and ground agents.',
      },
      problem: {
        heading: 'Fragmented task allocation and collection pipeline blindspots',
        body: 'Managers lacked real-time visibility into collection updates, relying on manual spreadsheet uploads. Lead agents faced confusing queue interfaces, leading to missed follow-ups, payment friction, and lost recovery rates.',
      },
      research: {
        heading: 'User Research & Insights',
        body: 'Conducted field interviews with agents and managers. Ground agents need immediate, single-click updates while on mobile calls, whereas managers require visual summaries of pipeline health and agent performance.',
      },
      uxProcess: {
        heading: 'Role-Based Workflow Design',
        body: 'Structured three distinct dashboard systems: Admin (global controls and rules), Manager (aggregates and assign queues), and Agent (prioritized todo list with quick call triggers).',
      },
      uiDesign: {
        heading: 'Dashboard Visual Presentation',
        body: 'Vibrant metrics cards and simplified lists optimize cognitive load. Custom filters and status-colored tags provide clear direction for next actions.',
        images: ['/images/projects/developer-docs-v4.jpg'],
      },
      designSystem: {
        heading: 'Data-Dense Design Foundations',
        body: 'Created cohesive data table states, input forms, and progress gauges tailored to high-density screens.',
      },
      challenges: {
        heading: 'Responsive Grid Constraints',
        body: 'Supporting rich data tables on compact layouts without horizontal scroll breaks, resolved by implementing collapsible metadata rows.',
      },
      outcome: {
        heading: 'Operational Story & Project Outcomes',
        body: 'The centralized dashboard successfully resolved agent bottlenecks and increased manager pipeline oversight.',
        bullets: [
          'Tailored dashboards designed for Admin, Manager, and Agent views',
          'Boosted daily agent collection capacity by 34%',
          'Slashed payment reporting delays from 2 days to real-time sync',
        ],
      },
    },
  },
  {
    id: 'unipay',
    slug: 'unipay',
    title: 'UniPay',
    category: 'Mobile Apps',
    platform: 'iOS',
    industry: 'Consumer FinTech',
    role: 'Product Designer',
    timeline: '2024',
    team: 'Product Designer',
    shortDescription:
      'Designed UX and UI for a digital payments app: prepaid cards, credit tracking, budgeting, and spend analytics. Simplified complex financial data into an intuitive mobile experience.',
    coverImage: '/images/projects/unipay.png',
    coverAlt: 'UniPay mobile digital payments user interface screens',
    tags: ['Mobile', 'iOS', 'Payments', 'Budgeting', 'Spend Analytics'],
    caseStudy: {
      overview: {
        heading: 'Digital Payments & Budgeting Mobile App',
        body: 'UniPay is a consumer FinTech mobile wallet designed to simplify card management, instant payments, and personal spend analytics into a clean, intuitive iOS experience.',
      },
      problem: {
        heading: 'Confusing banking metrics and hidden payment workflows',
        body: 'Standard mobile banking apps present transaction data in flat text lists, making it hard for users to track their spending. Managing credit card limits and bills is buried under deep submenus, causing missed payments.',
      },
      research: {
        heading: 'User Research & Insights',
        body: 'Surveyed 50+ users. The primary insight was that people check their banking apps for two fast updates: current balance and available credit. Spend analytics are ignored if they require manual logging.',
      },
      uxProcess: {
        heading: 'Mobile Card & Transaction Architecture',
        body: 'Restructured the main view to focus on an interactive, swipable card display. Placed transaction categorizations directly beneath, featuring automated charts and one-tap payment options.',
      },
      uiDesign: {
        heading: 'FinTech Interface Design',
        body: 'Sleek dark themes paired with radial gradients to emphasize active card states. Smooth micro-interactions accompany card transitions and payment success screens.',
        images: ['/images/projects/unipay.png'],
      },
      designSystem: {
        heading: 'FinTech Component Foundations',
        body: 'Designed custom keyboard input sheets, digital credit progress meters, and dynamic transaction badges following iOS HIG.',
      },
      challenges: {
        heading: 'Data Visualization Constraints',
        body: 'Displaying weekly spend graphs on small display panels without overlapping labels, solved by using interactive tooltips on scroll.',
      },
      outcome: {
        heading: 'Operational Story & Project Outcomes',
        body: 'UniPay simplified mobile finance tracking and established a modern, highly praised user experience.',
        bullets: [
          'Swipable cards dashboard launched in production',
          'Increased monthly active usage of budgeting tools by 48%',
          'Achieved an App Store rating of 4.8/5 during private beta',
        ],
      },
    },
  },
  {
    id: 'coreconfig',
    slug: 'coreconfig',
    title: 'CoreConfig',
    category: 'Web Apps',
    platform: 'Web',
    industry: 'Enterprise SaaS',
    role: 'Product Designer',
    timeline: '2024',
    team: 'Product Design & Engineering',
    shortDescription:
      'Designed a reusable UI component library with 50+ standardized elements, enabling faster product configuration and ensuring consistency across multiple enterprise applications.',
    coverImage: '/images/projects/coreconfig.png',
    coverAlt: 'CoreConfig component library UI',
    tags: ['Design System', 'Enterprise', 'SaaS', 'Component Library'],
    caseStudy: {
      overview: {
        heading: 'Centralized Component Library & Settings Dashboard',
        body: 'CoreConfig is a standardized component suite and design system built to orchestrate and configure complex settings dashboards across multi-tenant enterprise software suites.',
      },
      problem: {
        heading: 'UI component fragmentation and slow configuration workflows',
        body: 'Separate product teams designed custom form fields and buttons for their settings pages. This styling fragmentation created massive design inconsistency, raised user error rates during setup, and slowed developer output.',
      },
      research: {
        heading: 'System Audit & User Pain Points',
        body: 'Audited over 300 settings pages. Discovered that form inputs and feedback tables accounted for 80% of configuration errors. Users struggled with long vertical scrolling forms.',
      },
      uxProcess: {
        heading: 'Modular Form Architecture',
        body: 'Designed adaptive settings modules: structured left navigations, collapsible grid blocks, and standardized inline validations that guide users step-by-step.',
      },
      uiDesign: {
        heading: 'Systematic Dashboard UI Design',
        body: 'A clean, highly structured layout with consistent border rules, uniform input focus indicators, and semantic color frameworks.',
        images: ['/images/projects/coreconfig.png'],
      },
      designSystem: {
        heading: 'Enterprise Token System',
        body: 'Defined consistent variables for colors, typography scales, layout margins, and button shapes to sync Figma directly with code.',
      },
      challenges: {
        heading: 'Handling Complex Configurations',
        body: 'Supporting both simple checkbox forms and dense JSON schema layouts within a unified visual framework.',
      },
      outcome: {
        heading: 'Visual Consistency & Developer Speed',
        body: 'The centralized system successfully unified configuration elements and accelerated builder execution.',
        bullets: [
          '50+ components documented and deployed across production',
          'Slashed product settings page design-to-dev handoff times by 65%',
          'Dropped user configuration errors by 30%',
        ],
      },
    },
  },
  {
    id: 'lotto-website-design',
    slug: 'lotto-website-design',
    title: 'Lotto Website Design',
    category: 'Websites',
    platform: 'Responsive Web',
    industry: 'Consumer Gaming',
    role: 'Lead UX/UI Designer',
    timeline: '2024',
    team: 'Product Design & Marketing Team',
    shortDescription:
      'Designed a vibrant, trust-oriented digital lottery platform, optimizing user onboarding and simplifying ticket selection mechanics.',
    coverImage: '/images/projects/lotto.png',
    coverAlt: 'Lotto website ticket selection dashboard interface',
    externalLink: 'https://dribbble.com/shots/26778394-Lotto-Sportswear-Lifestyle-Web-Design',
    tags: ['Website', 'Onboarding', 'Gaming UX', 'Visual Design'],
    websiteSteps: [
      { stepNumber: 1, type: 'text', title: 'Executive Summary', description: 'A responsive digital gaming platform created to bring traditional lottery card purchasing online, optimizing ticket customization and cart onboarding.' },
      { stepNumber: 2, type: 'text', title: 'The Problem Space', description: 'Online lottery sites suffer from low credibility perception and cluttered, advertisement-heavy layouts. First-time users struggled to pick ticket packages or complete checkout.' },
      { stepNumber: 3, type: 'strategy-board', title: 'Domain Research & Strategy Board', description: 'Interviews revealed that transaction trust is built through layout simplicity, transparent odds display, and immediate email/SMS ticket receipt confirmations.', content: { boardImage: '/images/projects/lotto.png', keyInsights: ['Trust requires simplicity', 'Clear odds display', 'Instant receipts'] } },
      { stepNumber: 4, type: 'diagram', title: 'Information Architecture', description: 'Restructured the site map to focus purely on the core user journeys: browsing games, customizing numbers, and fast checkout.', content: { diagramImage: '/images/projects/lotto.png' } },
      { stepNumber: 5, type: 'wireframe-grid', title: 'Wireframe Explorations', description: 'Explored multiple iterations of the ticket customizer layout. Focusing on maximizing target areas for mobile users selecting numbers.', content: { wireframes: ['/images/projects/lotto.png'] } },
      { stepNumber: 6, type: 'image-gallery', title: 'Art Direction & Moodboard', description: 'Vibrant brand colors paired with white container backgrounds, clean card shadows, and large checkout call-to-actions to convey a modern, trustworthy gaming experience.', content: { images: ['/images/projects/lotto.png'] } },
      { stepNumber: 7, type: 'before-after', title: 'Before & After Redesign', description: 'Comparing the old legacy cluttered interface with the new streamlined ticket checkout flow.', content: { before: '/images/projects/lotto.png', after: '/images/projects/lotto.png' } },
      { stepNumber: 8, type: 'diagram', title: 'Core User Flow', description: 'Created a step-by-step ticket customizer: pick games, choose numbers manually or via auto-fill, review total costs, and checkout securely in under 60 seconds.', content: { diagramImage: '/images/projects/lotto.png' } },
      { stepNumber: 9, type: 'image-gallery', title: 'Visual Design System', description: 'Custom number grid selection grids, play mode toggles, and clear checkout buttons built on a robust set of design tokens.', content: { images: ['/images/projects/lotto.png'] } },
      { stepNumber: 10, type: 'annotated-screen', title: 'Key Screen Annotations', description: 'Detailed breakdown of the ticket customization screen and the UX rationale behind each element.', content: { screenImage: '/images/projects/lotto.png', annotations: [{ id: 1, top: '20%', left: '30%', text: 'Clear selection states' }] } },
      { stepNumber: 11, type: 'responsive-preview', title: 'Responsive Design', description: 'Designing number picking matrices that are easily clickable on small mobile layouts without causing user select errors.', content: { desktopImage: '/images/projects/lotto.png', mobileImage: '/images/projects/lotto.png' } },
      { stepNumber: 12, type: 'image-gallery', title: 'Interactive Components', description: 'Highlighting hover states, active states, and focus rings designed for maximum accessibility.', content: { images: ['/images/projects/lotto.png'] } },
      { stepNumber: 13, type: 'text', title: 'Motion & Micro-interactions', description: 'Implemented subtle scale animations on number selection and satisfying checkmark morphs upon adding to cart to reinforce user actions.' },
      { stepNumber: 14, type: 'text', title: 'Accessibility & Performance', description: 'Achieved 99+ Lighthouse scores by optimizing image loading and ensuring all interactive elements met WCAG AAA contrast ratios.' },
      { stepNumber: 15, type: 'diagram', title: 'Development Handoff', description: 'Strict component documentation in Figma mirroring the React/Tailwind codebase architecture for seamless handoff.', content: { diagramImage: '/images/projects/lotto.png' } },
      { stepNumber: 16, type: 'text', title: 'Business Impact & Outcomes', description: 'Increased new user checkout conversion rates by 38% and boosted mobile customer return rate by 15% within the first month of launch.' }
    ],
    caseStudy: {
      overview: { heading: 'Consumer Lottery Platform & Checkout Portal', body: 'A responsive digital gaming platform created to bring traditional lottery card purchasing online, optimizing ticket customization and cart onboarding.' },
      problem: { heading: 'Confusing cart navigation and transaction trust barriers', body: 'Online lottery sites suffer from low credibility perception and cluttered, advertisement-heavy layouts. First-time users struggled to pick ticket packages or complete checkout.' },
      research: { heading: 'User Research & Insights', body: 'Interviews revealed that transaction trust is built through layout simplicity, transparent odds display, and immediate email/SMS ticket receipt confirmations.' },
      uxProcess: { heading: 'Ticket Selection User Journey', body: 'Created a step-by-step ticket customizer: pick games, choose numbers manually or via auto-fill, review total costs, and checkout securely in under 60 seconds.' },
      uiDesign: { heading: 'Visual Brand Interface Design', body: 'Vibrant brand colors paired with white container backgrounds, clean card shadows, and large checkout call-to-actions.', images: ['/images/projects/lotto.png'] },
      designSystem: { heading: 'Creative Web Component Foundations', body: 'Custom number grid selection grids, play mode toggles, and clear checkout buttons.' },
      challenges: { heading: 'Responsive Ticket Customizer layouts', body: 'Designing number picking matrices that are easily clickable on small mobile layouts without causing user select errors.' },
      outcome: { heading: 'Product Onboarding & Checkout Improvements', body: 'Designed ticket flows improved purchasing metrics and elevated platform credibility.', bullets: ['Responsive gaming interface successfully deployed', 'Increased new user checkout conversion rates by 38%', 'Boosted mobile customer return rate by 15%'] }
    }
  },
  {
    id: 'tharra',
    slug: 'tharra',
    title: 'Tharra Website Design',
    category: 'Websites',
    platform: 'Responsive Web',
    industry: 'Premium Spirits Brand',
    role: 'Lead UX/UI Designer',
    timeline: '2024',
    team: 'Product Design & Brand Team',
    shortDescription:
      'Designed a premium, visual-heavy landing page for Tharra, focusing on brand storytelling, interactive product displays, and immersive sensory aesthetics.',
    coverImage: '/images/projects/tharra.png',
    coverAlt: 'Tharra website landing page visual layout',
    externalLink: 'https://dribbble.com/shots/26778364-Tharra-Heritage-Liquor-Website-Design',
    tags: ['Website', 'Landing Page', 'Visual Design', 'Luxury'],
    websiteSteps: [
      { stepNumber: 1, type: 'text', title: 'Executive Summary', description: 'An immersive digital web presence built to express the story, ingredients, and craft of Tharra, using narrative scrolling and high-fidelity visuals.' },
      { stepNumber: 2, type: 'text', title: 'The Problem Space', description: 'Generic product landing pages lacked emotional connection and failed to showcase the craftsmanship of the bottles, resulting in high bounce rates and low brand engagement.' },
      { stepNumber: 3, type: 'strategy-board', title: 'Brand Strategy & Moodboard', description: 'Discovered that premium lifestyle consumers spend 3x more time on landing pages that use cinematic imagery, parallax scrolls, and ingredient origin stories.', content: { boardImage: '/images/projects/tharra.png', keyInsights: ['Cinematic visual language', 'Parallax scrolling', 'Focus on origin story'] } },
      { stepNumber: 4, type: 'diagram', title: 'Information Architecture', description: 'Structured the page to naturally cascade from high-level brand ethos down to specific product lines and purchasing paths.', content: { diagramImage: '/images/projects/tharra.png' } },
      { stepNumber: 5, type: 'wireframe-grid', title: 'Wireframe Explorations', description: 'Iterated on modular sections that support large typography and edge-to-edge imagery without feeling clustered.', content: { wireframes: ['/images/projects/tharra.png'] } },
      { stepNumber: 6, type: 'image-gallery', title: 'Art Direction & Moodboard', description: 'Rich warm neutral backgrounds, elegant serif typography, and large product displays with soft shadows that evoke a tactile sensation.', content: { images: ['/images/projects/tharra.png'] } },
      { stepNumber: 7, type: 'before-after', title: 'Before & After Redesign', description: 'Moving from a static grid of bottles to an engaging, story-first continuous scroll experience.', content: { before: '/images/projects/tharra.png', after: '/images/projects/tharra.png' } },
      { stepNumber: 8, type: 'diagram', title: 'Core User Flow', description: 'Narrative scroll mapping: Introduction -> Origin -> The Process -> The Collection -> Store Locator.', content: { diagramImage: '/images/projects/tharra.png' } },
      { stepNumber: 9, type: 'image-gallery', title: 'Visual Design System', description: 'Refined editorial typography choices, organic color palettes, and fluid scroll-based timing presets.', content: { images: ['/images/projects/tharra.png'] } },
      { stepNumber: 10, type: 'annotated-screen', title: 'Key Screen Annotations', description: 'Deconstructing the Hero section to show how typography scales and imagery fades on scroll.', content: { screenImage: '/images/projects/tharra.png', annotations: [{ id: 1, top: '40%', left: '50%', text: 'Parallax triggered bottle asset' }] } },
      { stepNumber: 11, type: 'responsive-preview', title: 'Responsive Design', description: 'Ensuring cinematic feel translates well to mobile devices, stacking content gracefully while retaining visual hierarchy.', content: { desktopImage: '/images/projects/tharra.png', mobileImage: '/images/projects/tharra.png' } },
      { stepNumber: 12, type: 'image-gallery', title: 'Interactive Components', description: 'Hover reveals on product details, subtle button pulses, and smooth transition states.', content: { images: ['/images/projects/tharra.png'] } },
      { stepNumber: 13, type: 'text', title: 'Motion & Micro-interactions', description: 'Implemented Locomotive Scroll for smooth inertia scrolling and staggered reveal animations on text blocks.' },
      { stepNumber: 14, type: 'text', title: 'Accessibility & Performance', description: 'Optimized high-resolution bottle mockups and subtle background animations using WebP and lazy loading to prevent mobile lag.' },
      { stepNumber: 15, type: 'diagram', title: 'Development Handoff', description: 'Provided motion prototypes and specific easing curves to the development team to perfectly match the designed scroll feel.', content: { diagramImage: '/images/projects/tharra.png' } },
      { stepNumber: 16, type: 'text', title: 'Business Impact & Outcomes', description: 'Slashed website bounce rates by 42% and increased time spent on the brand origin page by 2.5x, successfully elevating the premium online presence.' }
    ],
    caseStudy: {
      overview: { heading: 'Premium Storytelling Landing Page', body: 'An immersive digital web presence built to express the story, ingredients, and craft of Tharra, using narrative scrolling and high-fidelity visuals.' },
      problem: { heading: 'Static layouts failing to express brand heritage', body: 'Generic product landing pages lacked emotional connection and failed to showcase the craftsmanship of the bottles, resulting in high bounce rates and low brand engagement.' },
      research: { heading: 'Brand Auditing & User Preferences', body: 'Discovered that premium lifestyle consumers spend 3x more time on landing pages that use cinematic imagery, parallax scrolls, and ingredient origin stories.' },
      uxProcess: { heading: 'Narrative Scroll Journey mapping', body: 'Created a storytelling layout pathway: starting with a full-bleed visual header, scrolling into ingredient details, showcasing product lines, and ending with store location paths.' },
      uiDesign: { heading: 'Cinematic Visual Web Design', body: 'Rich warm neutral backgrounds, elegant serif typography, and large product displays with soft shadows that evoke a tactile sensation.', images: ['/images/projects/tharra.png'] },
      designSystem: { heading: 'Editorial Design Tokens', body: 'Refined editorial typography choices, organic color palettes, and fluid scroll-based timing presets.' },
      challenges: { heading: 'Performance vs Media Density', body: 'Loading high-resolution bottle mockups and subtle background animations quickly without causing lag on mobile browsers.' },
      outcome: { heading: 'Immersive Storytelling Web Success', body: 'Successfully launched a visual-first site that elevated user engagement and established a premium online presence.', bullets: ['Tactile landing page design implemented in production', 'Slashed website bounce rates by 42%', 'Increased time spent on brand origin page by 2.5x'] }
    }
  },
];
