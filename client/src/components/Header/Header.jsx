import './Header.css';
import { Bell } from 'lucide-react';
import ProfileIcon from '../../assets/icons/profile.png';

export default function Header() {
  return (
    <div className="header-container">
      <div className="header-greeting">
        <span className='greeting-one'>Welcome back, <span className='greeting-name'>Ajay!</span></span>
        <span className='greeting-two'>Hope you&apos;re having a great day!</span>
      </div>

      <div className="header-container-left">
        <div className="notification-icon-container">
          <Bell style={{ cursor: 'pointer' }} color="#333" size="1.7em" />
          <div className="notification-dot"></div>
        </div>
        <div className="header-separator"></div>
        <div className="profile-container">
          <div className="profile-img-container">
            <img src={ProfileIcon} alt="Profile" className="profile-img" />
            <div className="profile-dot"></div>
          </div>
          <div className="profile-details">
            <div className="profile-name">Ajay M</div>
            <div className="profile-role">Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
}
