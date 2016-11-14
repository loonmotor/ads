const
	restfulApi = require('../helper/restful-api')
	, db = require('../mongojs-db')
	, Ad = db.collection('ads')
	, uuid = require('uuid');

restfulApi.use('Ad', 'GET', (resourceName, req, res, next) => {
	res.json({
		uuid : 'cartoon ad'
	});
	next();
});

restfulApi.use('Ad', 'POST', (resourceName, req, res, next) => {
	Ad.insert({
		uuid : uuid.v4(),
		name : 'haha'
	}, (err, doc) => {
		res.json({
			status : 'ok'
		});
		next();
	});
});