import { DriverProfile } from '../types';

export function getCleanPhoneNumber(phone: string): string {
  return phone.replace(/[^0-9]/g, '');
}

export function generateWhatsAppLink(phone: string, text?: string): string {
  const clean = getCleanPhoneNumber(phone);
  if (text && text.trim()) {
    return `https://wa.me/${clean}?text=${encodeURIComponent(text.trim())}`;
  }
  return `https://wa.me/${clean}`;
}

export function generateSmsLink(phone: string, text?: string): string {
  if (text && text.trim()) {
    return `sms:${phone}?body=${encodeURIComponent(text.trim())}`;
  }
  return `sms:${phone}`;
}

export function generateVCard(profile: DriverProfile): string {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${profile.name} (10-VX-900)`,
    `N:Cəfərov;Cəlal;;;`,
    `TEL;TYPE=CELL:${profile.phone}`,
    `NOTE:10-VX-900 avtomobil sahibi Cəlal Cəfərov | Əlaqə: ${profile.phone} | TikTok: @${profile.tiktok} | Telegram: @${profile.telegram} | Instagram: @${profile.instagram}`,
    `URL:https://t.me/${profile.telegram}`,
    'END:VCARD',
  ].join('\r\n');

  return vcard;
}

export function downloadVCard(profile: DriverProfile) {
  const vcardData = generateVCard(profile);
  const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Celal_Ceferov_10_VX_900.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
