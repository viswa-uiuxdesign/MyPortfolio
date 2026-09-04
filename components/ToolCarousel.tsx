'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { tools } from '@/lib/data/projects';

// ─────────────────────────────────────────
// Tool Carousel
// Slow infinite marquee — pause on hover/focus
// ─────────────────────────────────────────

// Map of high-quality premium vector SVG logos for each designer toolkit brand
const BrandIcons: Record<string, React.ReactNode> = {
  Figma: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 20a4 4 0 014-4h4v4a4 4 0 01-8 0z" fill="#24CB71"></path>
      <path d="M12 0v8h4a4 4 0 000-8h-4z" fill="#FF7237"></path>
      <path d="M15.967 16a4 4 0 100-8 4 4 0 000 8z" fill="#00B6FF"></path>
      <path d="M4 4a4 4 0 004 4h4V0H8a4 4 0 00-4 4z" fill="#FF3737"></path>
      <path d="M4 12a4 4 0 004 4h4V8H8a4 4 0 00-4 4z" fill="#874FFF"></path>
    </svg>
  ),
  Framer: (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>
    </svg>
  ),
  Claude: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" fill="#D97757"></path>
    </svg>
  ),
  ChatGPT: (
    <img className="w-3.5 h-3.5 object-contain" src="/images/chatgpt.png" alt="ChatGPT" />
  ),
  Antigravity: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.751 22.607c1.34 1.005 3.35.335 1.508-1.508C17.73 15.74 18.904 1 12.037 1 5.17 1 6.342 15.74.815 21.1c-2.01 2.009.167 2.511 1.507 1.506 5.192-3.517 4.857-9.714 9.715-9.714 4.857 0 4.522 6.197 9.714 9.715z" fill="#0A66E2"></path>
    </svg>
  ),
  Mobbin: (
    <img className="w-4.5 h-4.5 object-contain" src="/images/mobbin.png" alt="Mobbin" />
  ),
  MagicPath: (
    <img className="w-3.5 h-3.5 object-contain" src="/images/magicpath.png" alt="MagicPath" />
  ),
  Miro: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 131C6 61.965 61.965 6 131 6h249.998c69.035 0 125 55.965 125 125v249.998c0 69.035-55.965 125-125 125H131c-69.035 0-125-55.965-125-125V131z" fill="#FFDD33"/>
      <path d="M338.41 101.312h-45.388l37.824 66.457-83.212-66.457h-45.389l41.607 81.226-86.995-81.226h-45.389l45.389 103.392-45.389 206.763h45.389l86.995-221.534-41.607 221.534h45.389l83.212-236.304-37.824 236.304h45.389l83.212-258.47-83.212-51.685z" fill="#000000"/>
    </svg>
  ),
  Lovable: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path d="M151.083 0c83.413 0 151.061 67.819 151.061 151.467v57.6h50.283c83.413 0 151.082 67.797 151.082 151.466 0 83.691-67.626 151.467-151.082 151.467H0V151.467C0 67.84 67.627 0 151.083 0z" fill="url(#prefix__paint0_radial_5_27)"/>
      <defs>
        <radialGradient id="prefix__paint0_radial_5_27" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(92.545 118.724 174.844) scale(480.474 650.325)">
          <stop offset=".25" stopColor="#FE7B02"/>
          <stop offset=".433" stopColor="#FE4230"/>
          <stop offset=".548" stopColor="#FE529A"/>
          <stop offset=".654" stopColor="#DD67EE"/>
          <stop offset=".95" stopColor="#4B73FF"/>
        </radialGradient>
      </defs>
    </svg>
  ),
};

export function ToolCarousel({ className }: { className?: string }) {
  const [paused, setPaused] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Double the list for seamless looping
  const doubled = [...tools, ...tools];

  return (
    <div
      className={cn('overflow-hidden w-full gallery-fade-both py-2', className)}
      aria-label="Tools and technologies used"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        ref={listRef}
        className={cn(
          'flex gap-3 w-max',
          'animate-marquee',
          paused && 'animate-marquee-paused'
        )}
        aria-hidden="true"
      >
        {doubled.map((tool, i) => (
          <span
            key={`${tool.name}-${i}`}
            className={cn(
              'inline-flex items-center gap-2 px-3 py-1.5',
              'rounded-[var(--radius-full)]',
              'border border-[var(--border-primary)]',
              'bg-[var(--surface-elevated)]',
              'text-sm text-[var(--text-secondary)] font-medium',
              'whitespace-nowrap select-none',
              'shadow-xs'
            )}
          >
            <span
              className="inline-flex items-center justify-center flex-shrink-0"
              aria-hidden="true"
            >
              {BrandIcons[tool.name] || <span className="text-xs">✦</span>}
            </span>
            {tool.name}
          </span>
        ))}
      </div>

      {/* Screen-reader accessible static list */}
      <ul className="sr-only">
        {tools.map((tool) => (
          <li key={tool.name}>{tool.name}</li>
        ))}
      </ul>
    </div>
  );
}
