const passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy;

const config = require('../config');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: config.facebook_client_id,
      clientSecret: config.facebook_client_secret,
      callbackURL: config.facebook_callback
    },
    function(accessToken, refreshToken, profile, done) {
      done(null, { name: profile.displayName, userid: profile.id });
    }
  )
);

module.exports = passport;
