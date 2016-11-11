const
	http = require('http')
	, httpProxy = require('http-proxy')
	, consul = require('consul')()
	, proxy = httpProxy.createProxyServer()
	, fs = require('fs')
	, _ = require('lodash')
	, routing = {
		'/' : {
			service : 'webapp-service',
			index : 0
		},
		'/api' : {
			service : 'api-service',
			index : 0
		}
	}
	, proxyHandler = service => {

	};

http
	.createServer((req, res) => {
		
		consul.agent.service.list((err, services) => {

			const
				firstPathOfUrl = req.url.split('/').slice(0, 2).join('/')
				, proxyHandler = microServiceRoute => {
					const
						microServices = _.filter(services, service => service.Service === microServiceRoute.service);
					if (microServices.length > 0) {
						microServiceRoute.index = (microServiceRoute.index + 1) % microServices.length;
						const
							nextMicroService = microServices[microServiceRoute.index]
							, nextMicroServiceUrl = `http://${nextMicroService.Address}:${nextMicroService.Port}`;
						proxy.web(req, res, {
							target : nextMicroServiceUrl
						});
						return;
					}
					res.end('No service available to serve your request');
				};
			let
				microServiceRoute = routing[firstPathOfUrl];

			if (microServiceRoute) {
				proxyHandler(microServiceRoute);
				return;
			}
			
			microServiceRoute = _.find(routing, route => route.service === 'webapp-service')
			proxyHandler(microServiceRoute);
			
		});

	})
	.listen(7000);
