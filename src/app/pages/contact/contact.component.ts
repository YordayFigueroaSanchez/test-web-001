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
        <p class="text-xs text-center uppercase tracking-[0.22em] text-gold-400 mb-3">Start A Conversation</p>
        <h1
          id="contact-heading"
          class="text-4xl font-bold text-matte-black-200 dark:text-bone-200 mb-6 text-center"
        >
          Let’s Build Something Distinct
        </h1>
        <p class="text-lg text-neutral-700 dark:text-neutral-300 text-center mb-12 leading-relaxed">
          Share your goals, timeline, and vision. We will respond with a focused
          recommendation tailored to your brand stage.
        </p>

        @if (submitted()) {
          <div
            role="alert"
            class="bg-bone-100 dark:bg-matte-black-100 border border-gold-400/30 rounded-xl p-6 text-center mb-8"
          >
            <p class="text-matte-black-200 dark:text-bone-200 font-medium text-lg">
              Thank you. Your brief has been received successfully.
            </p>
            <button
              class="mt-4 text-gold-500 underline hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded"
              (click)="resetForm()"
            >
              Send another brief
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
                class="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-matte-black-100 text-matte-black-200 dark:text-bone-200 px-4 py-3 focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-colors"
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
                class="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-matte-black-100 text-matte-black-200 dark:text-bone-200 px-4 py-3 focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-colors"
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
                class="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-matte-black-100 text-matte-black-200 dark:text-bone-200 px-4 py-3 focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-colors resize-y"
              ></textarea>
            </app-form-field>

            <div class="flex flex-col sm:flex-row gap-4">
              <app-button
                variant="primary"
                type="submit"
                [disabled]="contactForm.invalid"
                ariaLabel="Send project brief"
              >
                Send Brief
              </app-button>

              <app-button
                variant="outline"
                ariaLabel="Contact Aura Studio via WhatsApp"
                (click)="openWhatsApp()"
              >
                Continue on WhatsApp
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
  private readonly whatsAppConfig = {
    phoneNumber: '521234567890',
    defaultMessage: 'Hello Aura Studio, I would like to discuss a premium web project.',
  };

  readonly submitted = signal(false);

  readonly contactForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
  });

  ngOnInit(): void {
    this.seoService.setPageSeo({
      title: 'Contact Aura Studio — Start Your Project Brief',
      description: 'Contact Aura Studio to discuss strategy, design systems, and premium frontend implementation.',
      route: '/contact',
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
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const formValue = this.contactForm.getRawValue();
    if (!this.whatsAppService.validatePhone(this.whatsAppConfig.phoneNumber.replace(/\D/g, ''))) {
      return;
    }

    this.whatsAppService.openChat(
      this.whatsAppConfig,
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
