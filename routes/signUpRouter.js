//  signUpRouter.js
const { Router } = require("express");
const signUpController = require("../controllers/signUpController");
const signUpRouter = Router();

signUpRouter.get("/", signUpController.signUpGET);

module.exports = signUpRouter;
