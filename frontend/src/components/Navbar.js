import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/recommend', label: 'Job Match' },
  { path: '/skill-gap', label: 'Skill Gap' },
  { path: '/interview', label: 'Interview Prep' },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav style={{
      background: 'rgba(15, 15, 26, 0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
      padding: '0 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px',
            }}>🚀</div>
            <span style={{
              fontWeight: 700, fontSize: '1.2rem',
              background: 'linear-gradient(135deg, #6366f1, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>CareerGenie AI</span>
          </div>
        </Link>

        {/* Nav Links */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {navLinks.map(({ path, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link key={path} to={path} style={{ textDecoration: 'none' }}>
                <button style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 600 : 400,
                  background: isActive ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                  color: isActive ? '#a78bfa' : '#94a3b8',
                  transition: 'all 0.2s',
                }}>
                  {label}
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
