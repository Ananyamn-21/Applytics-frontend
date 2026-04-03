import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../pages/LandingPage.css';
import '../pages/PricingPage.css';

export default function PricingPage() {
  const [activeItem, setActiveItem] = useState('pricing');
  const [isRevealed, setIsRevealed] = useState(true);
  const [isYearly, setIsYearly] = useState(false);

  // Link URLs
  const contactHref = "https://draft-8e383e35-4787-4efa-8310-00f5bafd5e93.preview.superdesign.dev";
  const emailHref = "mailto:hello@early-edge.ai";
  const legalHref = "#";
  const privacyHref = "#";
  const instagramHref = "#instagram";

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-page-wrapper min-h-screen relative selection:bg-[#b7c6c2] selection:text-[#171e19]">
      
      {/* Navigation Component */}
      <div>
        <nav className="fixed top-0 left-0 w-full z-[100] px-8 md:px-12 py-8 flex justify-between items-center mix-blend-difference">
          <Link to="/" className="font-anton font-normal text-2xl tracking-widest text-white">EARLY EDGE</Link>
          
          <div className="hidden md:flex items-center gap-12">
            <Link to="/" 
               className={`text-[12px] uppercase tracking-[0.2em] font-semibold text-white transition-opacity ${activeItem === 'home' ? 'opacity-100' : 'opacity-60'}`}
               onClick={() => setActiveItem('home')}>
              Home
            </Link>
            <Link to="/about" 
               className={`text-[12px] uppercase tracking-[0.2em] font-semibold text-white transition-opacity ${activeItem === 'about' ? 'opacity-100' : 'opacity-60'}`}
               onClick={() => setActiveItem('about')}>
              Philosophy
            </Link>
            <Link to="/services" 
               className={`text-[12px] uppercase tracking-[0.2em] font-semibold text-white transition-opacity ${activeItem === 'services' ? 'opacity-100' : 'opacity-60'}`}
               onClick={() => setActiveItem('services')}>
              How it Works
            </Link>
            <Link to="/pricing" 
               className={`text-[12px] uppercase tracking-[0.2em] font-semibold text-white transition-opacity ${activeItem === 'pricing' ? 'opacity-100' : 'opacity-60'}`}
               onClick={() => setActiveItem('pricing')}>
              Pricing
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/login" className="text-[12px] uppercase tracking-widest font-semibold text-white/60 hover:text-white transition-colors">
              Login
            </Link>
            <Link to="/register" className="px-8 py-3 border border-white/20 hover:bg-white hover:text-[#171e19] transition-colors text-[12px] uppercase tracking-widest font-semibold text-white">
              Get Early Access
            </Link>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative pt-48 pb-24 flex flex-col items-center px-8 md:px-12 bg-navy overflow-hidden">
        {/* Ambient Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#b7c6c2] rounded-full blur-[120px] opacity-10 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#bbe2f5] rounded-full blur-[120px] opacity-10 animate-float-delayed"></div>
        
        <div className="relative z-10 text-center">
          <h1 className="font-anton font-normal text-[12vw] leading-none tracking-tighter">
            INVEST IN YOUR<br />
            <span className="text-outline">FUTURE SELF</span>
          </h1>
          <p className="mt-8 text-[12px] uppercase tracking-[0.4em] text-[#9f8d8b] reveal">
            Flexible plans for the next generation of career growth
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="mt-16 flex items-center gap-6 z-10 reveal">
          <span className="text-[11px] uppercase tracking-widest font-semibold">Monthly</span>
          <div className="relative inline-block w-14 align-middle select-none transition duration-200 ease-in">
            <input 
              type="checkbox" 
              id="billing-toggle" 
              className="peer sr-only"
              checked={isYearly}
              onChange={(e) => setIsYearly(e.target.checked)}
            />
            <label htmlFor="billing-toggle" className="block overflow-hidden h-8 rounded-full bg-[#302b2f] peer-checked:bg-[#b7c6c2] cursor-pointer transition-colors duration-300 relative before:absolute before:content-[''] before:top-1 before:left-1 before:w-6 before:h-6 before:rounded-full before:bg-white before:transition-transform before:duration-300 peer-checked:before:translate-x-6">
            </label>
          </div>
          <div className="flex items-center gap-3">
             <span className="text-[11px] uppercase tracking-widest font-semibold">Yearly</span>
             <span className="px-2 py-0.5 bg-[#b7c6c2] text-navy text-[9px] font-bold rounded uppercase tracking-tighter">Save 20%</span>
          </div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="bg-white py-32 px-8 md:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Starter Tier */}
          <div className="pricing-card bg-[#fafafa] p-12 flex flex-col border border-black/5 custom-transition reveal">
            <span className="font-anton font-normal text-[#b7c6c2] text-xl tracking-widest mb-4">STARTER</span>
            <div className="mb-10">
              <div className="flex items-baseline gap-1">
                <span className="font-anton font-normal text-8xl text-navy">$0</span>
                <span className="text-[#9f8d8b] text-sm uppercase tracking-widest">/MO</span>
              </div>
              <p className="text-[#9f8d8b] text-[10px] mt-4 uppercase tracking-[0.2em]">Begin your automated journey</p>
            </div>
            <ul className="space-y-6 mb-12 flex-1">
              <li className="flex items-center gap-4 text-navy text-sm">
                <iconify-icon icon="lucide:check" class="text-lg"></iconify-icon>
                5 auto applications / day
              </li>
              <li className="flex items-center gap-4 text-navy text-sm">
                <iconify-icon icon="lucide:check" class="text-lg"></iconify-icon>
                Basic AI job matching
              </li>
              <li className="flex items-center gap-4 text-navy text-sm">
                <iconify-icon icon="lucide:check" class="text-lg"></iconify-icon>
                Standard resume templates
              </li>
              <li className="flex items-center gap-4 text-navy text-sm">
                <iconify-icon icon="lucide:check" class="text-lg"></iconify-icon>
                Application tracking
              </li>
            </ul>
            <Link to="/register" id="tier-starter-cta" className="block w-full py-5 border border-[#171e19] text-navy text-[11px] font-bold uppercase tracking-[0.3em] text-center hover:bg-navy hover:text-white transition-all">
              Get Started Free
            </Link>
          </div>

          {/* Professional Tier */}
          <div className="pricing-card bg-navy p-12 flex flex-col shadow-2xl relative custom-transition reveal">
            <div className="absolute -top-4 right-12 px-4 py-1 bg-[#b7c6c2] text-navy text-[9px] font-bold uppercase tracking-widest">
              Most Popular
            </div>
            <span className="font-anton font-normal text-[#b7c6c2] text-xl tracking-widest mb-4">PROFESSIONAL</span>
            <div className="mb-10">
              <div className="flex items-baseline gap-1">
                <span className="font-anton font-normal text-8xl text-white">${isYearly ? '23' : '29'}</span>
                <span className="text-[#9f8d8b] text-sm uppercase tracking-widest">/MO</span>
              </div>
              <p className="text-[#9f8d8b] text-[10px] mt-4 uppercase tracking-[0.2em]">Maximize your call volume</p>
            </div>
            <ul className="space-y-6 mb-12 flex-1">
              <li className="flex items-center gap-4 text-white text-sm">
                <iconify-icon icon="lucide:check" class="text-[#b7c6c2] text-lg"></iconify-icon>
                Unlimited auto applications
              </li>
              <li className="flex items-center gap-4 text-white text-sm">
                <iconify-icon icon="lucide:check" class="text-[#b7c6c2] text-lg"></iconify-icon>
                Advanced AI matching algorithm
              </li>
              <li className="flex items-center gap-4 text-white text-sm">
                <iconify-icon icon="lucide:check" class="text-[#b7c6c2] text-lg"></iconify-icon>
                50+ tailored resume variations
              </li>
              <li className="flex items-center gap-4 text-white text-sm">
                <iconify-icon icon="lucide:check" class="text-[#b7c6c2] text-lg"></iconify-icon>
                Deep analytics dashboard
              </li>
              <li className="flex items-center gap-4 text-white text-sm">
                <iconify-icon icon="lucide:check" class="text-[#b7c6c2] text-lg"></iconify-icon>
                Priority queue processing
              </li>
            </ul>
            <Link to="/register" id="tier-pro-cta" className="block w-full py-5 bg-white text-navy text-[11px] font-bold uppercase tracking-[0.3em] text-center hover:bg-[#b7c6c2] transition-all">
              Go Professional
            </Link>
          </div>

          {/* Enterprise Tier */}
          <div className="pricing-card bg-[#fafafa] p-12 flex flex-col border border-black/5 custom-transition reveal">
            <span className="font-anton font-normal text-[#b7c6c2] text-xl tracking-widest mb-4">ENTERPRISE</span>
            <div className="mb-10">
              <div className="flex items-baseline gap-1">
                <span className="font-anton font-normal text-7xl text-navy">CUSTOM</span>
              </div>
              <p className="text-[#9f8d8b] text-[10px] mt-4 uppercase tracking-[0.2em]">For teams and organizations</p>
            </div>
            <ul className="space-y-6 mb-12 flex-1">
              <li className="flex items-center gap-4 text-navy text-sm">
                <iconify-icon icon="lucide:check" class="text-lg"></iconify-icon>
                Everything in Professional
              </li>
              <li className="flex items-center gap-4 text-navy text-sm">
                <iconify-icon icon="lucide:check" class="text-lg"></iconify-icon>
                Dedicated account manager
              </li>
              <li className="flex items-center gap-4 text-navy text-sm">
                <iconify-icon icon="lucide:check" class="text-lg"></iconify-icon>
                API & Webhook access
              </li>
              <li className="flex items-center gap-4 text-navy text-sm">
                <iconify-icon icon="lucide:check" class="text-lg"></iconify-icon>
                White-label dashboard
              </li>
            </ul>
            <Link to="/register" id="tier-enterprise-cta" className="block w-full py-5 border border-[#171e19] text-navy text-[11px] font-bold uppercase tracking-[0.3em] text-center hover:bg-navy hover:text-white transition-all">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#fafafa] py-32 px-8 md:px-24 border-t border-black/5 text-navy">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-anton font-normal text-6xl text-navy mb-20 reveal">WHY EARLYEDGE?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="reveal">
              <iconify-icon icon="lucide:clock" class="text-4xl text-navy mb-6"></iconify-icon>
              <h3 className="font-anton font-normal text-2xl text-navy mb-4">24/7 AUTOMATION</h3>
              <p className="text-sm text-[#9f8d8b] leading-relaxed">Our agents never sleep, scanning and applying to new postings within seconds of release.</p>
            </div>
            <div className="reveal">
              <iconify-icon icon="lucide:target" class="text-4xl text-navy mb-6"></iconify-icon>
              <h3 className="font-anton font-normal text-2xl text-navy mb-4">PRECISE MATCHING</h3>
              <p className="text-sm text-[#9f8d8b] leading-relaxed">AI analysis ensures you only apply to jobs that fit your exact skill set and preferences.</p>
            </div>
            <div className="reveal">
              <iconify-icon icon="lucide:file-text" class="text-4xl text-navy mb-6"></iconify-icon>
              <h3 className="font-anton font-normal text-2xl text-navy mb-4">RESUME TAILORING</h3>
              <p className="text-sm text-[#9f8d8b] leading-relaxed">Every submission includes a dynamically adjusted resume highlighting relevant experience.</p>
            </div>
            <div className="reveal">
              <iconify-icon icon="lucide:bar-chart-3" class="text-4xl text-navy mb-6"></iconify-icon>
              <h3 className="font-anton font-normal text-2xl text-navy mb-4">FULL TRACKING</h3>
              <p className="text-sm text-[#9f8d8b] leading-relaxed">Monitor every single application and recruiter response from your central dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-navy py-32 px-8 md:px-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-anton font-normal text-6xl text-white mb-20 text-center reveal">FREQUENTLY ASKED</h2>
          <div className="space-y-4">
            <details className="faq-item group border-b border-white/10 pb-6 reveal" open>
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="font-anton font-normal text-2xl tracking-wide">How does the automation work?</span>
                <iconify-icon icon="lucide:chevron-down" class="text-2xl transition-transform duration-300"></iconify-icon>
              </summary>
              <p className="mt-6 text-[#9f8d8b] text-sm leading-relaxed max-w-3xl">
                Our AI agents continuously monitor global job boards. When a posting matches your pre-defined skills and preferences, the system analyzes the description, tails your resume, and applies instantly—usually within the first 5 minutes of the post going live.
              </p>
            </details>
            
            <details className="faq-item group border-b border-white/10 py-6 reveal">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="font-anton font-normal text-2xl tracking-wide">Can I cancel my subscription?</span>
                <iconify-icon icon="lucide:chevron-down" class="text-2xl transition-transform duration-300"></iconify-icon>
              </summary>
              <p className="mt-6 text-[#9f8d8b] text-sm leading-relaxed max-w-3xl">
                Yes, you can cancel at any time directly from your dashboard. There are no long-term contracts for Starter or Professional plans. Your service will remain active until the end of your current billing period.
              </p>
            </details>

            <details className="faq-item group border-b border-white/10 py-6 reveal">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="font-anton font-normal text-2xl tracking-wide">Is my data secure?</span>
                <iconify-icon icon="lucide:chevron-down" class="text-2xl transition-transform duration-300"></iconify-icon>
              </summary>
              <p className="mt-6 text-[#9f8d8b] text-sm leading-relaxed max-w-3xl">
                Absolutely. We use industry-standard encryption for all personal data and resumes. Your information is only used to fulfill job applications on your behalf and is never sold to third parties.
              </p>
            </details>

            <details className="faq-item group border-b border-white/10 py-6 reveal">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="font-anton font-normal text-2xl tracking-wide">What happens if the AI fails to match?</span>
                <iconify-icon icon="lucide:chevron-down" class="text-2xl transition-transform duration-300"></iconify-icon>
              </summary>
              <p className="mt-6 text-[#9f8d8b] text-sm leading-relaxed max-w-3xl">
                If our system is unsure about a match (below our 85% confidence threshold), it will move the job to your "Review Needed" queue instead of applying automatically, giving you the final say.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Footer Component */}
      <div>
        <footer className="bg-navy pt-32 pb-12 px-8 md:px-24">
          <div className={`flex flex-col transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'}`}>
            <h2 className="font-anton font-normal text-[12vw] md:text-[10vw] leading-none tracking-tighter text-white mb-12 uppercase">LET'S TALK.</h2>
            <a href={emailHref} className="font-anton font-normal text-4xl md:text-6xl text-[#b7c6c2] hover:text-white transition-colors underline underline-offset-[16px] decoration-1 decoration-[#b7c6c2]/30 uppercase">HELLO@EARLY-EDGE.AI</a>
          </div>
          <div className="mt-48 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/40">© 2024 EARLY EDGE — ALL RIGHTS RESERVED</div>
            <div className="flex gap-12">
              <a href={legalHref} className="text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors">LEGAL</a>
              <a href={privacyHref} className="text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors">PRIVACY</a>
              <a href={instagramHref} className="text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors">INSTAGRAM</a>
            </div>
          </div>
        </footer>
      </div>

    </div>
  );
}
