var express = require('express');
var sass = require('node-sass');
var fs = require('fs');
var app = express();
var engines = require('consolidate');

app.engine('haml', engines.haml);
app.set('views', __dirname + '/source');

app.get('/script/lib.js', function(req, res) { 
  res.end(fs.readFileSync(__dirname + '/source/javascripts/lib.js'));
});

app.get('/script/main.js', function(req, res) { 
  res.end(fs.readFileSync(__dirname + '/source/javascripts/main.js'));
});

app.get('/script/timesheet.min.js', function(req, res) { 
  res.end(fs.readFileSync(__dirname + '/dist/timesheet.min.js'));
});

app.get('/styles/timesheet.css', function(req, res) {
  res.end(fs.readFileSync(__dirname + '/dist/timesheet.min.css'));
});

app.get('/styles/timesheet-white.css', function(req, res) {
  res.end(fs.readFileSync(__dirname + '/dist/timesheet-white.min.css'));
});

app.get('/styles/style.css', function(req, res) {
  sass.render({
    file: __dirname + '/source/stylesheets/style.sass',
    outputStyle: req.query.style || ""
  }, function(err, result) {
    res.end(result.css.toString());
  });
});

app.get('/', function (req, res) {
  res.render('index.haml', {
    code: fs.readFileSync(__dirname + '/source/snippets/example-date.js') + ''
  });
});

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
