import axios from 'axios';

const API_BASE = 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_BASE,
    headers: { 'Content-Type': 'application/json' },
});

// ── Attach JWT ──
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('ee_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// ── Handle 401 ──
api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401 && !err.config?.url?.includes('/auth/login')) {
            localStorage.removeItem('ee_token');
            localStorage.removeItem('ee_user');
            if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(err);
    }
);

// ══════════════════════════════════════════
//  Mock Data (used when backend is offline)
// ══════════════════════════════════════════

const MOCK_USER = {
    id: 'u1',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    profile: {
        id: 'p1',
        resumeUrl: '/uploads/resumes/sample.pdf',
        resumeText: 'John Doe\nSenior Software Engineer\n\nSUMMARY\nExperienced software engineer with 6+ years in full-stack development, specializing in React, Node.js, and cloud architectures.\n\nEXPERIENCE\n- Senior Software Engineer at TechCorp (2021-Present)\n- Software Engineer at StartupXYZ (2018-2021)\n\nSKILLS\nReact, TypeScript, Node.js, Python, AWS, PostgreSQL, Docker',
        experience: 6,
        location: 'San Francisco, CA',
        phone: '+1234567890',
        summary: 'Experienced software engineer with 6+ years in full-stack development.',
    },
};

const MOCK_SKILLS = [
    { id: 's1', name: 'React', proficiency: 'expert', userId: 'u1' },
    { id: 's2', name: 'TypeScript', proficiency: 'advanced', userId: 'u1' },
    { id: 's3', name: 'Node.js', proficiency: 'advanced', userId: 'u1' },
    { id: 's4', name: 'Python', proficiency: 'intermediate', userId: 'u1' },
    { id: 's5', name: 'PostgreSQL', proficiency: 'advanced', userId: 'u1' },
    { id: 's6', name: 'Docker', proficiency: 'intermediate', userId: 'u1' },
    { id: 's7', name: 'AWS', proficiency: 'advanced', userId: 'u1' },
    { id: 's8', name: 'GraphQL', proficiency: 'beginner', userId: 'u1' },
];

const MOCK_PREFERENCES = [
    {
        id: 'jp1', role: 'Senior Software Engineer',
        keywords: ['React', 'Node.js', 'TypeScript'],
        location: 'San Francisco, CA', remote: true,
        minSalary: 150000, maxSalary: 200000,
        jobType: 'full-time', isActive: true, userId: 'u1',
    },
    {
        id: 'jp2', role: 'Full Stack Developer',
        keywords: ['React', 'Python', 'AWS'],
        location: 'Remote', remote: true,
        minSalary: 120000, maxSalary: 180000,
        jobType: 'full-time', isActive: true, userId: 'u1',
    },
    {
        id: 'jp3', role: 'Frontend Architect',
        keywords: ['React', 'Next.js', 'Design Systems'],
        location: 'New York, NY', remote: false,
        minSalary: 180000, maxSalary: 250000,
        jobType: 'contract', isActive: false, userId: 'u1',
    },
];

const MOCK_PLATFORMS = [
    {
        id: 'pa1', platform: 'linkedin', email: 'john@linkedin.com',
        isConnected: true, status: 'active',
        lastActiveAt: new Date(Date.now() - 1800000).toISOString(),
    },
    {
        id: 'pa2', platform: 'naukri', email: 'john@naukri.com',
        isConnected: true, status: 'paused',
        lastActiveAt: new Date(Date.now() - 86400000).toISOString(),
    },
];

const MOCK_COMPANIES = ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Stripe', 'Airbnb', 'Uber', 'Spotify', 'Shopify', 'Coinbase', 'Notion', 'Figma', 'Vercel'];
const MOCK_TITLES = ['Senior Software Engineer', 'Full Stack Developer', 'Frontend Engineer', 'Backend Engineer', 'DevOps Engineer', 'Staff Engineer', 'Engineering Manager', 'Platform Engineer'];
const MOCK_LOCATIONS = ['San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Austin, TX', 'Remote', 'London, UK', 'Bangalore, India'];

