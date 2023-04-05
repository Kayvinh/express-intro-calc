/** Simple demo Express app. */

const express = require("express");
const app = express();

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");

// Mean, median, mode functions
const { findMean, findMedian, findMode } = require("./stats");
const { convertStrNums, saveResponse } = require("./utils");
const { stat } = require("fs");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res) {

 // If No query
  if(!req.query.nums) {
    throw new BadRequestError(MISSING);
  }

  const numbers = req.query.nums.split(",");

  if (numbers[0] === "") {
    throw new BadRequestError(MISSING);
  }

  return res.json({
    operation: "mean",
    value: findMean(convertStrNums(numbers))
  });
});

/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req, res) {

  // If No query
  if(!req.query.nums) {
    throw new BadRequestError(MISSING);
  }

  const numbers = req.query.nums.split(",");

  if (numbers[0] === "") {
    throw new BadRequestError(MISSING);
  }

  return res.json({
    operation: "median",
    value: findMedian(convertStrNums(numbers))
  });
});

/** Finds mode of nums in qs: returns {operation: "mean", result } */
app.get("/Mode", function (req, res) {

  // If No query
  if(!req.query.nums) {
    throw new BadRequestError(MISSING);
  }

  const numbers = req.query.nums.split(",");

  if (numbers[0] === "") {
    throw new BadRequestError(MISSING);
  }

  return res.json({
    operation: "Mode",
    value: findMode(convertStrNums(numbers))
  });
});


app.get('/all', function (req, res) {

  if(!req.query.nums) {
    throw new BadRequestError(MISSING);
  }

  const numbers = convertStrNums(req.query.nums.split(","));

  if (numbers[0] === "") {
    throw new BadRequestError(MISSING);
  }

  const statsResponse = {
    operation: "all",
    mean: findMean(numbers),
    median: findMedian(numbers),
    mode: findMode(numbers)
  }

  if ( req.query.save ) {
    saveResponse(statsResponse);
  }

  return res.json(statsResponse);

})

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;