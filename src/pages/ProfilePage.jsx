import { useState, useEffect, useRef } from 'react';
import { usersAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FiUpload, FiFileText, FiSave, FiMapPin, FiPhone, FiBriefcase } from 'react-icons/fi';
import toast from 'react-hot-toast';
import './ProfilePage.css';

export default function ProfilePage() {
    const { user, refreshUser } = useAuth();
    const fileInputRef = useRef(null);
    const [profile, setProfile] = useState(null);
    const [form, setForm] = useState({ experience: '', location: '', phone: '', summary: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);

    useEffect(() => {
        usersAPI.getProfile().then((data) => {
            setProfile(data);
            if (data.profile) {
                setForm({
                    experience: data.profile.experience || '',
                    location: data.profile.location || '',
                    phone: data.profile.phone || '',
                    summary: data.profile.summary || '',
                });
            }
        }).finally(() => setLoading(false));
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await usersAPI.updateProfile({
                experience: Number(form.experience),
                location: form.location,
                phone: form.phone,
                summary: form.summary,
            });
            await refreshUser();
            toast.success('Profile updated!');
        } catch {
            toast.error('Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const handleFileUpload = async (file) => {
        if (!file) return;
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            toast.error('File too large. Max size is 5MB');
            return;
        }
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!validTypes.includes(file.type)) {
            toast.error('Please upload a PDF, DOC, or DOCX file');
            return;
        }
        setUploading(true);
        try {
            const res = await usersAPI.uploadResume(file);
            toast.success(res.message || 'Resume uploaded!');
            // refresh profile
            const data = await usersAPI.getProfile();
            setProfile(data);
            await refreshUser();
        } catch {
            toast.error('Failed to upload resume');
        } finally {
            setUploading(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        handleFileUpload(file);
    };

    if (loading) {
        return <div className="loading-page"><div className="spinner spinner-lg" /></div>;
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Profile</h1>
                <p>Manage your profile and resume</p>
            </div>

            <div className="profile-grid">
                {/* Profile Form */}
                <div className="glass-card profile-form-card">
                    <h3>Personal Details</h3>

                    <div className="profile-user-header">
                        <div className="profile-avatar">
                            {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </div>
                        <div>
                            <h4>{user?.firstName} {user?.lastName}</h4>
                            <span className="text-sm text-secondary">{user?.email}</span>
                        </div>
                    </div>

                    <div className="profile-form">
                        <div className="input-group">
                            <label><FiBriefcase style={{ display: 'inline', marginRight: '6px' }} />Experience (years)</label>
                            <input
                                type="number"
                                className="input-field"
                                placeholder="e.g. 5"
                                value={form.experience}
                                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                            />
                        </div>

                        <div className="input-group">
                            <label><FiMapPin style={{ display: 'inline', marginRight: '6px' }} />Location</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="San Francisco, CA"
                                value={form.location}
                                onChange={(e) => setForm({ ...form, location: e.target.value })}
                            />
                        </div>

                        <div className="input-group">
                            <label><FiPhone style={{ display: 'inline', marginRight: '6px' }} />Phone</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="+1234567890"
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            />
                        </div>

                        <div className="input-group">
                            <label>Professional Summary</label>
                            <textarea
                                className="input-field"
                                placeholder="Write a short summary about yourself..."
                                value={form.summary}
                                onChange={(e) => setForm({ ...form, summary: e.target.value })}
                                rows={4}
                            />
                        </div>

                        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                            {saving ? <div className="spinner" /> : <><FiSave /> Save Changes</>}
                        </button>
                    </div>
                </div>

                {/* Resume Section */}
                <div className="profile-resume-section">
                    {/* Upload Zone */}
                    <div
                        className={`glass-card resume-upload-zone ${dragOver ? 'drag-over' : ''}`}
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => handleFileUpload(e.target.files?.[0])}
                            style={{ display: 'none' }}
                        />
                        <div className="upload-icon">
                            {uploading ? <div className="spinner spinner-lg" /> : <FiUpload />}
                        </div>
                        <h4>{uploading ? 'Uploading...' : 'Upload Resume'}</h4>
                        <p className="text-sm text-secondary">Drag & drop or click to browse</p>
                        <p className="text-xs text-tertiary">PDF, DOC, DOCX (max 5MB)</p>
                    </div>

                    {/* Resume Preview */}
                    {profile?.profile?.resumeText && (
                        <div className="glass-card resume-preview-card">
                            <div className="resume-preview-header">
                                <FiFileText />
                                <h4>Resume Preview</h4>
                            </div>
                            <pre className="resume-text">{profile.profile.resumeText}</pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
