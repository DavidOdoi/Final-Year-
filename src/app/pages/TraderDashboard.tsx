import { useState } from 'react';
import { TraderSidebar } from '../components/trader/TraderSidebar';
import { TraderTopBar } from '../components/trader/TraderTopBar';
import { TraderKPICards } from '../components/trader/TraderKPICards';
import { PostLoadCTA } from '../components/trader/PostLoadCTA';
import { ShipmentCards } from '../components/trader/ShipmentCards';
import { TrackingMap } from '../components/trader/TrackingMap';
import { SpendAnalytics } from '../components/trader/SpendAnalytics';

export default function TraderDashboard() {
  const [language, setLanguage] = useState<'sw' | 'en'>('en');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#F7EFE9]">
      <TraderSidebar 
        language={language} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      <div className="lg:ml-64 relative">
        <TraderTopBar 
          language={language}
          setLanguage={setLanguage}
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        <main className="relative p-4 md:p-8">
          {/* KPI Cards */}
          <TraderKPICards language={language} />

          {/* Post Load CTA */}
          <div className="mt-8">
            <PostLoadCTA language={language} />
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6 mt-8">
            {/* Left Column - Shipments */}
            <div className="lg:col-span-2">
              <ShipmentCards language={language} />
            </div>

            {/* Right Column - Tracking & Analytics */}
            <div className="space-y-6">
              <TrackingMap language={language} />
              <SpendAnalytics language={language} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


