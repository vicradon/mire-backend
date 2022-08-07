const axios = require("axios");
require("dotenv").config();

const http = axios.create({
  baseURL: process.env.APIS_NG_URL,
  proxyHeaders: false,
  credentials: false,
});

http.defaults.headers.common["ClientId"] = process.env.CLIENT_ID;

module.exports = http;
