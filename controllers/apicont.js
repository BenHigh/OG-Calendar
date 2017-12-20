var path = require("path");
var axios = require("axios");
var db = require("../models");
// var request = require("request");
// var rp = require('request-promise');


var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2(
  '368397746508-4kj26rurvv18sgt2at6g89493q3jbi9q.apps.googleusercontent.com',
  'SAIPIsGxN7yV10LVdV6hYcp4',
  'http://127.0.0.1:3001/dash'
);

var moment = require('moment');
var Twitter = require('twitter');
const util = require('util');

const cheerio = require('cheerio');

const ax = axios.create({baseURL: 'http://127.0.0.1:3001'});
const exax = axios.create();

moment().format();

var fields = "tech";
var key = "2177251a265c5d6d69c4b171f4e32";
var long = "-96.1581974";
var lat = "36.1524972";
var url = "https://api.meetup.com/find/events?&sign=true&fields=tech&photo-host=public&lon=-96.1581974&page=20&lat=36.1524972&key=2177251a265c5d6d69c4b171f4e32";
// var url = "https://api.meetup.com/find/events?&sign=true&fields=" +
//   fields + "&lon=" + long + "&lat=" + lat + "&key=" + key;

var twitterKeys = {
  consumer_key: 'Cen815VuzCzhgjGayrhKiP4To',
  consumer_secret: 'OvyfrKZ7vFsxgpIAeg2YtFhhGyvxzQ8XLb9XIrfwvnNuVr0ubo',
  access_token_key: '925191630650593280-jkXm7MgljRnopiJQxSEebIHnK8fANM1',
  access_token_secret: 'DKHRa8MhDerhJInDduZRaMvetK7KVhaQlzbee7iv7Dez7'
};

var twit = new Twitter(twitterKeys);

function runNLU(id, input) {
  var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
  var nlu = new NaturalLanguageUnderstandingV1({
    'username': '77d970c9-fce9-4cb3-bf1e-f7f324c8c1b5',
    'password': '60h1FRDdSy2a',
    'version_date': '2017-02-27'
  });

  var params = {
    'text': input,
    'features': {
      'keywords': {},
      'emotion': {},
      'sentiment': {}
    }
  };

  nlu.analyze(params, function(err, resp) {
    if (err)
      console.log('error:', err);
    else
      //console.log(JSON.stringify(resp, null, 2));
      ax.post('/api/watRes/' + id, {results: resp}).then(function(response){
        console.log("here 58 api");
        //console.log(response);
      }).catch(function(error){
        //why do i always forget this?
        console.log(error);
      });
  });
}

