import React from "react";
import "./Nav.css";
import moment from "moment";

import NavTime from "./NavBuild/NavTime/NavTime.js";
import NavWeather from "./NavBuild/NavWeather/NavWeather.js";
import NavName from "./NavBuild/NavName/NavName.js";
import NavIcon from "./NavBuild/NavIcon/NavIcon.js";


const Nav = (props) =>

<div>
{console.log(props)}

<ul class="nav left-nav main-nav">
   <li class="nav-item navbar-time">
     <NavTime />
   </li>

   <li class="nav-item navbar-weather">
     <NavWeather />
   </li>

   <li class="nav-item navbar-name">
     <NavName name={props.name}/>
   </li>

   <li class="nav-item navbar-icon">
     <NavIcon name={props.name}/>
   </li>
 </ul>

  <div className="nav-underline"> </div>
  <div className="nav-triangle"> </div>
</div>


export default Nav;
