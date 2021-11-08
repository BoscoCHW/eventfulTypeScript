const { userModel } = require("../models/userModel");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  registerSubmit: (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    userModel.addOne(email, password);
    res.redirect('/reminders');
  },

  home: (req, res) => {
    res.render('./reminder/dashboard', { user: req.user.username });
  }, 

  logout: (req, res) => {
    req.logout();
    res.redirect('/auth/login');
  }
};

module.exports = authController;
