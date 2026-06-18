import React, { useState } from 'react';
import axios from 'axios';
import UploadZone from '../components/UploadZone';

export default function SkillGap() {
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
      const res = await axios.post('http://localhost:8000/skill_gap', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to connect. Make sure the backend is running on port 8000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: '#e2e8f0' }}>
        📊 Skill Gap Analyzer
      </h1>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>
        Discover exactly which skills you need to land your top job matches.
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
            background: loading ? '#374151' : 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {loading ? '⏳ Analyzing Gaps...' : '📊 Analyze Skill Gaps'}
        </button>
      )}

      {error && (
        <div style={{
          marginTop: '1rem', padding: '1rem',
          background: 'rgba(239,68,68,0.1)',
          border: '1px solid rgba(239,68,68,0.3)',
          borderRadius: '10px', color: '#f87171', fontSize: '0.9rem',
        }}>
          ⚠️ {error}
        </div>
      )}

      {result && (
        <div className="fade-in" style={{ marginTop: '2rem' }}>
          {/* Current Skills */}
          <div style={{
            padding: '1.5rem',
            background: 'rgba(16,185,129,0.05)',
            border: '1px solid rgba(16,185,129,0.2)',
            borderRadius: '16px', marginBottom: '1.5rem',
          }}>
            <h3 style={{ color: '#10b981', marginBottom: '1rem', fontWeight: 600 }}>
              ✅ Your Current Skills ({result.user_skills.length})
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {result.user_skills.map(s => (
                <span key={s} style={{
                  padding: '4px 12px',
                  background: 'rgba(16,185,129,0.1)',
                  border: '1px solid rgba(16,185,129,0.3)',
                  borderRadius: '100px', color: '#6ee7b7', fontSize: '0.8rem',
                }}>{s}</span>
              ))}
              {result.user_skills.length === 0 && (
                <span style={{ color: '#64748b' }}>No skills found. Try a more detailed resume.</span>
              )}
            </div>
          </div>

          {/* Gap Cards */}
          {result.skill_gaps.map((gap) => (
            <div key={gap.job_title} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h4 style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '1.1rem' }}>{gap.job_title}</h4>
                  <p style={{ color: '#64748b', fontSize: '0.85rem' }}>{gap.company}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#a78bfa' }}>{gap.match_score}%</div>
                  <div style={{ fontSize: '0.8rem', color: '#f59e0b' }}>
                    {gap.missing_skills.length} skills missing
                  </div>
                </div>
              </div>

              {/* Progress bar: skills coverage */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Skills Coverage</span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    {gap.matched_skills.length}/{gap.required_skills.length}
                  </span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${(gap.matched_skills.length / gap.required_skills.length) * 100}%`,
                    background: 'linear-gradient(90deg, #6366f1, #10b981)',
                    borderRadius: '4px',
                  }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {/* Have */}
                <div>
                  <h5 style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
                    ✅ You have ({gap.matched_skills.length})
                  </h5>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {gap.matched_skills.map(s => (
                      <span key={s} style={{
                        padding: '3px 10px',
                        background: 'rgba(16,185,129,0.1)',
                        border: '1px solid rgba(16,185,129,0.2)',
                        borderRadius: '100px', color: '#6ee7b7', fontSize: '0.75rem',
                      }}>{s}</span>
                    ))}
                    {gap.matched_skills.length === 0 && <span style={{ color: '#64748b', fontSize: '0.8rem' }}>None</span>}
                  </div>
                </div>

                {/* Missing */}
                <div>
                  <h5 style={{ color: '#f59e0b', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
                    🎯 Learn next ({gap.missing_skills.length})
                  </h5>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {gap.missing_skills.map(s => (
                      <span key={s} style={{
                        padding: '3px 10px',
                        background: 'rgba(245,158,11,0.1)',
                        border: '1px solid rgba(245,158,11,0.3)',
                        borderRadius: '100px', color: '#fbbf24', fontSize: '0.75rem',
                      }}>{s}</span>
                    ))}
                    {gap.missing_skills.length === 0 && (
                      <span style={{ color: '#10b981', fontSize: '0.8rem' }}>🎉 Perfect match!</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
