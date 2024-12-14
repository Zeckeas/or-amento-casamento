import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/sidebar';
import { Dashboard } from './pages/dashboard';
import { Categories } from './pages/categories';
import { Schedule } from './pages/schedule';
import { Inspiration } from './pages/inspiration';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/login';
import { Header } from './components/Layout/Header'; 
function App() {
  return (
    <Router>
      <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <Header /> {/* Adicione o Header aqui */}
        {/* Renderiza a Sidebar apenas se não estiver na tela de login */}
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-8">
          <Routes>
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
            <Route path="/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
            <Route path="/inspiration" element={<ProtectedRoute><Inspiration /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
