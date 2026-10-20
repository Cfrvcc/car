import { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Share2, 
  UserPlus, 
  AlertCircle,
  Clock, 
  ChevronRight,
  Car,
  Lightbulb,
  ShieldAlert,
  Siren,
  Bell,
  Check
} from 'lucide-react';
import { DriverProfile, PresetAlert } from '../types';
import { PRESET_ALERTS } from '../data/profileData';
import { generateWhatsAppLink, generateSmsLink, downloadVCard } from '../utils/contactUtils';
import { TikTokIcon, TelegramIcon, InstagramIcon, WhatsAppIcon } from './SocialIcons';
import { PresetAlertModal } from './PresetAlertModal';

interface ContactCardProps {
  profile: DriverProfile;
  onToast: (msg: string) => void;
  onOpenAdmin?: () => void;
}

export function ContactCard({ profile, onToast, onOpenAdmin }: ContactCardProps) {
  const [selectedAlert, setSelectedAlert] = useState<PresetAlert | null>(null);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `10-VX-900 · ${profile.name}`,
          text: `10-VX-900 avtomobil sahibi ${profile.name} ilə əlaqə kartı`,
          url: window.location.href,
        });
      } catch {
        // User cancelled or unsupported
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      onToast('Səhifənin linki kopyalandı');
    }
  };

  const handleSaveContact = () => {
    downloadVCard(profile);
    onToast('Kontakt (.vcf) yadda saxlanıldı');
  };

  const getAlertIcon = (id: string) => {
    const iconClass = "w-4 h-4 text-white/80";
    switch (id) {
      case 'blocked':
        return <Car className={iconClass} />;
      case 'hurry':
        return <Clock className={iconClass} />;
      case 'lights':
        return <Lightbulb className={iconClass} />;
      case 'window':
        return <ShieldAlert className={iconClass} />;
      case 'tow_truck':
        return <Siren className={iconClass} />;
      case 'alarm_scratch':
        return <Bell className={iconClass} />;
      default:
        return <AlertCircle className={iconClass} />;
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-4">
      {/* Apple Minimalist Identity Card */}
      <div className="apple-card rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">

        {/* Driver Name & Discreet Phone Number */}
        <div className="mb-6">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              {profile.name}
            </h1>
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white text-black" title="Təsdiqlənmiş Sahibi">
              <Check className="w-3 h-3 stroke-[3]" />
            </span>
          </div>

          {/* Small discreet visible phone number under name & surname */}
          <div className="mt-2 flex items-center gap-2">
            <a
              href={`tel:${profile.phone}`}
              className="text-xs sm:text-sm font-medium text-white/70 hover:text-white transition-colors flex items-center gap-1.5 font-mono"
            >
              <Phone className="w-3.5 h-3.5 text-white/50" />
              <span>{profile.displayPhone || profile.phone}</span>
            </a>
          </div>

          <p className="text-xs text-white/50 mt-2 font-normal">
            10-VX-900 avtomobilinin rəsmi əlaqə kartı
          </p>
        </div>

        {/* Driver Note (Clean Apple Callout) */}
        <div className="p-4 bg-white/[0.04] border border-white/[0.06] rounded-2xl mb-6">
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-white/60 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
              {profile.driverNote}
            </p>
          </div>
        </div>

        {/* Single-Touch Primary Action Buttons (COMPLETELY HIDING PHONE NUMBER) */}
        <div className="space-y-3">
          {/* Main Giant White Apple Call Button */}
          <a
            href={`tel:${profile.phone}`}
            className="w-full min-h-[56px] px-6 py-4 rounded-2xl bg-white hover:bg-neutral-200 text-black font-extrabold text-base flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all shadow-lg cursor-pointer"
          >
            <Phone className="w-5 h-5 fill-black text-black" />
            <span className="tracking-tight">Zəng Et</span>
          </a>

          {/* WhatsApp & SMS grid */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={generateWhatsAppLink(profile.phone)}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[50px] px-4 py-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </a>

            <a
              href={generateSmsLink(profile.phone)}
              className="min-h-[50px] px-4 py-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-white/80" />
              <span>SMS Göndər</span>
            </a>
          </div>
        </div>
      </div>

      {/* Preset Emergency Situational Alerts (Apple List Style) */}
      <div className="apple-card rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm sm:text-base font-bold text-white tracking-tight font-display">
            Təcili Hazır Xəbərdarlıqlar
          </h2>
          <span className="text-[11px] font-medium text-white/50">
            1 toxunuşla
          </span>
        </div>
        <p className="text-xs text-white/50 mb-3.5">
          Vəziyyəti seçin, sürücüyə dərhal bildiriş göndərin:
        </p>

        {/* Clean Apple Grouped List */}
        <div className="divide-y divide-white/[0.06] bg-black/40 rounded-2xl border border-white/[0.08] overflow-hidden">
          {PRESET_ALERTS.map((alert) => (
            <button
              key={alert.id}
              onClick={() => setSelectedAlert(alert)}
              className="w-full text-left px-4 py-3.5 hover:bg-white/[0.04] transition-colors flex items-center justify-between gap-3 active:bg-white/[0.08] cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-white/[0.08] flex items-center justify-center shrink-0">
                  {getAlertIcon(alert.id)}
                </div>
                <div className="min-w-0">
                  <span className="text-xs sm:text-sm font-semibold text-white block truncate">
                    {alert.title}
                  </span>
                  <span className="text-[11px] text-white/50 block truncate">
                    {alert.subtitle}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-white/30 shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Social Media Channels (Apple Grouped List) */}
      <div className="apple-card rounded-3xl p-5 sm:p-6 shadow-xl">
        <h2 className="text-sm sm:text-base font-bold text-white tracking-tight font-display mb-3">
          Sosial Şəbəkələr
        </h2>

        <div className="divide-y divide-white/[0.06] bg-black/40 rounded-2xl border border-white/[0.08] overflow-hidden">
          {/* Telegram */}
          <a
            href={`https://t.me/${profile.telegram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-3.5 hover:bg-white/[0.04] transition-colors active:bg-white/[0.08] cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-white/[0.08] flex items-center justify-center text-white">
                <TelegramIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-semibold text-white block">Telegram</span>
                <span className="text-[11px] text-white/50 font-mono">@{profile.telegram}</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/30" />
          </a>

          {/* Instagram */}
          <a
            href={`https://instagram.com/${profile.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-3.5 hover:bg-white/[0.04] transition-colors active:bg-white/[0.08] cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-white/[0.08] flex items-center justify-center text-white">
                <InstagramIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-semibold text-white block">Instagram</span>
                <span className="text-[11px] text-white/50 font-mono">@{profile.instagram}</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/30" />
          </a>

          {/* TikTok */}
          <a
            href={`https://tiktok.com/@${profile.tiktok}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-3.5 hover:bg-white/[0.04] transition-colors active:bg-white/[0.08] cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-white/[0.08] flex items-center justify-center text-white">
                <TikTokIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-semibold text-white block">TikTok</span>
                <span className="text-[11px] text-white/50 font-mono">@{profile.tiktok}</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/30" />
          </a>
        </div>
      </div>

      {/* Quick Utilities */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleSaveContact}
          className="p-3.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
        >
          <UserPlus className="w-4 h-4 text-white/80" />
          <span>Kontaktı Saxla</span>
        </button>

        <button
          onClick={handleShare}
          className="p-3.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
        >
          <Share2 className="w-4 h-4 text-white/80" />
          <span>Səhifəni Paylaş</span>
        </button>
      </div>

      {/* Modal for Preset Alert */}
      <PresetAlertModal
        alert={selectedAlert}
        profile={profile}
        onClose={() => setSelectedAlert(null)}
      />
    </div>
  );
}
