import Amenities from '@/components/home/amenities';
import AnnouncementBar from '@/components/home/announcement-bar';
import CtaBanner from '@/components/home/cta-banner';
import Experience from '@/components/home/experience';
import Footer from '@/components/home/footer';
import Hero from '@/components/home/hero';
import Navbar from '@/components/home/navbar';
import Rooms from '@/components/home/rooms';
import Testimonials from '@/components/home/testimonials';

export default function Home() {
  return (
    <div
      className="min-h-screen overflow-x-hidden bg-background text-foreground"
    >
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <Rooms />
      <Amenities />
      <Experience />
      <Testimonials />
      <CtaBanner />
      <Footer />
    </div>
  );
}
