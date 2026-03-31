import { render, screen } from '@testing-library/angular';
import { CardComponent } from './card.component';

describe('CardComponent (PrimeNG)', () => {
  it('should render title and description', async () => {
    await render(CardComponent, {
      inputs: { title: 'Feature 1', description: 'A great feature' },
    });
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('A great feature')).toBeInTheDocument();
  });

  it('should render image when imageSrc provided', async () => {
    await render(CardComponent, {
      inputs: { imageSrc: '/test.jpg', imageAlt: 'Test image', title: 'Test' },
    });
    expect(screen.getByRole('img', { name: 'Test image' })).toBeInTheDocument();
  });

  it('should project custom content via ng-content', async () => {
    await render(`<app-card><span>Custom content</span></app-card>`, {
      imports: [CardComponent],
    });
    expect(screen.getByText('Custom content')).toBeInTheDocument();
  });

  it('should not render image header when imageSrc not provided', async () => {
    await render(CardComponent, {
      inputs: { title: 'Test' },
    });
    const images = screen.queryAllByRole('img');
    expect(images.length).toBe(0);
  });
});
