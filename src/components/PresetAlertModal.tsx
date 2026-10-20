import { useState, useEffect } from 'react';
import { X, MessageSquare, Phone, Send, AlertTriangle } from 'lucide-react';
import { PresetAlert, DriverProfile } from '../types';
import { generateWhatsAppLink, generateSmsLink } from '../utils/contactUtils';

interface PresetAlertModalProps {
  alert: PresetAlert | null;
  profile: DriverProfile;
  onClose: () => void;
}

export function PresetAlertModal({ alert, profile, onClose }: PresetAlertModalProps) {
  const [customText, setCustomText] = useState('');

  useEffect(() => {
    if (alert) {
      setCustomText(alert.message);
    }
  }, [alert]);

  if (!alert) return null;

  const whatsappUrl = generateWhatsAppLink(profile.phone, customText);
  const smsUrl = generateSmsLink(profile.phone, customText);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-slate-900 border-t sm:border border-slate-700/80 rounded-t-3xl sm:rounded-2xl p-5 sm:p-6 text-slate-100 shadow-2xl animate-in slide-in-from-bottom duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Drag handle affordance for mobile */}
        <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mb-4 sm:hidden" />

        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{alert.title}</h3>
              <p className="text-xs text-slate-400">{alert.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Bağla"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Sürücüyə göndəriləcək mesaj (istəsəniz əlavə qeyd yaza bilərsiniz):
          </label>
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            rows={3}
            className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors resize-none"
            placeholder="Mesajınızı daxil edin..."
          />
        </div>

        <div className="space-y-2.5 pt-1">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/40 transition-all active:scale-[0.98]"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>WhatsApp ilə Dərhal Göndər</span>
          </a>

          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={smsUrl}
              className="min-h-[44px] px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>SMS ilə Göndər</span>
            </a>

            <a
              href={`tel:${profile.phone}`}
              className="min-h-[44px] px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>Zəng Edib De</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
