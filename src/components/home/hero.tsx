import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const stats = [
  { value: '120+', label: 'Luxury Rooms' },
  { value: '4', label: 'Restaurants' },
  { value: '5★', label: 'Guest Rating' },
  { value: '24/7', label: 'Concierge' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

function Badge() {
  return (
    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3.5 py-1.5 rounded-full mb-8 tracking-wide uppercase">
      <span className="size-1.5 rounded-full bg-primary shrink-0" />
      Luxury Hospitality · City Centre
    </div>
  );
}

function StatsStrip() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden border border-border"
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={fadeUp}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-background px-6 py-5"
        >
          <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="bg-background">
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-24">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16 mb-20">

          {/* Left — text */}
          <motion.div
            className="flex-1 min-w-0"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.5, ease: 'easeOut' }}>
              <Badge />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.06] mb-6"
            >
              Where Every Stay
              <br />
              Becomes a Memory
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-lg text-muted-foreground max-w-lg leading-relaxed mb-10"
            >
              Refined comfort, seamless service, and thoughtfully curated
              experiences — designed for guests who expect more than just a room.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex flex-wrap gap-3"
            >
              <Button className="h-11 px-7 text-[15px] font-semibold">
                Book Your Stay
              </Button>
              <Button variant="outline" className="h-11 px-7 text-[15px] font-semibold">
                Explore Rooms
              </Button>
            </motion.div>
          </motion.div>

          {/* Right — image */}
          <motion.div
            className="hidden lg:flex flex-1 min-w-0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          >
            <div className="relative rounded-2xl overflow-hidden border border-border w-full h-105">
              <img
                src="/landing_page_image.png"
                alt="Aurea Hotel"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        <StatsStrip />
      </div>
    </section>
  );
}
