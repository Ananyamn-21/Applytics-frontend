import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiZap, FiMenu, FiX } from 'react-icons/fi';
import './PublicNavbar.css';

export default function PublicNavbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <>
            <nav className={`public-navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="navbar-container">
                    <Link to="/" className="navbar-brand">
                        <div className="logo-icon"><FiZap /></div>
                        <span>Early Edge</span>
                    </Link>

                    <div className="navbar-links desktop-only">
                        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
                        <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
                        <Link to="/pricing" className={location.pathname === '/pricing' ? 'active' : ''}>Pricing</Link>
                        <a href="/#features">Features</a>
                    </div>

                    <div className="navbar-actions desktop-only">
                        <Link to="/login" className="btn btn-ghost">Sign In</Link>
                        <Link to="/register" className="btn btn-primary">Get Early Access</Link>
                    </div>

                    <button
                        className="mobile-menu-btn mobile-only"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-content">
                    <Link to="/">Home</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/pricing">Pricing</Link>
                    <a href="/#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
                    <hr className="menu-divider" />
                    <Link to="/login" className="btn btn-secondary btn-full">Sign In</Link>
                    <Link to="/register" className="btn btn-primary btn-full">Get Early Access</Link>
                </div>
            </div>
        </>
    );
}
