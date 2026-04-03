import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI, usersAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const token = localStorage.getItem('ee_token');
        const savedUser = localStorage.getItem('ee_user');
        if (token && savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch {
                localStorage.removeItem('ee_token');
                localStorage.removeItem('ee_user');
            }
        }
        setLoading(false);
    }, []);

    const login = useCallback(async (email, password) => {
        const data = await authAPI.login({ email, password });
        const { accessToken, expiresIn, ...userData } = data;
        localStorage.setItem('ee_token', accessToken);

        try {
            const profileData = await usersAPI.getProfile();
            localStorage.setItem('ee_user', JSON.stringify(profileData));
            setUser(profileData);
            return profileData;
        } catch {
            localStorage.setItem('ee_user', JSON.stringify(userData));
            setUser(userData);
            return userData;
        }
    }, []);

    const register = useCallback(async (email, password, firstName, lastName) => {
        const data = await authAPI.register({ email, password, firstName, lastName });
        const { accessToken, expiresIn, ...userData } = data;
        localStorage.setItem('ee_token', accessToken);

        try {
            const profileData = await usersAPI.getProfile();
            localStorage.setItem('ee_user', JSON.stringify(profileData));
            setUser(profileData);
            return profileData;
        } catch {
            localStorage.setItem('ee_user', JSON.stringify(userData));
            setUser(userData);
            return userData;
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('ee_token');
        localStorage.removeItem('ee_user');
        setUser(null);
        window.location.href = '/';
    }, []);

    const refreshUser = useCallback(async () => {
        try {
            const data = await usersAPI.getProfile();
            localStorage.setItem('ee_user', JSON.stringify(data));
            setUser(data);
        } catch {
            // ignore
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}

// Protected Route wrapper
export function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate('/login', { replace: true });
        }
    }, [isAuthenticated, loading, navigate]);

    if (loading) {
        return (
            <div className="loading-page">
                <div className="spinner spinner-lg" />
            </div>
        );
    }

    return isAuthenticated ? children : null;
}
