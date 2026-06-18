import React, { useState } from 'react';
import axios from 'axios';
import UploadZone from '../components/UploadZone';

export default function InterviewPrep() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('technical');
  const [revealed, setRevealed] = useState({});

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    setResult(null);
    setRevealed({});

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:8000/interview_questions', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to connect. Make sure the backend is running on port 8000.');
    } finally {
      setLoading(false);
    }
  };

  const toggleReveal = (idx) => {
    setRevealed(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const questions = result?.questions;
  const activeQuestions = questions ? (activeTab === 'technical' ? questions.technical : questions.behavioral) : [];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: '#e2e8f0' }}>
        🎤 Interview Prep
      </h1>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>
        Get personalized interview questions based on your resume skills.
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
            background: loading ? '#374151' : 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {loading ? '⏳ Generating Questions...' : '🎤 Generate Interview Questions'}
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
          {/* Summary */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem',
          }}>
            {[
              { label: 'Technical Qs', value: questions.technical.length, color: '#6366f1' },
              { label: 'Behavioral Qs', value: questions.behavioral.length, color: '#f59e0b' },
              { label: 'Skills Covered', value: questions.covered_skills.length, color: '#10b981' },
            ].map(s => (
              <div key={s.label} style={{
                padding: '1.25rem',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px', textAlign: 'center',
              }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            {['technical', 'behavioral'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  background: activeTab === tab ? (tab === 'technical' ? '#6366f1' : '#f59e0b') : 'rgba(255,255,255,0.05)',
                  color: activeTab === tab ? 'white' : '#64748b',
                  transition: 'all 0.2s',
                }}
              >
                {tab === 'technical' ? '💻 Technical' : '🤝 Behavioral'}
              </button>
            ))}
          </div>

          {/* Questions */}
          {activeQuestions.map((q, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '1.25rem',
              marginBottom: '0.75rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
              onClick={() => toggleReveal(i)}
              onMouseOver={e => e.currentTarget.style.border = '1px solid rgba(99,102,241,0.3)'}
              onMouseOut={e => e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span style={{ color: '#64748b', fontSize: '0.8rem' }}>Q{i + 1}</span>
                    <span style={{
                      padding: '2px 8px',
                      background: q.skill === 'HR' ? 'rgba(245,158,11,0.1)' : 'rgba(99,102,241,0.1)',
                      border: `1px solid ${q.skill === 'HR' ? 'rgba(245,158,11,0.3)' : 'rgba(99,102,241,0.3)'}`,
                      borderRadius: '100px',
                      color: q.skill === 'HR' ? '#f59e0b' : '#a78bfa',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                    }}>{q.skill}</span>
                  </div>
                  <p style={{ color: '#e2e8f0', fontSize: '0.95rem', lineHeight: 1.5 }}>
                    {q.question}
                  </p>
                </div>
                <span style={{ color: '#64748b', fontSize: '1.2rem', flexShrink: 0 }}>
                  {revealed[i] ? '▲' : '▼'}
                </span>
              </div>

              {revealed[i] && (
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  background: 'rgba(99,102,241,0.05)',
                  border: '1px solid rgba(99,102,241,0.15)',
                  borderRadius: '8px',
                  color: '#94a3b8',
                  fontSize: '0.85rem',
                  lineHeight: 1.6,
                }}>
                  💡 <strong style={{ color: '#a78bfa' }}>Tip:</strong> Think about a concrete example from your
                  experience. Use the STAR method: Situation, Task, Action, Result.
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
