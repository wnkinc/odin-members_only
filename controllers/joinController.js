// joinController.js
const { validationResult } = require("../config/express-validator");

async function joinGET(req, res) {
  res.render("join", { title: "Join Us", user: req.user, errors: [] });
}

async function joinPOST(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("join", {
      title: "Join Us",
      user: req.user,
      errors: errors.array(),
    });
  }

  res.redirect("/login"); // Redirect to a welcome page on success
}

module.exports = {
  joinGET,
  joinPOST,
};
