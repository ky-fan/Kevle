import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";
import { TbChartGridDotsFilled } from "react-icons/tb";



function Navigation() {
  const user = useSelector(state => state.session.user)

  return (
    <div className="navbar">
      <NavLink to='/' className='nav-logo' title="Splash Page">
        <div className="nav-logo-div">
          <TbChartGridDotsFilled className="nav-logo-icon" />
          <div className="nav-logo-title-container">
            <span className="nav-logo-title">Kevle</span>
            <span className="nav-logo-subtitle">by Kevin Fan</span>
          </div>
        </div>
      </NavLink>
      <div className="nav-buttons">
        <div className="nav-buttons-icons-div">
          <NavLink to='/connections' className='navigation-link'>All Connections</NavLink>
          {user && <NavLink to='/connections/new' className='navigation-link'>Create Connections Game</NavLink>}
        </div>
        <ProfileButton className="profile-button" title="User-Options" />
      </div>
    </div>
  );
}

export default Navigation;
