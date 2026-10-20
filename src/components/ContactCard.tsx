import { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  MessageCircle, 
  Copy, 
  Share2, 
  UserPlus, 
  AlertTriangle,
  Car,
  Clock,
  ShieldCheck,
  ExternalLink,
  QrCode,
  CheckCircle2
} from 'lucide-react';
import { DriverProfile, PresetAlert } from '../types';
import { PRESET_ALERTS } from '../data/profileData';
import { generateWhatsAppLink, generateSmsLink, downloadVCard } from '../utils/contactUtils';
import { TikTokIcon, TelegramIcon, InstagramIcon, WhatsAppIcon } from './SocialIcons';
import { PresetAlertModal } from './PresetAlertModal';
import { AzerbaijanLicensePlate } from './AzerbaijanLicensePlate';

interface ContactCardProps {
  profile: DriverProfile;
  onToast: (msg: string) => void;
  onOpenAdmin?: () => void;
}

export function ContactCard({ profile, onToast, onOpenAdmin }: ContactCardProps) {
  const [selectedAlert, setSelectedAlert] = useState<PresetAlert | null>(null);

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText(profile.phone);
    onToast(`Nömrə kopyalandı: ${profile.displayPhone}`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `10-VX-900 · ${profile.name} — Avtomobil Park Əlaqə Kartı`,
          text: `10-VX-900 avtomobil sahibi ${profile.name} ilə əlaqə: ${profile.phone}`,
          url: window.location.href,
        });
      } catch {
        // User cancelled or unsupported
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      onToast('Səhifənin linki kopyalandı!');
    }
  };

  const handleSaveContact = () => {
    downloadVCard(profile);
    onToast('Cəlal Cəfərov kontakt kartı (.vcf) yükləndi!');
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4 sm:space-y-6">
      {/* Driver Status Card */}
      <div className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-7 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Identification Row with Official License Plate */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-center text-amber-400 shadow-md">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mb-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Rəsmi Şəxsi Park Kartı</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {profile.name}
              </h1>
            </div>
          </div>

          <div className="flex items-center justify-start sm:justify-end">
            <button
              onClick={onOpenAdmin}
              className="cursor-pointer focus:outline-none transition-transform active:scale-95"
              title=""
            >
              <AzerbaijanLicensePlate plateNumber={profile.carPlate} size="md" />
            </button>
          </div>
        </div>

        {/* Status Notice */}
        <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl mb-6 flex items-start gap-3">
          <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {profile.driverNote}
          </p>
        </div>

        {/* Phone Number Display with Copy Action */}
        <div className="mb-4">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-950/70 border border-slate-800 rounded-xl">
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-wider">
                Əlaqə Nömrəsi
              </span>
              <span className="text-lg sm:text-xl font-bold text-amber-400 font-mono tracking-wide">
                {profile.displayPhone}
              </span>
            </div>
            <button
              onClick={copyPhoneNumber}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors cursor-pointer"
              title="Nömrəni kopyala"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Kopyala</span>
            </button>
          </div>
        </div>

        {/* Primary Instant Action Buttons */}
        <div className="space-y-2.5">
          {/* Main Direct Call Button */}
          <a
            href={`tel:${profile.phone}`}
            className="w-full min-h-[52px] px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-500 text-white font-bold text-base flex items-center justify-center gap-3 shadow-lg shadow-emerald-950/50 hover:shadow-emerald-900/60 active:scale-[0.98] transition-all"
          >
            <Phone className="w-5 h-5 fill-current" />
            <span>Dərhal Zəng Et</span>
          </a>

          {/* WhatsApp & SMS grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={generateWhatsAppLink(profile.phone)}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[46px] px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-emerald-400 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <WhatsAppIcon className="w-4 h-4 fill-emerald-400" />
              <span>WhatsApp</span>
            </a>

            <a
              href={generateSmsLink(profile.phone)}
              className="min-h-[46px] px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-slate-200 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>SMS Göndər</span>
            </a>
          </div>
        </div>
      </div>

      {/* Preset Emergency Quick Alerts */}
      <div className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Təcili Hazır Xəbərdarlıqlar
            </h2>
          </div>
          <span className="text-[11px] text-slate-400">1 toxunuşla göndər</span>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Avtomobillə bağlı vəziyyəti seçin, sürücüyə WhatsApp və ya SMS ilə dərhal bildirin:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {PRESET_ALERTS.map((alert) => (
            <button
              key={alert.id}
              onClick={() => setSelectedAlert(alert)}
              className="w-full text-left p-3 rounded-xl bg-slate-900/70 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 transition-all flex items-start gap-3 active:scale-[0.99] cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-amber-400 shrink-0 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs sm:text-sm font-semibold text-white block group-hover:text-amber-400 transition-colors truncate">
                  {alert.title}
                </span>
                <span className="text-[11px] text-slate-400 block truncate">
                  {alert.subtitle}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Social Media Channels */}
      <div className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Sürücünün Sosial Şəbəkələri
            </h2>
          </div>
          <span className="text-[11px] text-slate-400">Rəsmi profillər</span>
        </div>

        <div className="space-y-2.5">
          {/* Telegram */}
          <a
            href={`https://t.me/${profile.telegram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800/80 hover:border-sky-500/40 transition-all active:scale-[0.99] group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                <TelegramIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-white block">Telegram</span>
                <span className="text-xs text-sky-400 font-mono">@{profile.telegram}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-400 group-hover:text-slate-200">
              <span>Mesaj yaz</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* Instagram */}
          <a
            href={`https://instagram.com/${profile.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800/80 hover:border-pink-500/40 transition-all active:scale-[0.99] group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:bg-gradient-to-tr group-hover:from-amber-500 group-hover:via-pink-500 group-hover:to-purple-600 group-hover:text-white transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-white block">Instagram</span>
                <span className="text-xs text-pink-400 font-mono">@{profile.instagram}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-400 group-hover:text-slate-200">
              <span>Profilə bax</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* TikTok */}
          <a
            href={`https://tiktok.com/@${profile.tiktok}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800/80 hover:border-slate-500/40 transition-all active:scale-[0.99] group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white group-hover:bg-black group-hover:border-cyan-400 transition-colors">
                <TikTokIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-white block">TikTok</span>
                <span className="text-xs text-slate-300 font-mono">@{profile.tiktok}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-400 group-hover:text-slate-200">
              <span>Səhifəni aç</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>
        </div>
      </div>

      {/* Quick Utilities */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={handleSaveContact}
          className="p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
        >
          <UserPlus className="w-4 h-4 text-emerald-400" />
          <span>Kontaktı Yadda Saxla</span>
        </button>

        <button
          onClick={handleShare}
          className="p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
        >
          <Share2 className="w-4 h-4 text-sky-400" />
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
