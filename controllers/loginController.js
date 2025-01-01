// loginController.js
const db = require("../db/queries");
const passport = require("../config/passport");
const genPassword = require("../config/passwordUtils").genPassword;
const { validationResult } = require("../config/express-validator");

async function loginGET(req, res) {
  res.render("login", {
    title: "Login",
    data: {
      username: "",
      password: "",
    }, // Empty fields for initial load
  });
}

module.exports = {
  loginGET,
};
