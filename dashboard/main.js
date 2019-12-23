//----------------------------------//
//			  IMPORTS				//
//----------------------------------//
const express = require('express');
const nunjucks = require('nunjucks');
const mongoose = require('mongoose');


//------------------------------//
//		  CUSTOM IMPORTS   		//
//------------------------------//
const { temperatureRouter } = require('./routers');
const { RequestLog } = require('./models');


//----------------------------------//
//        HOST CONFIGURATION        //
//----------------------------------//
const PORT = 8080;


//--------------------------------------//
//        DATABASE CONFIGURATION        //
//--------------------------------------//
const mongoURL = 'mongodb://mongodb:27017/SystemMonitor';

// establish connection to the database
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

// handle connection and error events
mongoose.connection.once('open', () => {
    console.log('connected to db');
}).on('error', (err) => {
	console.log(err);
});


//----------------------------------//
//         APP CONFIGURATION        //
//----------------------------------//
const app = express();
app.use(express.static(__dirname + '/public'));

// setup templating engine
nunjucks.configure('views', {
	autoescape: true,
	express: app
});

app.use((req, res, next) => {
	let reqLog = new RequestLog({
		timestamp: Date.now(),
		method: req.method,
		protocol: req.protocol,
		clientIP: req.ip,
		originalURL: req.originalUrl,
		clientHostname: req.hostname,
	});

	reqLog.save();
	next();
});

// serve up main page
app.get('/', (req, res) => {
	return res.render("index.html");
});

app.get('/db', (req, res) => {
	RequestLog.find({}, (err, recs) => {
		let requests = {};

		recs.forEach(rec => {
			requests[rec._id] = rec;
		});

		res.send(requests);
	})
});

// path routing
app.use('/temperature', temperatureRouter);

// listen for requests on the specified port
app.listen(PORT);
console.log(`Listening on port ${PORT}`);