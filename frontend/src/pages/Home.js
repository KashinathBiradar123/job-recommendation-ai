import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: '🎯',
    title: 'Smart Job Matching',
    description: 'AI-powered TF-IDF cosine similarity matches your skills to the perfect jobs.',
    path: '/recommend',
    cta: 'Find Jobs',
    color: '#6366f1',
  },
  {
    icon: '📊',
    title: 'Skill Gap Analyzer',
    description: 'See exactly which skills you need to land your dream role.',
    path: '/skill-gap',
    cta: 'Analyze Gaps',
    color: '#f59e0b',
  },
  {
    icon: '🎤',
    title: 'Interview Prep',
    description: 'Get personalized technical and behavioral interview questions.',
    path: '/interview',
    cta: 'Prepare Now',
    color: '#10b981',
  },
];

export default function Home() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          padding: '6px 16px', borderRadius: '100px',
          fontSize: '0.85rem', color: '#a78bfa',
          marginBottom: '1.5rem',
        }}>
          ✨ AI-Powered Career Intelligence
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #e2e8f0 0%, #a78bfa 50%, #6366f1 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Your AI Career<br />Co-Pilot
        </h1>

        <p style={{
          fontSize: '1.2rem', color: '#94a3b8',
          maxWidth: '540px', margin: '0 auto 2.5rem',
          lineHeight: 1.7,
        }}>
          Upload your resume. Get matched to jobs. Understand your skill gaps.
          Ace the interview — all powered by AI.
        </p>

        <Link to="/recommend" style={{ textDecoration: 'none' }}>
          <button style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: 'white',
            border: 'none',
            padding: '14px 32px',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)',
            transition: 'transform 0.2s',
          }}
            onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.target.style.transform = 'scale(1)'}
          >
            Get Started — Upload Resume 🚀
          </button>
        </Link>
      </div>

      {/* Feature Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
      }}>
        {features.map((f) => (
          <div key={f.title} style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            padding: '2rem',
            transition: 'all 0.3s',
          }}
            onMouseOver={e => {
              e.currentTarget.style.border = `1px solid ${f.color}40`;
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{f.icon}</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '0.75rem' }}>
              {f.title}
            </h3>
            <p style={{ color: '#64748b', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              {f.description}
            </p>
            <Link to={f.path} style={{ textDecoration: 'none' }}>
              <button style={{
                background: `${f.color}20`,
                color: f.color,
                border: `1px solid ${f.color}40`,
                padding: '8px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '0.9rem',
              }}>
                {f.cta} →
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div style={{
        marginTop: '4rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem',
        padding: '2rem',
        background: 'rgba(99, 102, 241, 0.05)',
        borderRadius: '20px',
        border: '1px solid rgba(99, 102, 241, 0.15)',
      }}>
        {[
          { num: '15+', label: 'Job Roles' },
          { num: '100+', label: 'Skills Tracked' },
          { num: '50+', label: 'Interview Questions' },
          { num: 'AI', label: 'Powered Matching' },
        ].map(s => (
          <div key={s.label} style={{ textAlign: 'center', padding: '1rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#a78bfa' }}>{s.num}</div>
            <div style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
