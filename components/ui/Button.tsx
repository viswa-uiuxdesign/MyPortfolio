import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// Button Component
// Sigma Design System — Three hierarchy levels
// ─────────────────────────────────────────

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'secondary',
      size = 'md',
      className,
      children,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center gap-2 font-medium rounded-[var(--radius-full)] transition-all duration-150',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]',
          'disabled:opacity-40 disabled:pointer-events-none select-none',
          // Size variants
          {
            'h-8 px-3 text-sm gap-1.5': size === 'sm',
            'h-10 px-4 text-sm gap-2': size === 'md',
            'h-12 px-6 text-base gap-2': size === 'lg',
          },
          // Variant styles
          variant === 'primary' && [
            'text-white',
            'bg-[var(--primary)] hover:bg-[var(--primary-hover)]',
            'shadow-[0_4px_12px_rgba(10,102,226,0.2),inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-2px_0_rgba(0,0,0,0.2)]',
            'hover:shadow-[0_6px_16px_rgba(10,102,226,0.3),inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-2px_0_rgba(0,0,0,0.25)]',
            'active:shadow-[0_2px_4px_rgba(10,102,226,0.15),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_2px_4px_rgba(0,0,0,0.3)]',
            'hover:translate-y-[-1px] active:translate-y-[1px]',
            'transition-all duration-150',
          ],
          variant === 'secondary' && [
            'text-[var(--text-primary)]',
            'bg-[var(--surface-elevated)] hover:bg-[var(--surface-secondary)]',
            'border border-[var(--border-primary)] hover:border-[var(--border-primary)]',
            'shadow-xs hover:shadow-sm',
            'active:scale-[0.98]',
          ],
          variant === 'tertiary' && [
            'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
            'bg-transparent hover:bg-[var(--surface-secondary)]',
            'active:bg-[var(--surface-tertiary)]',
          ],
          className
        )}
        {...props}
      >
        {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
