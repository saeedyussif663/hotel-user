import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Buildings } from '@phosphor-icons/react';
import { Link } from 'react-router';

const quickLinks = [
  { label: 'Rooms & Suites', href: '#rooms' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Experiences', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy', href: '#' },
];

const contactDetails = [
  '1 Aurea Boulevard, Harbour City',
  '+1 (800) 287-3200',
  'reservations@aureahotel.com',
];

function FooterLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="size-8 rounded-md bg-primary flex items-center justify-center shrink-0">
        <Buildings size={16} weight="fill" className="text-primary-foreground" />
      </div>
      <span className="font-bold text-base tracking-tight text-foreground">Aurea Hotel</span>
    </div>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="bg-background border-t border-border scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <FooterLogo />
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Redefining luxury hospitality for over three decades. Where every stay becomes an unforgettable memory.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 tracking-wide">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 tracking-wide">Contact</h4>
            <ul className="space-y-2.5">
              {contactDetails.map((item) => (
                <li key={item} className="text-sm text-muted-foreground">{item}</li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 tracking-wide">Stay in Touch</h4>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Get exclusive offers and travel inspiration delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <Input type="email" placeholder="Your email" className="flex-1 min-w-0 h-9" />
              <Button size="sm" className="shrink-0 h-9 px-4">Subscribe</Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Aurea Hotel. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
