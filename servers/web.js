'use strict';

const http = require('http');
const path = require('path');

const express = require('express');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const responseTime = require('response-time');
const compression = require('compression');

const router = require('../routes');

const app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.disable('x-powered-by');

app.use(compression());
app.use(responseTime());
app.use(logger.log4js.connectLogger(logger, config.log));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, '../public/favicon.ico')));

app.use(router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

let server = http.createServer(app);

function start() {
  server.listen(config.web.port, function () {
    logger.info(config.web.name, config.web.url, 'start up');
  });
}

if (!module.parent) {
  start();
} else {
  exports.start = start;
}

