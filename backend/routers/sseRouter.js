"use strict";
const express = require("express");
const sseRouter = express.Router();
const { Chat } = require("../database/mongodb");
const path = require("path");
const fs = require("fs");

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

sseRouter.post("/user", (req, res) => {
  let database = returnDataBase();
  database.connected.push(req.body.username);
  saveDataBase(database);
  res.status(200).json(database.connected);
});

sseRouter.get("/", (req, res) => {
  Chat.find()
    .then((messages) => {
      console.log("Client open chat");
      res.set({
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
      });
      const intervalId = setTimeout(() => {
        res.write(`data: ${JSON.stringify(messages)}\n\n`);
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

/*
    get database
*/
function returnDataBase() {
  let dataBase = fs.readFileSync(
    path.resolve(__dirname, "../../database.json")
  );
  let dataBaseJson = JSON.parse(dataBase.toString());
  return dataBaseJson;
}

/*
    save database
*/
function saveDataBase(dataBaseJson) {
  fs.writeFileSync("database.json", Buffer.from(JSON.stringify(dataBaseJson)));
}

module.exports = sseRouter;
