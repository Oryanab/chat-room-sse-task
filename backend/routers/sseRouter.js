"use strict";
const express = require("express");
const sseRouter = express.Router();
const { Chat } = require("../database/mongodb");
const path = require("path");
const fs = require("fs");

// let messages = [];
let connected = [];

sseRouter.post("/post", (req, res) => {
  let database = returnDataBase();
  database.messages.push({
    username: req.body.username,
    message: req.body.message,
    time: new Date().toTimeString().split(" ")[0],
  });
  saveDataBase(database);
  res.status(200).json({ status: "success" });
  // const newMessage = new Chat({
  //   username: req.body.username,
  //   message: req.body.message,
  // });
  // newMessage
  //   .save()
  //   .then((result) => {
  //     console.log("Client send message");
  //     res.status(200).json({ status: "success" });
  //   })
  //   .catch((err) => {
  //     res.status(403).json({ status: "success" });
  //   });
});

sseRouter.post("/user", (req, res) => {
  // let database = returnDataBase();
  // database.
  if (!connected.includes(req.body.username)) {
    connected.push(req.body.username);
  }
  //saveDataBase(database);
  res.status(200).json({ status: "success" });
});

sseRouter.get("/getusers", (req, res) => {
  // let database = returnDataBase();
  // res.status(200).json(database.connected);
  res.status(200).json(connected);
});

sseRouter.get("/", (req, res) => {
  let messages = returnDataBase().messages;
  console.log("Client open chat");
  res.set({
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
  });
  const intervalId = setTimeout(() => {
    res.write(`data: ${JSON.stringify(messages)}\n\n`);
  }, 1000);
  res.on("close", (e) => {
    console.log("Client closed connection");
    //connected.splice();
    clearInterval(intervalId);
    res.end();
  });

  // Chat.find()
  //   .then((messages) => {
  //     console.log("Client open chat");
  //     res.set({
  //       "Content-Type": "text/event-stream",
  //       Connection: "keep-alive",
  //     });
  //     const intervalId = setTimeout(() => {
  //       res.write(`data: ${JSON.stringify(messages)}\n\n`);
  //     }, 1000);
  //     res.on("close", (e) => {
  //       console.log("Client closed connection");
  //       clearInterval(intervalId);
  //       res.end();
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
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
