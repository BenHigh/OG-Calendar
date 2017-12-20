import React, {Component} from "react";
import "./NavWeather.css";
import axios from "axios";

class NavWeather extends Component {
  state = {
    lat: 30.2861111111,
    lon: -97.7336111111,
    temperature: 65,
    weather: "Sunny",
    city: "Austin, TX"
  };

componentWillMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=> {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.setState({lat:lat});
        this.setState({lon:lon});
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
}


componentDidMount() {
  var APIKey = "850bd46a652d4b267496f1dd05231bce";
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + this.state.lat + "&lon=" + this.state.lon + "&appid=" + APIKey;
  axios.get(queryURL).then((response) => {
    // console.log(response.data.main.temp);
    var temp = (parseInt(response.data.main.temp)-273)*1.800+32;
    var fixedTemp = temp.toFixed(1);
    // var newTemp = (parseInt(response.data.main.temp)-273.15)*1.80;
    this.setState({
      temperature: fixedTemp,
      weather: response.data.weather[0].main,
      city: response.data.name
    });
    // return;
});
}

render() {
  // console.log(this.state.city);
  // console.log(this.state.temperature);
    return (<div className="nav-weather">
      <a href="https://www.google.com/search?ei=FnMxWqH-DYeejwOu366YDQ&q=weather&oq=weat&gs_l=psy-ab.1.0.0i131i67k1j0j0i67k1l2j0i131k1j0i131i67k1l3j0i67k1j0i131k1.216008.217106.0.219056.4.4.0.0.0.0.194.544.0j4.4.0....0...1.1.64.psy-ab..0.4.543...0i3k1.0.yXFc_B3j7lA" target="_blank">
        <p>
          Weather In {this.state.city} ||
          <i class="fa fa-sun-o" aria-hidden="true"></i>
          {this.state.temperature} &#8457;
        </p>
      </a>
    </div>);
}

}
export default NavWeather;
