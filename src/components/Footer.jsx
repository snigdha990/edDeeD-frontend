import React from "react";
function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3 className="footer-title">edDeeD</h3>
                    <p className="footer-description">
                        Helping you discover the right school, effortlessly.
                    </p>
                </div>
                <div className="footer-section">
                    <h4 className="footer-subtitle">Quick Links</h4>
                    <ul className="footer-links">
                        <li><a href="/">HOME</a></li>
                        <li><a href="/plan">SCHOOLS</a></li>
                        <li><a href="/features">TUITIONS</a></li>
                        <li><a href="/contact">CONTACT</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4 className="footer-subtitle">Connect With Us</h4>
                    <ul className="footer-social">
                        <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                        <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                        <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                © {new Date().getFullYear()} edDeeD. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
