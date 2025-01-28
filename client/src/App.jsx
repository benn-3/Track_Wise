import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Trainers from "./pages/Trainers/Trainers";
import Programs from "./pages/Programs/Programs";
import AuthPage from "./pages/AuthPage/AuthPage";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { checkTokenIsValid } from "./services/TokenOperations";
import { useDispatch, useSelector } from "react-redux";
import { setAuthState } from "./redux/actions/authActions";
import Loader from "./components/Loader/Loader";
import Feedbacks from "./pages/Feedback/Feedbacks";
import { getAdmin } from "./services/AdminOperations";
import TrainerDashboard from "./pages/TrainerDashboard/TrainerDashboard";
import { getTrainer } from "./services/TrainerOperations";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("Token"));

  useEffect(() => {
    const checkToken = async () => {
        const storedToken = localStorage.getItem("Token");
        if (storedToken) {
            try {
                const response = await checkTokenIsValid(storedToken);
                if (response?.success) {
                    if (response.decoded?.adminId) {
                        setRole("admin");
                        dispatch(setAuthState(true, "admin", response.decoded.adminId));
                        await getAdmin(storedToken, response.decoded.adminId, dispatch);
                    } else if (response.decoded?.trainerId) {
                        setRole("trainer");
                        dispatch(setAuthState(true, "trainer", response.decoded.trainerId));
                        getTrainer(storedToken, response.decoded.trainerId, dispatch);
                       
                    }
                } else {
                    dispatch(setAuthState(false));
                    localStorage.removeItem("Token");
                    setToken(null);
                }
            } catch (error) {
                console.error("Token validation failed", error);
                dispatch(setAuthState(false));
                localStorage.removeItem("Token");
                setToken(null);
            }
        } else {
            dispatch(setAuthState(false, null, null));
            setRole(null);
        }
        setLoading(false);
    };

    checkToken();
}, [dispatch, token]);

  if (loading) {
    return <Loader />;
  }

  if (!token) {
    return (
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <div className="App">
     
      {isAuthenticated && role === "admin" ? (
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
              <Route path="*" element={<Navigate to="/admin" />} />
            </Routes>
          </div>
        </>
      ) : isAuthenticated && role === "trainer" ? (
        <div>
          <Routes>
            <Route path="/trainer" element={<TrainerDashboard />} />
            <Route path="*" element={<Navigate to="/trainer" />} />
          </Routes>
        </div>
      ) : null}
    </div>
  );
}

export default App;
