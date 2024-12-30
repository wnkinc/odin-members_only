const db = require("../db/queries");

const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 15 characters.";

const validateUser = [
  body("username")
    .trim()
    .notEmpty()
    .isAlpha()
    .withMessage(`Username ${alphaErr}`)
    .isLength({ min: 1, max: 15 })
    .withMessage(`Username ${lengthErr}`),
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("Email must be a valid email address.")
    .normalizeEmail(),
  body("password")
    .trim()
    .notEmpty()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
    })
    .withMessage(
      "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one symbol."
    ),
];

const validateGift = [
  body("name")
    .trim()
    .notEmpty()
    .isLength({ min: 1, max: 15 })
    .withMessage(`Gift name ${lengthErr}`),
  body("description")
    .trim()
    .notEmpty()
    .isLength({ min: 1, max: 100 })
    .withMessage(`Description must be between 1 and 100 characters.`),
  body("price")
    .trim()
    .notEmpty()
    .isFloat({ min: 1.0, max: 255.0 })
    .withMessage("Price must be between 1.00 and 255.00."),
];

async function signUpGET(req, res) {
  res.render("signUp", {
    title: "Sign Up",
  });
}

module.exports = {
  signUpGET,
};
