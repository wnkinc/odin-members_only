// joinController.js
const db = require("../db/queries");
const { validationResult } = require("../config/express-validator");

async function messageGET(req, res) {
  res.render("message", {
    title: "Create New Message",
    user: req.user,
    errors: [],
    data: { message: "" },
  });
}

async function messagePOST(req, res) {
  const errors = validationResult(req);

  const { title, message } = req.body;

  if (!errors.isEmpty()) {
    return res.render("message", {
      title: "Create New Message",
      user: req.user,
      errors: errors.array(),
      data: { title, message },
    });
  }

  await db.insertMessage(title, message, req.user.id);

  await res.redirect("/");
}

module.exports = {
  messageGET,
  messagePOST,
};
