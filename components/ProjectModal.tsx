'use client';

import { useEffect, useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Project } from '@/lib/types';
import { CaseStudyPresentation } from '@/components/CaseStudyPresentation';

// ─────────────────────────────────────────
// Animation variants
// ─────────────────────────────────────────

const EASE_OUT = [0.0, 0.0, 0.2, 1.0] as const;
const EASE_IN  = [0.4, 0.0, 1.0, 1.0] as const;
const MODAL_EASE = [0.32, 0.72, 0, 1] as const;

const backdropVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: EASE_OUT } },
  exit:    { opacity: 0, transition: { duration: 0.20, ease: EASE_IN  } },
};

const modalVariants = {
  hidden:  { opacity: 0, scale: 0.95, y: 28 },
  visible: { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.35, ease: MODAL_EASE } },
  exit:    { opacity: 0, scale: 0.96, y: 20, transition: { duration: 0.25, ease: EASE_IN    } },
};

// ─────────────────────────────────────────
// Props
// ─────────────────────────────────────────

interface ProjectModalProps {
  project:    Project;
  isOpen:     boolean;
  onClose:    () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  hasPrev:    boolean;
  hasNext:    boolean;
  originId:   string;
}

// ─────────────────────────────────────────
// ProjectModal — thin Dialog wrapper around CaseStudyPresentation
// ─────────────────────────────────────────

export function ProjectModal({
  project,
  isOpen,
  onClose,
  onNavigate,
  hasPrev,
  hasNext,
  originId,
}: ProjectModalProps) {
  const originIdRef = useRef(originId);
  useEffect(() => { originIdRef.current = originId; }, [originId]);

  // Restore focus to the trigger card when the modal closes
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        document.getElementById(originIdRef.current)?.focus();
      }, 50);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal forceMount>
        <AnimatePresence>
          {isOpen && (
            <>
              {/* ── Backdrop ─────────────────────────────── */}
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  key="modal-backdrop"
                  variants={backdropVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="fixed inset-0 z-50"
                  style={{ backgroundColor: 'rgba(10, 10, 8, 0.65)' }}
                />
              </Dialog.Overlay>

              {/* ── Modal Sheet ───────────────────────────── */}
              <Dialog.Content asChild forceMount>
                <motion.div
                  key={`modal-${project.id}`}
                  variants={modalVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={cn(
                    'fixed inset-x-4 inset-y-4 z-50',
                    'sm:inset-x-6 sm:inset-y-6',
                    'lg:inset-x-8 lg:inset-y-8',
                    'flex flex-col',
                    'bg-[var(--surface)] rounded-[var(--radius-2xl)]',
                    'shadow-[var(--shadow-modal)]',
                    'overflow-hidden',
                    'focus:outline-none'
                  )}
                >
                  <VisuallyHidden>
                    <Dialog.Title>{project.title} — Case Study</Dialog.Title>
                    <Dialog.Description>
                      Interactive case study presentation for {project.title}.{' '}
                      {project.shortDescription}
                    </Dialog.Description>
                  </VisuallyHidden>

                  {/* Slide-Deck fills the entire modal body */}
                  <CaseStudyPresentation
                    project={project}
                    onClose={onClose}
                    onNavigate={onNavigate}
                    hasPrev={hasPrev}
                    hasNext={hasNext}
                  />
                </motion.div>
              </Dialog.Content>
            </>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
