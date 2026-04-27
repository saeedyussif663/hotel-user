import { Card } from '@/components/ui/card';
import SectionBadge from '@/components/ui/section-badge';
import { Bell, ForkKnife, Lightning, Sparkle, Waves, WifiHigh } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Amenity {
  title: string;
  description: string;
  icon: ReactNode;
}

const amenities: Amenity[] = [
  { title: 'Infinity Pool', description: 'A rooftop oasis with uninterrupted panoramic views stretching to the horizon.', icon: <Waves size={20} /> },
  { title: 'Luxury Spa', description: 'Rejuvenate with world-class treatments, massages, and holistic therapies.', icon: <Sparkle size={20} /> },
  { title: 'Fine Dining', description: 'Four signature restaurants serving local and international cuisines.', icon: <ForkKnife size={20} /> },
  { title: 'Fitness Centre', description: 'State-of-the-art equipment and personal training, open around the clock.', icon: <Lightning size={20} /> },
  { title: 'High-Speed WiFi', description: 'Seamless, high-bandwidth connectivity across every corner of the property.', icon: <WifiHigh size={20} /> },
  { title: '24/7 Concierge', description: 'Our dedicated team is always on hand to tailor every detail of your stay.', icon: <Bell size={20} /> },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function AmenityCard({ amenity }: { amenity: Amenity }) {
  return (
    <motion.div
      variants={cardVariants}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Card className="p-6 gap-3 rounded-2xl cursor-default h-full">
        <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          {amenity.icon}
        </div>
        <div>
          <h3 className="font-semibold text-foreground mb-1.5">{amenity.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{amenity.description}</p>
        </div>
      </Card>
    </motion.div>
  );
}

export default function Amenities() {
  return (
    <section id="amenities" className="bg-muted py-24 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <SectionBadge label="Amenities" />
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <h2 className="text-4xl font-bold tracking-tight text-foreground max-w-sm">
              Everything You Need, All in One Place
            </h2>
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              Every amenity is crafted to elevate your stay from comfortable to extraordinary.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.08 }}
        >
          {amenities.map((amenity) => (
            <AmenityCard key={amenity.title} amenity={amenity} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
