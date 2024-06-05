import { NavLink } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/main" activeClassName="active-link">
        Cars
      </NavLink>
      <NavLink to="/main/brand" activeClassName="active-link">
        Brand
      </NavLink>
    </div>
  );
};

export default Sidebar;
