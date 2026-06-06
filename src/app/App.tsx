import { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import PortfolioCategories from './components/PortfolioCategories';
import MasonryGallery from './components/MasonryGallery';
import MemoryTimeline from './components/MemoryTimeline';
import BehindTheLens from './components/BehindTheLens';
import VideoShowcase from './components/VideoShowcase';
import ClientsTestimonials from './components/ClientsTestimonials';
import ContactSection from './components/ContactSection';
import FloatingParticles from './components/FloatingParticles';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}

      {!isLoading && (
        <div className="relative bg-black">
          <FloatingParticles />
          <Navigation />

          <div className="relative" style={{ zIndex: 10 }}>
            <HeroSection />
            <PortfolioCategories />
            <MasonryGallery />
            <MemoryTimeline />
            <BehindTheLens />
            <VideoShowcase />
            <ClientsTestimonials />
            <ContactSection />
          </div>
        </div>
      )}
    </>
  );
}