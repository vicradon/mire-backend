const Joi = require("joi");
const { User } = require("../models");
const jwt = require("jsonwebtoken");

class WalletController {
  async get(req, res) {
    try {
      const user = await User.findByPk(req.user_id);

      return res.status(200).json({
        user,
        status: "success",
        message: "Returned wallet details successfully",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message, status: "error" });
    }
  }
}

module.exports = new WalletController();
