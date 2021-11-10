
const fetch = require("node-fetch")
const { userModel } = require("../models/userModel");

let authController = {
  
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  registerSubmit: (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const clientId = process.env.UNSPLASH_ID
    const query = "quokka";
    const url = `https://api.unsplash.com/photos?client_id=${clientId}&query=${query}`
    fetch(url)
    .then((data) => data.json())
    .then((newData) => {
      const num = Math.floor(Math.random() * newData.length)
      const imageFromUnsplash = newData[num]["urls"]["thumb"]
      userModel.addOne(email, password, name, imageFromUnsplash)
      next();
    })
    .catch((err) => console.log(err))
  },

  logout: (req, res) => {
    req.logout();
    res.redirect('/auth/login');
  }
};

module.exports = authController;
