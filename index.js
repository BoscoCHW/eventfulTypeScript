const express = require("express");
const app = express();
const path = require("path");
const upload = require("./middleware/multer")
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const ejsLayouts = require("express-ejs-layouts");
const session = require('express-session');
const passport = require("./middleware/passport");
const imgur = require("imgur");
const fs = require("fs");
const database = require("./database");


require("dotenv").config()
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use(ejsLayouts);
app.use(morgan("dev"));
app.use(helmet());   // this is causing image failed to render, but it protects the app from XSS attack
app.use(cors());


app.set("view engine", "ejs");

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.user)
  // console.log(`=================================================`);
  next();
});


const indexRoute = require("./routes/indexRoute");
const authRoute = require("./routes/authRoute");
app.use("/", indexRoute);
app.use("/auth", authRoute);



app.post("/uploads/", upload.any(), async (req, res) => {
  const file = req.files[0];
  try {
    const url = await imgur.uploadFile(`./uploads/${file.filename}`);
    database.forEach(function(obj) {
      if (obj.id === req.user.id) {
          obj.imageUrl = url.link;
          console.log(obj)
      }
  });
    res.json({ message: url.link });
    fs.unlinkSync(`./uploads/${file.filename}`);
  } catch (error) {
    console.log("error", error);
  }
});

app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});
