import React, { useState } from 'react';
import axios from 'axios';
import UploadZone from '../components/UploadZone';

const matchColors = {
  Excellent: { bg: 'rgba(16,185,129,0.1)', border: '#10b981', text: '#10b981', bar: '#10b981' },
  Good: { bg: 'rgba(99,102,241,0.1)', border: '#6366f1', text: '#a78bfa', bar: '#6366f1' },
  Fair: { bg: 'rgba(245,158,11,0.1)', border: '#f59e0b', text: '#f59e0b', bar: '#f59e0b' },
  Low: { bg: 'rgba(239,68,68,0.1)', border: '#ef4444', text: '#ef4444', bar: '#ef4444' },
};

export default function RecommendJobs() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:8000/recommend_jobs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to connect to backend. Make sure it is running on port 8000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: '#e2e8f0' }}>
        🎯 Job Recommendations
      </h1>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>
        Upload your resume to get AI-matched job recommendations with match scores.
      </p>

      <UploadZone onFileSelect={setFile} file={file} loading={loading} />

      {file && (
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            marginTop: '1.5rem',
            width: '100%',
            padding: '14px',
            background: loading ? '#374151' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'Inter, sans-serif',
            transition: 'all 0.2s',
          }}
        >
          {loading ? '⏳ Analyzing Resume...' : '🔍 Find Matching Jobs'}
        </button>
      )}

      {error && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: 'rgba(239,68,68,0.1)',
          border: '1px solid rgba(239,68,68,0.3)',
          borderRadius: '10px',
          color: '#f87171',
          fontSize: '0.9rem',
        }}>
          ⚠️ {error}
        </div>
      )}

      {result && (
        <div className="fade-in" style={{ marginTop: '2rem' }}>
          {/* Extracted Skills */}
          <div style={{
            padding: '1.5rem',
            background: 'rgba(16,185,129,0.05)',
            border: '1px solid rgba(16,185,129,0.2)',
            borderRadius: '16px',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{ color: '#10b981', marginBottom: '1rem', fontWeight: 600 }}>
              ✅ Extracted Skills ({result.skills.length})
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {result.skills.map(s => (
                <span key={s} style={{
                  padding: '4px 12px',
                  background: 'rgba(16,185,129,0.1)',
                  border: '1px solid rgba(16,185,129,0.3)',
                  borderRadius: '100px',
                  color: '#6ee7b7',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                }}>{s}</span>
              ))}
              {result.skills.length === 0 && (
                <span style={{ color: '#64748b', fontSize: '0.9rem' }}>
                  No skills detected. Try a more detailed resume.
                </span>
              )}
            </div>
          </div>

          {/* Job Cards */}
          <h3 style={{ color: '#e2e8f0', fontWeight: 700, marginBottom: '1rem', fontSize: '1.2rem' }}>
            🏆 Top Job Matches
          </h3>
          {result.recommendations.map((job, i) => {
            const colors = matchColors[job.match_level] || matchColors.Fair;
            return (
              <div key={job.id} style={{
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${colors.border}30`,
                borderRadius: '16px',
                padding: '1.5rem',
                marginBottom: '1rem',
                transition: 'all 0.2s',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                      <span style={{ color: '#64748b', fontSize: '0.85rem' }}>#{i + 1}</span>
                      <h4 style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '1.1rem' }}>{job.title}</h4>
                    </div>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                      {job.company} · {job.location}
                    </p>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '4px' }}>
                      {job.salary} · {job.experience}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontSize: '1.8rem', fontWeight: 800, color: colors.text,
                    }}>{job.match_score}%</div>
                    <span style={{
                      fontSize: '0.75rem',
                      padding: '3px 10px',
                      background: colors.bg,
                      border: `1px solid ${colors.border}50`,
                      borderRadius: '100px',
                      color: colors.text,
                    }}>{job.match_level}</span>
                  </div>
                </div>

                {/* Match Bar */}
                <div style={{ marginTop: '1rem' }}>
                  <div style={{
                    height: '4px', background: 'rgba(255,255,255,0.05)',
                    borderRadius: '2px', overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${job.match_score}%`,
                      background: colors.bar,
                      borderRadius: '2px',
                      transition: 'width 0.8s ease',
                    }} />
                  </div>
                </div>

                {/* Skills */}
                <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {job.skills.slice(0, 6).map(s => (
                    <span key={s} style={{
                      padding: '3px 10px',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '100px',
                      color: '#94a3b8',
                      fontSize: '0.75rem',
                    }}>{s}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
