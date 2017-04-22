import * as httpProxy from 'http-proxy';

const proxy = httpProxy
  .createProxyServer({
    changeOrigin: true,
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
    },
    preserveHeaderKeyCase: true,
    target: 'https://api.twitter.com',
  })
  .listen(3000);
