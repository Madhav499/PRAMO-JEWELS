import React from 'react';
import { clsx } from 'clsx';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'sage' | 'amber' | 'stone' | 'dark';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'gold', className }) => {
  const variantStyles = {
    gold: 'bg-brand-gold/15 text-brand-gold-dark border-brand-gold/30',
    sage: 'bg-brand-sage/15 text-brand-sage border-brand-sage/30',
    amber: 'bg-brand-amber/15 text-brand-amber border-brand-amber/30',
    stone: 'bg-brand-beige text-brand-slate border-brand-stone',
    dark: 'bg-brand-charcoal text-brand-ivory border-brand-charcoal',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase border',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
