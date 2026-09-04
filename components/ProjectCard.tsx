'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import type { Project } from '@/lib/types';

// ─────────────────────────────────────────
// Project Card
// ─────────────────────────────────────────

interface ProjectCardProps {
  project: Project;
  onOpen: (id: string) => void;
  index: number;
}

export function ProjectCard({ project, onOpen, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);

  return (
    <motion.button
      ref={cardRef}
      id={`project-card-${project.id}`}
      onClick={() => {
        if (project.externalLink) {
          window.open(project.externalLink, '_blank', 'noopener,noreferrer');
        } else {
          onOpen(project.id);
        }
      }}
      aria-label={`Open ${project.title} case study`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -3,
        transition: { duration: 0.2, ease: 'easeOut' },
      }}
      className={cn(
        'group relative flex flex-col text-left w-full h-full',
        'bg-[var(--surface-elevated)] rounded-[var(--radius-xl)]',
        'border border-[var(--border-secondary)]',
        'shadow-sm hover:shadow-[var(--shadow-card-hover)]',
        'transition-shadow duration-200',
        'overflow-hidden cursor-pointer',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]'
      )}
    >
      {/* Cover Image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[var(--surface-secondary)]">
        <Image
          src={project.coverImage}
          alt={project.coverAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading={index < 2 ? 'eager' : 'lazy'}
        />
      </div>

      {/* Card Body */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        {/* Meta row */}
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <Badge variant="default" className="shrink-0">{project.platform}</Badge>
          <Badge variant="subtle" className="truncate">{project.industry}</Badge>
        </div>

        {/* Title */}
        <h3
          className="font-heading text-heading-s text-[var(--text-primary)] leading-snug group-hover:text-[var(--primary)] transition-colors duration-150 truncate line-clamp-1"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {project.title}
        </h3>


        {/* Footer row */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-[var(--border-secondary)]">
          <span className="text-caption text-[var(--text-tertiary)] font-medium">
            {project.role}
          </span>
          <span
            className={cn(
              'flex items-center justify-center w-7 h-7 rounded-full overflow-hidden',
              'bg-[var(--surface-secondary)] group-hover:bg-[var(--primary)] group-hover:text-white',
              'text-[var(--text-tertiary)] transition-all duration-200',
            )}
            aria-hidden="true"
          >
            <div className="relative w-3.5 h-3.5 overflow-hidden">
              {/* This container shifts on group-hover */}
              <div className="absolute inset-0 flex transition-transform duration-300 ease-out group-hover:-translate-y-full group-hover:translate-x-full">
                {/* Regular State Arrow */}
                <ArrowUpRight className="w-3.5 h-3.5 absolute top-0 left-0" />
                {/* Emerging Hover State Arrow */}
                <ArrowUpRight className="w-3.5 h-3.5 absolute top-full -left-full" />
              </div>
            </div>
          </span>
        </div>
      </div>
    </motion.button>
  );
}
