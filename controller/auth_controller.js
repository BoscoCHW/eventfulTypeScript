let database = require("../database");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    // implement
  },

  registerSubmit: (req, res) => {
    // implement
  },

  home: (req, res) => {
    res.render('./reminder/dashboard', { user: req.user.username });
  }, 

  logout: (req, res) => {
    req.logout();
    res.redirect('/login');
  }
};

module.exports = authController;
