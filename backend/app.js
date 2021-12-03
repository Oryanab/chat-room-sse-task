"use strict";
const express = require("express");
const cors = require("cors");
const app = express();
const sseRouter = require("./routers/sseRouter");
const {
  middlewareServerError,
  middlewarePageNotFound,
} = require("./middleware/errorhandler");
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// error handlers
app.use(middlewareServerError);
app.use(middlewarePageNotFound);

app.use("/sse", sseRouter);
app.use(express.static("../build"));

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
