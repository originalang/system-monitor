const express = require('express');
const request = require('request');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

const temperature_url = "http://nginx:80/temperature";

app.get('/', (req, res) => {
	request({
		url: temperature_url,
		json: true
	}, (err, response, body) => {
		if (!err && res.statusCode === 200) {
			res.render('temperature', {temperature_list: body});			
		} else {
			res.send('NOT FOUND');
		}
	});
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
