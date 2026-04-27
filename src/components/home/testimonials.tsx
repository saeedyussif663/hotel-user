import { Card } from '@/components/ui/card';
import SectionBadge from '@/components/ui/section-badge';
import { Quotes, Star } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Business Traveller',
    review: "The service was impeccable. Every detail was considered — from the pillow menu to the in-room espresso machine. I've stayed at many luxury hotels but Aurea stands apart in every way.",
    rating: 5,
  },
  {
    name: 'James Okonkwo',
    role: 'Honeymoon Guest',
    review: 'Our honeymoon at Aurea was absolutely perfect. The suite was breathtaking, the staff went above and beyond, and the dining experience was one we will never forget.',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Family Vacation',
    review: 'Travelling with kids can be stressful, but the team at Aurea made it completely effortless. The activities, the pool, and the attentive staff made it a trip the whole family will treasure.',
    rating: 5,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <motion.div
      variants={cardVariants}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className="p-7 gap-5 rounded-2xl cursor-default h-full flex flex-col">
        <Quotes size={28} weight="fill" className="text-primary/20" />
        <p className="text-sm text-foreground leading-relaxed flex-1">"{t.review}"</p>
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="font-semibold text-sm text-foreground">{t.name}</div>
            <div className="text-xs text-muted-foreground">{t.role}</div>
          </div>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} size={16} weight="fill" className="text-primary" />
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-muted py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <SectionBadge label="Guest Reviews" />
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <h2 className="text-4xl font-bold tracking-tight text-foreground max-w-sm">
              What Our Guests Are Saying
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Trusted by thousands of guests — rated 5 stars across all major travel platforms.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.12 }}
        >
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
