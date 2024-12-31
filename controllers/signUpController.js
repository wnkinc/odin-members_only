const db = require("../db/queries");

async function signUpGET(req, res) {
  res.render("sign-up", {
    title: "Sign Up",
    data: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    }, // Empty fields for initial load
  });
}

async function signUpPOST(req, res) {
  const { firstName, lastName, username, email, password } = req.body;

  try {
    // Try inserting the user
    await db.insertUser(firstName, lastName, username, email, password);
    res.redirect("/");
  } catch (error) {
    // Handle the error, e.g., send a response indicating the username is taken
    if (error.message === "Username already taken") {
      return res.render("sign-up", {
        title: "Sign Up",
        errors: [
          { msg: "Username is already taken, please choose another one." },
        ],
        data: { firstName, lastName, username, email, password },
      });
    }

    if (error.message === "Email already taken") {
      return res.render("sign-up", {
        title: "Sign Up",
        errors: [
          { msg: "Username is already taken, please choose another one." },
        ],
        data: { firstName, lastName, username, email, password },
      });
    }

    // Handle other errors
    console.error(error);
    return res.status(500).json({ error: "An unexpected error occurred." });
  }
}

module.exports = {
  signUpGET,
  signUpPOST,
};