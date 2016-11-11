const
	http = require('http')
	, consul = require('consul')()
	, portfinder = require('portfinder')
	, args = require('minimist')(process.argv.slice(2))
	, serviceType = args.serviceType;

portfinder.getPort((err, port) => {

	const
		serviceId = serviceType + args.port;

	consul.agent.service.register({
		id : serviceId,
		name : serviceType,
		address : 'localhost',
		port : args.port,
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

		http
			.createServer((req, res) => {
				res.end(`response from ${serviceId}`);
			})
			.listen(args.port, () => {
				console.log(`Started ${serviceType} on port ${args.port}`);
			});

	});


});