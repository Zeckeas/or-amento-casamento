import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Budget } from './pages/Budget';
import { Inspiration } from './pages/Inspiration';
import { Timeline } from './pages/Timeline';
import { Suppliers } from './pages/Suppliers';
import { Settings } from './pages/Settings';
import { Sidebar } from './components/layout/Sidebar';
import { PrivateRoute } from './components/PrivateRoute';
import { Login } from './pages/Login'; // Importando a página de login

export const App: React.FC = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          <Routes>
            <Route path="/login" element={<Login />} /> {/* Página de Login */}
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/budget" element={<PrivateRoute><Budget /></PrivateRoute>} />
            <Route path="/inspiration" element={<PrivateRoute><Inspiration /></PrivateRoute>} />
            <Route path="/suppliers" element={<PrivateRoute><Suppliers /></PrivateRoute>} />
            <Route path="/timeline" element={<PrivateRoute><Timeline /></PrivateRoute>} />
            <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};
