import React from "react";
import "./StaticNav.css";
import { Link } from "react-router-dom";
import index from "../../pages/index.js";
import calendar from "../../pages/calendar.js";



const StaticNav = props => 

  <nav className="StaticNav">
      <ul className="nav justify-content-end">
        <li
          className= {
            window.location.pathname === "/" ||
            window.location.pathname === "/index"
              ? "active"
              : ""
          }
        >
          <Link to="/">Index</Link>
        </li>
        <li
          className= {window.location.pathname === "/calendar" ? "active" : ""}
        >
          <Link to="/calendar">Calendar</Link>
        </li>
      </ul>
  </nav>;




export default StaticNav;
