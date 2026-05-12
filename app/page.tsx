import Navbar from './components/layout/Navbar';
import HeroCanvas from './components/sections/HeroCanvas';
import Features from './components/sections/Features';
import Experiences from './components/sections/Experiences';
import VRDevices from './components/sections/VRDevices';
import Stats from './components/sections/Stats';
import Location from './components/sections/Location';
import Footer from './components/layout/Footer';
import BookingModal from './components/modals/BookingModal';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-[#030308] min-h-screen">
        <HeroCanvas />
        <Features />
        <Experiences />
        <VRDevices />
        <Stats />
        <Location />
      </main>
      <Footer />
      <BookingModal />
    </>
  );
}
