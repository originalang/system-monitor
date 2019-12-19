//----------------------------------//
//			  IMPORTS				//
//----------------------------------//
const express = require('express');
const nunjucks = require('nunjucks');


//----------------------------------//
//			  ROUTERS				//
//----------------------------------//
const { temperatureRouter } = require('./routers');


//----------------------------------//
//        HOST CONFIGURATION        //
//----------------------------------//
const PORT = 8080;


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

// serve up main page
app.get('/', (req, res) => {
	return res.send('WORKING');
});

// path routing
app.use('/temperature', temperatureRouter);

// listen for requests on the specified port
app.listen(PORT);
console.log(`Listening on port ${PORT}`);