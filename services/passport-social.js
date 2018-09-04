const passport = require("passport");
const TwitchStrategy = require("passport-twitch").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new TwitchStrategy(
    {
      clientID: keys.twitchClientID,
      clientSecret: keys.twitchClientSecret,
      callbackURL: "https://game-streamer.herokuapp.com/auth/twitch/callback",
      scope: "user_read",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("Twitch user authing...");
      console.log("[[-------------------]]");
      console.log("accessToken is ", accessToken);
      console.log("-----------------------");
      console.log(profile);
      console.log("-----------------------");
      const { id, displayName, email, _json } = profile;
      const existingUser = await User.findOne({ "twitch.id": profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({
        name: displayName,
        twitch: {
          id,
          email,
          logo: _json.logo,
          bio: _json.bio,
          link: _json._links.self
        }
      }).save();
      done(null, user);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"

      // proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("Google+ user authing...");
      console.log("[[-------------------]]");
      console.log("accessToken is ", accessToken);
      console.log("-----------------------");
      console.log(profile);
      console.log("-----------------------");
      console.log("**-------------------**");
      const { id, displayName, photos, emails, gender, _json } = profile;

      const existingUser = await User.findOne({ "google.id": profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({
        name: displayName,
        google: {
          id,
          photo: photos[0].value,
          gender,
          email: emails[0].value
        }
      }).save();
      done(null, user);
    }
  )
);
