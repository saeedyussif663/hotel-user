import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SectionBadge from '@/components/ui/section-badge';
import { motion } from 'framer-motion';

const rooms = [
  {
    name: 'Classic Room',
    description: 'Thoughtfully appointed comfort for the modern traveller, with every essential at your fingertips.',
    price: 299,
    features: ['King Bed', 'City View', '42" Smart TV', 'Free WiFi'],
    tag: 'Most Popular',
  },
  {
    name: 'Deluxe Suite',
    description: 'Expansive living spaces with floor-to-ceiling windows and sweeping panoramic views over the city.',
    price: 499,
    features: ['King Bed', 'Sea View', 'Living Room', 'Jacuzzi'],
    tag: null,
  },
  {
    name: 'Presidential Suite',
    description: 'The pinnacle of luxury — a private retreat with bespoke furnishings and a dedicated butler.',
    price: 899,
    features: ['2 Bedrooms', 'Private Terrace', 'Butler Service', 'Dining Room'],
    tag: 'Top Pick',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function RoomCard({ room }: { room: (typeof rooms)[number] }) {
  return (
    <motion.div
      variants={cardVariants}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className="p-0 gap-0 rounded-2xl overflow-hidden cursor-default h-full flex flex-col">
        <div className="relative h-52 shrink-0 overflow-hidden">
          <img src="/card-image.png" alt={room.name} className="w-full h-full object-cover" />
          {room.tag && (
            <Badge className="absolute top-3 left-3">
              {room.tag}
            </Badge>
          )}
        </div>

        <CardContent className="p-6 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="text-lg font-bold text-foreground">{room.name}</h3>
            <div className="shrink-0 text-right">
              <span className="text-xl font-bold text-foreground">${room.price}</span>
              <span className="text-sm text-muted-foreground"> / night</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{room.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {room.features.map((f) => (
              <Badge key={f} variant="secondary" className="text-xs font-normal">
                {f}
              </Badge>
            ))}
          </div>

          <Button variant="outline" className="w-full mt-auto">
            Book Now
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Rooms() {
  return (
    <section id="rooms" className="bg-background py-12 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <SectionBadge label="Rooms & Suites" />
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <h2 className="text-4xl font-bold tracking-tight text-foreground max-w-sm">
              Find Your Perfect Room
            </h2>
            <Button variant="outline">View All Rooms</Button>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.12 }}
        >
          {rooms.map((room) => (
            <RoomCard key={room.name} room={room} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
