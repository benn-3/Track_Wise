import './sidebar.css';
import { LayoutDashboard, Users, LogOut, BookOpen, MessageSquare, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthState } from '../../redux/actions/authActions';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isActive = (path) => location.pathname.startsWith(path);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('Token');
    console.log("Logged Out");
    window.location.href = "/login"
  };

  return (
    <div className={`sidebar-container ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-top">
        <div className="sidebar-header">
          <div className="sidebar-toggle-btn" onClick={toggleSidebar}>
            {isOpen ? (
              <ArrowLeft color="white" size="1.2em" />
            ) : (
              <ArrowRight color="#9CA3AF" size="1.2em" />
            )}
          </div>
          {isOpen && <span>TrackWise</span>}
        </div>
        {isOpen && (
          <div className="sidebar-links">
            <div
              className={`sidebar-link ${isActive('/admin') ? 'sidebar-link-active' : ''}`}
              onClick={() => handleNavigation('/admin')}
            >
              <LayoutDashboard
                color={isActive('/admin') ? 'white' : '#9CA3AF'}
                size="1.5em"
              />
              Dashboard
            </div>
            <div
              className={`sidebar-link ${isActive('/trainers') ? 'sidebar-link-active' : ''}`}
              onClick={() => handleNavigation('/trainers')}
            >
              <Users
                color={isActive('/trainers') ? 'white' : '#9CA3AF'}
                size="1.5em"
              />
              Trainers
            </div>
            <div
              className={`sidebar-link ${isActive('/programs') ? 'sidebar-link-active' : ''}`}
              onClick={() => handleNavigation('/programs')}
            >
              <BookOpen
                color={isActive('/programs') ? 'white' : '#9CA3AF'}
                size="1.5em"
              />
              Programs
            </div>
          </div>
        )}
      </div>
      {isOpen && (
        <div className="sidebar-bottom">
          <div
            className={`sidebar-link sidebar-logout-link`}
            onClick={handleLogout}
          >
            <LogOut color="#9CA3AF" size="1.5em" />
            Log Out
          </div>
        </div>
      )}
    </div>
  );
}
