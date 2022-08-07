const { Router } = require("express");
const userController = require("../controllers/user");
const userRouter = Router();

userRouter.get("/me", userController.get);

module.exports = userRouter;
