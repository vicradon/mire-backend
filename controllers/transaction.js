const Joi = require("joi");
const { User, Transaction, VirtualAccount } = require("../models");
const { v4: uuid } = require("uuid");
const http = require("../utils/http");

const getUSDAccountDetails = async (user, transaction) => {
  const virtual_account_detail = await VirtualAccount.findOne({
    where: {
      UserId: user.id,
      account_denomination: "USD",
    },
  });

  if (virtual_account_detail) {
    return virtual_account_detail;
  }

  const bvnChallengeResponse = await http.post("/breezeapi/v1/ChallengeBVN", {
    channel_code: "APIC",
    bvn: user.bvn,
    merchant_code: "M1000005",
    reference_number: transaction.reference,
  });

  const otp = bvnChallengeResponse.data.response_message.slice(-6) || "";

  await http.post("/breezeapi/v1/RegisterUser", {
    user_id: user.email,
    password: user.password,
    phone_number: user.phone_number,
    first_name: user.first_name,
    last_name: user.last_name,
    has_bvn: "Y",
    bvn: user.bvn,
    channel_code: "NXG",
    merchant_code: "M1000005",
    product_code: "ESC1",
    reference_number: transaction.reference,
    otp,
  });

  const createUserAccountResponse = await http.post(
    "breezeapi/v1/CreateUserAccount",
    {
      user_id: user.email,
      merchant_code: "M1000005",
      product_code: "ESC2",
      currency: "USD",
    }
  );

  const responseData = createUserAccountResponse.data.response_data;
  console.log(responseData);

  const virtual_account = await VirtualAccount.build({
    account_number: responseData.wallet_id,
    UserId: user.id,
    account_name: responseData.wallet_name,
    account_balance: 0,
    account_denomination: responseData.currency,
  });
  await virtual_account.save();

  return virtual_account;
};

class TransactionController {
  // initiate transaction
  async create(req, res) {
    try {
      const schema = Joi.object({
        amount: Joi.number().required(),
        currency: Joi.string().required(),
        receiver_wallet_alias: Joi.string().required(),
      });

      const { amount, currency, receiver_wallet_alias } =
        await schema.validateAsync(req.body);

      const user = await User.findByPk(req.user_id);

      const transaction = await Transaction.build({
        amount,
        currency,
        receiver_wallet_alias,
        reference: uuid(),
        UserId: user.id,
      });

      await transaction.save();

      console.log("before creation");
      const virtual_account_details = await getUSDAccountDetails(
        user,
        transaction
      );

      console.log(virtual_account_details);

      return res.status(201).json({
        virtual_account_details,
        transaction,
        status: "success",
        message: "Created transaction successfully",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message, status: "error" });
    }
  }

  // verify funds transfer
  async verifyFundsTransfer(req, res) {
    try {
      const schema = Joi.object({
        transaction_reference: Joi.string().required(),
      });
      const { transaction_reference } = await schema.validateAsync(req.body);

      const transaction = await Transaction.findOne({
        where: { reference: transaction_reference },
      });

      await http.post("/breezeapi/v1/VerifyFundsTransfer", {
        user_id: req.user_id,
        merchant_code: "M1000005",
        product_code: "ESC2",
        currency: "USD",
        transaction_reference,
      });

      return res.status(200).json({
        status: "success",
        message: "Funds transfer verified successfully",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message, status: "error" });
    }
  }
}

module.exports = new TransactionController();
