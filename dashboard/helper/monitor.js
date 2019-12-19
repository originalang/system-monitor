const request = require('request');

const base_api_url = "http://nginx:80";

exports.status = (path, callback) => {
    request({
        url: base_api_url + path,
        json: true
    }, (err, response, body) => {
        if (!err) {
            return callback(body);			
        }
    });
}