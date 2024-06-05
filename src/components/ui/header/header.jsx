import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <nav>
        <ul>
          <li>
            <a href="/">
              Log out <FaSignOutAlt />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
