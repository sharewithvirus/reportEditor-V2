
require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { dbConnect } = require("./config/dbConfig")

var app = express();
console.log(`GMI Backend is Listening On Port ${process.env.PORT}`);
dbConnect()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));


app.use('/api/v1', require("./routes/1V-main_routes"));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
// Others Routes
app.get("*", (req, res) => {
  res.status(500).json({
    status: "Fail",
    message: "Url not found",
  });
});
app.post("*", (req, res) => {
  res.status(500).json({
    status: "Fail",
    message: "Url not found",
  });
});

app.delete("*", (req, res) => {
  res.status(500).json({
    status: "success",
    message: "Url not found",
  });
});

app.patch("*", (req, res) => {
  res.status(500).json({
    status: "success",
    message: "Url not found",
  });
});
app.put("*", (req, res) => {
  res.status(500).json({
    status: "success",
    message: "Url not found",
  });
});


// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
