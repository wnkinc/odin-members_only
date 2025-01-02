const db = require("../db/queries");

async function indexGET(req, res) {
  const messages = await db.getMessages();

  res.render("index", {
    title: "Home Page",
    user: req.user,
    messages: messages,
  });
}

module.exports = {
  indexGET,
};
