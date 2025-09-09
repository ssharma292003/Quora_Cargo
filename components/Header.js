'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCurrentUser } from '../utils/auth';
import axios from 'axios';
import '../styles/Header.css';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const user = await getCurrentUser();
      setIsLoggedIn(!!user);
    }
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/auth/logout',
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      router.push('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  // Track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['track', 'quote', 'info', 'contact'];
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = id;
            break;
          }
        }
      }
      if (!current && window.scrollY < 200) {
        current = 'home';
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActivePage = (path) => router.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow-sm sticky-top">
      <div className="container">
        {/* Logo */}
        <Link href="/" className="navbar-brand fw-bold d-flex align-items-center">
          <i className="fas fa-shipping-fast me-2 logo-icon"></i>
          <span className="logo-text">Quora Cargo</span>
        </Link>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Links */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            <li className="nav-item">
              <Link
                href="/"
                className={`nav-link ${isActivePage('/') || activeSection === 'home' ? 'active-link' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a
                href="#track"
                className={`nav-link ${activeSection === 'track' ? 'active-link' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Track
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#quote"
                className={`nav-link ${activeSection === 'quote' ? 'active-link' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Quote
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#info"
                className={`nav-link ${activeSection === 'info' ? 'active-link' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#contact"
                className={`nav-link ${activeSection === 'contact' ? 'active-link' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Auth buttons */}
          <div className="d-flex ms-lg-3 gap-2 auth-buttons">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="btn btn-logout"
              >
                <i className="fas fa-sign-out-alt me-1"></i> Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`btn btn-outline-login ${isActivePage('/login') ? 'active-link' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  <i className="fas fa-user me-1"></i> Login
                </Link>
                <Link
                  href="/register"
                  className={`btn btn-register ${isActivePage('/register') ? 'active-link' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  <i className="fas fa-user-plus me-1"></i> Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

  
    </nav>
  );
}