module.exports = {
  // 1. Query the Meetup.com API
  getMeetupEvents: function(req, res) {
    var id = req.params.id;

    //console.log(req.user.watson.results)
    var wRes = JSON.parse([req.user.watson.results]);
    var list = "";

    //console.log(wRes);
    for(i in wRes){
      //console.log(wRes[i].text);
      var temp = wRes[i].text.split(' ');
      list += temp.join('+') + ',';
    }

    //console.log(list);

    var profile = JSON.parse(req.user.linkedin.profile);

    var loc = profile.location.name + ", " + profile.location.country.code;
    var ind = profile.industry;

    //console.log(loc);

    var events = [];

    function getEvents() {
      exax.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + loc + '&key=AIzaSyCTEe4so5G2gouCQruBE5SE3b1iatiTjpk').then(function(response){
        var geo = response.data.results[0].geometry.location;
        //console.log(geo);
        exax.get('https://api.meetup.com/find/upcoming_events?&fields=*&text=' + list + '&photo-host=public&lon=' + geo.lng + '&lat=' + geo.lat + '&page=20&key=2177251a265c5d6d69c4b171f4e32').then(function(resp){
          var events = resp.data.events;
          var evRes = [];
          //console.log(events);
          for(i in events){
            var temp = {
              name: events[i].name || 'undefined',
              date: events[i].local_date || 'undefined',
              time: events[i].local_time || 'undefined',
              location: events[i].venue || events[i].location || 'undefined',
              link: events[i].link || 'undefined'
            }
            evRes.push(temp);

            // console.log("++++++++=========++++++++");
            // console.log(events[i].name);
            // console.log(events[i].local_date);
            // console.log(events[i].local_time);
            // console.log(events[i].venue);
            // console.log(events[i].link);
          }
          console.log(evRes);

          postEvents(evRes);
          return evRes;
        }).catch(function(error){
          console.log(error);
        });
      }).catch(function(error){
        console.log(error);
      })


    }

    function postEvents(events) {
      console.log(id);
      console.log('here 132');
      db.User.findById(id, function(err, usr){
        if(err){
          console.log(err);
        }
        console.log(req.user);
        console.log(usr);
        usr.meetupEvents = JSON.stringify(events);
        usr.save(function(error){
          if(error){
            console.log(error);
          }
          res.redirect('/');
        });
      });
    }
    getEvents();
  },

  getGoogleEvents: function(req, res){
    var googProf = req.user.google;
    console.log(googProf);
    oauth2Client.credentials = {
      access_token: googProf.token,
      refresh_token: googProf.refresh_token
    }
    function getEvents(auth){
      var calendar = google.calendar('v3');
      calendar.events.list({
        auth: auth,
        calendarId: 'primary',
        maxResults: 20,
        singleEvents: true,
        orderBy: 'startTime'
      }, function(err, resp){
        if(err){
          console.log(err);
          return;
        }
        var events = resp.items;
        var evRet = [];
        if(events.length == 0){
          console.log('nothing planned');
          return null;
        }else{
          console.log('Next 20 events: ');
          for(var i = 0; i < events.length; i++){
            var event = events[i];
            var start = event.start.dateTime || event.start.date;
            console.log('%s - %s', start, event.summary);
            evRet.push('%s - %s', start, event.summary);
          }
          postEvents(evRet);
        }
      });
    }
    function postEvents(events) {
      var id = req.user.id;
      console.log(id);
      db.User.findById(id, function(err, usr){
        if(err){
          console.log(err);
        }
        console.log(req.user);
        console.log(usr);
        usr.googleEvents = JSON.stringify(events);
        usr.save(function(error){
          if(error){
            console.log(error);
          }
          res.redirect('/');
        });
      });
    }
    getEvents(oauth2Client);
  },

  getTwits: function(req, res){
    console.log('here 76 cont twitt');

    var tweetsArr = [];
    //console.log(req.params.id);
    var params = {
      user_id: req.params.id,
      count: 200
    }
    twit.get("statuses/user_timeline", params, function(error, tweets, response){
      if(error){
        console.log(error);
      }
      for(i in tweets){
        console.log(i);
        tweetsArr[i] = {
          tweet: tweets[i].text,
          createdAt: tweets[i].created_at,
          location: tweets[i].location
        }
      }
      //console.log(tweets);
      //console.log(response);
      res.send(tweetsArr);
    });
  },

  getLink: function(req, res){
    console.log('here 107 cont link');

    var linkArr = [];
    var linkProf;
    //console.log(req.params.id);

    db.User.findOne({"linkedin.id":req.params.id}, function(err, usr){
      if(err){
        console.log(err);
      }
      if(usr.linkedin.profile){
        // console.log(JSON.parse(usr.linkedin.profile));
        linkProf = JSON.parse(usr.linkedin.profile);

        console.log('here 130 api cont');
        res.send(linkProf);

        // var link = linkProf.apiStandardProfileRequest;
        // console.log(link);


        // var header = linkProf.apiStandardProfileRequest.headers;
        // var value = header.values[0].value
        // var headObj = value.split(":");
        // headObj[0] = header.values[0].name;
        // value = headObj.join(":");
        // console.log(value);

        // var url = linkProf.apiStandardProfileRequest.url;

        // url = "https://api.linkedin.com/v2/me?oauth2_access_token=" + usr.linkedin.token;
        // url = "https://api.linkedin.com/oauth/v2/accessToken" + usr.linkedin.token;

        // console.log(url);

        // var options = {
        //   method: 'GET',
        //   url: url,
        //   data: JSON.stringify(res.data),
        //   headers: {value},
        //   json: true
        // };
        // console.log(options);


        // exax.get(url).then(function(response){
        //   console.log(response.data);
        // }).catch(function(error){
        //   console.log(error);
        // });
      }
    });
  },

  runNLU: function(req, res){
    var id = req.params.id;
    var watsonInput;
    db.User.findById(id, function(err, usr){
      if(err){
        console.log(err);
      }

      var input = usr.watson.input;
      console.log('here 260 runNLU');
      // console.log(typeof input);
      // var arr = input.split("\" \[ \{ \} \]");
      // console.log(arr);
      // input = arr.join(" ");
      // console.log("=========");
      console.log(input);


      runNLU(id, input);
      res.redirect('/');
    });
  },

  postNLU: function(req, res){
    console.log("here 274 apiCont");
    var id = req.params.id;
    var results = req.body.results;
    //console.log(results);
    var keys = results.keywords;
    results = [];
    for(i in keys){
      // console.log(keys[i]);
      if(keys[i].relevance > 0.667){
        //console.log(keys[i]);
        results.push(keys[i]);
      }
    }
    console.log('here 310');
    //console.log(results);

    db.User.findById(id, function(err, usr){
      usr.watson.results = JSON.stringify(results);
      usr.save(function(error){
        if(error){
          throw error;
        }
        console.log("here 296 api");
        res.redirect('/');
      });
    });
  },

  getFullSearch: function(req, res){
    console.log("here 93 cont");
    console.log(req.user);

    var twitRes;
    var linkRes;

    var wtsnIn = "";


    console.log(req.user.twitter.id);

    ax.get('/api/getTwits/' + req.user.twitter.id).then(function(response){
      //console.log(response.data);
      twitRes = response.data;
      wtsnIn += JSON.stringify(twitRes);
      //console.log(twitRes);
    }).catch(function(error){
      console.log(error);
    }).then(function(){
      ax.get('/api/getLink/' + req.user.linkedin.id).then(function(response){
        //console.log(response.data);
        linkRes = response.data;
        wtsnIn += JSON.stringify(linkRes);
      }).catch(function(error){
        console.log(error);
      }).then(function(){
        db.User.findById(req.user._id, function(err, usr){
          console.log("here 205 apicont");
          if(err){
            return done(err);
          }
          if(usr){
            usr.watson.input = wtsnIn;
            usr.save(function(error){
              if(error){
                throw error;
              }
            });
          }
        }).then(function(){
          ax.get('/api/getNLU/' + req.user.id).then(function(response){
            //console.log(response);
            console.log("here 321 apicont");
            res.redirect('/');
          }).catch(function(error){
            console.log(error);
          });
        });
      });
    });
  },

  weather: function(req, res) {
    // var profile = JSON.parse(req.user.linkedin.profile);

    // var loc = profile.location.name + ", " + profile.location.country.code;
    // var ind = profile.industry;
    function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude);
}
    // exax.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + loc + '&key=AIzaSyCTEe4so5G2gouCQruBE5SE3b1iatiTjpk').then(function(response){
    //     var geo = response.data.results[0].geometry.location;
    //     console.log(geo);
  //   var APIKey = "166a433c57516f51dfab1f7edaed8413";
  //   var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
  //     "q=Bujumbura,Burundi&units=imperial&appid=" + APIKey;
  //   exax.get('https://www.google.com/search?ei=5F05WoT3B8aP0wK--bfADw&q=weather&oq=weather&gs_l=psy-ab.3..0i71k1l4.0.0.0.569739.0.0.0.0.0.0.0.0..0.0....0...1c..64.psy-ab..0.0.0....0.U0JnlW9BwME')
  //   .then(function(response){
  //     console.log(loc);
  //     res.send(response);
  // });
// });
getLocation();
},

  test: function(req, res) {
    res.status(200).json({msg: "Test Route Works!"});
  }
};
