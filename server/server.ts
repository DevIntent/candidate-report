import 'reflect-metadata';
import 'zone.js/dist/zone-node';

import {enableProdMode} from '@angular/core';
// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import * as yesHttps from 'yes-https';
import {join} from 'path';

// Required for Firebase
(global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xhr2');
(global as any).XMLHttpRequestEventTarget = require('xhr2').XMLHttpRequestEventTarget;
(global as any).XMLHttpRequestUpload = require('xhr2').XMLHttpRequestUpload;

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');
const APP_NAME = 'candidate-report';

// Configure GAE proxy and health checks. Force HTTPS.
app.set('trust proxy', true);
app.use(yesHttps({ maxAge: 31536000, includeSubdomains: true, preload: true }));
app.get('/_ah/health', (req, res) => {
  res.sendStatus(200);
});

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require(`${DIST_FOLDER}/${APP_NAME}-server/main`);

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, APP_NAME));

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });

// Serve static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, APP_NAME), {
  maxAge: 600
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  res.render('index', {req});
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});