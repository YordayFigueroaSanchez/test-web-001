import { Injectable } from '@angular/core';
import { ContactFormData, WhatsAppConfig } from '../interfaces';

const PHONE_PATTERN = /^\d+$/;

@Injectable({ providedIn: 'root' })
export class WhatsAppService {
  validatePhone(phone: string): boolean {
    return PHONE_PATTERN.test(phone);
  }

  buildUrl(config: WhatsAppConfig, formData: ContactFormData): string {
    const phone = config.phoneNumber.replace(/\D/g, '');
    if (!this.validatePhone(phone)) {
      throw new Error('Invalid phone number format');
    }

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const message = formData.message.trim();

    const text = [
      config.defaultMessage || '',
      `Nombre: ${name}`,
      `Email: ${email}`,
      `Mensaje: ${message}`,
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  }

  openChat(config: WhatsAppConfig, formData: ContactFormData): void {
    const url = this.buildUrl(config, formData);
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
