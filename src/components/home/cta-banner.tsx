import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function CtaBanner() {
  return (
    <section className="bg-primary py-20">
      <motion.div
        className="max-w-7xl mx-auto px-6 text-center"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-primary-foreground/70 text-sm font-semibold tracking-widest uppercase mb-4"
        >
          Limited Availability
        </motion.p>

        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl font-bold tracking-tight text-primary-foreground mb-5 max-w-2xl mx-auto"
        >
          Ready to Experience Luxury?
        </motion.h2>

        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-primary-foreground/75 text-lg max-w-lg mx-auto leading-relaxed mb-10"
        >
          Book directly with us for the best available rate, complimentary
          welcome amenities, and priority room selection.
        </motion.p>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Button
            variant="secondary"
            className="h-11 px-7 text-[15px] font-semibold bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            Book Your Stay
          </Button>
          <Button
            variant="outline"
            className="h-11 px-7 text-[15px] font-semibold bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            Contact Reservations
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
