const
    restfulApi = require('../helper/restful-api')
    , db = require('../mongojs-db')
    , Ad = db.collection('ads')
    , uuid = require('uuid');

restfulApi.use('Ad', 'GET', (resourceName, req, res, next) => {
    const
        {uuid} = req.params;
    Ad.findOne({
        uuid
    }, (err, doc) => {
        if (err) {
            return next(err);
        }
        res.json(doc);
        next();
    });
});

restfulApi.use('Ad', 'POST', (resourceName, req, res, next) => {
    const
        {title, url, description} = req.body;
    Ad.insert({
        uuid : uuid.v4(),
        title,
        url,
        description
    }, (err, doc) => {
        if (err) {
            return next(err);
        }
        res.json(doc);
        next();
    });
});