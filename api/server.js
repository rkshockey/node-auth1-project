const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
// const session = require("express-session")

const userRouter = require("./users/users-router")
const authRouter = require("./auth/auth-router");
const session = require("express-session");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session({
  name: 'chocolatechip',
  secret: 'Olives eat avacados for elevensies every sunday',
  cookie: {
    maxAge: 1000 * 60 * 60,
    httpOnly: false,
    secure: false
  },
  rolling: true,
  resave: false,
  saveUninitialized: false,  
}))

server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
