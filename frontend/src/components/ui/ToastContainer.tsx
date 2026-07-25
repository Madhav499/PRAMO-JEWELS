import React from 'react';
import { useUIStore } from '@/store/useUIStore';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useUIStore();

  if (toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-brand-sage shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-brand-amber shrink-0" />,
    error: <XCircle className="w-5 h-5 text-brand-crimson shrink-0" />,
    info: <Info className="w-5 h-5 text-brand-steel shrink-0" />,
  };

  return (
    <div className="fixed bottom-6 right-6 z-[300] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 bg-white border border-brand-stone shadow-luxury animate-in slide-in-from-bottom-5 duration-300"
        >
          {icons[toast.type]}
          <div className="flex-1">
            <h4 className="font-serif text-sm font-semibold text-brand-charcoal">{toast.title}</h4>
            <p className="text-xs text-brand-slate mt-0.5">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-brand-slate/60 hover:text-brand-charcoal transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
