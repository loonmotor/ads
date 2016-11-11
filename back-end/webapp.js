const
	http = require('http')
	, consul = require('consul')()
	, portfinder = require('portfinder')
	, args = require('minimist')(process.argv.slice(2))
	, serviceType = args.serviceType
	, express = require('express')
	, app = express()
	, morgan = require('morgan')
	, path = require('path');

portfinder.getPort((err, foundPort) => {

	const
		port = args.port || foundPort
		, serviceId = serviceType + port;

	consul.agent.service.register({
		id : serviceId,
		name : serviceType,
		address : 'localhost',
		port : port,
		tags : [serviceType]
	}, () => {

		const
			deregisterService = err => {
				consul.agent.service.deregister(serviceId, () => {
					process.exit(err ? 1 : 0);
				});
			};

		process.on('exit', deregisterService);
		process.on('SIGINT', deregisterService);
		process.on('uncaughtException', deregisterService);

		app.use(morgan('dev'));
		app.use(express.static(path.join(__dirname, '..', 'public')));
		
		http
			.createServer(app)
			.listen(port, () => {
				console.log(`Started ${serviceType} on port ${port}`);
			});

	});


});