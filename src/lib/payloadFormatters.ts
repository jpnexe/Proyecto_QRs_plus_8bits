export type QRContentType =
  | 'url'
  | 'text'
  | 'email'
  | 'call'
  | 'sms'
  | 'vcard'
  | 'whatsapp'
  | 'wifi'
  | 'pdf'
  | 'app'
  | 'image'
  | 'video'
  | 'social'
  | 'event'
  | 'code2d';

export interface VCardData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  org: string;
}

export interface WifiData {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
}

export interface EmailData {
  email: string;
  subject: string;
  message: string;
}

export interface SmsData {
  phone: string;
  message: string;
}

export function formatWifiPayload(data: WifiData): string {
  return `WIFI:T:${data.encryption};S:${data.ssid};P:${data.password};;`;
}

export function formatVCardPayload(data: VCardData): string {
  return `BEGIN:VCARD
VERSION:3.0
N:${data.lastName};${data.firstName}
FN:${data.firstName} ${data.lastName}
ORG:${data.org}
TEL:${data.phone}
EMAIL:${data.email}
END:VCARD`;
}

export function formatWhatsappPayload(phone: string, text: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

export function formatEmailPayload(data: EmailData): string {
  return `mailto:${data.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.message)}`;
}

export function formatSmsPayload(data: SmsData): string {
  return `smsto:${data.phone}:${data.message}`;
}
