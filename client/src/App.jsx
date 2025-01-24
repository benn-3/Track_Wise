import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Trainers from './pages/Trainers/Trainers';
import Programs from './pages/Programs/Programs';
import AuthPage from './pages/AuthPage/AuthPage';
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        {isAuthenticated ? (
          <>
            <Sidebar />
            <div className="main-container">
              <Header />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/trainers" element={<Trainers />} />
                <Route path="/programs" element={<Programs />} />
              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
