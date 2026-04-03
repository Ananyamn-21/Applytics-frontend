import { useState, useEffect } from 'react';
import { preferencesAPI } from '../services/api';
import toast from 'react-hot-toast';
import { 
    LuPencil, LuX, LuMapPin, LuPlus, 
    LuCheck, LuRadar, LuInfo, LuLoader 
} from 'react-icons/lu';

export default function PreferencesPage() {
    const [saving, setSaving] = useState(false);
    
    // Using a simplified state approach to mimic the template's single-preference-profile UX
    const [titles, setTitles] = useState(['Product Designer', 'UX Engineer', 'Fullstack Developer']);
    const [newTitle, setNewTitle] = useState('');
    const [locations, setLocations] = useState(['New York, NY', 'Austin, TX', 'Remote']);
    const [jobTypes, setJobTypes] = useState({
        'Full-Time': true, 'Contract': false, 'Freelance': false, 'Part-Time': false
    });
    const [experience, setExperience] = useState('Senior');
    const [benefits, setBenefits] = useState({
        '401(k) Matching': true, 'Unlimited PTO': true, 'Learning Stipend': false, 'Mental Health Support': false
    });

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            toast.success("Preferences Synchronized");
        }, 1500);
    };

    const handleAddTitle = (e) => {
        if (e.key === 'Enter' && newTitle.trim()) {
            if (!titles.includes(newTitle.trim())) {
                setTitles([...titles, newTitle.trim()]);
            }
            setNewTitle('');
        }
    };

    const removeTitle = (t) => setTitles(titles.filter(title => title !== t));

    const toggleJobType = (type) => {
        setJobTypes(prev => ({ ...prev, [type]: !prev[type] }));
    };

    const toggleBenefit = (benefit) => {
        setBenefits(prev => ({ ...prev, [benefit]: !prev[benefit] }));
    };

    return (
        <div className="relative">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 reveal active">
                <div>
                    <span className="text-[#9f8d8b] text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block">CONFIGURATION</span>
                    <h1 className="font-anton text-4xl md:text-6xl text-white tracking-tighter">JOB PREFERENCES</h1>
                    <p className="text-[#9f8d8b] text-lg max-w-2xl mt-4">
                        Configure your ideal job search criteria. Our AI will automatically apply to matching positions 24/7 with tailored resumes.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <button 
                        className="px-6 py-3 border border-white/10 hover:bg-white/5 transition-colors text-[10px] uppercase tracking-widest font-bold text-white"
                        onClick={() => {
                            setTitles(['Product Designer', 'UX Engineer']);
                            setExperience('Senior');
                            toast('Defaults Restored');
                        }}
                    >
                        Reset Defaults
                    </button>
                    <button 
                        onClick={handleSave}
                        disabled={saving}
                        className={`px-8 py-3 transition-colors text-[10px] uppercase tracking-widest font-bold text-[#171e19] shadow-lg flex items-center gap-2 ${saving ? 'bg-green-400' : 'bg-[#b7c6c2] hover:bg-[#a6b5b1] shadow-[#b7c6c2]/20'}`}
                    >
                        {saving ? (
                            <><LuLoader className="animate-spin text-sm" /> SAVING...</>
                        ) : (
                            'Save Changes'
                        )}
                    </button>
                </div>
            </header>

            {/* Preferences Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 pb-32">
                
                {/* Job Titles */}
                <div className="bg-white/5 border border-white/10 p-8 hover:border-[#b7c6c2] custom-transition reveal active transition-colors group">
                    <div className="flex justify-between items-start mb-6">
                        <h3 className="font-anton text-xl text-white tracking-widest">Job Titles</h3>
                        <LuPencil className="text-[#9f8d8b] cursor-pointer hover:text-white transition-colors" />
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {titles.map(title => (
                            <div key={title} className="flex items-center gap-2 px-3 py-1.5 bg-[#d5f4f9] text-[#171e19] text-xs font-semibold">
                                {title}
                                <LuX className="cursor-pointer hover:scale-125 transition-transform" onClick={() => removeTitle(title)} />
                            </div>
                        ))}
                    </div>
                    <input 
                        type="text" 
                        placeholder="Add title (e.g. Frontend...) & press Enter" 
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onKeyDown={handleAddTitle}
                        className="w-full bg-transparent border-b border-white/10 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#b7c6c2] custom-transition" 
                    />
                </div>

                {/* Locations */}
                <div className="bg-white/5 border border-white/10 p-8 hover:border-[#b7c6c2] custom-transition reveal active transition-colors">
                    <div className="flex justify-between items-start mb-6">
                        <h3 className="font-anton text-xl text-white tracking-widest">Locations</h3>
                        <LuMapPin className="text-[#b7c6c2]" />
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {locations.map((loc, idx) => (
                            <div key={idx} className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold ${loc === 'Remote' ? 'bg-[#b7c6c2] text-[#171e19]' : 'bg-[#bbe2f5] text-[#171e19]'}`}>
                                {loc}
                            </div>
                        ))}
                    </div>
                    <button className="text-[#b7c6c2] text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 mt-4 hover:text-white transition-colors">
                        <LuPlus /> Add Location
                    </button>
                </div>

                {/* Salary Range */}
                <div className="bg-white/5 border border-white/10 p-8 hover:border-[#b7c6c2] custom-transition reveal active transition-colors">
                    <div className="flex justify-between items-start mb-8">
                        <h3 className="font-anton text-xl text-white tracking-widest">Salary Range (USD)</h3>
                        <span className="text-white font-anton text-lg">$120K - $220K</span>
                    </div>
                    <div className="relative h-1 bg-white/10 rounded-full mb-8 mt-4">
                        <div className="absolute left-[30%] right-[20%] h-full bg-[#b7c6c2]"></div>
                        <div className="absolute left-[30%] top-1/2 -translate-y-1/2 w-4 h-4 bg-[#b7c6c2] rounded-full border-2 border-[#171e19] shadow-md cursor-pointer"></div>
                        <div className="absolute right-[20%] top-1/2 -translate-y-1/2 w-4 h-4 bg-[#b7c6c2] rounded-full border-2 border-[#171e19] shadow-md cursor-pointer"></div>
                    </div>
                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-[#9f8d8b] font-bold">
                        <span>$60k</span>
                        <span>$350k+</span>
                    </div>
                </div>

                {/* Job Type */}
                <div className="bg-white/5 border border-white/10 p-8 hover:border-[#b7c6c2] custom-transition reveal active transition-colors">
                    <h3 className="font-anton text-xl text-white tracking-widest mb-8">Employment Type</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(jobTypes).map(([type, checked]) => (
                            <label key={type} className="flex items-center justify-between p-4 border border-white/10 cursor-pointer hover:bg-white/5 custom-transition group">
                                <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${checked ? 'text-white' : 'text-[#9f8d8b]'}`}>{type}</span>
                                <input 
                                    type="checkbox" 
                                    checked={checked} 
                                    onChange={() => toggleJobType(type)}
                                    className="accent-[#b7c6c2] w-4 h-4" 
                                />
                            </label>
                        ))}
                    </div>
                </div>

                {/* Experience Level */}
                <div className="bg-white/5 border border-white/10 p-8 hover:border-[#b7c6c2] custom-transition reveal active transition-colors col-span-1 md:col-span-2">
                    <h3 className="font-anton text-xl text-white tracking-widest mb-8">Experience Level</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { level: 'Entry Level', desc: '0-2 Years' },
                            { level: 'Mid Level', desc: '3-5 Years' },
                            { level: 'Senior', desc: '6-10 Years' },
                            { level: 'Director / VP', desc: '10+ Years' }
                        ].map(({ level, desc }) => (
                            <button 
                                key={level}
                                onClick={() => setExperience(level)}
                                className={`p-6 border custom-transition group text-center ${experience === level ? 'bg-[#b7c6c2] border-[#b7c6c2] shadow-lg' : 'border-white/10 hover:border-white/30 bg-white/5'}`}
                            >
                                <p className={`font-anton text-sm tracking-widest ${experience === level ? 'text-[#171e19]' : 'text-white'}`}>{level}</p>
                                <p className={`text-[9px] uppercase tracking-widest mt-1 ${experience === level ? 'text-[#171e19]/70' : 'text-[#9f8d8b]'}`}>{desc}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Benefits & Culture */}
                <div className="bg-white/5 border border-white/10 p-8 hover:border-[#b7c6c2] custom-transition reveal active transition-colors">
                    <h3 className="font-anton text-xl text-white tracking-widest mb-6">Required Benefits</h3>
                    <div className="space-y-4">
                        {Object.entries(benefits).map(([benefit, checked]) => (
                            <div key={benefit} className="flex items-center gap-3" onClick={() => toggleBenefit(benefit)}>
                                <div className={`w-5 h-5 border rounded-sm flex items-center justify-center cursor-pointer transition-colors ${checked ? 'border-[#b7c6c2] bg-[#b7c6c2]' : 'border-white/20 hover:border-white/40'}`}>
                                    {checked && <LuCheck className="text-[#171e19] text-xs font-bold" />}
                                </div>
                                <span className={`text-xs font-bold uppercase tracking-widest cursor-pointer hover:text-white transition-colors ${checked ? 'text-[#b7c6c2]' : 'text-[#9f8d8b]'}`}>
                                    {benefit}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary Box */}
                <div className="bg-[#b7c6c2]/5 border border-[#b7c6c2]/20 p-8 flex flex-col justify-center items-center text-center reveal active transition-colors">
                    <LuRadar className="text-6xl text-[#b7c6c2] mb-6 animate-pulse" />
                    <h4 className="font-anton text-3xl text-white tracking-widest mb-2">247 MATCHING JOBS</h4>
                    <p className="text-[#9f8d8b] text-[10px] uppercase tracking-[0.3em] mb-8">Found in the last 24 hours</p>
                    <button className="w-full py-4 bg-[#b7c6c2] text-[#171e19] font-anton tracking-widest text-sm hover:bg-white custom-transition">
                        PREVIEW MATCHES
                    </button>
                </div>
            </div>

            {/* Final Actions */}
            <div className="mt-8 flex justify-center reveal active pb-24">
                <div className="flex items-center gap-4 bg-white/5 p-6 border border-white/10 shadow-xl max-w-2xl text-center">
                    <LuInfo className="text-[#b7c6c2] text-2xl shrink-0" />
                    <p className="text-[#max-w-xl] text-xs font-semibold text-[#9f8d8b]">
                        Your preferences are synchronized across all EarlyEdge nodes. Applications run 24/7.
                    </p>
                </div>
            </div>

            {/* Ambient Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
                <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] bg-[#b7c6c2] opacity-5 blur-[120px] rounded-full animate-float"></div>
                <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-[#bbe2f5] opacity-5 blur-[120px] rounded-full animate-float" style={{ animationDelay: '-4s' }}></div>
            </div>
        </div>
    );
}