const generateJobs = (count = 30) => {
    return Array.from({ length: count }, (_, i) => ({
        id: `j${i + 1}`,
        externalId: `ext${100000 + i}`,
        platform: i % 3 === 0 ? 'naukri' : 'linkedin',
        title: MOCK_TITLES[i % MOCK_TITLES.length],
        company: MOCK_COMPANIES[i % MOCK_COMPANIES.length],
        location: MOCK_LOCATIONS[i % MOCK_LOCATIONS.length],
        description: `We are looking for a talented ${MOCK_TITLES[i % MOCK_TITLES.length]} to join our team. You will be working on cutting-edge projects that impact millions of users worldwide.\n\nRequirements:\n- 5+ years of experience\n- Strong problem-solving skills\n- Experience with modern web technologies\n- Excellent communication skills`,
        jobUrl: `https://linkedin.com/jobs/${100000 + i}`,
        postedAt: new Date(Date.now() - i * 3600000).toISOString(),
        applicantCount: Math.floor(Math.random() * 15),
        salary: `$${120 + i * 5}k - $${180 + i * 5}k`,
        jobType: 'full-time',
        isRemote: i % 2 === 0,
    }));
};

const MOCK_JOBS = generateJobs();

const STATUSES = ['applied', 'viewed', 'shortlisted', 'rejected', 'interview', 'offered'];

const generateApplications = (count = 50) => {
    return Array.from({ length: count }, (_, i) => {
        const job = MOCK_JOBS[i % MOCK_JOBS.length];
        return {
            id: `app${i + 1}`,
            job: {
                id: job.id, title: job.title, company: job.company,
                location: job.location, platform: job.platform, jobUrl: job.jobUrl,
                postedAt: job.postedAt, applicantCount: job.applicantCount,
            },
            status: STATUSES[i % STATUSES.length],
            tailoredResumeText: `Tailored Resume for ${job.title} at ${job.company}\n\nJohn Doe — Senior Software Engineer\n\nHighlighted: React, TypeScript, Node.js`,
            tailoredResumeUrl: `/uploads/tailored/app${i + 1}.pdf`,
            appliedAt: new Date(Date.now() - i * 7200000).toISOString(),
            notes: `Match score: ${Math.floor(60 + Math.random() * 40)}. Highlights: React, TypeScript`,
        };
    });
};

const MOCK_APPLICATIONS = generateApplications();

const MOCK_DASHBOARD = {
    stats: {
        totalApplications: 50, todayApplications: 5,
        weekApplications: 15, monthApplications: 40,
        byStatus: { applied: 35, viewed: 8, shortlisted: 4, rejected: 2, interview: 1, offered: 0 },
    },
    platformAccounts: MOCK_PLATFORMS,
    recentApplications: MOCK_APPLICATIONS.slice(0, 5).map((a) => ({
        id: a.id,
        job: { title: a.job.title, company: a.job.company, platform: a.job.platform },
        status: a.status, appliedAt: a.appliedAt,
    })),
    profile: { hasResume: true, skillsCount: 8, preferencesCount: 3, connectedAccounts: 2 },
};

// ── Helper: mock fallback wrapper ──
const withMock = async (apiCall, mockData, delay = 500) => {
    try {
        const res = await apiCall();
        return res.data;
    } catch (err) {
        if (err.response) {
            throw err;
        }
        await new Promise((r) => setTimeout(r, delay));
        return typeof mockData === 'function' ? mockData() : mockData;
    }
};

// ══════════════════════
//  Exported API Methods
// ══════════════════════

// Auth
export const authAPI = {
    register: (data) => withMock(() => api.post('/auth/register', data), { ...MOCK_USER, accessToken: 'mock-jwt-token', expiresIn: '7d' }),
    login: (data) => withMock(() => api.post('/auth/login', data), { ...MOCK_USER, accessToken: 'mock-jwt-token', expiresIn: '7d' }),
};

