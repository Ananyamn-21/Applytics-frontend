import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dashboardAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
    LuBriefcase, LuCpu, LuTarget, LuTrendingUp, 
    LuChevronRight, LuCirclePlus, LuSettings2, LuFileText, LuCircleHelp 
} from 'react-icons/lu';

export default function DashboardPage() {
    const { user } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dashboardAPI.get().then(setData).finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="min-h-[60vh] flex items-center justify-center text-white">Loading dashboard...</div>;
    }

    if (!data) return null;

    const stats = data.stats || {};
    const recentApplications = data.recentApplications || [];

    const getInitials = (company) => {
        if (!company) return 'NA';
        return company.substring(0, 2).toUpperCase();
    };

    return (
        <main className="relative pt-40 md:px-12 pb-32">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#b7c6c2] rounded-full blur-[160px] opacity-10 animate-float pointer-events-none"></div>
            
            <header className="mb-20 reveal active">
                <h1 className="font-anton text-8xl md:text-9xl leading-[0.85] tracking-tighter uppercase">
                    WELCOME,<br />
                    <span className="text-outline">{user?.firstName || 'CHRIS'} {user?.lastName || 'EVANS'}</span>
                </h1>
                <p className="mt-6 text-[#9f8d8b] text-[12px] uppercase tracking-[0.4em]">
                    AGENT STATUS: 24/7 ACTIVE &bull; LAST SCAN 4M AGO
                </p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24 reveal active" style={{ transitionDelay: '100ms' }}>
                <div className="dashboard-card p-8 group">
                    <p className="text-[#9f8d8b] text-[10px] uppercase tracking-widest mb-4">Jobs Applied</p>
                    <div className="flex justify-between items-end">
                        <h2 className="font-anton text-6xl text-white">{stats.totalApplications !== undefined ? stats.totalApplications : '1,428'}</h2>
                        <LuBriefcase className="text-2xl text-[#b7c6c2] opacity-40 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>
                <div className="dashboard-card p-8 group">
                    <p className="text-[#9f8d8b] text-[10px] uppercase tracking-widest mb-4">Active Threads</p>
                    <div className="flex justify-between items-end">
                        <h2 className="font-anton text-6xl text-white">{stats.todayApplications !== undefined ? stats.todayApplications : '42'}</h2>
                        <LuCpu className="text-2xl text-[#d5f4f9] opacity-40 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>
                <div className="dashboard-card p-8 group">
                    <p className="text-[#9f8d8b] text-[10px] uppercase tracking-widest mb-4">Matched Roles</p>
                    <div className="flex justify-between items-end">
                        <h2 className="font-anton text-6xl text-white">{stats.weekApplications !== undefined ? stats.weekApplications : '156'}</h2>
                        <LuTarget className="text-2xl text-[#bbe2f5] opacity-40 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>
                <div className="dashboard-card p-8 group">
                    <p className="text-[#9f8d8b] text-[10px] uppercase tracking-widest mb-4">Response Rate</p>
                    <div className="flex justify-between items-end">
                        <h2 className="font-anton text-6xl text-white">{stats.monthApplications !== undefined ? `${stats.monthApplications}%` : '14%'}</h2>
                        <LuTrendingUp className="text-2xl text-[#b7c6c2] opacity-40 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-12 gap-12">
                <section className="col-span-12 lg:col-span-8 space-y-12">
                    <div className="reveal active" style={{ transitionDelay: '200ms' }}>
                        <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
                            <h3 className="font-anton text-4xl">RECENT AUTOMATIONS</h3>
                            <Link to="/jobs" className="text-[10px] uppercase tracking-widest text-[#9f8d8b] hover:text-white transition-colors">
                                View History
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {recentApplications.map((app) => (
                                <div key={app.id} className="dashboard-card p-6 flex flex-col md:flex-row md:items-center justify-between group gap-4">
                                    <div className="flex gap-6 items-center">
                                        <div className="w-12 h-12 bg-[#171e19] border border-white/10 flex items-center justify-center font-anton text-xl group-hover:border-[#b7c6c2] transition-colors shrink-0">
                                            {getInitials(app.job?.company)}
                                        </div>
                                        <div>
                                            <h4 className="font-anton text-xl tracking-wide">{app.job?.title || 'Unknown Role'}</h4>
                                            <p className="text-[#9f8d8b] text-[10px] uppercase tracking-widest mt-1">
                                                {app.job?.company || 'COMPANY'} &bull; APPLIED {new Date(app.appliedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8 md:ml-auto">
                                        <span className="status-badge bg-[#b7c6c2]/10 text-[#b7c6c2] uppercase font-bold shrink-0">
                                            {app.status === 'applied' ? 'INSTANT APPLY' : app.status}
                                        </span>
                                        <Link to={`/jobs/${app.id}`} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-[#171e19] transition-all shrink-0">
                                            <LuChevronRight />
                                        </Link>
                                    </div>
                                </div>
                            ))}

                            {/* Fallback Static Cards if no recent applications */}
                            {recentApplications.length === 0 && (
                                <>
                                    <div className="dashboard-card p-6 flex items-center justify-between group">
                                        <div className="flex gap-6 items-center">
                                            <div className="w-12 h-12 bg-[#171e19] border border-white/10 flex items-center justify-center font-anton text-xl group-hover:border-[#b7c6c2] transition-colors">TC</div>
                                            <div>
                                                <h4 className="font-anton text-xl tracking-wide">Senior Product Designer</h4>
                                                <p className="text-[#9f8d8b] text-[10px] uppercase tracking-widest mt-1">TECHCORP &bull; APPLIED 12M AGO</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-8">
                                            <span className="status-badge bg-[#b7c6c2]/10 text-[#b7c6c2] uppercase font-bold">INSTANT APPLY</span>
                                            <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-[#171e19] transition-all">
                                                <LuChevronRight />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="dashboard-card p-6 flex items-center justify-between group">
                                        <div className="flex gap-6 items-center">
                                            <div className="w-12 h-12 bg-[#171e19] border border-white/10 flex items-center justify-center font-anton text-xl group-hover:border-[#b7c6c2] transition-colors">GS</div>
                                            <div>
                                                <h4 className="font-anton text-xl tracking-wide">Lead Frontend Engineer</h4>
                                                <p className="text-[#9f8d8b] text-[10px] uppercase tracking-widest mt-1">GLOBAL SOLUTIONS &bull; APPLIED 1H AGO</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-8">
                                            <span className="status-badge bg-[#d5f4f9]/10 text-[#d5f4f9] uppercase font-bold">EARLY CANDIDATE</span>
                                            <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-[#171e19] transition-all">
                                                <LuChevronRight />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                <aside className="col-span-12 lg:col-span-4 space-y-12">
                    <div className="reveal active" style={{ transitionDelay: '300ms' }}>
                        <h3 className="font-anton text-2xl mb-8 border-b border-white/10 pb-4">QUICK ACTIONS</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Link to="/skills" className="dashboard-card p-6 flex flex-col items-center justify-center gap-3 text-center group">
                                <LuCirclePlus className="text-2xl text-[#b7c6c2]" />
                                <span className="text-[10px] uppercase tracking-widest font-bold">Add Skills</span>
                            </Link>
                            <Link to="/preferences" className="dashboard-card p-6 flex flex-col items-center justify-center gap-3 text-center group">
                                <LuSettings2 className="text-2xl text-[#d5f4f9]" />
                                <span className="text-[10px] uppercase tracking-widest font-bold">Preferences</span>
                            </Link>
                            <Link to="/applications" className="dashboard-card p-6 flex flex-col items-center justify-center gap-3 text-center group">
                                <LuFileText className="text-2xl text-[#bbe2f5]" />
                                <span className="text-[10px] uppercase tracking-widest font-bold">Resumes</span>
                            </Link>
                            <Link to="#" className="dashboard-card p-6 flex flex-col items-center justify-center gap-3 text-center group">
                                <LuCircleHelp className="text-2xl text-[#9f8d8b]" />
                                <span className="text-[10px] uppercase tracking-widest font-bold">Support</span>
                            </Link>
                        </div>
                    </div>

                    <div className="reveal active" style={{ transitionDelay: '400ms' }}>
                        <h3 className="font-anton text-2xl mb-8 border-b border-white/10 pb-4">AGENT ACTIVITY</h3>
                        <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
                            
                            <div className="relative pl-10 group">
                                <div className="absolute left-0 top-1 w-6 h-6 rounded-full border border-white/20 bg-[#171e19] flex items-center justify-center z-10 group-hover:border-[#b7c6c2] transition-colors">
                                    <div className="w-2 h-2 rounded-full bg-[#b7c6c2]"></div>
                                </div>
                                <p className="text-[#9f8d8b] text-[9px] uppercase tracking-[0.2em]">Just Now</p>
                                <p className="text-sm mt-1">Generated tailored resume for Senior Designer role at Meta.</p>
                            </div>

                            <div className="relative pl-10 group">
                                <div className="absolute left-0 top-1 w-6 h-6 rounded-full border border-white/20 bg-[#171e19] flex items-center justify-center z-10">
                                    <div className="w-2 h-2 rounded-full bg-white/20"></div>
                                </div>
                                <p className="text-[#9f8d8b] text-[9px] uppercase tracking-[0.2em]">14m Ago</p>
                                <p className="text-sm mt-1">Applied to Senior Product Designer at TechCorp (9 applicants total).</p>
                            </div>

                            <div className="relative pl-10 group">
                                <div className="absolute left-0 top-1 w-6 h-6 rounded-full border border-white/20 bg-[#171e19] flex items-center justify-center z-10">
                                    <div className="w-2 h-2 rounded-full bg-white/20"></div>
                                </div>
                                <p className="text-[#9f8d8b] text-[9px] uppercase tracking-[0.2em]">1h Ago</p>
                                <p className="text-sm mt-1">Found 12 new job postings matching "Remote UI Designer" preference.</p>
                            </div>
                            
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
}
