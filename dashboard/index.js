const express = require('express');
const request = require('request');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

const temperature_url = "http://nginx:80/temperature";


const temp_data = [{"type": "acpitz", "temperature_sensors": [{"label": "", "current": 25.0, "high": 107.0, "critical": 107.0}]}, {"type": "pch_skylake", "temperature_sensors": [{"label": "", "current": 32.5, "high": null, "critical": null}]}, {"type": "coretemp", "temperature_sensors": [{"label": "Package id 0", "current": 37.0, "high": 100.0, "critical": 100.0}, {"label": "Core 0", "current": 36.0, "high": 100.0, "critical": 100.0}, {"label": "Core 1", "current": 37.0, "high": 100.0, "critical": 100.0}, {"label": "Core 2", "current": 36.0, "high": 100.0, "critical": 100.0}, {"label": "Core 3", "current": 36.0, "high": 100.0, "critical": 100.0}]}]

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
