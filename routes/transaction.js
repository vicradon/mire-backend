const { Router } = require("express");
const transactionController = require("../controllers/transaction");
const transactionRouter = Router();

transactionRouter.post("/", transactionController.create);

module.exports = transactionRouter;
