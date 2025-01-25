import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import { setAdmin, setAuthState } from './redux/actions/authActions';
import Loader from './components/Loader/Loader';
import Feedbacks from './pages/Feedback/Feedbacks';
import { getAdmin } from './services/AdminOperations';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('Token');
      if (token) {
        try {
          const response = await checkTokenIsValid(token);
          if (response.success) {
            if (response.decoded.adminId) {
              await getAdmin(token, response.decoded.adminId, dispatch)
              dispatch(setAuthState(true, "admin"));
            }
            else if (response.decoded.trainerId) {
              dispatch(setAuthState(true, "trainer"));
            }
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

  if (loading) {
    return (
      <Loader />
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
              <Route path="/feedbacks" element={<Feedbacks />} />
              <Route path="*" element={<Navigate to={"/admin"} />} />
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
