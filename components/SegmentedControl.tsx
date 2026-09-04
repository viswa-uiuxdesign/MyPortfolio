'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ProjectCategory } from '@/lib/types';

// ─────────────────────────────────────────
// Segmented Control
// Sigma Design System — Filter tabs
// ─────────────────────────────────────────

interface SegmentedControlProps {
  options: { label: ProjectCategory; count: number }[];
  value: ProjectCategory;
  onChange: (value: ProjectCategory) => void;
  className?: string;
}

export function SegmentedControl({
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  // Compute indicator position
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const activeButton = container.querySelector<HTMLButtonElement>(
      `[data-active="true"]`
    );
    if (activeButton) {
      setIndicatorStyle({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
      });
    }
  }, [value]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      const buttons = containerRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      if (!buttons) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = buttons[Math.min(index + 1, buttons.length - 1)];
        next?.focus();
        onChange(options[Math.min(index + 1, options.length - 1)].label);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = buttons[Math.max(index - 1, 0)];
        prev?.focus();
        onChange(options[Math.max(index - 1, 0)].label);
      } else if (e.key === 'Home') {
        e.preventDefault();
        buttons[0]?.focus();
        onChange(options[0].label);
      } else if (e.key === 'End') {
        e.preventDefault();
        buttons[buttons.length - 1]?.focus();
        onChange(options[options.length - 1].label);
      }
    },
    [onChange, options]
  );

  return (
    <div
      ref={containerRef}
      role="tablist"
      aria-label="Filter projects by category"
      className={cn(
        'relative flex items-center gap-0.5 p-1 rounded-[var(--radius-full)] w-fit',
        className
      )}
      style={{ backgroundColor: 'var(--surface-secondary)' }}
    >
      {/* Animated indicator */}
      <motion.div
        className="absolute top-1 bottom-1 rounded-[var(--radius-full)] shadow-sm"
        style={{ backgroundColor: 'var(--surface-elevated)' }}
        animate={indicatorStyle}
        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        aria-hidden="true"
      />

      {options.map((option, index) => {
        const isActive = value === option.label;
        return (
          <button
            key={option.label}
            role="tab"
            aria-selected={isActive}
            data-active={isActive}
            onClick={() => onChange(option.label)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              'relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-full)]',
              'text-sm font-medium transition-colors duration-150',
              'min-h-[36px] min-w-[44px]',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]',
              isActive
                ? 'text-[var(--text-primary)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            )}
          >
            {option.label}
            <AnimatePresence>
              {option.count > 0 && (
                <motion.span
                  key={option.count}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                  className={cn(
                    'inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-semibold',
                    isActive
                      ? 'bg-[var(--primary-subtle)] text-[var(--primary)]'
                      : 'bg-[var(--surface-tertiary)] text-[var(--text-tertiary)]'
                  )}
                  aria-label={`${option.count} projects`}
                >
                  {option.count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
}
