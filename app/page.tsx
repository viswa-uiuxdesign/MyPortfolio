'use client';

import { useState, useCallback, useRef } from 'react';
import { Hero } from '@/components/Hero';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ProjectModal } from '@/components/ProjectModal';
import { projects } from '@/lib/data/projects';
import type { Project, ProjectCategory } from '@/lib/types';
import { filterProjects } from '@/lib/utils';

// ─────────────────────────────────────────
// Home Page — Portfolio Dashboard
// ─────────────────────────────────────────

export default function Home() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('All');

  // ── Key fix: keep a ref to the last selected project so the modal
  // component stays mounted (with its project data intact) while the
  // exit animation plays, even after selectedProjectId becomes null. ──
  const lastProjectRef = useRef<Project | null>(null);

  const currentProject = selectedProjectId
    ? (projects.find((p) => p.id === selectedProjectId) ?? null)
    : null;

  // Update the ref whenever we have a real project selected
  if (currentProject) {
    lastProjectRef.current = currentProject;
  }

  // The modal always renders with lastProjectRef.current so it stays
  // alive during the closing animation (isOpen drives visibility).
  const modalProject = currentProject ?? lastProjectRef.current;

  const filteredProjects = filterProjects(projects, activeFilter);

  const handleOpenProject = useCallback((id: string) => {
    setSelectedProjectId(id);
  }, []);

  const handleCloseProject = useCallback(() => {
    setSelectedProjectId(null);
  }, []);

  const handleNavigateProject = useCallback(
    (direction: 'prev' | 'next') => {
      const currentIndex = filteredProjects.findIndex((p) => p.id === selectedProjectId);
      if (direction === 'prev' && currentIndex > 0) {
        setSelectedProjectId(filteredProjects[currentIndex - 1].id);
      } else if (direction === 'next' && currentIndex < filteredProjects.length - 1) {
        setSelectedProjectId(filteredProjects[currentIndex + 1].id);
      }
    },
    [filteredProjects, selectedProjectId]
  );

  const currentIndex = filteredProjects.findIndex((p) => p.id === selectedProjectId);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < filteredProjects.length - 1;

  return (
    <main className="min-h-dvh">
      {/* ── Two-column layout on desktop ── 
          Left: Hero (aside) takes 25%.
          Right: Projects (section) takes 75%.
      */}
      <div
        className="
          mx-auto max-w-[1440px] px-4 md:px-6
          lg:grid lg:grid-cols-[30%_70%] xl:grid-cols-[25%_75%] lg:gap-0 lg:min-h-dvh
        "
      >
        {/* Desktop: Fixed sticky sidebar */}
        <div className="relative hidden lg:block">
          <aside
            className="
              my-10 p-9 lg:sticky lg:top-10 lg:h-[calc(100vh-80px)] lg:overflow-y-auto
              bg-[var(--surface-elevated)] rounded-[var(--radius-2xl)]
              shadow-[0_8px_32px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-1px_0_rgba(0,0,0,0.05)]
              border border-[var(--border-secondary)]
              backdrop-blur-md
            "
          >
            <Hero />
          </aside>
        </div>

        {/* Tablet / Mobile: Inline hero banner */}
        <aside
          className="pt-8 md:pt-12 pb-8 md:pb-12 lg:hidden"
        >
          <Hero />
        </aside>

        {/* Right: Projects 
            Using pt-8/md:pt-12 for tablet/mobile.
            Added negative margins to allow card shadows on edges.
        */}
        <section
          className="pb-12 lg:pt-12 lg:pl-12 lg:overflow-y-auto lg:max-h-dvh px-2 md:px-4 -mx-2 md:-mx-4"
          aria-label="Projects section"
        >
          <ProjectsSection
            projects={projects}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            onProjectOpen={handleOpenProject}
          />
        </section>
      </div>

      {/* Project Modal — always rendered once a project has been selected,
          so the closing exit animation can play fully before unmounting.
          isOpen={false} drives AnimatePresence to run the exit animation. */}
      {modalProject && (
        <ProjectModal
          project={modalProject}
          isOpen={!!selectedProjectId}
          onClose={handleCloseProject}
          onNavigate={handleNavigateProject}
          hasPrev={hasPrev}
          hasNext={hasNext}
          originId={`project-card-${lastProjectRef.current?.id ?? ''}`}
        />
      )}
    </main>
  );
}
