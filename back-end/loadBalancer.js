const
	http = require('http')
	, httpProxy = require('http-proxy')
	, consul = require('consul')()
	, proxy = httpProxy.createProxyServer()
	, routing = {
		'/' : {
			service : 'webapp-service',
			index : 0
		},
		'/api' : {
			service : 'api-service',
			index : 0
		}
	};

http
	.createServer((req, res) => {
		
		consul.agent.service.list((err, services) => {
			console.log(services);
		});

		const
			firstPathOfUrl = req.url.split('/').slice(0, 2).join('/');

		if (routing[firstPathOfUrl]) {
			res.end(firstPathOfUrl);
			return;
		}

		res.end('bye');

	})
	.listen(7000);