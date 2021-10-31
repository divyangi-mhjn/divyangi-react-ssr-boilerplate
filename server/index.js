const path = require('path'); // NEW
const DEFAULT_PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const {
  prepareUrls,
  choosePort
} = require('react-dev-utils/WebpackDevServerUtils');
const chalk = require('chalk');
const openBrowser = require('react-dev-utils/openBrowser');
const { purgeCacheOnChange } = require('./utils/purgeCacheOnChange');

const environment ='development';
const DIST_DIR = path.join(__dirname, '../dist'); 

var express = require('express'),
app = express(),

webpackDevHelper = require('./index.dev.js');
if (environment !== 'production') {
  console.log('DEVOLOPMENT ENVIRONMENT: Turning on WebPack Middleware...');
  webpackDevHelper.useWebpackMiddleware(app);
} else {
  console.log('PRODUCTION ENVIRONMENT');
  // app.use('/js', express.static(__dirname + '/public/js'));
}

choosePort(HOST, DEFAULT_PORT).then(port => {
  if (!port) {
    return;
  }

  const urls = prepareUrls('http', HOST, port);

  app.listen(port, HOST, err => {
    if (err) {
      return console.log(err);
    }


    console.log(chalk.white('\n\tStarting the server...'));

    openBrowser(urls.localUrlForBrowser);

    purgeCacheOnChange(path.resolve(__dirname, '../'));

    app.use(express.static(DIST_DIR));
    console.log(
      chalk.blue(`
        Running locally at ${urls.localUrlForBrowser}
        Running on your network at ${urls.lanUrlForConfig}:${port}
      `)
    );
  });
});


