import { render, screen } from '@testing-library/angular';
import { MobileMenuDrawerComponent } from './mobile-menu-drawer.component';
import { provideRouter } from '@angular/router';

describe('MobileMenuDrawerComponent', () => {
  const navItems = [
    { label: 'Home', route: '/' },
    { label: 'About', route: '/about' },
  ];

  it('should not render when closed', async () => {
    await render(MobileMenuDrawerComponent, {
      inputs: { isOpen: false, navItems },
      providers: [provideRouter([])],
    });
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('should render nav items when open', async () => {
    await render(MobileMenuDrawerComponent, {
      inputs: { isOpen: true, navItems },
      providers: [provideRouter([])],
    });
    expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('should have close button', async () => {
    await render(MobileMenuDrawerComponent, {
      inputs: { isOpen: true, navItems },
      providers: [provideRouter([])],
    });
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument();
  });
});
