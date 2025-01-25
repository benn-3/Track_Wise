import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Trainers from './pages/Trainers/Trainers';
import Programs from './pages/Programs/Programs';
import AuthPage from './pages/AuthPage/AuthPage';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { checkTokenIsValid } from './services/TokenOperations';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthState } from '../redux/actions/authActions';
import { Mosaic } from "react-loading-indicators";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('Token');
      if (token) {
        try {
          const response = await checkTokenIsValid(token);
          if (response?.decoded) {
            dispatch(setAuthState(true));
          } else {
            dispatch(setAuthState(false));
            localStorage.removeItem('Token');
          }
        } catch (error) {
          console.error('Token validation failed', error);
          dispatch(setAuthState(false));
          localStorage.removeItem('Token');
        }
      } else {
        dispatch(setAuthState(false));
      }
      setLoading(false); 
    };

    checkToken();
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin'); 
    } else {
      navigate('/login'); 
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
        }}
      >
        <Mosaic color="#4635B1" size="large" text="" textColor="" />
      </div>
    );
  }

  return (
 
      <div className="App">
        <Toaster />
        {isAuthenticated ? (
          <>
            <Sidebar />
            <div className="main-container">
              <Header />
              <Routes>
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/trainers" element={<Trainers />} />
                <Route path="/programs" element={<Programs />} />
              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
  
  );
}

export default App;
