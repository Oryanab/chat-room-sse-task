"use strict";
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.DBURL)
  .then((result) => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
      minlength: 1,
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = { Chat };
