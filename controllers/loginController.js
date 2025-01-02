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

// async function loginPOST(req, res) {
//   const errors = validationResult(req);

//   const { firstName, lastName, username, email, password } = req.body;

//   if (!errors.isEmpty()) {
//     return res.render("sign-up", {
//       title: "Sign Up",
//       errors: errors.array(),
//       data: { firstName, lastName, username, email },
//     });
//   }

//   try {
//     // Generate the salt and hash for the password
//     const saltHash = genPassword(password);
//     const salt = saltHash.salt;
//     const hash = saltHash.hash;

//     // Try inserting the user
//     await db.insertUser(firstName, lastName, username, email, hash, salt);
//     res.redirect("/");
//   } catch (error) {
//     // Handle the error, e.g., send a response indicating the username is taken
//     if (error.message === "Username already taken") {
//       return res.render("sign-up", {
//         title: "Sign Up",
//         errors: [
//           { msg: "Username is already taken, please choose another one." },
//         ],
//         data: { firstName, lastName, username, email },
//       });
//     }

//     if (error.message === "Email already taken") {
//       return res.render("sign-up", {
//         title: "Sign Up",
//         errors: [{ msg: "Email is already taken, please choose another one." }],
//         data: { firstName, lastName, username, email },
//       });
//     }

//     // Handle other errors
//     console.error(error);
//     return res.status(500).json({ error: "An unexpected error occurred." });
//   }
// }

module.exports = {
  loginGET,
};