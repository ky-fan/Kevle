import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div>
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to='/connections'>All Connections</NavLink>
        <NavLink to='/connections/new'>Create Connections Game</NavLink>
      </div>

      <div>
        <ProfileButton />
      </div>
    </div>
  );
}

export default Navigation;
