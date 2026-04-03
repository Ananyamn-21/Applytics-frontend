import { Link } from 'react-router-dom';
import { FiZap, FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="public-footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <Link to="/" className="footer-logo">
                        <div className="logo-icon"><FiZap /></div>
                        <span>Early Edge</span>
                    </Link>
                    <p className="footer-tagline">
                        Your career, on autopilot. Scale your job search with next-gen AI. No BS, just results.
                    </p>
                    <div className="social-links">
                        <a href="#" className="social-link"><FiTwitter /></a>
                        <a href="#" className="social-link"><FiLinkedin /></a>
                        <a href="#" className="social-link"><FiGithub /></a>
                    </div>
                </div>

                <div className="footer-links-grid">
                    <div className="footer-links-col">
                        <h4>Product</h4>
                        <Link to="/">Features</Link>
                        <Link to="/">Integrations</Link>
                        <Link to="/">Pricing</Link>
                        <Link to="/">Changelog</Link>
                    </div>
                    <div className="footer-links-col">
                        <h4>Company</h4>
                        <Link to="/about">About Us</Link>
                        <Link to="/about">Careers</Link>
                        <Link to="/">Blog</Link>
                        <Link to="/">Contact</Link>
                    </div>
                    <div className="footer-links-col">
                        <h4>Legal</h4>
                        <Link to="/">Privacy Policy</Link>
                        <Link to="/">Terms of Service</Link>
                        <Link to="/">Cookie Policy</Link>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Early Edge Inc. All rights reserved.</p>
                <p className="made-with-love">Built for the next generation of builders.</p>
            </div>
        </footer>
    );
}
