import { useState, useRef } from 'react';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import { 
  Download, 
  Printer, 
  Check, 
  ArrowLeft, 
  Save, 
  RotateCcw, 
  ShieldCheck, 
  Smartphone, 
  Car, 
  Sparkles, 
  Lock,
  Layers,
  Copy,
  Server,
  Globe,
  FileCode,
  ExternalLink
} from 'lucide-react';
import { DriverProfile, CardTheme } from '../types';
import { AzerbaijanLicensePlate } from './AzerbaijanLicensePlate';
import confetti from 'canvas-confetti';

interface AdminPanelProps {
  profile: DriverProfile;
  onUpdateProfile: (newProfile: DriverProfile) => void;
  onClose: () => void;
  onToast: (msg: string) => void;
}

const STATUS_PRESETS = [
  'Müvəqqəti uzaqlaşmışam. Narahatlıq yaranarsa, zəhmət olmasa dərhal zəng edin və ya WhatsApp-dan yazın, 3-5 dəqiqəyə yaxınlaşacağam.',
  'Yaxınlıqdayam, 2-3 dəqiqə ərzində avtomobilin yanına gəlirəm. Zəhmət olmasa gözləyin və ya zəng edin.',
  '10-15 dəqiqəlik işlə bağlı uzaqlaşmışam. Əgər çıxışınıza mane oluramsa, dərhal zəng edin, tez gəlim.',
  'Avtomobilin yanındayam / dükandayam. Zəng edə bilərsiniz.',
];

