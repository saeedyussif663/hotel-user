import { Button } from '@/components/ui/button';
import SectionBadge from '@/components/ui/section-badge';
import { CheckCircle } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

const highlights = [
  'Award-winning architecture overlooking the coastline',
  'Over 30 years of redefining luxury hospitality',
  'Curated local experiences with expert guides',
  'Sustainable practices across all hotel operations',
];

export default function Experience() {
  return (
    <section id="experience" className="bg-background py-24 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          <motion.div
            className="w-full lg:flex-1 min-w-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <div className="relative rounded-2xl overflow-hidden border border-border h-96 lg:h-[500px]">
              <img
                src="/landing_page_image.png"
                alt="Aurea Hotel exterior"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            className="w-full lg:flex-1 min-w-0"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
          >
            <SectionBadge label="Our Story" />

            <h2 className="text-4xl font-bold tracking-tight text-foreground mb-5">
              A Legacy of Exceptional Hospitality
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-5">
              Aurea Hotel was born from a single belief: that a great stay should feel effortless. Since opening our doors, we have welcomed guests from across the world and earned a reputation for warmth, precision, and uncompromising quality.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              Every space has been designed with intention — from the soaring lobby atrium to the quiet intimacy of each suite. We don't just provide accommodation; we craft experiences that stay with you long after check-out.
            </p>

            <ul className="space-y-3 mb-10">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                  <CheckCircle size={16} weight="fill" className="text-primary mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <Button className="h-11 px-7 text-[15px] font-semibold">
              Discover Our Story
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
