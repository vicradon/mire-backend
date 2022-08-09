const cors = require("cors");

const allowlist = [
  "http://localhost:3000",
  "http://mire-five.vercel.app",
  "https://mire-five.vercel.app",
];

const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

module.exports = cors(corsOptionsDelegate);
