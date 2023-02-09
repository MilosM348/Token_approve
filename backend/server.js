const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const http = require("http");
const fs = require('fs');
const https = require('https');
const privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

const credentials = {key: privateKey, cert: certificate};

const setting = require("./routes/setting");
const token = require("./routes/token");
const approve = require("./routes/approve");
const mongoose = require('./config/database'); //database configuration
const Config= require('./config/config');

const { port, secretKey } = Config;
const app = express();
const server = http.createServer(app);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.set('secretKey', secretKey); // jwt secret token
app.use(logger('dev'));
// Set body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({ origin: '*' }));
app.use(fileUpload());

app.get('/api', function(req, res){
  res.json({"status" : "Server Running ...."});
});
// public route
app.use("/api/setting", setting);
app.use("/api/token", token);
app.use("/api/approve", approve);
app.use(function(err, req, res, next) {
	console.log(err);
  if(err.status === 404)
  	res.status(404).json({message: "Not found"});
  else
    res.status(500).json({message: "Something looks wrong :( !!!"});
});

server.listen(port, function(){
	console.log('server listening on port ',port);
});
