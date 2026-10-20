export interface DriverProfile {
  name: string;
  phone: string;
  displayPhone: string;
  tiktok: string;
  telegram: string;
  instagram: string;
  carPlate: string;
  driverNote: string;
}

export interface PresetAlert {
  id: string;
  title: string;
  subtitle: string;
  message: string;
  severity: 'urgent' | 'warning' | 'info';
  icon: string;
}

export type CardTheme = 'carbon' | 'minimal' | 'gold' | 'flag';
