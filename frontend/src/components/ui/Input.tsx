import React from 'react';
import { clsx } from 'clsx';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs uppercase tracking-wider font-medium text-brand-slate">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={clsx(
            'w-full px-4 py-3 bg-white border border-brand-stone text-brand-charcoal text-sm transition-colors duration-200 focus:outline-none focus:border-brand-gold placeholder:text-brand-slate/50',
            error && 'border-brand-crimson focus:border-brand-crimson',
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-brand-crimson font-medium">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
