import * as express from 'express';
import * as httpProxy from 'http-proxy';

const app = express();

const proxy = httpProxy
  .createProxyServer({
    changeOrigin: true,
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
    },
    target: 'https://api.twitter.com',
  });

proxy.on('proxyRes', function(proxyRes, req, res) {
  if (process.env.NODE_ENV === 'development') {
    res.setHeader('Access-Control-Allow-Origin', '*');
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'http://trumpymctweetface.com');
  }
});

app.get('/1.1/statuses/user_timeline.json', function(req, res) {
  if (req.query.screen_name === 'realDonaldTrump') {
    proxy.web(req, res);
  } else {
    res.sendStatus(403);
  }
});

app.listen(process.env.PORT || 5000);
