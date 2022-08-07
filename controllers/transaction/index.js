const Joi = require("joi");
const { Transaction } = require("../../models");
const jwt = require("jsonwebtoken");

class TransactionController {
  // initiate transaction
  async create(req, res) {
    try {
      const transaction = await Transaction.build({
        amount: req.body.amount,
      });

      await transaction.save();

      return res.status(200).json({
        transaction,
        status: "success",
        message: "Returned user details successfully",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message, status: "error" });
    }
  }
}

module.exports = new TransactionController();
