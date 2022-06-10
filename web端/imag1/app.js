var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
// var bodyParser = require('body-parser')
var url = require('url')
var ejs = require('ejs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var server = http.createServer(app);

app.engine('.html', ejs.__express);
app.set('view engine', 'html');

//允许跨域请求
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/plain;charset=utf-8");
  next();
});



app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//post请求
// app.use(bodyParser.urlencoded({ extended: false }))

//引入router.js路由文件

//暴漏静态资源文件 暴漏之后我们可以通过域名访问该文件下的资源
//  app.use(express.static('uploads'))



app.use('/', indexRouter);
app.use('/users', usersRouter);



server.listen('3000')
