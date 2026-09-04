{\rtf1\ansi\ansicpg1252\cocoartf2870
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww28600\viewh14720\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 # Product Requirements Document (PRD)\
\
# Portfolio Website \'96 Single Viewport Interactive Experience\
\
**Version:** 1.0  \
**Owner:** Viswa  \
**Type:** Personal Portfolio Website  \
**Status:** Draft\
\
---\
\
# 1. Product Vision\
\
Design and develop a premium portfolio website that showcases product design work through a **single-page, single-viewport experience**.\
\
Instead of navigating between multiple pages, visitors should be able to browse projects instantly and explore complete case studies through immersive modal windows without leaving the landing page.\
\
The portfolio should communicate product thinking, attention to detail, and interaction design while remaining highly accessible and performant.\
\
---\
\
# 2. Objectives\
\
## Primary Goals\
\
- Showcase Product Design expertise.\
- Allow recruiters to evaluate projects within minutes.\
- Reduce navigation friction.\
- Create a memorable browsing experience.\
- Demonstrate UX, UI, accessibility, and interaction design skills.\
\
## Success Criteria\
\
- Recruiter understands profile within 10 seconds.\
- First project interaction occurs within 15 seconds.\
- Portfolio loads in under 2 seconds.\
- Accessibility score \uc0\u8805  100 (Lighthouse).\
- Performance score \uc0\u8805  95.\
\
---\
\
# 3. Target Audience\
\
## Primary\
\
- Product Design Managers\
- Hiring Managers\
- Recruiters\
- Startup Founders\
\
## Secondary\
\
- Designers\
- Freelance Clients\
- Agencies\
\
---\
\
# 4. Design Principles\
\
- Simplicity over complexity.\
- Product-first storytelling.\
- Progressive disclosure.\
- Minimal interactions with maximum clarity.\
- Accessibility by default.\
- Motion should enhance usability, not distract.\
\
---\
\
# 5. User Journey\
\
```\
Landing\
\
\uc0\u8595 \
\
Read introduction\
\
\uc0\u8595 \
\
Browse projects\
\
\uc0\u8595 \
\
Filter category\
\
\uc0\u8595 \
\
Open project modal\
\
\uc0\u8595 \
\
Explore case study\
\
\uc0\u8595 \
\
Close modal\
\
\uc0\u8595 \
\
Continue browsing\
```\
\
No page navigation is required.\
\
---\
\
# 6. Information Architecture\
\
```\
Landing Page\
\
\uc0\u9500 \u9472 \u9472  Hero\
\uc0\u9474    \u9500 \u9472 \u9472  Introduction\
\uc0\u9474    \u9500 \u9472 \u9472  Professional Summary\
\uc0\u9474    \u9500 \u9472 \u9472  Contact Links\
\uc0\u9474    \u9492 \u9472 \u9472  Experience Timeline\
\uc0\u9474 \
\uc0\u9500 \u9472 \u9472  Projects Section\
\uc0\u9474    \u9500 \u9472 \u9472  Project Counter\
\uc0\u9474    \u9500 \u9472 \u9472  Filter Tabs\
\uc0\u9474    \u9500 \u9472 \u9472  Tools Carousel\
\uc0\u9474    \u9492 \u9472 \u9472  Project Grid / Carousel\
\uc0\u9474 \
\uc0\u9492 \u9472 \u9472  Project Modal\
    \uc0\u9500 \u9472 \u9472  Hero\
    \uc0\u9500 \u9472 \u9472  Overview\
    \uc0\u9500 \u9472 \u9472  Problem\
    \uc0\u9500 \u9472 \u9472  Research\
    \uc0\u9500 \u9472 \u9472  UX Process\
    \uc0\u9500 \u9472 \u9472  Final UI\
    \uc0\u9500 \u9472 \u9472  Design System\
    \uc0\u9500 \u9472 \u9472  Challenges\
    \uc0\u9500 \u9472 \u9472  Outcome\
    \uc0\u9492 \u9472 \u9472  Next Project\
```\
\
---\
\
# 7. Landing Page Layout\
\
The landing page should ideally fit within a single viewport on desktop screens.\
\
Scrolling should only occur when:\
\
- Browser zoom exceeds 100%\
- Laptop viewport becomes smaller\
- Tablet/mobile layouts require stacking\
\
The design **must never lock scrolling**.\
\
---\
\
# 8. Hero Section\
\
## Left Column\
\
Contains:\
\
- Name\
- Designation\
- Professional Summary\
- Years of Experience\
- Current Location\
- Resume\
- LinkedIn\
- Behance\
- Email\
\
Example\
\
```\
Viswa\
\
Product Designer\
\
Designing enterprise software,\
FinTech,\
AI,\
and digital products.\
\
2+ Years\
Bengaluru\
```\
\
---\
\
## Right Column\
\
Experience Timeline\
\
Example\
\
```\
2024 \'97 Present\
\
Product Designer\
\
YABX (Consultant)\
\
\uc0\u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \
\
2023 \'97 2024\
\
Product Designer\
\
Previous Company\
```\
\
---\
\
# 9. Projects Section\
\
## Header\
\
```\
Selected Projects (12)\
```\
\
The count updates dynamically if projects are added.\
\
---\
\
# 10. Project Categories\
\
Available filters\
\
- All\
- Web Apps\
- Mobile Apps\
- Websites\
\
Requirements\
\
- One active filter\
- Animated transition\
- Keyboard accessible\
- Visible active state\
\
---\
\
# 11. Tools Carousel\
\
Purpose\
\
Showcase tools and technologies used.\
\
Examples\
\
- Figma\
- FigJam\
- Framer\
- Claude\
- Cursor\
- ChatGPT\
- Photoshop\
- Illustrator\
- After Effects\
\
Requirements\
\
- Slow continuous animation\
- Pause on hover\
- Pause on keyboard focus\
- Respect `prefers-reduced-motion`\
\
---\
\
# 12. Project Gallery\
\
The portfolio should support an unlimited number of projects.\
\
Instead of limiting the layout to four projects, the gallery should be horizontally scrollable while maintaining the same card size.\
\
Desktop Example\
\
```\
\uc0\u8592 \
\
Card\
Card\
Card\
Card\
Partial Card \uc0\u8594 \
\
```\
\
This provides a visual cue that additional projects are available.\
\
Users should be able to:\
\
- Drag horizontally\
- Swipe on touch devices\
- Use previous/next buttons\
- Navigate using keyboard\
\
---\
\
# 13. Project Card\
\
Each card contains\
\
- Cover Image\
- Project Name\
- Platform\
- Industry\
- Short Description\
- Role\
\
Entire card must be clickable.\
\
Hover\
\
- Scale (1.02)\
- Elevated shadow\
- Arrow animation\
\
Hover must never reveal essential information.\
\
---\
\
# 14. Project Modal\
\
Clicking a project expands it into a fullscreen modal.\
\
Animation\
\
```\
Card\
\
\uc0\u8595 \
\
Shared Element Transition\
\
\uc0\u8595 \
\
Fullscreen Modal\
```\
\
Closing\
\
```\
Modal\
\
\uc0\u8595 \
\
Shrinks\
\
\uc0\u8595 \
\
Returns to original card\
```\
\
The background should blur while the modal remains focused.\
\
---\
\
# 15. Modal Content Structure\
\
## Hero\
\
- Project Cover\
- Project Name\
- Category\
- Timeline\
- Team\
- Role\
\
---\
\
## Overview\
\
Brief summary.\
\
---\
\
## Problem\
\
Business and user challenges.\
\
---\
\
## Research\
\
- Research Process\
- Personas\
- User Insights\
\
---\
\
## UX Process\
\
- Information Architecture\
- User Flow\
- Wireframes\
\
---\
\
## UI Design\
\
High Fidelity Screens\
\
---\
\
## Design System\
\
- Typography\
- Colors\
- Components\
\
---\
\
## Challenges\
\
Design decisions and trade-offs.\
\
---\
\
## Outcome\
\
- Final Solution\
- Business Impact\
- Learnings\
\
---\
\
## Navigation\
\
Previous Project\
\
Next Project\
\
Without leaving the modal.\
\
---\
\
# 16. Motion Design\
\
Landing\
\
- Fade In\
- Slide Up\
\
Cards\
\
- Lift\
- Shadow\
- Scale\
\
Modal\
\
- Shared Element Transition\
\
Images\
\
- Lazy reveal while scrolling\
\
Filter\
\
- Fade and rearrange\
\
Animations should remain subtle.\
\
---\
\
# 17. Accessibility Requirements\
\
## Keyboard Navigation\
\
Users must be able to\
\
- Navigate filters\
- Browse project cards\
- Open projects\
- Navigate modal\
- Close modal\
- Continue browsing\
\
---\
\
## Modal Accessibility\
\
When opened\
\
- Focus moves into modal\
\
While open\
\
- Focus remains trapped\
\
Close methods\
\
- ESC\
- Close Button\
\
After closing\
\
- Focus returns to originating project card\
\
---\
\
## Screen Readers\
\
Project cards require descriptive labels.\
\
Example\
\
```\
Open Observance Case Study\
```\
\
---\
\
## Touch Targets\
\
Minimum\
\
```\
44 \'d7 44 px\
```\
\
---\
\
## Contrast\
\
Follow WCAG AA\
\
Minimum\
\
- Body Text: 4.5:1\
- Large Text: 3:1\
\
---\
\
## Motion Preferences\
\
Respect\
\
```\
prefers-reduced-motion\
```\
\
Disable\
\
- Shared transitions\
- Auto-scrolling carousel\
- Heavy animations\
\
---\
\
# 18. Responsive Behaviour\
\
## Desktop (>1440px)\
\
- Single viewport\
- Four project cards visible\
- Horizontal project browsing\
\
---\
\
## Laptop (1280\'961440px)\
\
- Three project cards\
- Partial fourth card\
- Horizontal scrolling\
\
---\
\
## Tablet\
\
- Two cards\
\
---\
\
## Mobile\
\
- One card\
- Swipe navigation\
- Fullscreen modal\
\
---\
\
# 19. Performance\
\
Requirements\
\
- Initial Load <2s\
- Lazy load images\
- Lazy load modal content\
- Responsive images\
- WebP/AVIF\
- 60 FPS animations\
\
---\
\
# 20. Recommended Technology\
\
Frontend\
\
- Next.js\
- React\
- TypeScript\
\
Styling\
\
- Tailwind CSS\
\
Animation\
\
- Framer Motion\
\
Icons\
\
- Lucide\
\
Hosting\
\
- Vercel\
\
---\
\
# 21. Future Enhancements\
\
- Dark Mode\
- Command Palette\
- Search Projects\
- Featured Case Study\
- Blog\
- Analytics\
- Resume Download Tracking\
- Theme Customization\
\
---\
\
# 22. Non-Functional Requirements\
\
### Performance\
\
- Lighthouse Performance \uc0\u8805 95\
\
### Accessibility\
\
- Lighthouse Accessibility =100\
\
### SEO\
\
- Lighthouse SEO \uc0\u8805 100\
\
### Best Practices\
\
- Lighthouse Best Practices =100\
\
---\
\
# 23. Key UX Decisions\
\
- No traditional navigation bar.\
- No separate project pages.\
- Single landing page acts as the portfolio dashboard.\
- Projects open within immersive modals.\
- Horizontal browsing supports unlimited projects.\
- Accessibility takes precedence over strict single-viewport constraints.\
- Scrolling is allowed only when necessary for smaller screens or browser zoom.\
- Motion remains subtle and purposeful.\
\
---\
\
# 24. Definition of Done\
\
The project is considered complete when:\
\
- Landing page communicates the designer's profile within 10 seconds.\
- Users can browse unlimited projects without page navigation.\
- Case studies open in immersive accessible modals.\
- Keyboard navigation works throughout the experience.\
- Responsive layouts function across desktop, tablet, and mobile.\
- Lighthouse scores meet performance, accessibility, SEO, and best practice targets.\
- The experience reflects premium product design standards while maintaining usability and accessibility.\
\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0
\cf0 ---\
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0
\cf0 \
# 25. Design System\
\
## Design Language\
\
The portfolio shall adopt **Sigma Design System 3** as its primary visual and interaction language.\
\
**Reference**\
https://www.thesigma.co/designsystem-library\
\
The implementation should follow Sigma's core principles:\
\
- Simplicity\
- Consistency\
- Harmony\
- Attention to Detail\
- Functional Elegance\
\
The UI should feel calm, spacious, modern, and premium while avoiding unnecessary visual decoration. Every interface element should follow a unified design language built on semantic tokens, typography, spacing, reusable components, and accessibility.\
\
---\
\
# Design Foundations\
\
## Color System\
\
Use semantic design tokens instead of hardcoded colors.\
\
### Surface Colors\
\
- Surface\
- Surface Secondary\
- Surface Tertiary\
- Surface Inverse\
\
### Content Colors\
\
- Text Primary\
- Text Secondary\
- Text Tertiary\
- Text Inverse\
\
### Border Colors\
\
- Border Primary\
- Border Secondary\
\
### Semantic Colors\
\
- Primary\
- Success\
- Warning\
- Danger\
- Info\
\
The design should be **Dark Mode ready**, even if only Light Mode is implemented initially.\
\
---\
\
## Typography\
\
Follow Sigma's typography hierarchy.\
\
### Type Scale\
\
- Display XL\
- Display L\
- Heading XL\
- Heading L\
- Heading M\
- Heading S\
- Body L\
- Body M\
- Body S\
- Caption\
- Label\
\
Typography should emphasize readability with generous line heights and consistent spacing.\
\
Recommended Fonts\
\
- **Headings:** Geist / General Sans\
- **Body:** Inter\
\
---\
\
## Spacing System\
\
Use an **8pt spacing system** throughout the application.\
\
Spacing Tokens\
\
- 4\
- 8\
- 12\
- 16\
- 24\
- 32\
- 40\
- 48\
- 64\
- 80\
- 96\
\
Avoid arbitrary spacing values.\
\
---\
\
## Grid System\
\
Desktop\
\
- 12-column responsive grid\
\
Tablet\
\
- 8-column grid\
\
Mobile\
\
- 4-column grid\
\
Layouts should rely on consistent gutters and responsive spacing.\
\
---\
\
## Border Radius\
\
Use Sigma's rounded corner philosophy.\
\
Suggested Tokens\
\
- Small\
- Medium\
- Large\
- Extra Large\
\
Maintain consistent corner radii across all components.\
\
---\
\
## Elevation\
\
Use elevation only where hierarchy is required.\
\
Avoid heavy shadows.\
\
Hierarchy should primarily be communicated using:\
\
- Typography\
- White Space\
- Contrast\
- Layout\
\
---\
\
# Components\
\
All UI components should follow Sigma Design System patterns.\
\
## Buttons\
\
Three hierarchy levels:\
\
### Primary\
\
Used only for:\
\
- Download Resume\
\
### Secondary\
\
Used for:\
\
- LinkedIn\
- Behance\
- Email\
\
### Tertiary\
\
Used for:\
\
- Filter Controls\
- Modal Navigation\
\
Buttons should support:\
\
- Hover\
- Focus\
- Active\
- Disabled\
\
States should follow WCAG accessibility guidelines.\
\
---\
\
## Segmented Control\
\
Project filters should use Sigma's Segmented Control component.\
\
Segments\
\
- All\
- Web Apps\
- Mobile Apps\
- Websites\
\
Requirements\
\
- Single selection\
- Animated indicator\
- Keyboard accessible\
- Visible active state\
\
---\
\
## Cards\
\
Project cards should follow Sigma Card patterns.\
\
Each card contains:\
\
- Cover Image\
- Project Name\
- Platform\
- Industry\
- Role\
- Short Description\
\
Cards should remain lightweight with subtle elevation.\
\
Hover Interaction\
\
- Slight scale (1.02)\
- Increased elevation\
- Arrow animation\
\
Important information must never depend solely on hover.\
\
---\
\
## Sheet / Modal\
\
Project details should use Sigma's Sheet pattern rather than a traditional dialog.\
\
Requirements\
\
- Shared element transition\
- Rounded corners\
- Comfortable spacing\
- Large content width\
- Soft backdrop blur\
- Keyboard focus management\
- ESC to close\
- Focus returns to originating project card\
\
---\
\
## Lists\
\
Use Sigma list patterns for:\
\
- Timeline\
- Experience\
- Design Process\
- Research Insights\
\
Maintain consistent spacing and typography.\
\
---\
\
## Labels & Badges\
\
Badges should indicate:\
\
- Platform\
- Industry\
- Enterprise\
- SaaS\
- Mobile\
- Website\
- AI\
- FinTech\
\
Badges should use semantic colors rather than decorative colors.\
\
---\
\
## Icons\
\
Use a single icon family throughout the portfolio.\
\
Recommended\
\
- Lucide Icons\
\
Avoid mixing icon styles.\
\
---\
\
# Motion Guidelines\
\
Animations should feel intentional and subtle.\
\
Avoid:\
\
- Elastic animations\
- Bounce effects\
- Overshooting\
- Dramatic scaling\
- Excessive parallax\
\
Recommended Durations\
\
- Hover: 150\'96200ms\
- Filter Transition: 250ms\
- Card Expansion: 300ms\
- Modal Close: 250ms\
- Fade Animation: 200ms\
\
Recommended Easing\
\
- ease-out\
- ease-in-out\
\
Respect the user's `prefers-reduced-motion` preference by reducing or disabling non-essential animations.\
\
---\
\
# Layout Guidelines\
\
The layout should prioritize clarity and breathing space.\
\
Design Principles\
\
- Generous whitespace\
- Strong alignment\
- Consistent spacing\
- Clear visual hierarchy\
- Responsive auto-layout\
- Minimal visual clutter\
\
Whitespace should communicate hierarchy rather than decorative elements.\
\
---\
\
# Visual Style\
\
The interface should feel:\
\
- Minimal\
- Modern\
- Professional\
- Calm\
- Premium\
- Product-focused\
\
Avoid:\
\
- Glassmorphism\
- Neumorphism\
- Heavy gradients\
- Decorative backgrounds\
- Excessive borders\
- Overly vibrant colors\
\
Visual emphasis should come from:\
\
- Typography\
- Layout\
- Imagery\
- Spacing\
- Motion\
\
---\
\
# Accessibility Standards\
\
All Sigma components must follow WCAG 2.2 AA standards.\
\
Requirements\
\
- Keyboard navigable\
- Screen reader compatible\
- Visible focus indicators\
- Minimum touch target of 44\'d744px\
- Minimum contrast ratio of 4.5:1\
- Proper ARIA attributes\
- Focus trapping within modals\
- Semantic HTML elements\
\
Accessibility should never be sacrificed for visual aesthetics.\
\
---\
\
# Portfolio-Specific Adaptations\
\
While the portfolio follows Sigma Design System as its foundation, it should maintain a unique visual identity.\
\
Customizations include:\
\
- Editorial-style hero section\
- Custom project cover layouts\
- Interactive project gallery\
- Shared element transitions\
- Premium case study presentation\
- Product-focused storytelling\
\
Sigma should provide the **design language and component system**, while the overall experience reflects the personality and craftsmanship of the designer.\
\
---\
\
# Non-Negotiable Design Principles\
\
- Follow Sigma Design System for all UI foundations and reusable components.\
- Maintain consistent spacing, typography, and elevation throughout the interface.\
- Prioritize accessibility over aesthetics when conflicts arise.\
- Keep interactions purposeful, subtle, and performant.\
- Design every screen with responsiveness in mind.\
- Ensure the interface feels like a polished SaaS product rather than a traditional portfolio website.\
- Preserve a unique portfolio identity without directly replicating Sigma's visual style.}