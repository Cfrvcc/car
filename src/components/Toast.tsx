import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-3 bg-slate-900/95 text-white border border-slate-700/80 rounded-xl shadow-2xl backdrop-blur-md text-sm font-medium animate-in fade-in slide-in-from-bottom-3 duration-200">
      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
