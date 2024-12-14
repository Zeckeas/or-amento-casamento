import React from 'react';
import { Header } from './components/Header';
import { BudgetSection } from './components/Budget/BudgetSection';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Header />
      <main className="pt-16">
        <BudgetSection />
      </main>
    </div>
  );
}

export default App;