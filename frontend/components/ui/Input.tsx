'use client';

/**
 * Reusable Input component with modern dark green styling
 */

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-emerald-300 mb-2.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-slate-100 placeholder-slate-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent ${
            error
              ? 'border-red-500 focus:ring-red-400'
              : 'border-slate-700 hover:border-slate-600'
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="text-red-400 text-sm mt-2 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
