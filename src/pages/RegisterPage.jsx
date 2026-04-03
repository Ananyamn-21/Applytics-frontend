import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import '../pages/LandingPage.css';

export default function RegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    const [activeItem, setActiveItem] = useState('');
    const [isRevealed, setIsRevealed] = useState(true);

    const emailHref = "mailto:hello@early-edge.ai";
    const legalHref = "#";
    const privacyHref = "#";
    const instagramHref = "#instagram";

    useEffect(() => {
        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.firstName || !form.lastName || !form.email || !form.password) {
            toast.error('Please fill in all required fields');
            return;
        }
        if (form.password.length < 8) {
            toast.error('Password must be at least 8 characters');
            return;
        }
        setLoading(true);
        try {
            await register(form.email, form.password, form.firstName, form.lastName);
            toast.success('Account created! Welcome to Early Edge.');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="landing-page-wrapper min-h-screen bg-[#171e19] text-white selection:bg-[#b7c6c2] selection:text-[#171e19] relative overflow-hidden">
            {/* Ambient Orbs */}
            <div className="absolute top-1/4 -left-24 w-[500px] h-[500px] bg-[#b7c6c2] rounded-full blur-[120px] opacity-10 animate-float pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-[600px] h-[600px] bg-[#bbe2f5] rounded-full blur-[120px] opacity-10 animate-float-delayed pointer-events-none"></div>

            {/* Navigation */}
            <div>
              <nav className="fixed top-0 left-0 w-full z-[100] px-8 md:px-12 py-8 flex items-center mix-blend-difference">
                <Link to="/" className="font-anton font-normal text-2xl tracking-widest text-white">EARLY EDGE</Link>
              </nav>
            </div>

            <main className="relative z-10 pt-32 pb-24 px-8 md:px-12 lg:px-24 min-h-[calc(100vh-80px)] flex items-center">
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                    
                    {/* Left Section: Content */}
                    <div className="lg:col-span-6 reveal">
                        <span className="text-[#b7c6c2] text-sm font-anton tracking-[0.3em] mb-6 block">SECURE YOUR FIRST-MOVER ADVANTAGE</span>
                        <h1 className="font-anton font-normal text-[8vw] lg:text-[6vw] leading-[0.9] tracking-tighter mb-8">
                            THE EARLY<br/>
                            <span className="text-outline">CANDIDATE</span><br/>
                            WINS.
                        </h1>
                        <div className="max-w-md space-y-6 text-[#9f8d8b] text-lg leading-relaxed">
                            <p>EarlyEdge is your 24/7 AI agent that hunts for roles posted just minutes ago. We ensure you are always in the first 10 applicants with a hyper-tailored resume.</p>
                            <div className="flex items-center gap-4 py-4 border-y border-white/10">
                                <div className="flex flex-col">
                                    <span className="text-white font-anton font-normal text-3xl">100%</span>
                                    <span className="text-[10px] uppercase tracking-widest">Automated Search</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section: Form */}
                    <div className="lg:col-span-6 reveal delay-200">
                        <div className="bg-white/5 border border-white/10 p-8 md:p-12 backdrop-blur-sm relative group">
                            <div className="absolute -top-px -left-px w-8 h-8 border-t border-l border-[#b7c6c2] opacity-50"></div>
                            <div className="absolute -bottom-px -right-px w-8 h-8 border-b border-r border-[#b7c6c2] opacity-50"></div>
                            
                            <h2 className="font-anton font-normal text-4xl mb-12 text-white">CREATE ACCOUNT</h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            id="first_name" 
                                            placeholder=" " 
                                            required
                                            value={form.firstName}
                                            onChange={(e) => setForm({...form, firstName: e.target.value})}
                                            className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-[#b7c6c2] transition-colors peer text-white" 
                                        />
                                        <label htmlFor="first_name" className="absolute left-0 top-3 text-white/40 uppercase text-[10px] tracking-widest pointer-events-none transition-all duration-300 peer-focus:-translate-y-6 peer-focus:scale-90 peer-focus:text-[#b7c6c2] peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:text-[#b7c6c2] origin-left">First Name</label>
                                    </div>
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            id="last_name" 
                                            placeholder=" " 
                                            required
                                            value={form.lastName}
                                            onChange={(e) => setForm({...form, lastName: e.target.value})}
                                            className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-[#b7c6c2] transition-colors peer text-white" 
                                        />
                                        <label htmlFor="last_name" className="absolute left-0 top-3 text-white/40 uppercase text-[10px] tracking-widest pointer-events-none transition-all duration-300 peer-focus:-translate-y-6 peer-focus:scale-90 peer-focus:text-[#b7c6c2] peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:text-[#b7c6c2] origin-left">Last Name</label>
                                    </div>
                                </div>
                                
                                <div className="relative">
                                    <input 
                                        type="email" 
                                        id="email" 
                                        placeholder=" " 
                                        required
                                        value={form.email}
                                        onChange={(e) => setForm({...form, email: e.target.value})}
                                        className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-[#b7c6c2] transition-colors peer text-white" 
                                    />
                                    <label htmlFor="email" className="absolute left-0 top-3 text-white/40 uppercase text-[10px] tracking-widest pointer-events-none transition-all duration-300 peer-focus:-translate-y-6 peer-focus:scale-90 peer-focus:text-[#b7c6c2] peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:text-[#b7c6c2] origin-left">Email Address</label>
                                </div>
                                
                                <div className="relative">
                                    <input 
                                        type="password" 
                                        id="password" 
                                        placeholder=" " 
                                        required
                                        value={form.password}
                                        onChange={(e) => setForm({...form, password: e.target.value})}
                                        className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-[#b7c6c2] transition-colors peer text-white" 
                                    />
                                    <label htmlFor="password" className="absolute left-0 top-3 text-white/40 uppercase text-[10px] tracking-widest pointer-events-none transition-all duration-300 peer-focus:-translate-y-6 peer-focus:scale-90 peer-focus:text-[#b7c6c2] peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:text-[#b7c6c2] origin-left">Password</label>
                                    
                                    {/* Password Strength */}
                                    {form.password.length > 0 && (
                                        <div className="flex gap-1 mt-4">
                                            <div className="h-1 w-full bg-[#b7c6c2]"></div>
                                            <div className={`h-1 w-full ${form.password.length > 5 ? 'bg-[#b7c6c2]' : 'bg-white/10'}`}></div>
                                            <div className={`h-1 w-full ${form.password.length >= 8 ? 'bg-[#b7c6c2]' : 'bg-white/10'}`}></div>
                                            <span className="text-[9px] uppercase tracking-widest ml-2 text-[#b7c6c2] whitespace-nowrap">
                                                {form.password.length >= 8 ? 'Strong' : 'Moderate'}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex items-start gap-3 pt-4">
                                    <input type="checkbox" required id="terms" className="mt-1 rounded-none border-white/20 bg-transparent text-[#b7c6c2] focus:ring-0 cursor-pointer" />
                                    <label htmlFor="terms" className="text-[11px] text-[#9f8d8b] uppercase tracking-wider leading-relaxed cursor-pointer mt-0.5">
                                        I agree to the <Link to={legalHref} className="text-white hover:text-[#b7c6c2] underline underline-offset-4">Terms of Service</Link> and <Link to={privacyHref} className="text-white hover:text-[#b7c6c2] underline underline-offset-4">Privacy Policy</Link>.
                                    </label>
                                </div>
                                
                                <button type="submit" disabled={loading} className="w-full py-5 bg-white text-[#171e19] font-anton font-normal text-xl tracking-widest hover:bg-[#b7c6c2] transition-colors duration-500">
                                    {loading ? 'ACTIVATING...' : 'ACTIVATE AGENT'}
                                </button>
                            </form>
                            
                            <div className="mt-12 pt-8 border-t border-white/10 text-center">
                                <p className="text-[11px] uppercase tracking-widest text-[#9f8d8b]">
                                    Already a member? <Link to="/login" className="text-white hover:text-[#b7c6c2] underline underline-offset-4 font-bold ml-1 transition-colors">Login here</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer Component */}
            <div>
              <footer className="bg-[#171e19] pt-32 pb-12 px-8 md:px-24">
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
