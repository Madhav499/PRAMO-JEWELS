import React from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-sans uppercase tracking-widest font-semibold transition-all duration-300 rounded-none disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brand-gold/50';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-2',
    md: 'text-xs px-6 py-3.5 gap-2.5',
    lg: 'text-sm px-8 py-4 gap-3',
  };

  const variantStyles = {
    primary: 'bg-brand-gold text-brand-charcoal hover:bg-brand-gold-dark hover:text-white shadow-luxury hover:shadow-luxury-hover border border-brand-gold',
    secondary: 'bg-brand-charcoal text-brand-ivory hover:bg-black shadow-luxury border border-brand-charcoal',
    outline: 'bg-transparent text-brand-charcoal border border-brand-stone hover:border-brand-gold hover:text-brand-gold-dark',
    ghost: 'bg-transparent text-brand-slate hover:text-brand-gold hover:bg-brand-beige/40',
  };

  return (
    <button
      className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
