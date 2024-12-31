// app.js
require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const signUpRouter = require("./routes/signUpRouter");
const indexRouter = require("./routes/indexRouter");

const session = require("express-session");
var passport = require("passport");
var crypto = require("crypto");
const pgSession = require("connect-pg-simple")(session);
const pgPool = require("./db/pool");

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

/**
 * -------------- SESSION SETUP ----------------
 */

/**
 * The `pgSession` is used to store session data in PostgreSQL. We provide the `pgPool`
 * connection to interact with the database.
 */
app.use(
  session({
    store: new pgSession({
      pool: pgPool, // Connection pool to use
      tableName: "session", // Default is 'session', customize if needed
      createTableIfMissing: true, // Optionally create the table automatically
    }),
    secret: process.env.SECRET, // Replace with your own secure secret
    resave: false, // Prevents resaving unchanged sessions
    saveUninitialized: true, // Saves uninitialized sessions
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */
require("./config/passport");

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

/**
 * -------------- ROUTES ----------------
 */
app.use("/", indexRouter);
app.use("/sign-up", signUpRouter);

/**
 * -------------- SERVER ----------------
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Express app - listening on port ${PORT}!`);
});
