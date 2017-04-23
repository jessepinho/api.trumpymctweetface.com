import * as httpProxy from 'http-proxy';

const proxy = httpProxy
  .createProxyServer({
    changeOrigin: true,
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
    },
    target: 'https://api.twitter.com',
  })
  .listen(process.env.PORT || 3000);
