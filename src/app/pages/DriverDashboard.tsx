import { useState } from 'react';
import { Sidebar } from '../components/dashboard/Sidebar';
import { TopBar } from '../components/dashboard/TopBar';
import { KPICards } from '../components/dashboard/KPICards';
import { LoadCards } from '../components/dashboard/LoadCards';
import { ActiveTrip } from '../components/dashboard/ActiveTrip';
import { EarningsChart } from '../components/dashboard/EarningsChart';

export default function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const [language, setLanguage] = useState<'sw' | 'en'>('en');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#F7EFE9]">
      <Sidebar language={language} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="lg:ml-64 relative">
        <TopBar 
          isOnline={isOnline} 
          setIsOnline={setIsOnline}
          language={language}
          setLanguage={setLanguage}
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        <main className="relative p-4 md:p-8">
          <KPICards language={language} />
          <div className="grid lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2 space-y-6">
              <LoadCards language={language} />
            </div>
            <div className="space-y-6">
              <ActiveTrip language={language} />
              <EarningsChart language={language} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}