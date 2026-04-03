import { useState, useEffect } from 'react';
import { skillsAPI } from '../services/api';
import { LuLayoutDashboard, LuBriefcase, LuAward, LuSettings, LuTrash2, LuCpu, LuCircleCheck, LuLayers } from 'react-icons/lu';

export default function SkillsPage() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ name: '', proficiency: 'Advanced' });
    const [saving, setSaving] = useState(false);
    const [skillToDelete, setSkillToDelete] = useState(null);
    const [toastMsg, setToastMsg] = useState('');
    const [validationError, setValidationError] = useState('');

    useEffect(() => {
        skillsAPI.getAll().then((data) => {
            // Map proficiency to level for visual consistency if needed
            setSkills(data);
        }).finally(() => setLoading(false));
    }, []);

    const showToast = (msg) => {
        setToastMsg(msg);
        setTimeout(() => setToastMsg(''), 3000);
    };

    const handleAddSkill = async () => {
        if (!form.name.trim()) {
            setValidationError('Please enter a skill name.');
            return;
        }
        setValidationError('');
        setSaving(true);
        try {
            const created = await skillsAPI.create(form);
            setSkills([created, ...skills]);
            setForm({ name: '', proficiency: 'Advanced' });
            showToast('Changes Synced with AI');
        } catch {
            setValidationError('Failed to save skill');
        } finally {
            setSaving(false);
        }
    };

    const confirmDelete = async () => {
        if (!skillToDelete) return;
        try {
            await skillsAPI.delete(skillToDelete);
            setSkills(skills.filter(s => s.id !== skillToDelete));
            setSkillToDelete(null);
            showToast('Skill Forgotten by Agent');
        } catch {
            showToast('Error: Failed to delete');
        }
    };

    if (loading) {
        return <div className="min-h-[60vh] flex items-center justify-center">Loading skills...</div>;
    }

    return (
        <div className="reveal active px-8 md:px-12 pt-32 pb-32">
            {/* Header Section */}
            <header className="mb-24 reveal active">
                <span className="text-[#9f8d8b] text-[10px] uppercase tracking-[0.4em] font-bold block mb-4">USER PROFILE</span>
                <h1 className="font-anton text-8xl md:text-9xl tracking-tighter leading-none mb-8 text-white">
                    SKILLS<br /><span className="text-outline">DNA</span>
                </h1>
                <p className="max-w-2xl text-lg text-[#9f8d8b] leading-relaxed">
                    Our AI agent uses these skills to tailor your resume for every single application. The more specific and detailed your skill level, the higher your interview match rate.
                </p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 reveal active" style={{ transitionDelay: '100ms' }}>
                <div className="p-8 bg-[#171e19] text-white flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#9f8d8b] mb-4">Total Verified Skills</span>
                    <span className="font-anton text-6xl">{skills.length}</span>
                </div>
                <div className="p-8 border border-white/10 flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#9f8d8b] mb-4">Primary Category</span>
                    <span className="font-anton text-4xl">FULL STACK ENG</span>
                </div>
                <div className="p-8 bg-white/5 border border-white/10 text-white flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#9f8d8b] mb-4">Match Probability</span>
                    <span className="font-anton text-6xl">94%</span>
                </div>
            </div>

            {/* Add Skill Form */}
            <section className="mb-24 reveal active" style={{ transitionDelay: '200ms' }}>
                <h2 className="font-anton text-4xl mb-12 border-b border-white/10 pb-6 text-white">EXPAND KNOWLEDGE</h2>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-end bg-white/5 p-8 border border-white/10">
                    <div className="lg:col-span-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#9f8d8b] block mb-3">Skill Name</label>
                        <input
                            type="text"
                            placeholder="e.g. React Native, AWS Lambda"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full bg-transparent border border-white/20 p-4 text-sm text-white focus:outline-none focus:border-[#b7c6c2] transition-colors placeholder:text-white/20"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] uppercase tracking-widest text-[#9f8d8b] block mb-3">Proficiency</label>
                        <select
                            value={form.proficiency}
                            onChange={(e) => setForm({ ...form, proficiency: e.target.value })}
                            className="w-full bg-transparent border border-white/20 p-4 text-sm text-white focus:outline-none focus:border-[#b7c6c2] appearance-none cursor-pointer [&>option]:text-[#171e19]"
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                        </select>
                    </div>
                    <button
                        onClick={handleAddSkill}
                        disabled={saving}
                        className="bg-white text-[#171e19] font-anton tracking-widest py-4 px-8 hover:bg-[#b7c6c2] transition-all disabled:opacity-50"
                    >
                        {saving ? 'ADDING...' : 'ADD SKILL'}
                    </button>
                </div>
                {validationError && (
                    <p className="text-xs text-red-500 mt-4">{validationError}</p>
                )}
            </section>

            {/* Skills List */}
            <section className="mb-32">
                <h2 className="font-anton text-4xl mb-12 border-b border-white/10 pb-6 text-white">VERIFIED STACK</h2>
                
                {skills.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-white/10">
                        <LuLayers className="text-6xl text-[#9f8d8b] mb-6" />
                        <p className="font-anton text-2xl mb-2 text-white">THE AGENT IS BLIND</p>
                        <p className="text-[#9f8d8b] text-sm">Add skills to help EarlyEdge find relevant jobs for you.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {skills.map((skill) => (
                            <div key={skill.id} className="skill-card border border-white/10 p-8 flex flex-col justify-between custom-transition hover:border-[#b7c6c2] bg-white/5">
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="text-[10px] uppercase tracking-[0.3em] text-[#9f8d8b]">ID: {skill.id.toString().padStart(3, '0')}</span>
                                        <div className="flex gap-4">
                                            <button onClick={() => setSkillToDelete(skill.id)} className="text-white/20 hover:text-red-500 transition-colors">
                                                <LuTrash2 />
                                            </button>
                                        </div>
                                    </div>
                                    <h3 className="font-anton text-4xl mb-2 text-white">{skill.name}</h3>
                                    <div className="flex items-center gap-2 mb-8">
                                        <span className="px-2 py-0.5 bg-[#d5f4f9] text-[#171e19] text-[10px] uppercase tracking-widest font-bold">
                                            {skill.proficiency || skill.level || 'Intermediate'}
                                        </span>
                                        <span className="text-[10px] text-[#9f8d8b] uppercase tracking-widest">• {(skill.exp || 1)}YRS EXP</span>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                                    <div className="flex items-center gap-2">
                                        <LuCpu className="text-[#b7c6c2]" />
                                        <span className="text-[9px] uppercase tracking-[0.2em] text-[#9f8d8b]">AI Training Complete</span>
                                    </div>
                                    <button className="text-[10px] uppercase tracking-[0.2em] font-bold text-white hover:text-[#b7c6c2]">
                                        Edit
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Delete Confirmation Modal */}
            {skillToDelete && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#171e19]/90 backdrop-blur-sm p-4">
                    <div className="bg-[#171e19] border border-white/20 max-w-md w-full p-12 text-white reveal active shadow-2xl">
                        <h3 className="font-anton text-4xl mb-6">UNLEARN SKILL?</h3>
                        <p className="text-[#9f8d8b] mb-12 leading-relaxed">
                            Removing this skill will stop EarlyEdge from applying to jobs that require it. This action cannot be undone.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => setSkillToDelete(null)} className="border border-white/20 py-4 font-anton tracking-widest hover:bg-white/5 transition-colors">
                                CANCEL
                            </button>
                            <button onClick={confirmDelete} className="bg-red-500/10 text-red-400 border border-red-500/20 py-4 font-anton tracking-widest hover:bg-red-500 hover:text-white transition-colors">
                                DELETE
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Notification */}
            {toastMsg && (
                <div className="fixed bottom-12 right-12 z-[210] reveal active">
                    <div className="bg-[#171e19] text-white px-8 py-4 border-l-4 border-[#b7c6c2] shadow-2xl flex items-center gap-4">
                        <LuCircleCheck className="text-[#b7c6c2]" />
                        <span className="text-xs uppercase tracking-[0.2em]">{toastMsg}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
