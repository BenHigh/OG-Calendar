var bCrypt = require('bcrypt-nodejs');

module.exports = function(app, passport) {

    var User = require('../../models/user');

    var GoogleStrat = require('passport-google-oauth20').Strategy;
    var LinkedInStrat = require('passport-linkedin').Strategy;
    var TwitterStrat = require('passport-twitter').Strategy;

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


    passport.use(new GoogleStrat({
        clientID: "368397746508-4kj26rurvv18sgt2at6g89493q3jbi9q.apps.googleusercontent.com",
        clientSecret: "SAIPIsGxN7yV10LVdV6hYcp4",
        callbackURL: "http://127.0.0.1:3001/auth/google/dash",
        passReqToCallback : true
    }, function(req, token, refreshToken, profile, done){
        process.nextTick(function(){
            console.log('31 here');
            console.log(refreshToken);
            if(!req.user){
                User.findOne({'google.id': profile.id}, function(err, user){
                    if(err){
                        return done(err);
                    }
                    if(user){
                        if(!user.google.token){
                            user.google.token = token;
                            user.google.ref_token = refreshToken;
                            user.google.name = profile.displayName;
                            user.google.email = profile.emails[0].value;

                            user.save(function(err){
                                if(err){
                                    throw err;
                                }
                                return done(null, user)
                            });
                        }
                        return done(null, user);
                    } else {
                        var newUser = new User();
                        console.log(profile);

                        newUser.name = profile.displayName
                        newUser.google.id    = profile.id;
                        newUser.google.token = token;
                        newUser.google.ref_token = refreshToken;
                        newUser.google.name  = profile.displayName;
                        newUser.google.email = profile.emails[0].value; // pull the first email

                        newUser.save(function(err) {
                            if (err){
                                throw err;
                            }
                            return done(null, newUser);
                        });
                    }
                });
            } else {
                // user already exists and is logged in, we have to link accounts
                var user = req.user; // pull the user out of the session

                user.google.id = profile.id;
                user.google.token = token;
                user.google.ref_token = refreshToken;
                user.google.name = profile.displayName;
                user.google.email = profile.emails[0].value; // pull the first email

                user.save(function(err) {
                    if (err){
                        throw err;
                    }
                    return done(null, user);
                });
            }
        });
    }));
    

    passport.use(new LinkedInStrat({
            consumerKey: "77v58mkw7yz9j9",
            consumerSecret: "2GZ4xZuHLGHcMhND",
            callbackURL: "http://127.0.0.1:3001/auth/linkedin/dash",
            passReqToCallback: true,
            profileFields: ['id', 'first-name', 'last-name', 'formatted-name', 'location', 'industry', 'current-share', 'summary', 'specialties', 'positions', 'api-standard-profile-request', 'public-profile-url', 'email-address', 'headline']
        }, function(req, token, tokenSecret, profile, done){
            //console.log(req.user);
            console.log(profile);
            console.log("+++++++++++++++++");
            console.log(token);
            console.log("+++++++++++++++++");
            console.log(tokenSecret);

            process.nextTick(function() {
                if(req.user){
                    User.findById(req.user._id, function(err, usr){
                        if(err){
                            return done(err);
                        }
                        if(usr){
                            usr.linkedin.id = profile.id;
                            usr.linkedin.token = token;
                            usr.linkedin.displayName = profile.displayName;
                            usr.linkedin.profile = JSON.stringify(profile._json);

                            usr.save(function(error){
                                if(error){
                                    throw error;
                                }
                                return done(null, usr);
                            });
                        }
                        return done(null, usr);
                    });
                }else{
                    return done("Error: no user exists, signup then login with Google");
                }
            });
        }
    ));

    passport.use(new TwitterStrat({
            consumerKey: "Cen815VuzCzhgjGayrhKiP4To",
            consumerSecret: "OvyfrKZ7vFsxgpIAeg2YtFhhGyvxzQ8XLb9XIrfwvnNuVr0ubo",
            callbackURL: "http://127.0.0.1:3001/auth/twitter/dash",
            passReqToCallback: true
        }, function(req, token, tokenSecret, profile, done){
            //console.log(req.user);
            process.nextTick(function() {
                if(req.user){
                    User.findById(req.user._id, function(err, usr){
                        if(err){
                            return done(err);
                        }
                        if(usr){
                            usr.twitter.id = profile.id;
                            usr.twitter.token = token;
                            usr.twitter.username = profile.username;
                            usr.twitter.displayName = profile.displayName;


                            usr.save(function(error){
                                if(error){
                                    throw error;
                                }
                                return done(null, usr);
                            });
                        }
                        return done(null, usr);
                    });
                }else{
                    return done("Error: no user exists, signup then login with Google");
                }
            });
        }
    ));
}
