const { userModel } = require("../models/userModel");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  registerSubmit: async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const clientId = process.env.UNSPLASH_ID
    const query = "quokka";


    const url = `https://api.unsplash.com/photos?client_id=${clientId}&query=${query}`

    // AWAIT
    // const data = await fetch(url);
    // const newData = await data.json();
    // const imageFromUnsplash = newData.results;
    // userModel.addOne(email, password, name, imageFromUnsplash)

    fetch(url)
    .then((data) => data.json()) 
    .then((newData) => {
      const imageFromUnsplash = newData.results;
    })
    .then((imageFromUnsplash) => userModel.addOne(email, password, name, imageFromUnsplash))
    .catch((err) => console.log(err)),
    next();
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
