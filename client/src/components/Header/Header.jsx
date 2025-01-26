import './Header.css';
import { Bell } from 'lucide-react';
import ProfileIcon from '../../assets/icons/profile.png';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileModal from '../ProfileModal/ProfileModal';

export default function Header() {
  const [showProfileModal, setShowProfileModal] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);


  return (
    <div className="header-container">
      <div className="header-greeting">
        <span className="greeting-one">
          Welcome back,{' '}
          <span className="greeting-name">
            {user?.name || 'null'}!
          </span>
        </span>
      </div>

      <div className="header-container-left">
        <div className="notification-icon-container">
          <Bell style={{ cursor: 'pointer' }} color="#333" size="1.7em" />
          <div className="notification-dot"></div>
        </div>
        <div className="header-separator"></div>
        <div className="profile-container" onClick={() => setShowProfileModal(true)}>
          <div className="profile-img-container">
            <img src={ProfileIcon} alt="Profile" className="profile-img" />
            <div className="profile-dot"></div>
          </div>
          <div className="profile-details">
            <div className="profile-name">{user?.name || 'null'}</div>
            <div className="profile-role">{role || 'null'}</div>
          </div>
        </div>
      </div>

      {showProfileModal && <ProfileModal requestClose={() => setShowProfileModal(false)} user={user} role={role} />}
      {showProfileModal && <div className="overlay-2"></div>}
    </div>
  );
}
