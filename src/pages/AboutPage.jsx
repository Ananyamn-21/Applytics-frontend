import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../pages/LandingPage.css'; // Reusing landing page CSS for font-anton, reveal animations, and generic wrapper

export default function AboutPage() {
  const [activeItem, setActiveItem] = useState('about');
  const [isRevealed, setIsRevealed] = useState(true);

  // Link URLs
  const logoHref = "/";
  const workHref = "https://draft-10eea64e-65fd-459d-abfc-3b3510512c91.preview.superdesign.dev";
  const aboutHref = "/about";
  const servicesHref = "https://draft-01bddedf-efad-4bbf-b0bb-3d6d21f2ed9f.preview.superdesign.dev";
  const contactHref = "https://draft-8e383e35-4787-4efa-8310-00f5bafd5e93.preview.superdesign.dev";
  const emailHref = "mailto:hello@applytics.ai";
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
          <Link to="/" className="font-anton font-normal text-2xl tracking-widest text-white">APPLYTICS-AI</Link>
          
          <div className="hidden md:flex items-center gap-12">
            <Link to="/" 
               className={`text-[12px] uppercase tracking-[0.2em] font-semibold text-white transition-opacity ${activeItem === 'home' ? 'opacity-100' : 'opacity-60'}`}
               onClick={() => setActiveItem('home')}>
              Home
            </Link>
            <Link to={aboutHref} 
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#b7c6c2] rounded-full blur-[120px] opacity-20 animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#bbe2f5] rounded-full blur-[120px] opacity-20 animate-float-delayed"></div>
        
        <div className="relative z-10">
          <h1 className="font-anton font-normal text-[15vw] leading-[0.85] tracking-tighter">
            FIRST IN LINE.<br />
            <span className="text-outline">FIRST TO HIRE.</span>
          </h1>
        </div>
        
        <div className="absolute bottom-12 left-8 md:left-12 right-8 md:right-12 flex justify-between items-end">
          <div className="max-w-md text-[10px] uppercase tracking-[0.25em] text-[#9f8d8b] leading-relaxed">
            Applytics is the AI-driven infrastructure that positions you as the definitive early candidate, applying instantly to high-potential roles while others are still sleeping.
          </div>
          <div className="flex flex-col items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest text-white/40">Our Mission</span>
            <button onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center animate-bounce focus:outline-none hover:bg-white/10 transition-colors cursor-pointer">
              <iconify-icon icon="lucide:arrow-down" class="text-white"></iconify-icon>
            </button>
          </div>
        </div>
      </section>

      {/* How We Win Section */}
      <section id="how-it-works" className="bg-white py-32 md:py-48 px-8 md:px-24 text-navy">
        <div className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="font-anton font-normal text-7xl md:text-9xl tracking-tighter reveal">HOW WE WIN</h2>
          <p className="max-w-xs text-sm text-[#9f8d8b] uppercase tracking-widest mb-4 reveal">
            A 24/7 autonomous cycle of precision and speed.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="reveal flex flex-col h-full">
            <span className="font-anton font-normal text-4xl mb-6">01 / SCAN</span>
            <p className="text-lg leading-relaxed flex-grow">
              Our AI monitors global job boards in real-time, detecting new postings within seconds of their live status.
            </p>
          </div>
          <div className="reveal flex flex-col md:mt-24 h-full">
            <span className="font-anton font-normal text-4xl mb-6">02 / FILTER</span>
            <p className="text-lg leading-relaxed flex-grow">
              We ignore the noise. Applytics exclusively targets jobs posted within minutes with fewer than 10 total applicants.
            </p>
          </div>
          <div className="reveal flex flex-col h-full">
            <span className="font-anton font-normal text-4xl mb-6">03 / TAILOR</span>
            <p className="text-lg leading-relaxed flex-grow">
              Our engine analyzes the job requirements and instantly generates a hyper-tailored resume for that specific role.
            </p>
          </div>
          <div className="reveal flex flex-col md:mt-24 h-full">
            <span className="font-anton font-normal text-4xl mb-6">04 / APPLY</span>
            <p className="text-lg leading-relaxed flex-grow">
              The application is submitted automatically. You receive a notification in your dashboard, ready for the callback.
            </p>
          </div>
        </div>
      </section>

      {/* Why Early Matters Section */}
      <section className="bg-navy py-32 md:py-64 px-8 md:px-24 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative reveal">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#d5f4f9] opacity-20 z-0"></div>
            <div className="relative z-10 aspect-square">
              <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000" alt="Data Analysis" className="w-full h-full object-cover grayscale brightness-75" />
            </div>
          </div>
          <div className="flex flex-col items-start reveal">
            <span className="font-anton font-normal text-[#b7c6c2] text-xl tracking-widest mb-6">THE SCIENCE OF BEING FIRST</span>
            <h2 className="font-anton font-normal text-7xl md:text-8xl leading-tight mb-8 text-white">WHY EARLY<br />MATTERS.</h2>
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-6">
                <span className="font-anton font-normal text-4xl text-[#d5f4f9]">3X</span>
                <p className="text-[#9f8d8b] text-lg leading-relaxed">
                  Candidates in the first 10 applicants receive 3 times more interview invitations than those who apply later.
                </p>
              </div>
              <div className="flex items-start gap-6">
                <span className="font-anton font-normal text-4xl text-[#d5f4f9]">85%</span>
                <p className="text-[#9f8d8b] text-lg leading-relaxed">
                  Of recruiters review the first batch of applications within 24 hours of posting.
                </p>
              </div>
            </div>
            <a href="https://draft-8e383e35-4787-4efa-8310-00f5bafd5e93.preview.superdesign.dev" id="hero-cta-register" className="group flex items-center gap-4 text-white text-[12px] uppercase tracking-[0.3em] font-bold">
              Secure Your Edge 
              <iconify-icon icon="lucide:arrow-right" class="text-xl transform group-hover:translate-x-2 transition-transform"></iconify-icon>
            </a>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-[#fafafa] py-32 md:py-48 px-8 md:px-24 text-navy">
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-12 lg:col-span-4 reveal">
            <span className="text-[#9f8d8b] text-xs uppercase tracking-[0.4em] font-bold mb-12 block">OUR VALUES</span>
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-[1px] bg-navy"></div>
                <span className="font-anton font-normal text-2xl">AUTONOMOUS PRECISION</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-[1px] bg-navy"></div>
                <span className="font-anton font-normal text-2xl">24/7 COMMITMENT</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-[1px] bg-navy"></div>
                <span className="font-anton font-normal text-2xl">USER TRUST FIRST</span>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8 reveal">
            <h3 className="text-4xl md:text-6xl font-light leading-tight tracking-tight text-navy">
              WE ARE BUILDING A FUTURE WHERE <span className="italic text-[#9f8d8b]">OPPORTUNITY</span> IS NEVER MISSED DUE TO A <span className="italic text-[#9f8d8b]">SLEEP</span> SCHEDULE.
            </h3>
            <p className="mt-12 text-lg text-navy/60 max-w-xl leading-relaxed">
              Our vision is to level the professional playing field. By automating the mechanical aspects of job hunting, we empower candidates to focus on what actually matters: excelling in the interview.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-[#302b2f] py-32 md:py-48 px-8 md:px-24 text-center relative overflow-hidden">
        <div className="absolute -top-24 -right-12 font-anton font-normal text-navy text-[30rem] leading-none opacity-30 select-none pointer-events-none">
          &ldquo;
        </div>
        <div className="relative z-10 max-w-4xl mx-auto reveal">
          <h4 className="font-anton font-normal text-4xl md:text-6xl text-white mb-12 uppercase leading-none">
            "Applytics applied for me at 3 AM. I woke up to an interview request sent at 9 AM. I was the second person to apply."
          </h4>
          <p className="font-anton font-normal text-xl text-[#b7c6c2] tracking-widest">
            SARAH CHEN — SENIOR PRODUCT DESIGNER
          </p>
        </div>
      </section>

      {/* Footer Component */}
      <div>
        <footer className="bg-navy pt-32 pb-12 px-8 md:px-24">
          <div className={`flex flex-col transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'}`}>
            <h2 className="font-anton font-normal text-[12vw] md:text-[10vw] leading-none tracking-tighter text-white mb-12 uppercase">LET'S TALK.</h2>
            <a href={emailHref} className="font-anton font-normal text-4xl md:text-6xl text-[#b7c6c2] hover:text-white transition-colors underline underline-offset-[16px] decoration-1 decoration-[#b7c6c2]/30 uppercase">HELLO@APPLYTICS.AI</a>
          </div>
          <div className="mt-48 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/40">© 2026 Applytics — ALL RIGHTS RESERVED</div>
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
