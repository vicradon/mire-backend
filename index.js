const express = require("express");
const { isAuthenticated } = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");
const authRouter = require("./routes/auth");
const transactionRouter = require("./routes/transaction");
const userRouter = require("./routes/user");
const app = express();
const cors = require("./utils/cors");
require("dotenv").config();
const port = process.env.PORT;
const { exec } = require("child_process");

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/users", isAuthenticated, userRouter);
app.use("/transactions", isAuthenticated, transactionRouter);
app.get("/migrate", (req, res) => {
  exec("npm run migrate");
  res.send("migration successful");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
