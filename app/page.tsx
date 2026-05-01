import Navbar from './components/Navbar';
import HeroCanvas from './components/HeroCanvas';
import Features from './components/Features';
import Experiences from './components/Experiences';
import Stats from './components/Stats';
import Location from './components/Location';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

export default function Home() {
  return (
    <main className="bg-[#030308] min-h-screen">
      <Navbar />
      <HeroCanvas />
      <Features />
      <Experiences />
      <Stats />
      <Location />
      <Footer />
      <BookingModal />
    </main>
  );
}
