import React from "react";
import "./NavBuild.css";

import CalendarDay from "../../CalendarDay/CalendarDay.js";
import CalendarWeek from "../../CalendarWeek/CalendarWeek.js";
import CalendarMonth from "../../CalendarMonth/CalendarMonth.js";
import CalendarYear from "../../CalendarYear/CalendarYear.js";


const NavBuild = () =>

  <div>
    <ul className="nav justify-content-end">
      <li className="nav-item nav-build-item">
        <a className="nav-link"> <CalendarDay /> </a>
      </li>
      <li className="nav-item nav-build-item">
        <a class="nav-link"> <CalendarWeek /> </a>
      </li>
      <li class="nav-item nav-build-item">
        <a class="nav-link"> <CalendarMonth /> </a>
      </li>
      <li class="nav-item nav-build-item">
        <a class="nav-link"> <CalendarYear /> </a>
      </li>
    </ul>
  </div>

export default NavBuild;
