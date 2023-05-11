const express = require("express");
const port = process.env.PORT || 8000;
const app = express();

const expressLayouts = require("express-ejs-layouts");

const db = require("./config/mongoose");

// !passport setup session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local");

const MongoStore = require("connect-mongo");

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));
app.use(expressLayouts);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.set("view engine", "ejs");
app.set("views", "./views");

// middleware for use session cookie
app.use(
  session({
    name: "habit-tracker",
    secret: "nothing",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://127.0.0.1:27017/habit",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use("/", require("./routes/index"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error while connecting to server");
    return;
  }
  console.log(`Server running on port ${port}.`);
});
