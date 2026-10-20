import { useState, useEffect } from 'react';
import { Phone, MessageSquare, Send, Settings, Car } from 'lucide-react';
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
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-white selection:text-black">
      {/* Apple Minimalist Top Bar */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-2xl border-b border-white/[0.08] no-print">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between gap-3">
          {/* Brand & Plate */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-white/[0.08] flex items-center justify-center text-white">
              <Car className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-display font-extrabold text-sm text-white tracking-tight block leading-tight">
                {profile.carPlate}
              </span>
              <span className="text-[10px] text-white/50 block font-normal">
                {profile.name}
              </span>
            </div>
          </div>

          {/* Quick Header Action */}
          <div className="flex items-center gap-2">
            <a
              href={`tel:${profile.phone}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              <Phone className="w-3 h-3 fill-black text-black" />
              <span>Zəng Et</span>
            </a>

            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="w-7 h-7 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer"
              title="İdarəetmə Paneli"
              aria-label="İdarəetmə Paneli"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main id="contact" className="flex-1 w-full max-w-lg mx-auto px-4 py-6 sm:py-8">
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

      {/* Mobile Sticky Apple Action Bar */}
      {!isAdmin && (
        <div className="fixed bottom-0 left-0 right-0 z-30 p-3 bg-black/85 backdrop-blur-2xl border-t border-white/10 sm:hidden no-print">
          <div className="flex items-center gap-2 max-w-lg mx-auto">
            <a
              href={`tel:${profile.phone}`}
              className="flex-1 min-h-[48px] rounded-2xl bg-white hover:bg-neutral-200 text-black font-extrabold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md"
            >
              <Phone className="w-4 h-4 fill-black text-black" />
              <span>Zəng Et</span>
            </a>
            <a
              href={generateWhatsAppLink(profile.phone)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-h-[48px] rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/[0.1] font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </a>
            <a
              href={generateSmsLink(profile.phone)}
              className="min-h-[48px] px-3.5 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/[0.1] font-bold text-xs flex items-center justify-center gap-1 active:scale-95 transition-all"
              title="SMS"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="sr-only">SMS</span>
            </a>
          </div>
        </div>
      )}

      {/* Apple Minimalist Footer */}
      <footer className="mt-auto py-6 border-t border-white/[0.06] text-center no-print pb-24 sm:pb-6">
        <div className="max-w-lg mx-auto px-4 flex flex-col items-center justify-center gap-2 text-xs text-white/40">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white/70">{profile.name}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-white/60 font-medium">{profile.carPlate}</span>
          </div>

          <div className="flex items-center gap-4 text-xs text-white/40">
            <a
              href={`https://t.me/${profile.telegram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Telegram
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={`https://instagram.com/${profile.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={`https://tiktok.com/@${profile.tiktok}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
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
