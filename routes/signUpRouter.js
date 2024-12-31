//  signUpRouter.js
const { Router } = require("express");
const signUpController = require("../controllers/signUpController");
const signUpRouter = Router();

signUpRouter.get("/", signUpController.signUpGET);
signUpRouter.post("/", signUpController.signUpPOST);

module.exports = signUpRouter;
