import './Header.css';
import { Bell } from 'lucide-react';
import ProfileIcon from '../../assets/icons/profile.png';
import { Search } from 'lucide-react';

export default function Header() {
  return (
    <div className="header-container">
      <div className="header-searchbar-container">
        <Search size="1.7rem" color="#9CA3AF" />
        <input className="header-search-bar" type="text" placeholder="Search trainers, programs..." />
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
          <div className='profile-details'>
          <div className="profile-name">Ajay M</div>
          <div className="profile-role">Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
}
