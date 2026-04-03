import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
    const [activeItem, setActiveItem] = useState('home');
    const [isRevealed, setIsRevealed] = useState(true);

    const aboutHref = "/about";
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
        <div className="min-h-screen relative landing-page-wrapper">

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
            <section className="relative h-screen flex flex-col justify-center px-8 md:px-12 bg-[#171e19] overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[384px] h-[384px] bg-[#b7c6c2] rounded-full blur-[120px] opacity-20 animate-float"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[384px] h-[384px] bg-[#d5f4f9] rounded-full blur-[120px] opacity-20 animate-float-delayed"></div>

                <div className="relative z-10">
                    <h1 className="font-anton text-[12vw] leading-[0.85] tracking-tighter">
                        YOUR AI JOB HUNTER<br />
                        <span className="text-outline">NEVER</span> SLEEPS
                    </h1>
                    <p className="mt-8 font-anton text-2xl md:text-3xl text-[#b7c6c2] tracking-wider">
                        THE EARLY EDGE FOR EARLY CANDIDATES
                    </p>
                </div>

                <div className="absolute bottom-12 left-8 md:left-12 right-8 md:right-12 flex justify-between items-end">
                    <div className="max-w-md text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#9f8d8b] leading-relaxed">
                        APPLIED TO 47 JOBS THIS WEEK • SECURED 3 INTERVIEWS • ZERO EFFORT REQUIRED • RUNS 24/7
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-[10px] uppercase tracking-widest text-white/40">Explore</span>
                        <button onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center animate-bounce focus:outline-none hover:bg-white/10 transition-colors cursor-pointer">
                            <iconify-icon icon="lucide:arrow-down" class="text-white"></iconify-icon>
                        </button>
                    </div>
                </div>
            </section>

            {/* Value Propositions Section */}
            <section id="why-us" className="bg-white py-32 md:py-48 px-8 md:px-24">
                <div className="mb-32">
                    <h2 className="font-anton text-8xl md:text-9xl text-[#171e19] tracking-tighter reveal">WHY EARLYEDGE</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 reveal items-stretch">
                    {/* Card 1 */}
                    <div className="group bg-[#fafafa] p-10 border border-gray-100 hover:bg-[#171e19] custom-transition flex flex-col h-full">
                        <div className="w-12 h-12 mb-8 bg-[#171e19] group-hover:bg-[#b7c6c2] custom-transition flex items-center justify-center">
                            <iconify-icon icon="lucide:clock" class="text-white group-hover:text-[#171e19] text-2xl"></iconify-icon>
                        </div>
                        <h3 className="font-anton text-2xl mb-4 group-hover:text-white text-[#171e19]">24/7 AUTOMATION</h3>
                        <p className="text-[#9f8d8b] text-sm leading-relaxed group-hover:text-white/60 flex-grow">
                            Our agents monitor job boards every minute of the day. We never sleep, so you never miss an opportunity.
                        </p>
                    </div>
                    {/* Card 2 */}
                    <div className="group bg-[#fafafa] p-10 border border-gray-100 hover:bg-[#171e19] custom-transition flex flex-col h-full">
                        <div className="w-12 h-12 mb-8 bg-[#171e19] group-hover:bg-[#b7c6c2] custom-transition flex items-center justify-center">
                            <iconify-icon icon="lucide:zap" class="text-white group-hover:text-[#171e19] text-2xl"></iconify-icon>
                        </div>
                        <h3 className="font-anton text-2xl mb-4 group-hover:text-white text-[#171e19]">EARLY APPLICANT EDGE</h3>
                        <p className="text-[#9f8d8b] text-sm leading-relaxed group-hover:text-white/60 flex-grow">
                            Be in the first 10 applicants. EarlyEdge applies within seconds of a job posting appearing.
                        </p>
                    </div>
                    {/* Card 3 */}
                    <div className="group bg-[#fafafa] p-10 border border-gray-100 hover:bg-[#171e19] custom-transition flex flex-col h-full">
                        <div className="w-12 h-12 mb-8 bg-[#171e19] group-hover:bg-[#b7c6c2] custom-transition flex items-center justify-center">
                            <iconify-icon icon="lucide:file-text" class="text-white group-hover:text-[#171e19] text-2xl"></iconify-icon>
                        </div>
                        <h3 className="font-anton text-2xl mb-4 group-hover:text-white text-[#171e19]">TAILORED RESUMES</h3>
                        <p className="text-[#9f8d8b] text-sm leading-relaxed group-hover:text-white/60 flex-grow">
                            AI generates a customized resume for every single job based on its specific requirements.
                        </p>
                    </div>
                    {/* Card 4 */}
                    <div className="group bg-[#fafafa] p-10 border border-gray-100 hover:bg-[#171e19] custom-transition flex flex-col h-full">
                        <div className="w-12 h-12 mb-8 bg-[#171e19] group-hover:bg-[#b7c6c2] custom-transition flex items-center justify-center">
                            <iconify-icon icon="lucide:filter" class="text-white group-hover:text-[#171e19] text-2xl"></iconify-icon>
                        </div>
                        <h3 className="font-anton text-2xl mb-4 group-hover:text-white text-[#171e19]">SMART FILTERING</h3>
                        <p className="text-[#9f8d8b] text-sm leading-relaxed group-hover:text-white/60 flex-grow">
                            Only match with roles that align with your specific skills, location, and salary preferences.
                        </p>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="bg-[#171e19] py-32 md:py-64 px-8 md:px-24 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    <div className="reveal">
                        <h2 className="font-anton text-7xl md:text-8xl leading-none text-white mb-12">HOW IT<br />WORKS.</h2>
                        <p className="text-[#9f8d8b] text-xl max-w-lg mb-16">
                            Setting up your automated job hunt takes less than 5 minutes. Once configured, our AI handles the rest while you sleep.
                        </p>
                        <div className="space-y-12">
                            <div className="flex items-start gap-8">
                                <div className="w-10 h-10 rounded-full bg-[#b7c6c2] flex-shrink-0 flex items-center justify-center font-anton text-[#171e19]">01</div>
                                <div>
                                    <h4 className="font-anton text-2xl text-white mb-2">CONNECT & SETUP</h4>
                                    <p className="text-[#9f8d8b] text-sm uppercase tracking-widest">Register and add your base skills and preferences.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-8">
                                <div className="w-10 h-10 rounded-full bg-[#b7c6c2] flex-shrink-0 flex items-center justify-center font-anton text-[#171e19]">02</div>
                                <div>
                                    <h4 className="font-anton text-2xl text-white mb-2">AI WATCHES JOBS</h4>
                                    <p className="text-[#9f8d8b] text-sm uppercase tracking-widest">Our system monitors LinkedIn, Indeed, and more 24/7.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-8">
                                <div className="w-10 h-10 rounded-full bg-[#b7c6c2] flex-shrink-0 flex items-center justify-center font-anton text-[#171e19]">03</div>
                                <div>
                                    <h4 className="font-anton text-2xl text-white mb-2">AUTO APPLIES</h4>
                                    <p className="text-[#9f8d8b] text-sm uppercase tracking-widest">Instant application with tailored resume for matches.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative flex items-center justify-center reveal">
                        <div className="absolute w-full h-full bg-[#d5f4f9] opacity-5 rounded-full blur-[100px]"></div>
                        <div className="relative z-10 border border-white/10 p-12 bg-white/5 backdrop-blur-sm">
                            <div className="flex flex-col gap-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-[#b7c6c2] font-anton text-lg tracking-widest">AI AGENT STATUS: ACTIVE</span>
                                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                                </div>
                                <div className="h-[1px] w-full bg-white/10"></div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 text-sm text-white/60">
                                        <iconify-icon icon="lucide:search" class="text-[#b7c6c2]"></iconify-icon>
                                        Scanning 12 job boards...
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-white/60">
                                        <iconify-icon icon="lucide:check-circle" class="text-green-500"></iconify-icon>
                                        Match found: Senior UI Designer
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-white/60">
                                        <iconify-icon icon="lucide:cpu" class="text-[#b7c6c2]"></iconify-icon>
                                        Generating tailored resume...
                                    </div>
                                    <div className="flex items-center gap-4 text-sm font-semibold text-white">
                                        <iconify-icon icon="lucide:send" class="text-[#b7c6c2]"></iconify-icon>
                                        APPLICATION SENT SUCCESSFULLY
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dashboard Preview */}
            <section className="bg-white py-32 md:py-64 px-8 md:px-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="relative reveal order-2 lg:order-1">
                        <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#d5f4f9] opacity-20 z-0"></div>
                        <div className="relative z-10 aspect-video bg-gray-100 border border-gray-200 shadow-2xl overflow-hidden group">
                            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" alt="Dashboard Preview" className="w-full h-full object-cover grayscale group-hover:grayscale-0 custom-transition" />
                        </div>
                    </div>
                    <div className="flex flex-col items-start reveal order-1 lg:order-2">
                        <span className="font-anton text-[#9f8d8b] text-xl tracking-widest mb-6">YOUR CONTROL CENTER</span>
                        <h2 className="font-anton text-7xl md:text-8xl leading-tight mb-8 text-[#171e19]">TRACK EVERY APPLICATION.</h2>
                        <p className="text-[#9f8d8b] text-xl max-w-lg leading-relaxed mb-12">
                            Stay in the loop with a real-time feed of every job your AI agent applied to. Review the custom resumes generated for each role and track your success metrics from one central dashboard.
                        </p>
                        {/* <a href="" id="dashboard-cta" className="group flex items-center gap-4 text-[#171e19] text-[12px] uppercase tracking-[0.3em] font-bold">
                            Explore Dashboard
                            <iconify-icon icon="lucide:arrow-right" class="text-xl transform group-hover:translate-x-2 transition-transform"></iconify-icon>
                        </a> */}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="bg-[#fafafa] py-32 md:py-48 px-8 md:px-24">
                <div className="text-center mb-24 reveal">
                    <h2 className="font-anton text-7xl md:text-8xl text-[#171e19] mb-4">PICK YOUR EDGE</h2>
                    <p className="text-[#9f8d8b] uppercase tracking-[0.3em] text-sm">Automate your future career today.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="landing-pricing-card bg-white p-12 border border-gray-100 flex flex-col reveal">
                        <span className="font-anton text-lg text-[#9f8d8b] mb-4">STARTER</span>
                        <div className="flex items-end gap-1 mb-8">
                            <span className="font-anton text-5xl text-[#171e19]">$29</span>
                            <span className="text-[#9f8d8b] text-sm uppercase font-bold mb-1">/month</span>
                        </div>
                        <ul className="space-y-4 mb-12 flex-grow">
                            <li className="flex items-center gap-3 text-sm text-[#171e19]">
                                <iconify-icon icon="lucide:check" class="text-[#b7c6c2]"></iconify-icon>
                                Up to 50 applications / mo
                            </li>
                            <li className="flex items-center gap-3 text-sm text-[#171e19]">
                                <iconify-icon icon="lucide:check" class="text-[#b7c6c2]"></iconify-icon>
                                Basic tailoring
                            </li>
                            <li className="flex items-center gap-3 text-sm text-[#171e19]">
                                <iconify-icon icon="lucide:check" class="text-[#b7c6c2]"></iconify-icon>
                                Daily job reports
                            </li>
                        </ul>
                        <Link to="/register" id="plan-starter-link" className="block py-4 border border-[#171e19] text-[#171e19] text-center font-anton tracking-widest hover:bg-[#171e19] hover:text-white custom-transition">CHOOSE PLAN</Link>
                    </div>

                    <div className="landing-pricing-card bg-navy p-12 border border-navy flex flex-col scale-105 shadow-2xl reveal z-20">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-anton text-lg text-[#b7c6c2]">PRO</span>
                            <span className="px-3 py-1 bg-[#b7c6c2] text-[#171e19] text-[10px] uppercase font-bold tracking-tighter">MOST POPULAR</span>
                        </div>
                        <div className="flex items-end gap-1 mb-8">
                            <span className="font-anton text-5xl text-white">$79</span>
                            <span className="text-[#9f8d8b] text-sm uppercase font-bold mb-1">/month</span>
                        </div>
                        <ul className="space-y-4 mb-12 flex-grow">
                            <li className="flex items-center gap-3 text-sm text-white">
                                <iconify-icon icon="lucide:check" class="text-[#b7c6c2]"></iconify-icon>
                                UNLIMITED applications
                            </li>
                            <li className="flex items-center gap-3 text-sm text-white">
                                <iconify-icon icon="lucide:check" class="text-[#b7c6c2]"></iconify-icon>
                                Advanced AI tailoring
                            </li>
                            <li className="flex items-center gap-3 text-sm text-white">
                                <iconify-icon icon="lucide:check" class="text-[#b7c6c2]"></iconify-icon>
                                Real-time notifications
                            </li>
                            <li className="flex items-center gap-3 text-sm text-white">
                                <iconify-icon icon="lucide:check" class="text-[#b7c6c2]"></iconify-icon>
                                Priority dashboard sync
                            </li>
                        </ul>
                        <Link to="/register" id="plan-pro-link" className="block py-4 bg-[#b7c6c2] text-[#171e19] text-center font-anton tracking-widest hover:bg-white custom-transition">START FREE TRIAL</Link>
                    </div>

                    <div className="landing-pricing-card bg-white p-12 border border-gray-100 flex flex-col reveal">
                        <span className="font-anton text-lg text-[#9f8d8b] mb-4">ENTERPRISE</span>
                        <div className="flex items-end gap-1 mb-8">
                            <span className="font-anton text-5xl text-[#171e19]">CUSTOM</span>
                        </div>
                        <ul className="space-y-4 mb-12 flex-grow">
                            <li className="flex items-center gap-3 text-sm text-[#171e19]">
                                <iconify-icon icon="lucide:check" class="text-[#b7c6c2]"></iconify-icon>
                                Everything in Pro
                            </li>
                            <li className="flex items-center gap-3 text-sm text-[#171e19]">
                                <iconify-icon icon="lucide:check" class="text-[#b7c6c2]"></iconify-icon>
                                Dedicated career coach
                            </li>
                            <li className="flex items-center gap-3 text-sm text-[#171e19]">
                                <iconify-icon icon="lucide:check" class="text-[#b7c6c2]"></iconify-icon>
                                API Access
                            </li>
                        </ul>
                        <Link to="/register" id="plan-enterprise-link" className="block py-4 border border-[#171e19] text-[#171e19] text-center font-anton tracking-widest hover:bg-[#171e19] hover:text-white custom-transition">CONTACT US</Link>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-[#302b2f] py-32 md:py-64 px-8 md:px-24 overflow-hidden relative">
                <div className="absolute -top-24 -left-12 font-anton text-[#171e19] text-[30rem] leading-none opacity-30 select-none pointer-events-none">
                    &ldquo;
                </div>
                <div className="relative z-10 max-w-6xl mx-auto text-center flex flex-col items-center reveal">
                    <h4 className="font-anton text-4xl md:text-6xl text-white tracking-tighter uppercase leading-none mb-16">
                        "I GOT 8 INTERVIEW CALLS IN MY FIRST WEEK. THE AI APPLIED TO JOBS I HADN'T EVEN SEEN YET. IT'S LIKE HAVING A FULL-TIME ASSISTANT WHO NEVER SLEEPS."
                    </h4>
                    <div className="flex flex-col items-center gap-6">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#b7c6c2]">
                            <img src="https://i.pravatar.cc/100?u=tech" alt="User" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-center">
                            <p className="font-anton text-xl text-[#b7c6c2] tracking-widest">SARAH JENKINS</p>
                            <p className="text-[#9f8d8b] text-[10px] uppercase tracking-[0.3em] mt-1">SOFTWARE ENGINEER @ FAANG</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-[#171e19] py-32 md:py-48 px-8 md:px-24 text-center overflow-hidden">
                <div className="relative reveal">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d5f4f9] opacity-10 rounded-full blur-[150px]"></div>
                    <h2 className="relative z-10 font-anton text-8xl md:text-[12vw] text-white leading-none tracking-tighter mb-12">READY TO GET EARLY?</h2>
                    <div className="flex flex-col items-center gap-8">
                        {/* <Link to="/register" className="px-8 py-3 border border-white/20 hover:bg-white hover:text-[#171e19] transition-colors text-[12px] uppercase tracking-widest font-semibold text-white"> */}
                        <Link to="/register" id="final-cta-btn" className="relative z-10 px-12 py-6 bg-[#b7c6c2] text-[#171e19] font-anton text-2xl tracking-widest hover:bg-white custom-transition">
                            START YOUR FREE TRIAL
                        </Link>
                        <p className="relative z-10 text-[#9f8d8b] uppercase tracking-[0.3em] text-xs">JOIN 1,000+ JOB SEEKERS GETTING HIRED FASTER</p>
                    </div>
                </div>
            </section>

            {/* Footer Component */}
            <div>
                <footer className="bg-[#171e19] pt-32 pb-12 px-8 md:px-24">
                    <div className={`flex flex-col transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'}`}>
                        <h2 className="font-anton font-normal text-[12vw] md:text-[10vw] leading-none tracking-tighter text-white mb-12 uppercase">LET'S TALK.</h2>
                        <a href={emailHref} className="font-anton font-normal text-4xl md:text-6xl text-[#b7c6c2] hover:text-white transition-colors underline underline-offset-[16px] decoration-1 decoration-[#b7c6c2]/30 uppercase">HELLO@EARLY-EDGE.AI</a>
                    </div>
                    <div className="mt-48 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="text-[10px] uppercase tracking-[0.4em] text-white/40">© 2026 EARLY EDGE — ALL RIGHTS RESERVED</div>
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
