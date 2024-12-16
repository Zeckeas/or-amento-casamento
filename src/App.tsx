import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Budget } from './pages/Budget';
import { Inspiration } from './pages/Inspiration';
import { Timeline } from './pages/Timeline';
import { Suppliers } from './pages/Suppliers';
import { Settings } from './pages/Settings';
import { Sidebar } from './components/layout/Sidebar';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/inspiration" element={<Inspiration />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};