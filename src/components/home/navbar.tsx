import { Button } from '@/components/ui/button';
import { Buildings, List, X } from '@phosphor-icons/react';
import { useState } from 'react';
import { Link } from 'react-router';

const navLinks = [
  { label: 'Rooms & Suites', href: '#rooms' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Experiences', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

function scrollTo(href: string, onClose?: () => void) {
  const el = document.getElementById(href.replace('#', ''));
  if (el) el.scrollIntoView({ behavior: 'smooth' });
  onClose?.();
}

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 shrink-0">
      <div className="size-8 rounded-md bg-primary flex items-center justify-center">
        <Buildings size={16} weight="fill" className="text-primary-foreground" />
      </div>
      <span className="font-bold text-base tracking-tight">Aurea Hotel</span>
    </Link>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-1">
      {navLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          onClick={(e) => { e.preventDefault(); scrollTo(link.href, onClose); }}
          className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted cursor-pointer"
        >
          {link.label}
        </a>
      ))}
      <div className="flex gap-2 mt-4 pt-4 border-t border-border">
        <Button variant="outline" size="sm" className="flex-1">Sign in</Button>
        <Button size="sm" className="flex-1">Book a Room</Button>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className="px-3.5 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2 shrink-0">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            Sign in
          </Button>
          <Button className="px-4">Book a Room</Button>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-md hover:bg-muted transition-colors text-foreground"
        >
          {menuOpen ? <X size={20} /> : <List size={20} />}
        </button>
      </div>

      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
    </header>
  );
}
