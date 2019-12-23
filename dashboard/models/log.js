const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const options = {discriminatorKey: 'type'}

const logSchema = new Schema({
    timestamp: Number    
}, options);

const log = mongoose.model('Log', logSchema);

const requestLogSchema = new Schema({
    method: String,
    protocol: String,
    clientIP: String,
    originalURL: String,
    clientHostname: String,
}, options);

const requestLog = log.discriminator('Request', requestLogSchema);

module.exports = requestLog; 