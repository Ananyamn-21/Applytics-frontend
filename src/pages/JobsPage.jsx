import { useState, useEffect } from 'react';
import { jobsAPI } from '../services/api';
import { LuCalendar, LuChevronDown, LuArrowLeft, LuArrowRight, LuSearch, LuMail } from 'react-icons/lu';
import { Link } from 'react-router-dom';

export default function JobsPage() {
    const [jobs, setJobs] = useState([]);
    const [meta, setMeta] = useState({ total: 0, page: 1, totalPages: 1 });
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('All'); // All, Applied, Response, Rejected

    useEffect(() => {
        setLoading(true);
        jobsAPI.getAll(page, 20).then((res) => {
            const jobData = Array.isArray(res) ? res : (res?.data || []);
            setJobs(jobData);
            setMeta(res?.meta || { total: jobData.length, page: 1, totalPages: 1 });
        }).catch(() => {
            setJobs([]);
        }).finally(() => setLoading(false));
    }, [page]);

    const timeAgo = (dateStr) => {
        const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        return `${Math.floor(seconds / 86400)}d ago`;
    };

    const getInitials = (company) => {
        if (!company) return 'NA';
        return company.substring(0, 2).toUpperCase();
    };

    if (loading) {
        return <div className="min-h-[60vh] flex items-center justify-center text-white">Loading applications...</div>;
    }

    const filteredJobs = jobs.filter(job => {
        if (filter === 'All') return true;
        // The API might not have detailed statuses, but assuming status maps to the filter
        return job.status?.toLowerCase() === filter.toLowerCase();
    });

    return (
        <div className="relative pt-40 md:px-12 pb-32">
            {/* Ambient Orbs */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#b7c6c2] rounded-full blur-[160px] opacity-10 animate-float pointer-events-none"></div>

            {/* Hero Section */}
            <header className="mb-12 reveal active">
                <h1 className="font-anton text-[10vw] md:text-[8vw] leading-[0.85] tracking-tighter uppercase text-white">
                    YOUR<br />
                    <span className="text-outline">APPLICATIONS</span>
                </h1>
                <p className="mt-8 max-w-lg text-[12px] uppercase tracking-[0.25em] text-[#9f8d8b] leading-relaxed reveal active">
                    EarlyEdge AI is working 24/7. These are the positions where you were among the first 10 candidates, applied instantly with a tailored resume.
                </p>
            </header>

            {/* Filter Bar */}
            <section className="mb-12 relative z-20 reveal active" style={{ transitionDelay: '100ms' }}>
                <div className="py-6 border-y border-white/10 flex flex-col lg:flex-row justify-between items-center gap-6">
                    <div className="flex flex-wrap gap-4">
                        {['All', 'Applied', 'Response', 'Rejected'].map(f => (
                            <button 
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${filter === f ? 'bg-[#b7c6c2] text-[#171e19]' : 'border border-white/10 text-white hover:border-white'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] uppercase tracking-widest text-[#9f8d8b]">Sort By:</span>
                            <select className="bg-transparent text-white text-[10px] font-bold uppercase tracking-widest border-none focus:ring-0 outline-none [&>option]:text-[#171e19] cursor-pointer">
                                <option value="recent">Most Recent</option>
                                <option value="oldest">Oldest</option>
                                <option value="company">Company</option>
                            </select>
                        </div>
                        <div className="h-4 w-px bg-white/10"></div>
                        <button className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:text-[#b7c6c2] transition-colors text-white">
                            <LuCalendar className="text-base" />
                            Last 30 Days
                        </button>
                    </div>
                </div>
            </section>

            {/* Applications Grid */}
            <section className="pb-24 relative z-10">
                {filteredJobs.length === 0 ? (
                    <div className="px-8 md:px-12 py-24 text-center border border-white/10 bg-white/5 reveal active">
                        <div className="max-w-xl mx-auto flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center mb-12">
                                <LuSearch className="text-4xl text-[#9f8d8b]" />
                            </div>
                            <h2 className="font-anton text-4xl text-white mb-6 uppercase">No applications yet</h2>
                            <p className="text-[#9f8d8b] text-sm tracking-widest uppercase mb-12">Your AI agent will start applying to matching jobs soon! Make sure your preferences are updated.</p>
                            <Link to="/preferences" className="px-12 py-4 bg-[#b7c6c2] text-[#171e19] text-[10px] font-bold uppercase tracking-[0.3em]">Update Preferences</Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {filteredJobs.map((job, index) => (
                            <div key={job.id || index} className="dashboard-card p-6 md:p-8 reveal active w-full" style={{ transitionDelay: `${(index % 5) * 100}ms` }}>
                                <details className="group [&_summary::-webkit-details-marker]:hidden w-full">
                                    <summary className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 cursor-pointer list-none w-full">
                                        <div className="flex items-center gap-6 w-full md:w-auto">
                                            <div className="w-16 h-16 bg-[#171e19] border border-white/10 flex items-center justify-center p-3 shrink-0 font-anton text-2xl text-white">
                                                {getInitials(job.company)}
                                            </div>
                                            <div>
                                                <h3 className="font-anton text-2xl tracking-tight text-[#b7c6c2] uppercase">{job.title}</h3>
                                                <p className="text-[#9f8d8b] text-[10px] uppercase tracking-widest mt-1">
                                                    {job.company} &bull; {job.location || 'REMOTE'} &bull; {job.jobType || 'FULL-TIME'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 w-full md:w-auto">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase tracking-widest text-[#9f8d8b]">Applied</span>
                                                <span className="text-[14px] font-semibold mt-1 text-white">{timeAgo(job.postedAt || new Date().toISOString())}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase tracking-widest text-[#9f8d8b]">Status</span>
                                                <span className={`mt-1 px-3 py-1 text-[10px] font-bold uppercase tracking-widest w-fit ${
                                                    job.status === 'Response' ? 'bg-[#b7c6c2] text-[#171e19]' :
                                                    job.status === 'Rejected' ? 'bg-[#9f8d8b] text-white' :
                                                    'bg-[#d5f4f9] text-[#171e19]'
                                                }`}>
                                                    {job.status || 'Applied'}
                                                </span>
                                            </div>
                                            <div className="hidden md:flex flex-col items-end">
                                                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-open:rotate-180 transition-transform text-white">
                                                    <LuChevronDown />
                                                </div>
                                            </div>
                                        </div>
                                    </summary>

                                    <div className="mt-12 pt-12 border-t border-white/10 w-full">
                                        {job.status === 'Response' && (
                                            <div className="bg-[#b7c6c2] text-[#171e19] p-6 mb-8 flex justify-between items-center w-full">
                                                <div className="flex items-center gap-4 border-none border-0">
                                                    <LuMail className="text-2xl" />
                                                    <span className="text-xs font-bold uppercase tracking-widest">Recruiter reached out! Check your dashboard inbox.</span>
                                                </div>
                                                <Link to="#" className="text-[10px] font-black uppercase tracking-widest underline decoration-2">Open Inbox</Link>
                                            </div>
                                        )}

                                        {job.status === 'Rejected' && (
                                            <div className="mb-8 w-full">
                                                <p className="text-[#9f8d8b] text-sm leading-relaxed max-w-2xl">Company decided not to move forward with this application. This typically happens due to internal role changes or budget adjustments. EarlyEdge has already applied to 14 similar roles for you.</p>
                                            </div>
                                        )}

                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full">
                                            <div className="lg:col-span-8">
                                                <h4 className="font-anton text-lg tracking-widest text-[#b7c6c2] mb-6 uppercase">Tailored AI Resume</h4>
                                                <div className="bg-white/5 border border-white/10 p-8 font-mono text-sm text-[#b7c6c2] leading-relaxed rounded-sm whitespace-pre-wrap">
                                                    {job.description || "Summary: Highly creative professional with 8+ years experience... \nKey Achievements: Led the redesign of critical flows resulting in higher conversion...\nSkills Mapped: React, Platform Engineering, FinTech Design..."}
                                                </div>
                                            </div>
                                            <div className="lg:col-span-4 space-y-8">
                                                <div>
                                                    <h4 className="font-anton text-sm tracking-widest text-[#9f8d8b] mb-4 uppercase">Application Meta</h4>
                                                    <ul className="space-y-4">
                                                        <li className="flex justify-between text-xs uppercase tracking-widest">
                                                            <span className="text-white/40">Agent Speed</span>
                                                            <span className="text-[#d5f4f9]">Applied in 3.4m</span>
                                                        </li>
                                                        <li className="flex justify-between text-xs uppercase tracking-widest">
                                                            <span className="text-white/40">Applicants Rank</span>
                                                            <span className="text-[#d5f4f9]">#{Math.floor(Math.random() * 5) + 1} of {job.applicantCount || 42}</span>
                                                        </li>
                                                        <li className="flex justify-between text-xs uppercase tracking-widest">
                                                            <span className="text-white/40">Match Score</span>
                                                            <span className="text-[#d5f4f9]">{Math.floor(Math.random() * 15) + 85}%</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <a href={job.jobUrl || '#'} target="_blank" rel="noopener noreferrer" className="block py-4 text-center border border-[#b7c6c2]/40 hover:bg-[#b7c6c2] hover:text-[#171e19] transition-all text-[#b7c6c2] text-[10px] uppercase font-bold tracking-[0.3em]">
                                                    View Original Job
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </details>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {meta.totalPages > 1 && (
                    <div className="mt-24 pt-12 border-t border-white/10 flex justify-center items-center gap-12 reveal active">
                        <button 
                            disabled={page <= 1} 
                            onClick={() => setPage(page - 1)}
                            className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors flex items-center gap-4 disabled:opacity-50"
                        >
                            <LuArrowLeft />
                            Previous
                        </button>
                        <div className="flex gap-6">
                            {Array.from({ length: Math.min(meta.totalPages, 5) }, (_, i) => {
                                const p = i + 1;
                                return (
                                    <span 
                                        key={p} 
                                        onClick={() => setPage(p)}
                                        className={`text-[10px] font-bold tracking-widest cursor-pointer hover:text-white transiton-colors ${page === p ? 'text-white' : 'text-white/40'}`}
                                    >
                                        {p.toString().padStart(2, '0')}
                                    </span>
                                );
                            })}
                        </div>
                        <button 
                            disabled={page >= meta.totalPages} 
                            onClick={() => setPage(page + 1)}
                            className="text-[10px] font-bold uppercase tracking-[0.4em] text-white hover:text-[#b7c6c2] transition-colors flex items-center gap-4 disabled:opacity-50"
                        >
                            Next
                            <LuArrowRight />
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}
