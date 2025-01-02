// loginController.js
const db = require("../db/queries");
const passport = require("../config/passport");
const genPassword = require("../config/passwordUtils").genPassword;
const { validationResult } = require("../config/express-validator");

async function loginGET(req, res) {
  var titles = req.user ? "Logout" : "Login";
  res.render("login", {
    title: titles,
    user: req.user,
    data: {
      username: "",
      password: "",
    }, // Empty fields for initial load
  });
}

module.exports = {
  loginGET,
};
