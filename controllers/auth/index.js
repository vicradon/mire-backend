const Joi = require("joi");
const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const { NotFound } = require("../../utils/error");
const { default: axios } = require("axios");

class AuthController {
  async signup(req, res) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(30).required(),
      phone_number: Joi.string().required(),
    });
    try {
      const { email, password, phone_number } = await schema.validateAsync({
        email: req.body.email,
        password: req.body.password,
        phone_number: req.body.phone_number,
      });
      const user = User.build({
        email,
        password,
        phone_number: phone_number,
      });
      await user.save();

      const jwtValue = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return res.status(200).json({
        user,
        token: jwtValue,
        status: "success",
        message: "Signed up successfully",
      });
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({
          message: "User with this email already exists",
          status: "error",
        });
      }
      return res.status(500).json({ message: error.message, status: "error" });
    }
  }
  async login(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(30).required(),
    });
    try {
      const { email, password } = await schema.validateAsync({
        email: req.body.email,
        password: req.body.password,
      });
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return next(new NotFound("User not found"));
      }

      const passwordIsCorrect = User.passwordIsCorrect(user, password);

      if (!passwordIsCorrect) {
        return res.status(400).json({
          status: "error",
          message: "email or password is incorrect",
        });
      }

      const responsebody = await axios({
        url: "https://rgw.k8s.apis.ng/centric-platforms/uat/enaira-user/GetUserDetailsByPhone",
        method: "POST",
        data: {
          phone_number: "08056064768",
          user_type: "USER",
          channel_code: "APISNG",
        },
        headers: {
          ClientId: "3add9208e43c180fc0c5379a2283ea14",
          // ClientSecret: "717e3c9c4622157a0c2be95fe2ec2adb",
          // verify: "false",
        },
        rejectUnauthorized: false,
      });

      const jwtValue = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return res.status(200).json({
        external: responsebody.data,
        token: jwtValue,
        status: "success",
        message: "logged in successfully",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message, status: "error" });
    }
  }
}

module.exports = new AuthController();
