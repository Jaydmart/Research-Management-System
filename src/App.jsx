import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Dashboard from '@/pages/Dashboard.jsx';
import Papers from '@/pages/Papers.jsx';
import Collaboration from '@/pages/Collaboration.jsx';
import Analytics from '@/pages/Analytics.jsx';
import Settings from '@/pages/Settings.jsx';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Helmet>
          <title>Research Management System - Academic Paper Platform</title>
          <meta name="description" content="Comprehensive academic paper management platform with collaboration features for researchers and academics." />
        </Helmet>
        
        <div className="flex">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/papers" element={<Papers />} />
                <Route path="/collaboration" element={<Collaboration />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </div>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;