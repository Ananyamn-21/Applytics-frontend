import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import '../pages/LandingPage.css';

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeItem, setActiveItem] = useState('');

    useEffect(() => {
        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach((el, index) => {
            el.style.transitionDelay = `${index * 100}ms`;
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            toast.error('Please fill in all fields');
            return;
        }
        setLoading(true);
        try {
            await login(form.email, form.password);
            toast.success('Welcome back!');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col md:flex-row overflow-hidden selection:bg-[#b7c6c2] selection:text-[#171e19]">
            
            {/* Navigation Component */}
            <div>
              <nav className="fixed top-0 left-0 w-full z-[100] px-8 md:px-12 py-8 flex items-center mix-blend-difference">
                <Link to="/" className="font-anton font-normal text-2xl tracking-widest text-white">EARLY EDGE</Link>
              </nav>
            </div>

            {/* Left Section (Dark) */}
            <div className="relative hidden md:flex md:w-1/2 min-h-screen bg-[#171e19] flex-col justify-center px-16 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#b7c6c2] rounded-full blur-[120px] opacity-20 animate-float pointer-events-none"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#bbe2f5] rounded-full blur-[120px] opacity-20 animate-float-delayed pointer-events-none"></div>
                <div className="relative z-10">
                    <span className="text-[#9f8d8b] text-[12px] uppercase tracking-[0.4em] font-bold mb-4 block reveal">AI AGENT INTERFACE</span>
                    <h1 className="font-anton font-normal text-[12vw] leading-[0.85] tracking-tighter text-white reveal">
                        EARLY<br/>
                        <span className="text-outline">ACCESS</span>
                    </h1>
                    <p className="text-[#9f8d8b] mt-8 max-w-sm text-sm leading-relaxed reveal">
                        Join the waitlist or log in to manage your automated job hunt. EarlyEdge agents work 24/7 to ensure you're always the first candidate in the recruiter's inbox.
                    </p>
                </div>
                <div className="absolute bottom-12 left-16 flex items-center gap-4 reveal">
                    <div className="w-2 h-2 rounded-full bg-[#b7c6c2] animate-pulse"></div>
                    <span className="text-[10px] uppercase tracking-widest text-white/40">Agent Systems Active</span>
                </div>
            </div>

            {/* Right Section (Form) */}
            <div className="w-full md:w-1/2 min-h-screen pt-32 pb-24 md:pt-0 md:pb-0 bg-white flex items-center justify-center px-8 md:px-16 lg:px-24">
                <div className="w-full max-w-md">
                    <div className="text-center md:text-left mb-12">
                        <h2 className="font-anton font-normal text-4xl md:text-5xl text-[#171e19] reveal">WELCOME BACK</h2>
                        <p className="text-[#9f8d8b] text-sm mt-2 reveal">Continue to your application dashboard</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="reveal">
                            <label htmlFor="email" className="block text-[10px] uppercase tracking-[0.2em] font-bold text-[#171e19] mb-2">Email Address</label>
                            <input 
                                type="email" 
                                id="email" 
                                placeholder="name@company.com" 
                                className="w-full px-4 py-3 border border-[#171e19]/10 rounded-none text-[#171e19] placeholder:text-[#171e19]/30 transition-all focus:outline-none focus:border-[#b7c6c2] focus:ring-1 focus:ring-[#b7c6c2]" 
                                required 
                                value={form.email}
                                onChange={(e) => setForm({...form, email: e.target.value})}
                            />
                        </div>
                        <div className="reveal">
                            <div className="flex justify-between items-center mb-2">
                                <label htmlFor="password" className="block text-[10px] uppercase tracking-[0.2em] font-bold text-[#171e19]">Password</label>
                                <a href="#" className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#9f8d8b] hover:text-[#b7c6c2] transition-colors">Forgot?</a>
                            </div>
                            <input 
                                type="password" 
                                id="password" 
                                placeholder="••••••••" 
                                className="w-full px-4 py-3 border border-[#171e19]/10 rounded-none text-[#171e19] placeholder:text-[#171e19]/30 transition-all focus:outline-none focus:border-[#b7c6c2] focus:ring-1 focus:ring-[#b7c6c2]" 
                                required 
                                value={form.password}
                                onChange={(e) => setForm({...form, password: e.target.value})}
                            />
                        </div>
                        <div className="flex items-center reveal">
                            <input 
                                type="checkbox" 
                                id="remember" 
                                className="w-4 h-4 border-[#171e19]/20 rounded-none text-[#b7c6c2] focus:ring-0 focus:ring-offset-0 cursor-pointer" 
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-[#171e19]/60 cursor-pointer">Keep me signed in</label>
                        </div>
                        <button type="submit" disabled={loading} className="w-full h-14 bg-[#171e19] text-white font-anton font-normal text-xl tracking-widest transition-all hover:scale-[1.02] active:scale-95 reveal">
                            {loading ? 'AUTHENTICATING...' : 'LOG IN TO DASHBOARD'}
                        </button>
                        
                        <div className="relative py-4 reveal">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#171e19]/10"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase tracking-widest">
                                <span className="bg-white px-2 text-[#9f8d8b]">OR</span>
                            </div>
                        </div>
                        
                        <div className="text-center reveal">
                            <p className="text-sm text-[#171e19]/60">
                                Don't have an account? <Link to="/register" className="text-[#b7c6c2] font-bold hover:underline underline-offset-4">Sign Up</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    );
}
