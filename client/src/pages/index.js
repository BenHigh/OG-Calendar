import React from "react";
import "./index.css";
// import background from "./assets/background.jpg";

import { Link } from "react-router-dom";
import calendar from "./calendar.js";

const index = () =>
    <div className="background">
    
	    <div className="login-div" data-aos="fade-up">
	    	<h3> Welcome to <br /><span> POGO </span> </h3>
	    	<h4> your digital graphic organizer </h4>
		    <form action="/auth/google" method="GET">
		      <button class="btn btn-default btn-success" type="submit"> Log In with Google </button>
		    </form> 

		    <p className= {window.location.pathname === "/calendar" ? "active" : ""} >
          		<Link className="link" to="/calendar">Calendar</Link>
        	</p>
	    </div>
   
    </div>

export default index;