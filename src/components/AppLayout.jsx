import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LuLayoutDashboard,
    LuBriefcase,
    LuAward,
    LuSettings,
    LuLogOut
} from 'react-icons/lu';

const SIDEBAR_ITEMS = [
    { to: '/dashboard', icon: LuLayoutDashboard, label: 'Overview' },
    { to: '/jobs', icon: LuBriefcase, label: 'Applied Jobs' },
    { to: '/skills', icon: LuAward, label: 'Skills Management' },
    { to: '/preferences', icon: LuSettings, label: 'Job Preferences' },
];

export default function AppLayout() {
    const { logout } = useAuth();
    const location = useLocation();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        setShowLogoutModal(false);
        logout();
    };

    // Determine if page should be forced top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-[#171e19] relative flex flex-col selection:bg-[#b7c6c2] selection:text-[#171e19]">
            
            {/* Fixed Navigation Bar (STUDIO.RARE Style) */}
            <nav className="fixed top-0 left-0 w-full z-[100] px-8 md:px-12 py-8 flex justify-between items-center mix-blend-difference pointer-events-none">
                <NavLink to="/dashboard" style={{ fontFamily: "'Anton', sans-serif" }} className="text-2xl tracking-widest text-white uppercase pointer-events-auto">
                    EARLY EDGE
                </NavLink>
            </nav>

            {/* Main Content Wrapper */}
            <div className="flex pt-24 min-h-screen">
                
                {/* Sidebar */}
                <aside className="hidden lg:flex w-80 fixed left-0 top-24 bottom-0 flex-col px-12 py-12 border-r border-white/10 bg-[#171e19]">
                    <div className="space-y-12">
                        <div className="reveal active">
                            <p className="text-[10px] uppercase tracking-[0.4em] text-[#9f8d8b] mb-8">DASHBOARD MENU</p>
                            <nav className="flex flex-col gap-6">
                                {SIDEBAR_ITEMS.map(({ to, icon: Icon, label }) => (
                                    <NavLink
                                        key={to}
                                        to={to}
                                        className={({ isActive }) => `sidebar-link text-sm uppercase tracking-widest flex items-center gap-3 ${isActive ? 'active' : 'hover:text-[#b7c6c2] text-white/70'}`}
                                    >
                                        <Icon className="text-lg" />
                                        {label}
                                    </NavLink>
                                ))}
                            </nav>
                        </div>

                        <div className="reveal active" style={{ transitionDelay: '200ms' }}>
                            <p className="text-[10px] uppercase tracking-[0.4em] text-[#9f8d8b] mb-8">AI AGENT STATUS</p>
                            <div className="bg-white/5 p-6 border border-white/10 rounded-sm">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                                    <span className="text-xs uppercase tracking-widest text-white">Active Scanning</span>
                                </div>
                                <p className="text-[10px] text-[#9f8d8b] leading-relaxed italic">
                                    "Agent is monitoring 12 platforms based on 8 skills."
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto">
                        <button onClick={handleLogout} className="text-[10px] uppercase tracking-[0.4em] text-red-400/60 hover:text-red-400 flex items-center gap-2">
                            <LuLogOut className="text-lg" />
                            Sign Out
                        </button>
                    </div>
                </aside>

                {/* Main Area where Outlet renders */}
                <main className="flex-1 lg:ml-80 min-h-screen bg-[#171e19] text-white">
                    <Outlet />
                </main>
            </div>

            {/* Cinematic Logout Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 sm:p-8">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-[#0a0e1a]/80 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
                        onClick={() => setShowLogoutModal(false)}
                    ></div>
                    
                    {/* Modal Content */}
                    <div className="relative w-full max-w-md bg-[#171e19] border border-white/10 shadow-2xl p-10 sm:p-12 reveal active transition-all animate-in zoom-in-95 duration-300">
                        {/* Design Elements */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#b7c6c2]/5 blur-3xl rounded-full"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-400/5 blur-3xl rounded-full"></div>
                        
                        <div className="relative z-10 text-center">
                            <span className="text-[10px] uppercase tracking-[0.5em] text-[#9f8d8b] mb-4 block">AUTHENTICATION</span>
                            <h2 className="font-anton text-4xl text-white tracking-widest mb-6">TERMINATE SESSION?</h2>
                            <p className="text-[#9f8d8b] text-sm leading-relaxed mb-10 mx-auto max-w-[280px]">
                                Your connection to the EarlyEdge nodes will be severed. You will need to re-authenticate to resume monitoring.
                            </p>
                            
                            <div className="flex flex-col gap-3">
                                <button 
                                    onClick={confirmLogout}
                                    className="w-full py-4 bg-[#b7c6c2] text-[#171e19] font-anton tracking-[0.2em] text-sm hover:bg-white transition-all duration-300 shadow-lg shadow-[#b7c6c2]/10"
                                >
                                    CONFIRM LOGOUT
                                </button>
                                <button 
                                    onClick={() => setShowLogoutModal(false)}
                                    className="w-full py-4 border border-white/10 text-white/40 font-anton tracking-[0.2em] text-sm hover:text-white hover:bg-white/5 transition-all duration-300"
                                >
                                    CANCEL
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
