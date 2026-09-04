import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// Badge Component
// Platform / Industry / Category indicators
// ─────────────────────────────────────────

type BadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'subtle';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-[var(--radius-sm)] text-[11px] font-semibold tracking-wide uppercase leading-none',
        variant === 'default' && [
          'bg-[var(--surface-secondary)] text-[var(--text-secondary)]',
          'border border-[var(--border-primary)]',
        ],
        variant === 'primary' && [
          'bg-[var(--primary-subtle)] text-[var(--primary)]',
        ],
        variant === 'success' && [
          'bg-emerald-50 text-emerald-700',
        ],
        variant === 'warning' && [
          'bg-amber-50 text-amber-700',
        ],
        variant === 'danger' && [
          'bg-red-50 text-red-700',
        ],
        variant === 'info' && [
          'bg-blue-50 text-blue-700',
        ],
        variant === 'subtle' && [
          'bg-transparent text-[var(--text-tertiary)]',
          'border border-[var(--border-secondary)]',
        ],
        className
      )}
    >
      {children}
    </span>
  );
}
