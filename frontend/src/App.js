import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RecommendJobs from './pages/RecommendJobs';
import SkillGap from './pages/SkillGap';
import InterviewPrep from './pages/InterviewPrep';

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', background: '#0f0f1a' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recommend" element={<RecommendJobs />} />
          <Route path="/skill-gap" element={<SkillGap />} />
          <Route path="/interview" element={<InterviewPrep />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
