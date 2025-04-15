import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="pfooter">
      <div className="pfooter-container">
        {/* Logo and About */}
        <div className="pfooter-section logo-sec">
          <h2 className="logo-text">
            <span className="p-letter">P</span>recision <span className="and">&</span> <span className="c-letter">C</span>raft
          </h2>
          <p className="desc">Delivering quality with creativity. Discover handcrafted excellence at your fingertips.</p>
        </div>

        {/* Quick Links */}
        <div className="pfooter-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Shop</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Help */}
        <div className="pfooter-section">
          <h4>Help</h4>
          <ul>
            <li><a href="#">Shipping</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="pfooter-section contact-sec">
          <h4>Get in Touch</h4>
          <p><FaEnvelope /> support@precisioncraft.com</p>
          <p><FaPhoneAlt /> +91 98765 43210</p>
          <p><FaMapMarkerAlt /> Bhopal, Madhya Pradesh, India</p>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className="pfooter-bottom">
        <p>© {new Date().getFullYear()} Precision & Craft. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
