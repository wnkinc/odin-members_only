//  joinRouter.js
const { Router } = require("express");
const joinController = require("../controllers/joinController");
const joinRouter = Router();
const { validatePasscode } = require("../config/express-validator");
const { isAuth } = require("./authMiddleware");

joinRouter.get("/", isAuth, joinController.joinGET);
joinRouter.post("/", validatePasscode, joinController.joinPOST);

module.exports = joinRouter;
