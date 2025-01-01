// loginRouter.js
const { Router } = require("express");
const loginController = require("../controllers/loginController");
const loginRouter = Router();
// const {
//   validateUser,
//   validatePasscode,
// } = require("../config/express-validator");

loginRouter.get("/", loginController.loginGET);
// loginRouter.post("/", validateUser, signUpController.signUpPOST);

module.exports = loginRouter;
