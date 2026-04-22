import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { HeroSection } from '../components/HeroSection';
import { Statistics } from '../components/Statistics';
import { HowItWorks } from '../components/HowItWorks';
import { FeaturesSection } from '../components/FeaturesSection';
import { OnboardingScreens } from '../components/OnboardingScreens';
import { ReviewsSection } from '../components/ReviewsSection';
import { TeamSection } from '../components/TeamSection';
import { CTASection } from '../components/CTASection';
import { EnhancedFooter } from '../components/EnhancedFooter';

export default function LandingPage() {
  const [language, setLanguage] = useState<'sw' | 'en'>('sw');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'sw' ? 'en' : 'sw'));
  };

  return (
    <div className="relative min-h-screen bg-white">
      <Navigation language={language} onToggleLanguage={toggleLanguage} />
      <HeroSection language={language} onToggleLanguage={toggleLanguage} />
      <Statistics language={language} />
      <HowItWorks language={language} />
      <FeaturesSection language={language} />
      <OnboardingScreens language={language} />
      <ReviewsSection language={language} />
      <TeamSection language={language} />
      <CTASection language={language} />
      <EnhancedFooter language={language} />
    </div>
  );
}

