import { useState, useEffect } from 'react';
import { X, MessageSquare, Phone, Send, AlertCircle } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-[#161618] border-t sm:border border-white/10 rounded-t-3xl sm:rounded-3xl p-6 sm:p-7 text-white shadow-2xl animate-in slide-in-from-bottom duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Apple style grab bar */}
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-5 sm:hidden" />

        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/[0.08] flex items-center justify-center text-white shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight font-display">{alert.title}</h3>
              <p className="text-xs text-white/50">{alert.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/50 hover:text-white rounded-xl hover:bg-white/[0.08] transition-colors cursor-pointer"
            aria-label="Bağla"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-5">
          <label className="block text-xs font-semibold text-white/70 mb-2">
            Göndəriləcək mesaj:
          </label>
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-2xl text-sm text-white focus:outline-none focus:border-white/40 transition-colors resize-none leading-relaxed"
            placeholder="Mesajınızı daxil edin..."
          />
        </div>

        <div className="space-y-2.5">
          {/* Main WhatsApp Send Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[50px] px-5 py-3 rounded-2xl bg-white hover:bg-neutral-200 text-black font-extrabold text-sm flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] cursor-pointer shadow-md"
          >
            <MessageSquare className="w-4 h-4 fill-black text-black" />
            <span>WhatsApp ilə Göndər</span>
          </a>

          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={smsUrl}
              className="min-h-[46px] px-4 py-2.5 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/[0.08] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-white/80" />
              <span>SMS Göndər</span>
            </a>

            <a
              href={`tel:${profile.phone}`}
              className="min-h-[46px] px-4 py-2.5 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/[0.08] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 fill-white text-white" />
              <span>Zəng Et</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