export function AdminPanel({
  profile,
  onUpdateProfile,
  onClose,
  onToast,
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'qr' | 'status' | 'profile' | 'hosting'>('qr');
  const [selectedTheme, setSelectedTheme] = useState<CardTheme>('carbon');
  const [cardTitle, setCardTitle] = useState('MÜVƏQQƏTİ PARKLANMA');
  const [cardSubtitle, setCardSubtitle] = useState('Narahatlıq yaranarsa QR kodu oxudun');
  const [formData, setFormData] = useState<DriverProfile>({ ...profile });
  const [showPhoneOnCard, setShowPhoneOnCard] = useState(true);

  const canvasRef = useRef<HTMLDivElement>(null);

  const [targetUrl, setTargetUrl] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('celal_ceferov_target_url');
      if (saved) return saved;
      return window.location.href.split('#')[0];
    }
    return 'https://save.az/car';
  });

  const handleUpdateTargetUrl = (url: string) => {
    setTargetUrl(url);
    try {
      localStorage.setItem('celal_ceferov_target_url', url);
    } catch {}
    onToast(`QR kod linki yeniləndi: ${url}`);
  };

  // Download Standalone Clean QR Code (PNG)
  const handleDownloadStandaloneQR = () => {
    try {
      const canvas = canvasRef.current?.querySelector('canvas');
      if (!canvas) {
        onToast('Xəta baş verdi');
        return;
      }

      // Create a high-res standalone QR image with branded frame
      const qrCanvas = document.createElement('canvas');
      const ctx = qrCanvas.getContext('2d');
      if (!ctx) return;

      const size = 600;
      qrCanvas.width = size;
      qrCanvas.height = size + 120;

      // Background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size + 120);

      // Top title
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 28px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${profile.carPlate} · ${profile.name}`, size / 2, 45);

      ctx.fillStyle = '#64748b';
      ctx.font = '16px Plus Jakarta Sans, sans-serif';
      ctx.fillText('Avtomobil Park Kartı (Kamera ilə oxudun)', size / 2, 75);

      // Draw QR Code
      const qrSize = 460;
      const offset = (size - qrSize) / 2;
      ctx.drawImage(canvas, offset, 95, qrSize, qrSize);

      // Bottom contact
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 24px monospace';
      ctx.fillText(`Tel: ${profile.displayPhone}`, size / 2, size + 90);

      const url = qrCanvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `QR_Kod_${profile.carPlate}_${profile.name}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
      onToast('Təmiz QR Kod (PNG) uğurla yükləndi!');
    } catch {
      onToast('Yükləmə xətası baş verdi.');
    }
  };

  // Download Complete Windshield Card (PNG)
  const handleDownloadCardPNG = () => {
    try {
      const canvas = canvasRef.current?.querySelector('canvas');
      if (!canvas) {
        onToast('Xəta baş verdi');
        return;
      }

      const exportCanvas = document.createElement('canvas');
      const ctx = exportCanvas.getContext('2d');
      if (!ctx) return;

      const scale = 2;
      const width = 800 * scale;
      const height = 500 * scale;
      exportCanvas.width = width;
      exportCanvas.height = height;
      ctx.scale(scale, scale);

      // Background
      if (selectedTheme === 'minimal') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 800, 500);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 4;
        ctx.strokeRect(8, 8, 784, 484);
      } else if (selectedTheme === 'gold') {
        ctx.fillStyle = '#0a1128';
        ctx.fillRect(0, 0, 800, 500);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 6;
        ctx.strokeRect(8, 8, 784, 484);
      } else if (selectedTheme === 'flag') {
        ctx.fillStyle = '#0b0f19';
        ctx.fillRect(0, 0, 800, 500);
        ctx.fillStyle = '#00B5E2';
        ctx.fillRect(0, 0, 800, 10);
        ctx.fillStyle = '#EF3340';
        ctx.fillRect(0, 10, 800, 10);
        ctx.fillStyle = '#509E2F';
        ctx.fillRect(0, 20, 800, 10);
      } else {
        ctx.fillStyle = '#0d111a';
        ctx.fillRect(0, 0, 800, 500);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 4;
        ctx.strokeRect(8, 8, 784, 484);
      }

      // Draw QR Code
      const qrSize = 260;
      const qrX = 50;
      const qrY = 120;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(qrX - 10, qrY - 10, qrSize + 20, qrSize + 20);
      ctx.drawImage(canvas, qrX, qrY, qrSize, qrSize);

      const isDark = selectedTheme !== 'minimal';
      ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
      ctx.font = 'bold 32px Outfit, sans-serif';
      ctx.fillText(cardTitle, 350, 140);

      ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
      ctx.font = '18px Plus Jakarta Sans, sans-serif';
      ctx.fillText(cardSubtitle, 350, 180);

      // Owner & Plate
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 24px Outfit, sans-serif';
      ctx.fillText(`Sürücü: ${profile.name}`, 350, 230);

      // Draw official plate image or fallback
      const plateImg = document.querySelector('img[src*="900_d9d38ea094f79fbee32d_71b5de54.png"]') as HTMLImageElement | null;
      if (plateImg && plateImg.complete && plateImg.naturalWidth > 0) {
        ctx.drawImage(plateImg, 350, 252, 200, 44);
      } else {
        ctx.fillStyle = isDark ? '#1e293b' : '#f1f5f9';
        ctx.fillRect(350, 255, 180, 42);
        ctx.strokeStyle = isDark ? '#475569' : '#cbd5e1';
        ctx.strokeRect(350, 255, 180, 42);
        ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
        ctx.font = 'bold 20px monospace';
        ctx.fillText(`AZ  ${profile.carPlate}`, 370, 283);
      }

      if (showPhoneOnCard) {
        ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
        ctx.font = 'bold 26px monospace';
        ctx.fillText(`📞 ${profile.displayPhone}`, 350, 345);
      }

      ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
      ctx.font = '16px monospace';
      ctx.fillText(`TG: @${profile.telegram} · IG: @${profile.instagram} · TT: @${profile.tiktok}`, 350, 395);

      ctx.fillStyle = isDark ? '#64748b' : '#94a3b8';
      ctx.font = '14px Plus Jakarta Sans, sans-serif';
      ctx.fillText('Kameranızı QR koda tutaraq dərhal əlaqə saxlayın', 50, 450);

      const pngUrl = exportCanvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `On_Suse_Karti_${profile.carPlate}_${profile.name}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      onToast('Ön şüşə kartı PNG kimi yükləndi!');
    } catch {
      onToast('Xəta baş verdi');
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    onToast('Məlumatlar uğurla yadda saxlanıldı!');
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(targetUrl);
    onToast('Sayt linki kopyalandı!');
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Admin Header */}
      <div className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                Admin Panel
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400 font-mono">{profile.carPlate}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Cəlal Cəfərov — İdarəetmə Paneli
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold border border-slate-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Sayta Qayıt</span>
          </button>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800">
        <button
          onClick={() => setActiveTab('qr')}
          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'qr'
              ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>QR Kod Yüklə</span>
        </button>

        <button
          onClick={() => setActiveTab('status')}
          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'status'
              ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>Statusu Dəyiş</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'profile'
              ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Car className="w-4 h-4" />
          <span>Redaktə Et</span>
        </button>

        <button
          onClick={() => setActiveTab('hosting')}
          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'hosting'
              ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>save.az Hosting</span>
        </button>
      </div>

      {/* Hidden canvas for high-res QR rendering */}
      <div ref={canvasRef} className="hidden">
        <QRCodeCanvas
          value={targetUrl}
          size={460}
          level="H"
          marginSize={2}
          bgColor="#ffffff"
          fgColor="#000000"
        />
      </div>

      {/* TAB 1: QR CODE & WINDSHIELD CARD DOWNLOAD */}
      {activeTab === 'qr' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Download className="w-5 h-5 text-amber-400" />
              <span>QR Kodun Yüklənməsi</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-4">
              Aşağıdakı düymələrlə həm təmiz QR kod şəklini, həm də birbaşa maşının ön şüşəsinə vurmaq üçün hazır dizaynlı kartı yükləyə bilərsiniz.
            </p>

            {/* Target URL Selector */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 mb-6 space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-amber-400" />
                  <span>QR Kodun Açacağı İnternet Ünvanı (URL):</span>
                </label>
                <span className="text-[11px] text-amber-400 font-mono truncate max-w-xs">
                  {targetUrl}
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={targetUrl}
                  onChange={(e) => handleUpdateTargetUrl(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                  placeholder="https://save.az/car"
                />
              </div>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] text-slate-400">save.az üçün tez seçim:</span>
                <button
                  type="button"
                  onClick={() => handleUpdateTargetUrl('https://save.az/car')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-mono border border-slate-700 transition-colors cursor-pointer"
                >
                  save.az/car
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateTargetUrl('https://save.az/10vx900')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-mono border border-slate-700 transition-colors cursor-pointer"
                >
                  save.az/10vx900
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateTargetUrl('https://car.save.az')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-mono border border-slate-700 transition-colors cursor-pointer"
                >
                  car.save.az
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateTargetUrl(typeof window !== 'undefined' ? window.location.href.split('#')[0] : '')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 text-[11px] font-mono border border-slate-700 transition-colors cursor-pointer"
                >
                  Cari Link
                </button>
              </div>
            </div>

            {/* Action Download Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option 1: Standalone High-Res QR Code */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-xl shadow-md shrink-0">
                    <QRCodeSVG value={targetUrl} size={90} level="H" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Təmiz QR Kod (PNG)</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Ölçüsü böyük, yüksək keyfiyyətli kvadrat QR kod. İstənilən sticker və ya vinil çıxartma üçün uyğundur.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={handleDownloadStandaloneQR}
                    className="flex-1 min-h-[42px] px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>QR Kod Şəklini Yüklə</span>
                  </button>
                  <button
                    onClick={copyUrl}
                    className="min-h-[42px] px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    title="Linki kopyala"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Link</span>
                  </button>
                </div>
              </div>

              {/* Option 2: Full Windshield Contact Pass */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-white">Hazır Ön Şüşə Kartı</h3>
                    <AzerbaijanLicensePlate plateNumber={profile.carPlate} size="sm" />
                  </div>
                  <p className="text-xs text-slate-400">
                    Üzərində QR kod, nömrəniz (+994 99 326 01 00), adınız və dövlət nömrə nişanınız olan tam hazır şüşə kartı.
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={handleDownloadCardPNG}
                    className="flex-1 min-h-[42px] px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Tam Kartı Yüklə (PNG)</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="min-h-[42px] px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Çap Et</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Windshield Card Customizer & Preview */}
          <div className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white">Ön Şüşə Kartının Dizaynını Seçin</h3>
                <p className="text-xs text-slate-400">İstədiyiniz dizayn üslubunu seçib dərhal yükləyə bilərsiniz</p>
              </div>

              {/* Theme buttons */}
              <div className="flex items-center gap-2">
                {(['carbon', 'minimal', 'gold', 'flag'] as CardTheme[]).map((theme) => (
                  <button
                    key={theme}
                    onClick={() => setSelectedTheme(theme)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                      selectedTheme === theme
                        ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                        : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    {theme === 'carbon' && 'Karbon'}
                    {theme === 'minimal' && 'Təmiz Ağ'}
                    {theme === 'gold' && 'Qızılı'}
                    {theme === 'flag' && 'Bayraq'}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Preview */}
            <div
              className={`w-full max-w-xl mx-auto rounded-2xl sm:rounded-3xl p-6 sm:p-7 transition-all shadow-2xl relative overflow-hidden border-2 ${
                selectedTheme === 'minimal'
                  ? 'bg-white text-slate-900 border-slate-300'
                  : selectedTheme === 'gold'
                  ? 'bg-[#0a1128] text-white border-amber-500/50'
                  : selectedTheme === 'flag'
                  ? 'bg-[#0b0f19] text-white border-slate-700'
                  : 'bg-[#0f1422] text-white border-slate-700/80'
              }`}
            >
              {selectedTheme === 'flag' && (
                <div className="absolute top-0 left-0 right-0 h-2 flex">
                  <div className="flex-1 bg-[#00B5E2]" />
                  <div className="flex-1 bg-[#EF3340]" />
                  <div className="flex-1 bg-[#509E2F]" />
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="shrink-0 p-3 bg-white rounded-2xl shadow-md border border-slate-200">
                  <QRCodeSVG value={targetUrl} size={150} level="H" />
                </div>

                <div className="flex-1 text-center sm:text-left space-y-2.5">
                  <span className={`text-[10px] uppercase font-bold tracking-widest block ${
                    selectedTheme === 'minimal' ? 'text-slate-500' : 'text-amber-400'
                  }`}>
                    AVTO PARK KARTI
                  </span>
                  <h4 className="text-xl font-extrabold tracking-tight">
                    {cardTitle}
                  </h4>
                  <p className={`text-xs ${
                    selectedTheme === 'minimal' ? 'text-slate-600' : 'text-slate-300'
                  }`}>
                    {cardSubtitle}
                  </p>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                    <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                      selectedTheme === 'minimal'
                        ? 'bg-slate-100 text-slate-900 border border-slate-300'
                        : 'bg-slate-800 text-white border border-slate-700'
                    }`}>
                      {profile.name}
                    </span>
                    <AzerbaijanLicensePlate plateNumber={profile.carPlate} size="sm" />
                  </div>

                  {showPhoneOnCard && (
                    <div className="pt-1 text-base font-bold font-mono text-amber-500">
                      {profile.displayPhone}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LIVE DRIVER STATUS SWITCHER */}
      {activeTab === 'status' && (
        <div className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xl space-y-5">
          <div>
            <h2 className="text-lg font-bold text-white mb-1">Sürücü Vəziyyətini (Statusunu) Seçin</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Bu status QR kodu oxudan insanlara dərhal görünəcək. Bir toxunuşla statusunuzu dəyişin:
            </p>
          </div>

          <div className="space-y-2.5">
            {STATUS_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const updated = { ...profile, driverNote: preset };
                  onUpdateProfile(updated);
                  setFormData(updated);
                  onToast('Status dərhal yeniləndi!');
                }}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  profile.driverNote === preset
                    ? 'bg-slate-800/90 border-amber-400 text-white shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-850'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${
                  profile.driverNote === preset
                    ? 'border-amber-400 bg-amber-400 text-slate-950'
                    : 'border-slate-600'
                }`}>
                  {profile.driverNote === preset && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <span className="text-xs sm:text-sm leading-relaxed">{preset}</span>
              </button>
            ))}
          </div>

          {/* Custom Status Note */}
          <div className="pt-3">
            <label className="block text-xs font-medium text-slate-300 mb-2">
              Və ya öz xüsusi qeydinizi yazın:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.driverNote}
                onChange={(e) => setFormData({ ...formData, driverNote: e.target.value })}
                className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                placeholder="Məsələn: 5 dəqiqəyə yaxınlaşıram..."
              />
              <button
                onClick={() => {
                  onUpdateProfile(formData);
                  onToast('Özəl qeyd yadda saxlanıldı!');
                }}
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Yadda Saxla
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PROFILE & CONTACT EDITOR */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xl space-y-5">
          <div>
            <h2 className="text-lg font-bold text-white mb-1">Məlumatların Redaktəsi</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Cəlal Cəfərov və 10-VX-900 üçün qeydiyyatda olan məlumatlar:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Ad və Soyad
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Dövlət Qeydiyyat Nişanı (Nömrə)
              </label>
              <input
                type="text"
                value={formData.carPlate}
                onChange={(e) => setFormData({ ...formData, carPlate: e.target.value.toUpperCase() })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Telefon Nömrəsi (Beynəlxalq)
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Telefon Nömrəsi (Görünüş)
              </label>
              <input
                type="text"
                value={formData.displayPhone}
                onChange={(e) => setFormData({ ...formData, displayPhone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Telegram (@istifadəçi_adı)
              </label>
              <input
                type="text"
                value={formData.telegram}
                onChange={(e) => setFormData({ ...formData, telegram: e.target.value.replace(/^@/, '') })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Instagram (@istifadəçi_adı)
              </label>
              <input
                type="text"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value.replace(/^@/, '') })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                TikTok (@istifadəçi_adı)
              </label>
              <input
                type="text"
                value={formData.tiktok}
                onChange={(e) => setFormData({ ...formData, tiktok: e.target.value.replace(/^@/, '') })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Yadda Saxla</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 4: SAVE.AZ HOSTING GUIDE */}
      {activeTab === 'hosting' && (
        <div className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">save.az Hostingə İnteqrasiya Təlimatı</h2>
              <p className="text-xs text-slate-400">
                Bu səhifəni əsas <span className="text-amber-400 font-mono">save.az</span> saytınızla heç bir əlaqəsi olmadan, 100% müstəqil işlətmək üçün 2 rahat üsul:
              </p>
            </div>
          </div>

          {/* Method 1: Subfolder (Recommended) */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 text-xs font-bold flex items-center justify-center">1</span>
                <h3 className="text-sm font-bold text-white">1-ci Üsul: Alt Qovluq (Ən Rahat və Sürətli)</h3>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                save.az/car
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Bu üsulla əsas saytınızdakı heç bir fayla və verilənlər bazasına toxunmursunuz. Səhifə sadəcə ayrı bir statik qovluq kimi açılır:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-xs text-slate-400 pl-1">
              <li>
                Hosting idarəetmə panelinə (<strong className="text-slate-200">cPanel, DirectAdmin və ya CyberPanel</strong>) daxil olun.
              </li>
              <li>
                <strong className="text-slate-200">File Manager (Fayl Meneceri)</strong> bölməsinə keçin və <strong className="text-slate-200">public_html</strong> qovluğunu açın.
              </li>
              <li>
                <strong className="text-slate-200">public_html</strong> içində yeni qovluq yaradın: adı <strong className="text-amber-400 font-mono">car</strong> (və ya <strong className="text-amber-400 font-mono">10vx900</strong>).
              </li>
              <li>
                Bu layihənin hazır fayllarını (<strong className="text-slate-200">index.html</strong> və <strong className="text-slate-200">assets</strong> qovluğunu) həmin <strong className="text-amber-400 font-mono">public_html/car/</strong> qovluğunun içinə yükləyin.
              </li>
              <li>
                Hazırdır! İndi brauzerdə <strong className="text-emerald-400 font-mono">https://save.az/car</strong> yazdıqda birbaşa bu avto kartınız açılacaq və əsas saytınıza zərrə qədər təsiri olmayacaq!
              </li>
            </ol>
          </div>

          {/* Method 2: Subdomain */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-700 text-white text-xs font-bold flex items-center justify-center">2</span>
                <h3 className="text-sm font-bold text-white">2-ci Üsul: Alt Domen (Subdomen)</h3>
              </div>
              <span className="text-xs font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                car.save.az
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Əgər ayrı domen ünvanı istəyirsinizsə:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-xs text-slate-400 pl-1">
              <li>
                Hosting panelinizdə <strong className="text-slate-200">Subdomains (Alt domenlər)</strong> bölməsinə girin.
              </li>
              <li>
                Yeni alt domen yaradın: <strong className="text-sky-400 font-mono">car</strong> (nəticə: <strong className="text-sky-400 font-mono">car.save.az</strong>).
              </li>
              <li>
                Hosting avtomatik olaraq onun üçün ayrıca qovluq yaradacaq. Faylları ora yükləyin.
              </li>
            </ol>
          </div>

          {/* Method 3: Windows PowerShell */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center font-mono">PS</span>
                <h3 className="text-sm font-bold text-white">3-cü Üsul: Windows PowerShell ilə Birbaşa Göndərmə</h3>
              </div>
              <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                SCP / SSH
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Brauzerdən File Manager açmadan, kompüterinizdəki Windows PowerShell-dən 2 əmrlə faylları birbaşa hostingə ata bilərsiniz:
            </p>
            
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-slate-300 block">1. Layihə qovluğunda PowerShell açıb faylları hazırlayın:</span>
              <pre className="p-2.5 rounded-lg bg-slate-950 font-mono text-[11px] text-emerald-400 overflow-x-auto border border-slate-800">
                npm run build
              </pre>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-slate-300 block">2. SCP ilə birbaşa save.az hostinginə yükləyin:</span>
              <pre className="p-2.5 rounded-lg bg-slate-950 font-mono text-[11px] text-amber-300 overflow-x-auto border border-slate-800">
                scp -r dist/* istifadeci_adi@save.az:~/public_html/car/
              </pre>
              <p className="text-[10px] text-slate-500">
                *(istifadeci_adi yerinə hosting istifadəçi adınızı və ya server IP-nizi yazın)*
              </p>
            </div>
          </div>

          {/* WordPress / CMS Isolation Note */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-slate-300 space-y-1.5">
            <div className="font-bold text-amber-400 flex items-center gap-1.5">
              <FileCode className="w-4 h-4" />
              <span>Əgər save.az əsas saytınız WordPress və ya başqa CMS ilə işləyirsə:</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              WordPress heç bir halda <code className="text-amber-300 font-mono">/car/</code> qovluğuna mane olmur, çünki Apache və Nginx fiziki mövcud olan qovluqları birbaşa açır. 
              Əgər hər ehtimala qarşı təcrid etmək istəsəniz, <code className="text-amber-300 font-mono">public_html/car/</code> qovluğunun içində kiçik bir <code className="text-amber-300 font-mono">.htaccess</code> faylı yaradıb içinə sadəcə bu sətri yaza bilərsiniz:
            </p>
            <pre className="p-2.5 rounded-lg bg-slate-950 font-mono text-[11px] text-amber-300 overflow-x-auto border border-slate-800">
              RewriteEngine Off
            </pre>
            <p className="text-slate-400 text-[11px]">
              Bu sətir həmin qovluğu əsas saytın bütün qaydalarından 100% təcrid edir.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
