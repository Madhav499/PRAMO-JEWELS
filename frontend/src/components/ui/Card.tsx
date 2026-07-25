import React from 'react';
import { clsx } from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, hoverable = true, className, ...props }) => {
  return (
    <div
      className={clsx(
        'bg-white border border-brand-stone/60 p-6 transition-all duration-300',
        hoverable && 'hover:border-brand-gold/50 hover:shadow-luxury-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
