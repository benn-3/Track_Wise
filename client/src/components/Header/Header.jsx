import './Header.css';
import { Bell } from 'lucide-react';
import ProfileIcon from '../../assets/icons/profile.png';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Header() {


  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <div className="header-container">
      <div className="header-greeting">
        <span className='greeting-one'>Welcome back, <span className='greeting-name'>Ajay M!</span></span>

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
