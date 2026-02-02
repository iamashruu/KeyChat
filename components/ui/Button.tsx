'use client';

/**
 * Reusable Button component with modern styling
 * Supports different sizes and variants with dark green theme
 */

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading = false, className = '', disabled, ...props }, ref) => {
    const baseStyles = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl';

    const variantStyles = {
      primary: 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-500 hover:to-emerald-400 focus:ring-emerald-400',
      secondary: 'bg-slate-800 text-emerald-100 hover:bg-slate-700 border border-slate-700 hover:border-emerald-500/50 focus:ring-emerald-400',
      ghost: 'bg-transparent text-emerald-300 hover:bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/50 focus:ring-emerald-400',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-400',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
            Loading...
          </span>
        ) : (
          props.children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
