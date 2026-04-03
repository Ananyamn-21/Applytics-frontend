import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../pages/LandingPage.css';

export default function ServicesPage() {
  const [activeItem, setActiveItem] = useState('services');
  const [isRevealed, setIsRevealed] = useState(true);

  // Link URLs
  const contactHref = "https://draft-8e383e35-4787-4efa-8310-00f5bafd5e93.preview.superdesign.dev";
  const emailHref = "mailto:hello@early-edge.ai";
  const legalHref = "#";
  const privacyHref = "#";
  const instagramHref = "#instagram";

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1
    };

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
      <section className="relative h-screen flex flex-col justify-center px-8 md:px-12 bg-navy overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[480px] h-[480px] bg-[#b7c6c2] rounded-full blur-[120px] opacity-20 animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[480px] h-[480px] bg-[#bbe2f5] rounded-full blur-[120px] opacity-20 animate-float-delayed"></div>
        
        <div className="relative z-10">
          <h1 className="font-anton font-normal text-[15vw] leading-[0.85] tracking-tighter">
            HOW IT<br />
            <span className="text-outline">WORKS</span>
          </h1>
          <p className="mt-12 max-w-2xl text-xl text-[#b7c6c2] font-light leading-relaxed reveal">
            EarlyEdge is your 24/7 AI-powered agent designed to scan, tailor, and apply to job opportunities before the competition even wakes up.
          </p>
        </div>

        <div className="absolute bottom-12 left-8 md:left-12 right-8 md:right-12 flex justify-between items-end">
          <div className="max-w-xs text-[10px] uppercase tracking-[0.25em] text-[#9f8d8b] leading-relaxed">
            Automating your career growth through surgical precision and relentless speed.
          </div>
          <div className="flex flex-col items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest text-white/40">Explore the Flow</span>
            <button onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center animate-bounce focus:outline-none hover:bg-white/10 transition-colors cursor-pointer">
              <iconify-icon icon="lucide:arrow-down" class="text-white"></iconify-icon>
            </button>
          </div>
        </div>
      </section>

      {/* Process Flow Section */}
      <section className="bg-white py-32 md:py-48 px-8 md:px-24 text-navy">
        <div className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <h2 className="font-anton font-normal text-7xl md:text-9xl text-navy tracking-tighter reveal">THE BLUEPRINT</h2>
          <p className="max-w-md text-[#9f8d8b] uppercase tracking-widest text-sm mb-4 reveal">From registration to recruiter callbacks in five seamless steps.</p>
        </div>

        <div className="space-y-32">
          {/* Step 01 */}
          <div className="flex flex-col md:flex-row items-center gap-16 reveal">
            <div className="w-full md:w-1/2">
              <div className="aspect-video bg-[#fafafa] flex items-center justify-center relative overflow-hidden group border border-[#171e19]/5">
                <iconify-icon icon="lucide:user-plus" class="text-9xl text-[#171e19]/10 transform group-hover:scale-110 transition-transform duration-700"></iconify-icon>
                <span className="absolute top-8 left-8 font-anton font-normal text-6xl text-[#171e19]/10">01</span>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <span className="text-[#9f8d8b] text-xs font-bold tracking-[0.4em] mb-4 block uppercase">Initialization</span>
              <h3 className="font-anton font-normal text-5xl mb-6">REGISTER & AUTHENTICATE</h3>
              <p className="text-lg text-[#171e19]/60 leading-relaxed mb-8">
                Securely link your credentials and create your core professional profile. Our encrypted system ensures your data remains private while enabling AI access to key job portals.
              </p>
              <a href="https://draft-8e383e35-4787-4efa-8310-00f5bafd5e93.preview.superdesign.dev" id="cta-step-1" className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:gap-6 transition-all">
                Create Account <iconify-icon icon="lucide:arrow-right"></iconify-icon>
              </a>
            </div>
          </div>

          {/* Step 02 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-16 reveal">
            <div className="w-full md:w-1/2">
              <div className="aspect-video bg-[#fafafa] flex items-center justify-center relative overflow-hidden group border border-[#171e19]/5">
                <iconify-icon icon="lucide:target" class="text-9xl text-[#171e19]/10 transform group-hover:scale-110 transition-transform duration-700"></iconify-icon>
                <span className="absolute top-8 right-8 font-anton font-normal text-6xl text-[#171e19]/10">02</span>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <span className="text-[#9f8d8b] text-xs font-bold tracking-[0.4em] mb-4 block uppercase">Configuration</span>
              <h3 className="font-anton font-normal text-5xl mb-6">DEFINE YOUR EDGE</h3>
              <p className="text-lg text-[#171e19]/60 leading-relaxed mb-8">
                Input your tech stack, years of experience, and desired salary ranges. Set your geographic preferences and the specific company cultures you want the AI to target.
              </p>
              <a href="https://draft-9cd95502-c281-4a55-b6a3-d35ef7a2f7e1.preview.superdesign.dev" id="cta-step-2" className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:gap-6 transition-all">
                Manage Skills <iconify-icon icon="lucide:arrow-right"></iconify-icon>
              </a>
            </div>
          </div>

          {/* Step 03 */}
          <div className="flex flex-col md:flex-row items-center gap-16 reveal">
            <div className="w-full md:w-1/2">
              <div className="aspect-video bg-[#fafafa] flex items-center justify-center relative overflow-hidden group border border-[#171e19]/5">
                <iconify-icon icon="lucide:zap" class="text-9xl text-[#171e19]/10 transform group-hover:scale-110 transition-transform duration-700"></iconify-icon>
                <span className="absolute top-8 left-8 font-anton font-normal text-6xl text-[#171e19]/10">03</span>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <span className="text-[#9f8d8b] text-xs font-bold tracking-[0.4em] mb-4 block uppercase">Execution</span>
              <h3 className="font-anton font-normal text-5xl mb-6">PRECISION SCANNING</h3>
              <p className="text-lg text-[#171e19]/60 leading-relaxed mb-8">
                Our AI clusters scan major job boards every 10 minutes. We only target listings that are less than 30 minutes old and have fewer than 10 applicants to maximize your visibility.
              </p>
            </div>
          </div>

          {/* Step 04 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-16 reveal">
            <div className="w-full md:w-1/2">
              <div className="aspect-video bg-[#fafafa] flex items-center justify-center relative overflow-hidden group border border-[#171e19]/5">
                <iconify-icon icon="lucide:file-edit" class="text-9xl text-[#171e19]/10 transform group-hover:scale-110 transition-transform duration-700"></iconify-icon>
                <span className="absolute top-8 right-8 font-anton font-normal text-6xl text-[#171e19]/10">04</span>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <span className="text-[#9f8d8b] text-xs font-bold tracking-[0.4em] mb-4 block uppercase">Automation</span>
              <h3 className="font-anton font-normal text-5xl mb-6">TAILORED AUTO-APPLY</h3>
              <p className="text-lg text-[#171e19]/60 leading-relaxed mb-8">
                The AI analyzes the job description, rewrites key bullet points in your resume to highlight relevant experience, and submits the application instantly. No generic templates—pure relevance.
              </p>
            </div>
          </div>

          {/* Step 05 */}
          <div className="flex flex-col md:flex-row items-center gap-16 reveal">
            <div className="w-full md:w-1/2">
              <div className="aspect-video bg-[#fafafa] flex items-center justify-center relative overflow-hidden group border border-[#171e19]/5">
                <iconify-icon icon="lucide:layout-dashboard" class="text-9xl text-[#171e19]/10 transform group-hover:scale-110 transition-transform duration-700"></iconify-icon>
                <span className="absolute top-8 left-8 font-anton font-normal text-6xl text-[#171e19]/10">05</span>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <span className="text-[#9f8d8b] text-xs font-bold tracking-[0.4em] mb-4 block uppercase">Visibility</span>
              <h3 className="font-anton font-normal text-5xl mb-6">TRACK & TRIUMPH</h3>
              <p className="text-lg text-[#171e19]/60 leading-relaxed mb-8">
                Monitor your active applications in real-time. Review which versions of your resume were sent where, and track recruiter responses directly from your centralized command center.
              </p>
              <a href="https://draft-06d04218-611c-41c9-a33a-38a4fbdac9cb.preview.superdesign.dev" id="cta-step-5" className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:gap-6 transition-all">
                Open Dashboard <iconify-icon icon="lucide:arrow-right"></iconify-icon>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="bg-navy py-32 md:py-48 px-8 md:px-24">
        <div className="mb-24 reveal">
          <span className="text-[#b7c6c2] text-xs uppercase tracking-[0.4em] font-bold mb-6 block">CORE CAPABILITIES</span>
          <h2 className="font-anton font-normal text-7xl md:text-8xl text-white tracking-tighter">UNFAIR ADVANTAGE</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Feature 1 */}
          <div className="border border-white/10 p-12 hover:bg-white/5 transition-colors group reveal">
            <iconify-icon icon="lucide:clock" class="text-4xl text-[#b7c6c2] mb-8"></iconify-icon>
            <h4 className="font-anton font-normal text-3xl text-white mb-4">24/7 AUTOMATION</h4>
            <p className="text-[#9f8d8b] leading-relaxed">Our agents never sleep. We apply to new listings as they appear, even while you sleep or work your current role.</p>
          </div>
          {/* Feature 2 */}
          <div className="border border-white/10 p-12 hover:bg-white/5 transition-colors group reveal">
            <iconify-icon icon="lucide:trophy" class="text-4xl text-[#b7c6c2] mb-8"></iconify-icon>
            <h4 className="font-anton font-normal text-3xl text-white mb-4">EARLY CANDIDATE</h4>
            <p className="text-[#9f8d8b] leading-relaxed">Being in the first 10 applicants increases your interview callback rate by over 400% on average.</p>
          </div>
          {/* Feature 3 */}
          <div className="border border-white/10 p-12 hover:bg-white/5 transition-colors group reveal">
            <iconify-icon icon="lucide:wand-2" class="text-4xl text-[#b7c6c2] mb-8"></iconify-icon>
            <h4 className="font-anton font-normal text-3xl text-white mb-4">TAILORED RESUMES</h4>
            <p className="text-[#9f8d8b] leading-relaxed">AI dynamically rewrites your resume content to match specific keywords found in the job description.</p>
          </div>
          {/* Feature 4 */}
          <div className="border border-white/10 p-12 hover:bg-white/5 transition-colors group reveal">
            <iconify-icon icon="lucide:bar-chart-3" class="text-4xl text-[#b7c6c2] mb-8"></iconify-icon>
            <h4 className="font-anton font-normal text-3xl text-white mb-4">REAL-TIME TRACKING</h4>
            <p className="text-[#9f8d8b] leading-relaxed">Full transparency on every application sent, with status updates and automated follow-ups.</p>
          </div>
          {/* Feature 5 */}
          <div className="border border-white/10 p-12 hover:bg-white/5 transition-colors group reveal">
            <iconify-icon icon="lucide:shield-check" class="text-4xl text-[#b7c6c2] mb-8"></iconify-icon>
            <h4 className="font-anton font-normal text-3xl text-white mb-4">LOW COMPETITION</h4>
            <p className="text-[#9f8d8b] leading-relaxed">We filter out high-volume listings, focusing only on opportunities where your profile truly stands out.</p>
          </div>
          {/* Feature 6 */}
          <div className="border border-white/10 p-12 hover:bg-white/5 transition-colors group reveal">
            <iconify-icon icon="lucide:rocket" class="text-4xl text-[#b7c6c2] mb-8"></iconify-icon>
            <h4 className="font-anton font-normal text-3xl text-white mb-4">INSTANT APPLY</h4>
            <p className="text-[#9f8d8b] leading-relaxed">One-click authorization enables the AI to bypass repetitive forms and apply with lighting speed.</p>
          </div>
        </div>
      </section>

      {/* How AI Works Technical Section */}
      <section className="bg-[#fafafa] py-32 md:py-48 px-8 md:px-24 text-navy">
        <div className="grid grid-cols-12 gap-12 items-center">
          <div className="col-span-12 lg:col-span-6 reveal">
            <h3 className="text-5xl md:text-7xl font-anton font-normal leading-tight mb-8 uppercase">The Intelligence Behind the Speed</h3>
            <p className="text-xl text-[#171e19]/60 leading-relaxed max-w-xl">
              Using advanced <span className="italic text-[#9f8d8b]">Natural Language Processing</span> and real-time scrapers, EarlyEdge understands the nuance of job requirements better than a manual search ever could.
            </p>
            <div className="mt-12 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 rounded-full bg-navy"></div>
                <span className="text-sm font-bold tracking-widest uppercase">Deep Keyword Extraction</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 rounded-full bg-[#b7c6c2]"></div>
                <span className="text-sm font-bold tracking-widest uppercase">Applicant Volume Forecasting</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 rounded-full bg-[#9f8d8b]"></div>
                <span className="text-sm font-bold tracking-widest uppercase">Resume Semantic Rewriting</span>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6 grid grid-cols-2 gap-8 reveal">
            <div className="bg-white p-12 border border-[#171e19]/5">
              <div className="text-6xl font-anton font-normal text-navy mb-2">500+</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#9f8d8b]">Jobs Scanned Daily</div>
            </div>
            <div className="bg-white p-12 border border-[#171e19]/5 mt-12">
              <div className="text-6xl font-anton font-normal text-navy mb-2">10M</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#9f8d8b]">Refresh Intervals</div>
            </div>
            <div className="bg-white p-12 border border-[#171e19]/5">
              <div className="text-6xl font-anton font-normal text-navy mb-2">&lt;10</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#9f8d8b]">Applicants Threshold</div>
            </div>
            <div className="bg-white p-12 border border-[#171e19]/5 mt-12">
              <div className="text-6xl font-anton font-normal text-navy mb-2">24/7</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#9f8d8b]">Platform Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantage Section */}
      <section className="bg-[#302b2f] py-32 md:py-64 px-8 md:px-24">
        <div className="text-center mb-24 reveal">
          <h2 className="font-anton font-normal text-7xl md:text-9xl text-white tracking-tighter">WHY BE EARLY?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="text-center reveal">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-12 border border-white/10">
              <iconify-icon icon="lucide:zap" class="text-4xl text-[#b7c6c2]"></iconify-icon>
            </div>
            <h5 className="font-anton font-normal text-3xl text-white mb-6 tracking-wide">FIRST MOVER</h5>
            <p className="text-[#9f8d8b] leading-relaxed">Hiring managers are most active during the first few hours of a post. We ensure you're at the very top of their stack.</p>
          </div>
          <div className="text-center reveal">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-12 border border-white/10">
              <iconify-icon icon="lucide:message-square" class="text-4xl text-[#b7c6c2]"></iconify-icon>
            </div>
            <h5 className="font-anton font-normal text-3xl text-white mb-6 tracking-wide">RESPONSE RATE</h5>
            <p className="text-[#9f8d8b] leading-relaxed">Early applications are statistically linked to significantly higher response rates from internal talent teams.</p>
          </div>
          <div className="text-center reveal">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-12 border border-white/10">
              <iconify-icon icon="lucide:users-2" class="text-4xl text-[#b7c6c2]"></iconify-icon>
            </div>
            <h5 className="font-anton font-normal text-3xl text-white mb-6 tracking-wide">CONNECTION</h5>
            <p className="text-[#9f8d8b] leading-relaxed">Avoid being buried under hundreds of resumes. Create a meaningful touchpoint when the recruiter is focused.</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-navy py-32 md:py-48 px-8 md:px-24 relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-[#b7c6c2]/5 to-transparent"></div>
         <div className="relative z-10 text-center flex flex-col items-center reveal">
            <h2 className="font-anton font-normal text-8xl md:text-9xl text-white leading-none tracking-tighter mb-12">READY TO GET<br />AHEAD?</h2>
            <div className="flex flex-col md:flex-row gap-8">
              <a href="https://draft-8e383e35-4787-4efa-8310-00f5bafd5e93.preview.superdesign.dev" id="cta-start-free" className="px-12 py-6 bg-[#b7c6c2] text-navy font-anton font-normal text-2xl tracking-widest hover:bg-white transition-colors">
                START FREE TRIAL
              </a>
              <a href="https://draft-f557f8cd-08cf-40ca-8dbb-0891944c99d0.preview.superdesign.dev" id="cta-view-pricing" className="px-12 py-6 border border-white/20 text-white font-anton font-normal text-2xl tracking-widest hover:bg-white hover:text-navy transition-colors">
                VIEW PRICING
              </a>
            </div>
            <p className="mt-12 text-[#9f8d8b] text-xs uppercase tracking-[0.4em]">No credit card required for trial • Secure & Private</p>
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
