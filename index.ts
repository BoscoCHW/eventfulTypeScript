import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import ejsLayouts from 'express-ejs-layouts';
import session from 'express-session';
import passport from './middleware/passport';

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(morgan("dev"));
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

import indexRoute from './routes/indexRoute';
import authRoute from './routes/authRoute';
app.use("/", indexRoute);
app.use("/auth", authRoute);


app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});