// Users
export const usersAPI = {
    getProfile: () => withMock(() => api.get('/users/profile'), MOCK_USER),
    updateProfile: (data) => withMock(() => api.put('/users/profile', data), { ...MOCK_USER, profile: { ...MOCK_USER.profile, ...data } }),
    uploadResume: (file) => {
        const formData = new FormData();
        formData.append('resume', file);
        return withMock(
            () => api.post('/users/resume', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
            { message: 'Resume uploaded successfully', resumeUrl: '/uploads/resumes/new.pdf', resumeText: 'Updated resume content...' }
        );
    },
};

// Skills
export const skillsAPI = {
    getAll: () => withMock(() => api.get('/skills'), MOCK_SKILLS),
    create: (data) => withMock(() => api.post('/skills', data), { id: `s${Date.now()}`, ...data, userId: 'u1' }),
    update: (id, data) => withMock(() => api.put(`/skills/${id}`, data), { id, ...data, userId: 'u1' }),
    delete: (id) => withMock(() => api.delete(`/skills/${id}`), { message: 'Skill deleted successfully' }),
};

// Job Preferences
export const preferencesAPI = {
    getAll: () => withMock(() => api.get('/job-preferences'), MOCK_PREFERENCES),
    create: (data) => withMock(() => api.post('/job-preferences', data), { id: `jp${Date.now()}`, ...data, isActive: true, userId: 'u1' }),
    update: (id, data) => withMock(() => api.put(`/job-preferences/${id}`, data), () => {
        const existing = MOCK_PREFERENCES.find((p) => p.id === id) || MOCK_PREFERENCES[0];
        return { ...existing, ...data };
    }),
    delete: (id) => withMock(() => api.delete(`/job-preferences/${id}`), { message: 'Job preference deleted successfully' }),
};

// Platform Accounts
export const platformsAPI = {
    getAll: () => withMock(() => api.get('/platform-accounts'), MOCK_PLATFORMS),
    link: (data) => withMock(() => api.post('/platform-accounts/link', data), {
        id: `pa${Date.now()}`, platform: data.platform, email: data.email,
        isConnected: true, status: 'active', userId: 'u1',
    }),
    unlink: (id) => withMock(() => api.delete(`/platform-accounts/${id}/unlink`), { message: 'Account unlinked successfully' }),
    pause: (id) => withMock(() => api.put(`/platform-accounts/${id}/pause`), () => {
        const acc = MOCK_PLATFORMS.find((p) => p.id === id) || MOCK_PLATFORMS[0];
        return { ...acc, status: 'paused' };
    }),
    resume: (id) => withMock(() => api.put(`/platform-accounts/${id}/resume`), () => {
        const acc = MOCK_PLATFORMS.find((p) => p.id === id) || MOCK_PLATFORMS[0];
        return { ...acc, status: 'active' };
    }),
};

// Jobs
export const jobsAPI = {
    getAll: (page = 1, limit = 20) => withMock(() => api.get(`/jobs?page=${page}&limit=${limit}`), {
        data: MOCK_JOBS.slice((page - 1) * limit, page * limit),
        meta: { total: MOCK_JOBS.length, page, limit, totalPages: Math.ceil(MOCK_JOBS.length / limit) },
    }),
    getById: (id) => withMock(() => api.get(`/jobs/${id}`), MOCK_JOBS.find((j) => j.id === id) || MOCK_JOBS[0]),
};

// Applications
export const applicationsAPI = {
    getAll: (page = 1, limit = 20) => withMock(() => api.get(`/applications?page=${page}&limit=${limit}`), {
        data: MOCK_APPLICATIONS.slice((page - 1) * limit, page * limit),
        meta: { total: MOCK_APPLICATIONS.length, page, limit, totalPages: Math.ceil(MOCK_APPLICATIONS.length / limit) },
    }),
    getById: (id) => withMock(() => api.get(`/applications/${id}`), MOCK_APPLICATIONS.find((a) => a.id === id) || MOCK_APPLICATIONS[0]),
    getStats: () => withMock(() => api.get('/applications/stats'), MOCK_DASHBOARD.stats),
};

// Dashboard
export const dashboardAPI = {
    get: () => withMock(() => api.get('/dashboard'), MOCK_DASHBOARD),
};

export default api;
