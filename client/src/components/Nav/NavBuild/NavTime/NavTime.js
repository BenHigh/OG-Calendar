import React, {Component} from "react";
import moment from "moment";
import "./NavTime.css";



class NavTime extends Component {
  state = {
    time: "hello kevin",
  };

	componentDidMount(){
	  // setTimeout(this.updateTime, 1000);
	  this.updateTime();
	}
	updateTime= event => {
	  // Filter this.state.friends for friends with an id not equal to the id being removed
	  const time = moment().format('h:mm:ss a');;
	  // setTimeout();
	  // Set this.state.friends equal to the new friends array
	  this.setState({ time });
	  setTimeout(this.updateTime, 1000);
	};

	render (){
		return (
			<div className="nav-time">
		 		{ this.state.time }
		 	</div>
		);
	}
}
export default NavTime;
