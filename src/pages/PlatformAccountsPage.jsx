import { useState, useEffect } from 'react';
import { platformsAPI } from '../services/api';
import { FiPlus, FiX, FiLink, FiPause, FiPlay, FiTrash2, FiMail, FiLock, FiActivity } from 'react-icons/fi';
import { SiLinkedin } from 'react-icons/si';
import toast from 'react-hot-toast';
import './PlatformAccountsPage.css';

const PLATFORM_CONFIG = {
    linkedin: { name: 'LinkedIn', color: '#0a66c2', gradient: 'linear-gradient(135deg, #0a66c2, #0077b5)' },
    naukri: { name: 'Naukri', color: '#3e7cff', gradient: 'linear-gradient(135deg, #3e7cff, #6c5ce7)' },
};

const STATUS_BADGE = {
    active: 'success', paused: 'warning', suspended: 'error', error: 'error',
};

export default function PlatformAccountsPage() {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState({ platform: 'linkedin', email: '', password: '' });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        platformsAPI.getAll().then(setAccounts).finally(() => setLoading(false));
    }, []);

    const handleLink = async () => {
        if (!form.email || !form.password) {
            toast.error('Please fill in all fields');
            return;
        }
        setSaving(true);
        try {
            const linked = await platformsAPI.link(form);
            setAccounts([...accounts, linked]);
            setModalOpen(false);
            toast.success(`${PLATFORM_CONFIG[form.platform].name} account linked!`);
        } catch {
            toast.error('Failed to link account');
        } finally {
            setSaving(false);
        }
    };

    const handleUnlink = async (acc) => {
        if (!confirm(`Unlink ${PLATFORM_CONFIG[acc.platform].name} account?`)) return;
        try {
            await platformsAPI.unlink(acc.id);
            setAccounts(accounts.filter((a) => a.id !== acc.id));
            toast.success('Account unlinked');
        } catch {
            toast.error('Failed to unlink');
        }
    };

    const handleToggle = async (acc) => {
        try {
            if (acc.status === 'active') {
                const updated = await platformsAPI.pause(acc.id);
                setAccounts(accounts.map((a) => (a.id === acc.id ? updated : a)));
                toast.success('Auto-apply paused');
            } else {
                const updated = await platformsAPI.resume(acc.id);
                setAccounts(accounts.map((a) => (a.id === acc.id ? updated : a)));
                toast.success('Auto-apply resumed');
            }
        } catch {
            toast.error('Failed to update');
        }
    };

    const timeAgo = (dateStr) => {
        const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        return `${Math.floor(seconds / 86400)}d ago`;
    };

    if (loading) {
        return <div className="loading-page"><div className="spinner spinner-lg" /></div>;
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div className="page-header-row">
                    <div>
                        <h1>Platform Accounts</h1>
                        <p>Link your LinkedIn and Naukri accounts for auto-apply</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => { setForm({ platform: 'linkedin', email: '', password: '' }); setModalOpen(true); }}>
                        <FiPlus /> Link Account
                    </button>
                </div>
            </div>

            {accounts.length === 0 ? (
                <div className="glass-card empty-state">
                    <div className="empty-state-icon"><FiLink /></div>
                    <h3>No accounts linked</h3>
                    <p>Connect your LinkedIn or Naukri account to start auto-applying</p>
                    <button className="btn btn-primary" onClick={() => setModalOpen(true)} style={{ marginTop: '16px' }}>
                        <FiPlus /> Link Your First Account
                    </button>
                </div>
            ) : (
                <div className="platform-grid">
                    {accounts.map((acc) => {
                        const config = PLATFORM_CONFIG[acc.platform];
                        return (
                            <div key={acc.id} className="glass-card platform-account-card">
                                <div className="pa-card-header">
                                    <div className="pa-logo" style={{ background: config.gradient }}>
                                        <FiLink />
                                    </div>
                                    <div className="pa-info">
                                        <h3>{config.name}</h3>
                                        <span className="text-sm text-secondary">{acc.email}</span>
                                    </div>
                                </div>

                                <div className="pa-status-row">
                                    <span className={`badge badge-${STATUS_BADGE[acc.status]}`}>
                                        <span className={`status-dot ${acc.status}`} />
                                        {acc.status}
                                    </span>
                                    <span className="text-xs text-tertiary">
                                        <FiActivity style={{ display: 'inline', marginRight: '4px' }} />
                                        {timeAgo(acc.lastActiveAt)}
                                    </span>
                                </div>

                                <div className="pa-actions">
                                    <button
                                        className={`btn ${acc.status === 'active' ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                                        onClick={() => handleToggle(acc)}
                                        disabled={acc.status === 'suspended' || acc.status === 'error'}
                                    >
                                        {acc.status === 'active' ? <><FiPause /> Pause</> : <><FiPlay /> Resume</>}
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleUnlink(acc)}>
                                        <FiTrash2 /> Unlink
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Link Modal */}
            {modalOpen && (
                <div className="modal-overlay" onClick={() => setModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Link Account</h2>
                            <button className="modal-close" onClick={() => setModalOpen(false)}><FiX /></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group">
                                <label>Platform</label>
                                <div className="platform-selector">
                                    {Object.entries(PLATFORM_CONFIG).map(([key, config]) => (
                                        <button
                                            key={key}
                                            className={`platform-option ${form.platform === key ? 'active' : ''}`}
                                            onClick={() => setForm({ ...form, platform: key })}
                                            style={{ '--platform-color': config.color }}
                                        >
                                            <FiLink />
                                            {config.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Email</label>
                                <div className="input-with-icon">
                                    <FiMail className="input-icon" />
                                    <input type="email" className="input-field" placeholder="you@platform.com"
                                        value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ paddingLeft: '44px' }} />
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Password</label>
                                <div className="input-with-icon">
                                    <FiLock className="input-icon" />
                                    <input type="password" className="input-field" placeholder="••••••••"
                                        value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} style={{ paddingLeft: '44px' }} />
                                </div>
                            </div>
                            <div className="security-note">
                                <span>🔒</span>
                                <p className="text-xs text-tertiary">Your credentials are encrypted with AES-256 and never stored in plain text.</p>
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleLink} disabled={saving}>
                                {saving ? <div className="spinner" /> : 'Link Account'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
