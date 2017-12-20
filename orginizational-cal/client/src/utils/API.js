import axios from "axios";

export default {
  // Gets all books
  getMeetup: function() {
    return axios.get("/api/meetups/:id");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },

  getWeatherResults: function(lat, lon) {
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
  },
};
