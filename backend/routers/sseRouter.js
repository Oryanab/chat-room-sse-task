"use strict";
const express = require("express");
const sseRouter = express.Router();
const { Chat } = require("../database/mongodb");
const path = require("path");
const fs = require("fs");

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
});

sseRouter.post("/user", (req, res) => {
  if (!connected.includes(req.body.username)) {
    connected.push(req.body.username);
  }
  res.status(200).json({ status: "success" });
});

sseRouter.get("/getusers", (req, res) => {
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
});

sseRouter.get("/users", (req, res) => {
  console.log("new user open chat");
  res.set({
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
  });
  const intervalId = setTimeout(() => {
    res.write(`data: ${JSON.stringify(connected)}\n\n`);
  }, 1000);
  res.on("close", (e) => {
    console.log("Client closed connection");
    //connected.splice();
    clearInterval(intervalId);
    res.end();
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
