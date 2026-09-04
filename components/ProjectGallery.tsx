'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ProjectCard } from '@/components/ProjectCard';
import { cn } from '@/lib/utils';
import type { Project } from '@/lib/types';

// ─────────────────────────────────────────
// Project Gallery (Embla Carousel)
// ─────────────────────────────────────────

interface ProjectGalleryProps {
  projects: Project[];
  onProjectOpen: (id: string) => void;
  emblaRef: (node: HTMLElement | null) => void;
  canScrollPrev?: boolean;
  canScrollNext?: boolean;
}

export function ProjectGallery({
  projects,
  onProjectOpen,
  emblaRef,
  canScrollPrev = false,
  canScrollNext = false,
}: ProjectGalleryProps) {
  // Determine mask style dynamically based on scrolling capability
  let maskClass = '';
  if (canScrollPrev && canScrollNext) {
    maskClass = 'gallery-fade-both'; // fade both left and right
  } else if (canScrollPrev) {
    maskClass = 'gallery-fade-left'; // fade left only (last card visible, remove right fade)
  } else if (canScrollNext) {
    maskClass = 'gallery-fade-right'; // fade right only (first card visible, remove left fade)
  }

  return (
    <div className="relative" role="region" aria-label="Project gallery">
      {/* Carousel viewport - py-6 -my-6 px-4 -mx-4 gives space for card hover shadow lift and spillover without clipping */}
      <div
        className={cn(
          'overflow-hidden py-6 -my-6 px-4 -mx-4 transition-all duration-300',
          maskClass
        )}
        ref={emblaRef}
      >
        <AnimatePresence mode="popLayout">
          <div
            className="flex gap-6"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  layout: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 },
                }}
                className={cn(
                  // Responsive card widths: 3 cards desktop/laptop, 2 tablet, 1 mobile
                  // gap-6 (24px) accounts for 48px of total gaps across 3 items, so w = calc((100% - 48px) / 3)
                  'flex-shrink-0',
                  'w-[85vw]', // Mobile: ~1 card
                  'sm:w-[calc(50%-12px)]', // Tablet: 2 cards
                  'lg:w-[calc(33.333%-16px)]', // Desktop/Laptop: 3 cards
                )}
              >
                <ProjectCard
                  project={project}
                  onOpen={onProjectOpen}
                  index={index}
                />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}
