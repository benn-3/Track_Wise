import './sidebar.css';
import { LayoutDashboard, Users, LogOut, BookOpen, MessageSquare, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
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
              className={`sidebar-link ${isActive('/') ? 'sidebar-link-active' : ''}`}
              onClick={() => handleNavigation('/')}
            >
              <LayoutDashboard
                color={isActive('/') ? 'white' : '#9CA3AF'}
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
              className={`sidebar-link ${isActive('/calendar') ? 'sidebar-link-active' : ''}`}
              onClick={() => handleNavigation('/calendar')}
            >
              <BookOpen
                color={isActive('/calendar') ? 'white' : '#9CA3AF'}
                size="1.5em"
              />
              Programs
            </div>
            <div
              className={`sidebar-link ${isActive('/feedbacks') ? 'sidebar-link-active' : ''}`}
              onClick={() => handleNavigation('/feedbacks')}
            >
              <MessageSquare
                color={isActive('/feedbacks') ? 'white' : '#9CA3AF'}
                size="1.5em"
              />
              Feedbacks
            </div>
          </div>
        )}
      </div>
      {isOpen && (
        <div className="sidebar-bottom">
          <div
            className={`sidebar-link sidebar-logout-link ${isActive('/logout') ? 'sidebar-link-active' : ''}`}
            onClick={() => handleNavigation('/logout')}
          >
            <LogOut
              color={isActive('/logout') ? 'white' : '#9CA3AF'}
              size="1.5em"
            />
            Log Out
          </div>
        </div>
      )}
    </div>
  );
}
