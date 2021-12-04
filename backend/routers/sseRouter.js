"use strict";
const express = require("express");
const sseRouter = express.Router();
const { Chat } = require("../database/mongodb");
const path = require("path");
const fs = require("fs");

/*
    Post: Add new message to db
*/
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

/*
    Post: Add new user to Connected Array
*/
sseRouter.post("/user", (req, res) => {
  let database = returnDataBase();
  if (!database.connected.includes(req.body.username)) {
    database.connected.push(req.body.username);
  }
  saveDataBase(database);
  res.status(200).json({ status: "success" });
});

/*
    Get: get all messages from db
*/
sseRouter.get("/", (req, res) => {
  let database = returnDataBase();
  console.log("Client open chat " + req.headers.username);
  res.set({
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
  });
  const intervalId = setTimeout(() => {
    res.write(`data: ${JSON.stringify(database)}\n\n`);
  }, 1000);
  res.on("close", (e) => {
    console.log("Client closed connection" + req.headers.username);
    database.connected.splice(req.headers.username, 1);
    saveDataBase(database);
    clearInterval(intervalId);
    res.end();
  });
});

/*
    Get: get all connected from db
*/
sseRouter.get("/users", (req, res) => {
  let connected = returnDataBase().connected;
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
