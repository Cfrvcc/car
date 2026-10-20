import { useState } from 'react';
import { Lock, X, ArrowRight, ShieldCheck } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AdminAuthModal({ isOpen, onClose, onSuccess }: AdminAuthModalProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === 'Esma2026') {
      onSuccess();
      onClose();
      setPin('');
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl p-6 text-slate-100 shadow-2xl relative"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Bağla"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center text-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">İdarəetmə Girişi</h3>
          <p className="text-xs text-slate-400 mt-1">
            Daxil olmaq üçün təhlükəsizlik şifrəsini yazın
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 text-left">
              Şifrə:
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              autoFocus
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-center text-base font-mono text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
            />
            {error && (
              <p className="text-xs text-rose-400 mt-1.5 text-left">
                Daxil edilmiş şifrə yanlışdır.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full min-h-[44px] px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <span>Daxil Ol</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
