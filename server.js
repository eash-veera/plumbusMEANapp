//backend server files

//require express to create the api's necessary
var express = require('express');

//require path, which is a system module which will help us work with file system paths etc.
var path = require('path');
var bodyParser = require('body-parser');

//store two files in the route folder
//index file is the home of the application
var index = require('./routes/index');
var tasks = require('./routes/tasks');

var port = 3000;

var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set Static folder
app.use(express.static(path.join(__dirname, 'client')));

//Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', tasks);

app.listen(port, function(){
  console.log('Server started on port - '+port);
});
