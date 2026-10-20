import { useState, useEffect } from 'react';
import { Phone, MessageSquare, Send } from 'lucide-react';
import { ContactCard } from './components/ContactCard';
import { AdminPanel } from './components/AdminPanel';
import { AdminAuthModal } from './components/AdminAuthModal';
import { Toast } from './components/Toast';
import { DEFAULT_PROFILE } from './data/profileData';
import { DriverProfile } from './types';
import { generateWhatsAppLink, generateSmsLink } from './utils/contactUtils';

const STORAGE_KEY = 'celal_ceferov_profile_10vx900';

export default function App() {
  const [profile, setProfile] = useState<DriverProfile>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          return { ...DEFAULT_PROFILE, ...JSON.parse(saved) };
        }
      } catch {
        // Fallback to default
      }
    }
    return DEFAULT_PROFILE;
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleUpdateProfile = (updated: DriverProfile) => {
    setProfile(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Local storage issue
    }
  };

  useEffect(() => {
    const handleHash = () => {
      if (typeof window !== 'undefined' && (window.location.hash === '#admin' || window.location.hash === '#panel')) {
        setIsAuthModalOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div className="min-h-screen bg-carbon-pattern text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950">
      {/* Main Content Area */}
      <main id="contact" className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {isAdmin ? (
          <AdminPanel
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onClose={() => setIsAdmin(false)}
            onToast={showToast}
          />
        ) : (
          <ContactCard
            profile={profile}
            onToast={showToast}
            onOpenAdmin={() => setIsAuthModalOpen(true)}
          />
        )}
      </main>

      {/* Mobile Sticky Action Bar for Visitors (Only shown on mobile when not in admin) */}
      {!isAdmin && (
        <div className="fixed bottom-0 left-0 right-0 z-30 p-3 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 sm:hidden no-print">
          <div className="flex items-center gap-2">
            <a
              href={`tel:${profile.phone}`}
              className="flex-1 min-h-[46px] rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>Dərhal Zəng Et</span>
            </a>
            <a
              href={generateWhatsAppLink(profile.phone)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-h-[46px] rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp</span>
            </a>
            <a
              href={generateSmsLink(profile.phone)}
              className="min-h-[46px] px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center justify-center gap-1 active:scale-95 transition-all"
              title="SMS"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="sr-only">SMS</span>
            </a>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto py-6 border-t border-slate-800/80 text-center no-print pb-24 sm:pb-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer text-left focus:outline-none"
              title=""
            >
              {profile.name}
            </button>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-amber-400 font-bold">{profile.carPlate}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-slate-400">{profile.displayPhone}</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a
              href={`https://t.me/${profile.telegram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              Telegram
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={`https://instagram.com/${profile.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              Instagram
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={`https://tiktok.com/@${profile.tiktok}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              TikTok
            </a>
          </div>
        </div>
      </footer>

      {/* Admin Authentication Modal */}
      <AdminAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          if (window.location.hash === '#admin' || window.location.hash === '#panel') {
            history.replaceState(null, '', window.location.pathname);
          }
        }}
        onSuccess={() => {
          setIsAdmin(true);
          showToast('İdarəetmə panelinə daxil oldunuz');
        }}
      />

      {/* Feedback Toast */}
      <Toast message={toastMessage} />
    </div>
  );
}
