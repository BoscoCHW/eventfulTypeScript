const GitHubStrategy = require('passport-github2').Strategy;
const LocalStrategy = require("passport-local").Strategy;
const passport = require('passport');
const userController = require("../controller/userController");
require("dotenv").config()

const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },

  async (email, password, done) => {
    let user = null
    try {
      user = await userController.getUserByEmailAndPassword(email, password);
    } catch (err) {
      throw err;
    }
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

  async (accessToken, refreshToken, profile, done) => {
    const imageUrl = profile.photos[0].value
    try {
      const user = await userController.findOrCreateGithubUser(profile.id, profile.username, profile.email, imageUrl);
      return done(null, user);
    } catch (err) {
      throw err;
    }
  }
)

passport.use(localLogin).use(githubStrategy);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  let user = null
  try {
    user = await userController.getUserById(userId);
  } catch (err) {
    throw err;
  }
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport;
