import * as webshot from 'webshot';

webshot('https://google.com', 'google.png', function (err, renderStream) {
});
