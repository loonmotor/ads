const
	consul = require('consul')()
	, http = require('http')
	, httpProxy = require('http-proxy');

http
	.createServer((req, res) => {
		res.writeHead(200);
		res.end('ok');
	})
	.listen(3000);

