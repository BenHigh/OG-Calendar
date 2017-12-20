var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// mongoose.connect('mongodb://localhost/test');

const Events = new Schema({
eventName:{
  type: String,
  required: true
},
eventDate:{
  type: String,
  unique: true
},
eventInfo:{
  type: Number,
  required: true
}
});

//string relates to name of this file(?)
var Event = mongoose.model("events", Events);

module.exports = Event;
