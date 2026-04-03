import { useState, useEffect } from 'react';
import { applicationsAPI } from '../services/api';
import { FiBriefcase, FiExternalLink, FiChevronDown, FiChevronUp, FiFileText } from 'react-icons/fi';
import './ApplicationsPage.css';

const STATUS_TABS = ['all', 'applied', 'viewed', 'shortlisted', 'rejected', 'interview', 'offered'];
const STATUS_BADGE_MAP = {
    applied: 'primary', viewed: 'info', shortlisted: 'success',
    rejected: 'error', interview: 'warning', offered: 'success',
};

export default function ApplicationsPage() {
    const [applications, setApplications] = useState([]);
    const [meta, setMeta] = useState({ total: 0, page: 1, totalPages: 1 });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');
    const [expandedId, setExpandedId] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setLoading(true);
        applicationsAPI.getAll(page, 20).then((res) => {
            const appData = Array.isArray(res) ? res : (res?.data || []);
            setApplications(appData);
            setMeta(res?.meta || { total: appData.length, page: 1, totalPages: 1 });
        }).catch(() => {
            setApplications([]);
        }).finally(() => setLoading(false));
    }, [page]);

    const filtered = activeTab === 'all'
        ? applications
        : applications.filter((a) => a.status === activeTab);

    const parseMatchScore = (notes) => {
        const match = notes?.match(/Match score:\s*(\d+)/);
        return match ? parseInt(match[1]) : null;
    };

    if (loading) {
        return <div className="loading-page"><div className="spinner spinner-lg" /></div>;
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Applications</h1>
                <p>Track all your auto-applied job applications</p>
            </div>

            {/* Status Tabs */}
            <div className="tabs">
                {STATUS_TABS.map((tab) => (
                    <button
                        key={tab}
                        className={`tab ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab === 'all' ? 'All' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div className="glass-card empty-state">
                    <div className="empty-state-icon"><FiBriefcase /></div>
                    <h3>No applications found</h3>
                    <p>Applications will appear here once the auto-apply engine starts working</p>
                </div>
            ) : (
                <div className="apps-list">
                    {filtered.map((app) => {
                        const expanded = expandedId === app.id;
                        const score = parseMatchScore(app.notes);
                        return (
                            <div key={app.id} className={`glass-card app-card ${expanded ? 'expanded' : ''}`}>
                                <div className="app-card-main" onClick={() => setExpandedId(expanded ? null : app.id)}>
                                    <div className="app-card-left">
                                        <div className={`app-platform-dot ${app.job.platform}`} />
                                        <div className="app-card-info">
                                            <h4>{app.job.title}</h4>
                                            <span className="text-sm text-secondary">
                                                {app.job.company} · {app.job.location}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="app-card-right">
                                        {score && (
                                            <div className="match-score" style={{ '--score-color': score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#ef4444' }}>
                                                <svg viewBox="0 0 36 36" className="score-ring">
                                                    <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        fill="none" stroke="var(--border-subtle)" strokeWidth="3" />
                                                    <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        fill="none" stroke="var(--score-color)" strokeWidth="3"
                                                        strokeDasharray={`${score}, 100`} strokeLinecap="round" />
                                                </svg>
                                                <span className="score-text">{score}</span>
                                            </div>
                                        )}
                                        <span className={`badge badge-${STATUS_BADGE_MAP[app.status]}`}>
                                            {app.status}
                                        </span>
                                        <span className="text-xs text-tertiary">
                                            {new Date(app.appliedAt).toLocaleDateString()}
                                        </span>
                                        <button className="btn btn-ghost btn-sm expand-btn">
                                            {expanded ? <FiChevronUp /> : <FiChevronDown />}
                                        </button>
                                    </div>
                                </div>

                                {expanded && (
                                    <div className="app-card-expanded">
                                        <div className="app-expanded-grid">
                                            <div className="app-expanded-section">
                                                <h5><FiFileText /> Tailored Resume</h5>
                                                <pre className="tailored-resume-text">{app.tailoredResumeText}</pre>
                                            </div>
                                            <div className="app-expanded-section">
                                                <h5>Details</h5>
                                                <div className="app-detail-items">
                                                    <div className="app-detail-item">
                                                        <span className="text-sm text-secondary">Platform</span>
                                                        <span className="text-sm" style={{ textTransform: 'capitalize' }}>{app.job.platform}</span>
                                                    </div>
                                                    <div className="app-detail-item">
                                                        <span className="text-sm text-secondary">Applied</span>
                                                        <span className="text-sm">{new Date(app.appliedAt).toLocaleString()}</span>
                                                    </div>
                                                    <div className="app-detail-item">
                                                        <span className="text-sm text-secondary">Notes</span>
                                                        <span className="text-sm">{app.notes}</span>
                                                    </div>
                                                </div>
                                                {app.job.jobUrl && (
                                                    <a href={app.job.jobUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ marginTop: '12px' }}>
                                                        <FiExternalLink /> View Original Job
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Pagination */}
            {meta.totalPages > 1 && (
                <div className="pagination">
                    <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
                    {Array.from({ length: Math.min(meta.totalPages, 5) }, (_, i) => {
                        const p = i + 1;
                        return <button key={p} className={page === p ? 'active' : ''} onClick={() => setPage(p)}>{p}</button>;
                    })}
                    <button disabled={page >= meta.totalPages} onClick={() => setPage(page + 1)}>Next</button>
                </div>
            )}
        </div>
    );
}
