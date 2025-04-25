import { LandingHero } from '@/components/landing/LandingHero';
import { AboutSection } from '@/components/landing/AboutSection';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <LandingHero />
      <AboutSection />
      <Footer />
    </main>
  );
}