import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

//import StaticNav from "./components/StaticNav/StaticNav.js";
import index from "./pages/index.js";
import calendar from "./pages/calendar.js";


const App = () =>
  <Router>
    <div>
        <Route exact path="/" component={index} />
        <Route exact path="/index" component={index} />
        <Route exact path="/calendar" component={calendar} />
    </div>
  </Router>;

export default App;

  