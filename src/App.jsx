import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Dashboard from '@/pages/Dashboard.jsx';
import Papers from '@/pages/Papers.jsx';
import DataHub from '@/pages/DataHub.jsx';
import DatasetDetails from '@/pages/DatasetDetails.jsx';
import UploadDataset from '@/pages/UploadDataset.jsx';
import Notebook from '@/pages/Notebook.jsx';
import Collaboration from '@/pages/Collaboration.jsx';
import Analytics from '@/pages/Analytics.jsx';
import Settings from '@/pages/Settings.jsx';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Helmet>
          <title>Research Management System - Academic Paper Platform</title>
            <meta name="description" content={'A demo of the "Reproducibility & Impact Accelerator" by David X Avila. This Research Management System is built for PIs and academic labs.'} />
        </Helmet>
        
    <div className="flex overflow-x-hidden">
          <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
          <div className="flex-1 flex flex-col">
            <Header setMobileOpen={setMobileOpen} />
            <main className="flex-1 p-4 md:p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/papers" element={<Papers />} />
                <Route path="/datasets" element={<DataHub />} />
                <Route path="/datasets/:id" element={<DatasetDetails />} />
                <Route path="/datasets/upload" element={<UploadDataset />} />
                <Route path="/notebooks/:id" element={<Notebook />} />
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