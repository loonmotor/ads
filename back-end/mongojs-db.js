const
	mongojs = require('mongojs')
	, {url} = require('../environments/database.mongo.js')
	, db = mongojs(url);

db.on('error', err => console.log(err));
db.on('ready', () => console.log('connected to mongo db'));

module.exports = db;