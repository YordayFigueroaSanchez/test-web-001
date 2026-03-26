import { TestBed } from '@angular/core/testing';
import { WhatsAppService } from './whatsapp.service';

describe('WhatsAppService', () => {
  let service: WhatsAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhatsAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should validate phone with only digits', () => {
    expect(service.validatePhone('1234567890')).toBe(true);
    expect(service.validatePhone('abc')).toBe(false);
    expect(service.validatePhone('')).toBe(false);
  });

  it('should build a valid WhatsApp URL', () => {
    const url = service.buildUrl(
      { phoneNumber: '1234567890' },
      { name: 'John', email: 'john@test.com', message: 'Hello world' },
    );
    expect(url).toContain('https://wa.me/1234567890?text=');
    expect(url).toContain(encodeURIComponent('Nombre: John'));
    expect(url).toContain(encodeURIComponent('Email: john@test.com'));
  });

  it('should trim and lowercase email', () => {
    const url = service.buildUrl(
      { phoneNumber: '1234567890' },
      { name: '  Ana  ', email: '  ANA@TEST.COM  ', message: 'Hello world' },
    );
    expect(url).toContain(encodeURIComponent('Nombre: Ana'));
    expect(url).toContain(encodeURIComponent('Email: ana@test.com'));
  });

  it('should throw for invalid phone', () => {
    expect(() =>
      service.buildUrl(
        { phoneNumber: 'abc' },
        { name: 'John', email: 'john@test.com', message: 'Hello' },
      ),
    ).toThrow('Invalid phone number format');
  });
});
