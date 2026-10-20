import { DriverProfile, PresetAlert } from '../types';

export const DEFAULT_PROFILE: DriverProfile = {
  name: 'Cəlal Cəfərov',
  phone: '+994993260100',
  displayPhone: '+994 99 326 01 00',
  tiktok: 'cfrvcc',
  telegram: 'cafarovv900',
  instagram: 'cafarovv97',
  carPlate: '10 VX 900',
  driverNote: 'Müvəqqəti uzaqlaşmışam. Narahatlıq yaranarsa, zəhmət olmasa dərhal zəng edin və ya WhatsApp-dan yazın, 3-5 dəqiqəyə yaxınlaşacağam.',
};

export const PRESET_ALERTS: PresetAlert[] = [
  {
    id: 'blocked',
    title: 'Çıxışımı bağlamısınız',
    subtitle: 'Tələsirəm, çıxa bilmirəm',
    message: 'Salam Cəlal bəy! Zəhmət olmasa 10-VX-900 nömrəli avtomobilinizə yaxınlaşın, çıxışımı bağlamısınız və təcili çıxmalıyam.',
    severity: 'urgent',
    icon: 'CarFront',
  },
  {
    id: 'hurry',
    title: '2-3 dəqiqəyə yaxınlaşın',
    subtitle: 'Yolu açmağınız xahiş olunur',
    message: 'Salam! 10-VX-900 nömrəli avtomobilin saxlandığı yer digər maşınların hərəkətinə mane olur, zəhmət olmasa yaxınlaşıb yolu açın.',
    severity: 'urgent',
    icon: 'Clock',
  },
  {
    id: 'lights',
    title: 'Farlar / işıqlar yanıq qalıb',
    subtitle: 'Akkumulyator boşala bilər',
    message: 'Salam Cəlal bəy! 10-VX-900 nömrəli avtomobilinizin faraları və ya qabarit işıqları yanıq qalıb, akkumulyator bitməsin deyə xəbərdar edirəm.',
    severity: 'warning',
    icon: 'Lightbulb',
  },
  {
    id: 'window',
    title: 'Pəncərə və ya qapı açıqdır',
    subtitle: 'Təhlükəsizlik xəbərdarlığı',
    message: 'Salam! 10-VX-900 nömrəli avtomobilinizin pəncərəsi (və ya lyuku/qapısı) açıq qalıb, xəbəriniz olsun.',
    severity: 'warning',
    icon: 'ShieldAlert',
  },
  {
    id: 'tow_truck',
    title: 'Evakuator / Yol Polisi yaxınlaşır',
    subtitle: 'Cərimə və ya evakuasiya təhlükəsi',
    message: 'Təcili xəbərdarlıq! 10-VX-900 nömrəli avtomobilinizin yanına evakuator və ya Yol Polisi yaxınlaşır, cərimələnməmək üçün dərhal gəlin.',
    severity: 'urgent',
    icon: 'Siren',
  },
  {
    id: 'alarm_scratch',
    title: 'Siqnalizasiya və ya toxunma',
    subtitle: 'Avtomobillə bağlı hadisə',
    message: 'Salam Cəlal bəy! 10-VX-900 nömrəli avtomobilinizin siqnalizasiyası işə düşüb və ya toxunma olub, yoxlamağınız məsləhətdir.',
    severity: 'warning',
    icon: 'BellRing',
  },
];
