import React from "react";
import "../styles/components/Footer.css";

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-links">
                    <div className="footer-column">
                        <h4>Customer Service</h4>
                        <ul>
                            <li>
                                <a href="/contact">Contact Us</a>
                            </li>
                            <li>
                                <a href="/faqs">FAQs</a>
                            </li>
                            <li>
                                <a href="/returns">Returns & Exchanges</a>
                            </li>
                            <li>
                                <a href="/shipping">Shipping Info</a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>About Us</h4>
                        <ul>
                            <li>
                                <a href="/about">Our Story</a>
                            </li>
                            <li>
                                <a href="/careers">Careers</a>
                            </li>
                            <li>
                                <a href="/blog">Blog</a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>Follow Us</h4>
                        <ul className="social-icons">
                            <li>
                                <a href="https://facebook.com">
                                    <i className="fab fa-facebook"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com">
                                    <i className="fab fa-twitter"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://instagram.com">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://linkedin.com">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 SkyShop. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
