"use strict";
const express = require("express");
const sseRouter = express.Router();
const { Chat } = require("../database/mongodb");

sseRouter.post("/post", (req, res) => {
  const newMessage = new Chat({
    username: req.body.username,
    message: req.body.message,
  });
  newMessage
    .save()
    .then((result) => {
      console.log("Client send message");
      res.status(200).json({ status: "success" });
    })
    .catch((err) => {
      res.status(403).json({ status: "success" });
    });
});

sseRouter.get("/", (req, res) => {
  Chat.find()
    .then((massages) => {
      console.log("Client open chat");
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Access-Control-Allow-Origin", "*");

      const intervalId = setTimeout(() => {
        res.write(`data: ${massages}\n\n`);
      }, 100);

      res.on("close", (e) => {
        console.log("Client closed connection");
        clearInterval(intervalId);
        res.end();
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = sseRouter;
