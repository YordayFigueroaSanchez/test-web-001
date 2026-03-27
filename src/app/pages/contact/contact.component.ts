import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { FormFieldComponent } from '../../components/form-field/form-field.component';
import { SeoService } from '../../shared/services/seo.service';
import { WhatsAppService } from '../../shared/services/whatsapp.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, FormFieldComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <section aria-labelledby="contact-heading" class="max-w-2xl mx-auto">
        <h1
          id="contact-heading"
          class="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6 text-center"
        >
          Contact Us
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 text-center mb-12">
          Have a question or want to work together? Send us a message.
        </p>

        @if (submitted()) {
          <div
            role="alert"
            class="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center mb-8"
          >
            <p class="text-green-800 dark:text-green-300 font-medium text-lg">
              Thank you! Your message has been sent successfully.
            </p>
            <button
              class="mt-4 text-green-600 dark:text-green-400 underline hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded"
              (click)="resetForm()"
            >
              Send another message
            </button>
          </div>
        } @else {
          <form
            [formGroup]="contactForm"
            (ngSubmit)="onSubmit()"
            class="space-y-6"
            novalidate
          >
            <app-form-field
              label="Name"
              [errorMessage]="getFieldError('name')"
              [required]="true"
            >
              <input
                type="text"
                formControlName="name"
                class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors"
                autocomplete="name"
              />
            </app-form-field>

            <app-form-field
              label="Email"
              [errorMessage]="getFieldError('email')"
              [required]="true"
            >
              <input
                type="email"
                formControlName="email"
                class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors"
                autocomplete="email"
              />
            </app-form-field>

            <app-form-field
              label="Message"
              [errorMessage]="getFieldError('message')"
              [required]="true"
            >
              <textarea
                formControlName="message"
                rows="5"
                class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors resize-y"
              ></textarea>
            </app-form-field>

            <div class="flex flex-col sm:flex-row gap-4">
              <app-button
                variant="primary"
                type="submit"
                [disabled]="contactForm.invalid"
                ariaLabel="Send contact message"
              >
                Send Message
              </app-button>

              <app-button
                variant="outline"
                ariaLabel="Contact us via WhatsApp"
                (click)="openWhatsApp()"
              >
                Contact via WhatsApp
              </app-button>
            </div>
          </form>
        }
      </section>
    </div>
  `,
})
export class ContactComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly seoService = inject(SeoService);
  private readonly whatsAppService = inject(WhatsAppService);

  readonly submitted = signal(false);

  readonly contactForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
  });

  ngOnInit(): void {
    this.seoService.setPageSeo({
      title: 'Contact — test-web-001',
      description: 'Get in touch with us. Send a message or contact us via WhatsApp.',
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.submitted.set(true);
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.contactForm.reset();
    this.submitted.set(false);
  }

  openWhatsApp(): void {
    const formValue = this.contactForm.getRawValue();
    const config = {
      phoneNumber: '',
      defaultMessage: 'Hello! I would like more information.',
    };

    if (!this.whatsAppService.validatePhone(config.phoneNumber.replace(/\D/g, ''))) {
      return;
    }

    this.whatsAppService.openChat(
      config,
      { name: formValue.name, email: formValue.email, message: formValue.message },
    );
  }

  getFieldError(fieldName: string): string {
    const control = this.contactForm.get(fieldName);
    if (!control || !control.touched || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`;
    }
    if (control.errors['email']) {
      return 'Please enter a valid email address.';
    }
    if (control.errors['minlength']) {
      return `Minimum ${control.errors['minlength'].requiredLength} characters required.`;
    }
    if (control.errors['maxlength']) {
      return `Maximum ${control.errors['maxlength'].requiredLength} characters allowed.`;
    }

    return 'Invalid input.';
  }
}
