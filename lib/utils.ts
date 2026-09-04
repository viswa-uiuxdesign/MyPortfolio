import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Project, ProjectCategory } from './types';

// ─────────────────────────────────────────
// Class Name Utility
// ─────────────────────────────────────────

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─────────────────────────────────────────
// Project Filter
// ─────────────────────────────────────────

export function filterProjects(
  projects: Project[],
  category: ProjectCategory
): Project[] {
  if (category === 'All') return projects;
  return projects.filter((p) => p.category === category);
}

// ─────────────────────────────────────────
// Category Count
// ─────────────────────────────────────────

export function getCategoryCount(
  projects: Project[],
  category: ProjectCategory
): number {
  return filterProjects(projects, category).length;
}

// ─────────────────────────────────────────
// Adjacent Projects (for modal navigation)
// ─────────────────────────────────────────

export function getAdjacentProjects(
  projects: Project[],
  currentId: string,
  category: ProjectCategory
): { prev: Project | null; next: Project | null } {
  const filtered = filterProjects(projects, category);
  const idx = filtered.findIndex((p) => p.id === currentId);
  return {
    prev: idx > 0 ? filtered[idx - 1] : null,
    next: idx < filtered.length - 1 ? filtered[idx + 1] : null,
  };
}
