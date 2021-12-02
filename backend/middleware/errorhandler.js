"use strict";
/*
    error 500
*/
function middlewareServerError(req, res, next) {
  if (res.statusCode !== 500) {
    next();
  } else {
    res.status(500).json({
      message: "Our servers had an internal problem please comeback later",
      status: 500,
    });
  }
}

/*
      error 404
  */
function middlewarePageNotFound(req, res, next) {
  if (res.statusCode !== 404) {
    next();
  } else {
    res.status(404).json({
      message: "page not exist",
      status: 404,
    });
  }
}

module.exports = {
  middlewareServerError,
  middlewarePageNotFound,
};
