const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitchStrategy = require('passport-twitch').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
      console.log(profile.id);
    }
  )
);

passport.use(
  new TwitchStrategy(
    {
      clientID: keys.twitchClientID,
      clientSecret: keys.twitchClientSecret,
      callbackURL: '/auth/twitch/callback',
      scope: 'user_read',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ twitchId: profile.id });
      console.log('Existing Twitch user is', existingUser);
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({ twitchId: profile.id }).save();
      done(null, user);
      console.log(profile.id);
    }
  )
);