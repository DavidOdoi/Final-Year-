import { useEffect, useState } from 'react';
import { ArrowRight, Globe, LogIn, Truck, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { getAuthToken, getStoredUser } from '../lib/api';
import truckImage from '../../assets/images/turck.webp';

export default function DriverAccess() {
  const [language, setLanguage] = useState<'sw' | 'en'>('en');
  const navigate = useNavigate();

  const content = {
    sw: {
      eyebrow: 'Dereva',
      title: 'Endelea Kama Dereva',
      subtitle: 'Ikiwa tayari una akaunti, ingia. Ukiwa mgeni, tengeneza akaunti mpya ya dereva.',
      loginTitle: 'Nina Akaunti',
      loginText: 'Ingia uende moja kwa moja kwenye dashibodi ya dereva.',
      loginButton: 'Ingia',
      registerTitle: 'Sina Akaunti',
      registerText: 'Jisajili kama dereva mpya na uanze kuona mizigo.',
      registerButton: 'Jisajili',
    },
    en: {
      eyebrow: 'Driver',
      title: 'Continue as a Driver',
      subtitle: 'If you already have an account, sign in. If you are new here, create a driver account.',
      loginTitle: 'I Have an Account',
      loginText: 'Sign in and go straight to your driver dashboard.',
      loginButton: 'Sign In',
      registerTitle: "I'm New Here",
      registerText: 'Register as a new driver and start seeing available loads.',
      registerButton: 'Register',
    },
  };

  const text = content[language];

  useEffect(() => {
    const token = getAuthToken('driver');
    const user = getStoredUser('driver');

    if (!token || !user) {
      return;
    }

    if (user.role === 'driver') {
      navigate('/driver-dashboard', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#F7EFE9]">
      <div className="grid min-h-screen lg:grid-cols-[1fr_0.95fr]">
        <div className="relative hidden overflow-hidden lg:block">
          <ImageWithFallback src={truckImage} alt="Driver access" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#261816]/90 via-[#4B2E2B]/78 to-[#D4A373]/45" />

          <div className="relative z-10 flex h-full flex-col justify-end p-12 text-white">
            <div className="text-sm uppercase tracking-[0.35em] text-white/70">{text.eyebrow}</div>
            <h1 className="mt-4 max-w-xl text-5xl leading-tight">
              {language === 'sw'
                ? 'Chagua jinsi unavyotaka kuendelea kwenye portal ya dereva.'
                : 'Choose how you want to continue into the driver portal.'}
            </h1>
            <p className="mt-5 max-w-lg text-lg text-white/80">{text.subtitle}</p>
          </div>
        </div>

        <div className="relative flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#D4A373]/20 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#4B2E2B]/10 blur-3xl" />
          </div>

          <div className="relative w-full max-w-xl rounded-[2rem] bg-white p-8 shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <Link to="/" className="text-3xl text-[#4B2E2B]">
                ELOGISTICA
              </Link>
              <button
                onClick={() => setLanguage(language === 'sw' ? 'en' : 'sw')}
                className="rounded-full bg-[#F7EFE9] p-3 text-[#4B2E2B] transition-colors hover:bg-[#EDDCD1]"
              >
                <Globe className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-8">
              <div className="text-sm uppercase tracking-[0.3em] text-[#D4A373]">{text.eyebrow}</div>
              <h2 className="mt-3 text-4xl text-[#4B2E2B]">{text.title}</h2>
              <p className="mt-3 text-sm text-[#4B2E2B]/65">{text.subtitle}</p>
            </div>

            <div className="grid gap-5">
              <div className="rounded-3xl border border-[#4B2E2B]/10 bg-[#F7EFE9] p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-white p-3 text-[#4B2E2B] shadow-sm">
                    <LogIn className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xl text-[#4B2E2B]">{text.loginTitle}</div>
                    <div className="mt-2 text-sm text-[#4B2E2B]/65">{text.loginText}</div>
                    <Link to="/driver/login" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#4B2E2B] px-4 py-3 text-sm text-white">
                      <span>{text.loginButton}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-[#D4A373]/30 bg-white p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-[#F7EFE9] p-3 text-[#D4A373] shadow-sm">
                    <UserPlus className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xl text-[#4B2E2B]">{text.registerTitle}</div>
                    <div className="mt-2 text-sm text-[#4B2E2B]/65">{text.registerText}</div>
                    <Link to="/driver/register" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#D4A373] px-4 py-3 text-sm text-white">
                      <span>{text.registerButton}</span>
                      <Truck className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
