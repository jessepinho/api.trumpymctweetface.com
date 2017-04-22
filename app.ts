import * as http from 'http';
import * as httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer({ changeOrigin: true });
proxy.on('proxyReq', function(proxyReq) {
  proxyReq.setHeader('Authorization', `Bearer ${process.env.TWITTER_BEARER_TOKEN}`);
});

proxy.on('proxyRes', function(proxyRes, req, res) {
  console.log('##### GOT RESPONSE!', res.body);
});

http.createServer(function(req, res) {
  proxy.web(req, res, { target: 'https://api.twitter.com' });
}).listen(3000);
