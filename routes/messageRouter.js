//  signUpRouter.js
const { Router } = require("express");
const messageController = require("../controllers/messageController");
const messageRouter = Router();
const { validateMessage } = require("../config/express-validator");
const { isAuth } = require("./authMiddleware");

messageRouter.get("/", isAuth, messageController.messageGET);
messageRouter.post("/", validateMessage, messageController.messagePOST);

module.exports = messageRouter;
