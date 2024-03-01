import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="navbar">
      <div className="nav-logo-div">
        <NavLink to='/' className='nav-logo' title="Splash Page">
          <p>Logo Here</p>
        </NavLink>
      </div>
      <div className="nav-buttons">
        <div className="nav-buttons-icons-div">
          <NavLink to='/connections'>All Connections</NavLink>
          <NavLink to='/connections/new'>Create Connections Game</NavLink>
        </div>
        <ProfileButton className="profile-button" title="User-Options" />
      </div>
    </div>
  );
}

export default Navigation;
