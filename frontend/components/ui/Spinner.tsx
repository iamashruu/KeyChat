'use client';

/**
 * Spinner loading indicator component with dark green theme
 */

export function Spinner() {
  return (
    <div className="inline-block">
      <div className="w-6 h-6 border-3 border-slate-700 border-t-emerald-400 rounded-full animate-spin"></div>
    </div>
  );
}
