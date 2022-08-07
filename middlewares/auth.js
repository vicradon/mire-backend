const { UnauthorizedError } = require("../utils/error");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const jwtVerifyAsync = promisify(jwt.verify);

const isAuthenticated = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new UnauthorizedError();
    }

    const token = req.headers.authorization.split(" ")[1];
    const jwtVerificationObject = await jwtVerifyAsync(
      token,
      process.env.JWT_SECRET
    );
    if (jwtVerificationObject) {
      req.user_id = jwtVerificationObject.user_id;
      return next();
    }
    return next(new UnauthorizedError());
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  isAuthenticated,
};
