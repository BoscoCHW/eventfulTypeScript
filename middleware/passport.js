const GitHubStrategy = require('passport-github2').Strategy;
const LocalStrategy = require("passport-local").Strategy;
const passport = require('passport');
const userController = require("../controller/userController");
require("dotenv").config()

require("dotenv").config()

const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },

  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

const githubStrategy = new GitHubStrategy(
  {
  clientID: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_KEY,
  callbackURL: "http://localhost:3001/auth/github/callback"
  },

  function(accessToken, refreshToken, profile, done) {
    const imageUrl = profile.photos[0].value
    const user = userController.findOrCreateGithubUser(Number(profile.id), profile.username, imageUrl);
    return done(null, user);
  }
)

passport.use(localLogin).use(githubStrategy);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (userId, done) {
  const user = userController.getUserById(userId);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport;
