import React, { useEffect } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
};

export default function CookiePolicyModal({ open, onClose, title = 'Policy', children }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-[min(1100px,96%)] max-h-[90vh] overflow-auto bg-arzens-bg-secondary border border-white/10 rounded-2xl p-6 sm:p-8 z-10 shadow-lg">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-arzens-text">{title}</h2>
            <p className="text-xs text-arzens-text-muted mt-1">Last updated: January 1, 2026 &nbsp;|&nbsp; Effective: January 1, 2026</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-arzens-text-muted hover:text-arzens-text">
            ✕
          </button>
        </div>

        <div className="mt-4 prose prose-invert max-w-none text-sm sm:text-base">
          {children}
        </div>

        <div className="mt-6 text-right">
          <button onClick={onClose} className="px-4 py-2 rounded-md bg-arzens-accent text-black hover:opacity-95">Close</button>
        </div>
      </div>
    </div>
  );
}
