'use client';

import { useMemo, useCallback, useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SegmentedControl } from '@/components/SegmentedControl';
import { ToolCarousel } from '@/components/ToolCarousel';
import { ProjectGallery } from '@/components/ProjectGallery';
import { filterProjects, getCategoryCount } from '@/lib/utils';
import { cn } from '@/lib/utils';
import type { Project, ProjectCategory } from '@/lib/types';

// ─────────────────────────────────────────
// Projects Section
// Header & Filter Inline + Gallery + Tools
// ─────────────────────────────────────────

interface ProjectsSectionProps {
  projects: Project[];
  activeFilter: ProjectCategory;
  onFilterChange: (filter: ProjectCategory) => void;
  onProjectOpen: (id: string) => void;
}

const CATEGORIES: Exclude<ProjectCategory, 'All'>[] = [
  'Web Apps',
  'Mobile Apps',
  'Websites',
];

export function ProjectsSection({
  projects,
  activeFilter,
  onFilterChange,
  onProjectOpen,
}: ProjectsSectionProps) {
  const filteredProjects = useMemo(
    () => filterProjects(projects, activeFilter),
    [projects, activeFilter]
  );

  const filterOptions = useMemo(
    () => [
      { label: 'All' as ProjectCategory, count: projects.length },
      ...CATEGORIES.map((cat) => ({
        label: cat as ProjectCategory,
        count: getCategoryCount(projects, cat),
      })),
    ],
    [projects]
  );

  // Tracks if scroll navigation is needed (whether the viewport has scrollable items)
  const [canScroll, setCanScroll] = useState(false);
  
  // Tracks if the user can scroll backward (first card is NOT fully visible)
  const [canScrollPrev, setCanScrollPrev] = useState(false);

  // Tracks if the user can scroll forward (last card is NOT fully visible in view)
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Initialize Embla Carousel here with the WheelGesturesPlugin to enable mouse wheel scrolling
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'start',
      containScroll: 'trimSnaps',
      dragFree: false, // snaps card-by-card on drag/swipe/scroll
    },
    [WheelGesturesPlugin()]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Update scroll navigation capability states
  useEffect(() => {
    if (!emblaApi) return;
    const updateScrollStatus = () => {
      const prev = emblaApi.canScrollPrev();
      const next = emblaApi.canScrollNext();
      setCanScrollPrev(prev);
      setCanScrollNext(next);
      setCanScroll(prev || next);
    };
    
    // Run on initialize/changes
    updateScrollStatus();
    emblaApi.on('select', updateScrollStatus);
    emblaApi.on('scroll', updateScrollStatus);
    emblaApi.on('reInit', updateScrollStatus);
    return () => {
      emblaApi.off('select', updateScrollStatus);
      emblaApi.off('scroll', updateScrollStatus);
      emblaApi.off('reInit', updateScrollStatus);
    };
  }, [emblaApi, filteredProjects]);

  return (
    <div className="flex flex-col gap-8">
      {/* ── Header and Tabs in the Same Row ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Left: Title & Description */}
        <div className="flex flex-col gap-1 max-w-md">
          <h2
            className="text-heading-xl text-[var(--text-primary)] font-heading"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Things I’ve Designed
          </h2>
        </div>

        {/* Right: Segmented Control Tabs */}
        <div className="flex-shrink-0">
          <SegmentedControl
            options={filterOptions}
            value={activeFilter}
            onChange={onFilterChange}
          />
        </div>
      </div>

      {/* ── Project Gallery ── */}
      <div className="relative group/gallery">
        <ProjectGallery
          projects={filteredProjects}
          onProjectOpen={onProjectOpen}
          emblaRef={emblaRef}
          canScrollPrev={canScrollPrev}
          canScrollNext={canScrollNext}
        />

        {/* Left Arrow Button */}
        {canScroll && canScrollPrev && (
          <button
            onClick={scrollPrev}
            aria-label="Previous projects"
            className={cn(
              'absolute left-2 top-[calc(50%-18px)] z-20',
              'flex items-center justify-center w-9 h-9 rounded-full',
              'border border-[var(--border-primary)] bg-[var(--surface-elevated)]',
              'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]',
              'shadow-md cursor-pointer transition-all duration-200 focus-visible:outline-[var(--primary)]'
            )}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {/* Right Arrow Button */}
        {canScroll && canScrollNext && (
          <button
            onClick={scrollNext}
            aria-label="Next projects"
            className={cn(
              'absolute right-2 top-[calc(50%-18px)] z-20',
              'flex items-center justify-center w-9 h-9 rounded-full',
              'border border-[var(--border-primary)] bg-[var(--surface-elevated)]',
              'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]',
              'shadow-md cursor-pointer transition-all duration-200 focus-visible:outline-[var(--primary)]'
            )}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* ── Tools Carousel ── */}
      <div className="mt-4">
        <p className="text-label text-[var(--text-tertiary)] mb-3">My toolkit</p>
        <ToolCarousel />
      </div>
    </div>
  );
}
