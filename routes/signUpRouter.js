//  signUpRouter.js
const { Router } = require("express");
const signUpController = require("../controllers/signUpController");
const signUpRouter = Router();
const {
  validateUser,
  validatePasscode,
} = require("../config/express-validator");
const { isAuth } = require("./authMiddleware");

signUpRouter.get("/", signUpController.signUpGET);
signUpRouter.post("/", validateUser, signUpController.signUpPOST);

signUpRouter.get("/join", isAuth, signUpController.joinGET);
signUpRouter.post("/join", validatePasscode, signUpController.joinPOST);

module.exports = signUpRouter;
