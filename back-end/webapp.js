const
	http = require('http')
	, consul = require('consul')()
	, portfinder = require('portfinder')
	, args = require('minimist')(process.argv.slice(2))
	, serviceType = args.serviceType;

portfinder.getPort((err, port) => {

	http
		.createServer((req, res) => {
			res.end('bye from webapp');
		})
		.listen(port);

});