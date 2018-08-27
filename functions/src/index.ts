// noinspection TsLint
import 'zone.js/dist/zone-node';
// noinspection TsLint
import 'reflect-metadata';

import {enableProdMode} from '@angular/core';
// Express Engine
// import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import {join} from 'path';
import {readFileSync} from 'fs';
const cors = require('cors')({origin: true});
const cookieParser = require('cookie-parser')();
import * as functions from 'firebase-functions';

const {renderModuleFactory} = require('@angular/platform-server');

const path = require('path');

// Required for Firebase
(global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xhr2');
(global as any).XMLHttpRequestEventTarget = require('xhr2').XMLHttpRequestEventTarget;
(global as any).XMLHttpRequestUpload = require('xhr2').XMLHttpRequestUpload;

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();
app.use(cors);
app.use(cookieParser);

const DIST_FOLDER = path.resolve(__dirname, '../dist');
const SERVER_APP = 'server';
const BROWSER_APP = 'browser';

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require(join(DIST_FOLDER, SERVER_APP, 'main'));

const index = readFileSync(path.resolve(__dirname, join(DIST_FOLDER, BROWSER_APP, 'index.html')), 'utf8').toString();

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
// app.engine('html', ngExpressEngine({
//   bootstrap: AppServerModuleNgFactory,
//   providers: [
//     provideModuleMap(LAZY_MODULE_MAP)
//   ]
// }));
app.engine('html', (_, options, callback) => {
  renderModuleFactory(AppServerModuleNgFactory, {
    document: index,
    url: options.req.url,
    extraProviders: [provideModuleMap(LAZY_MODULE_MAP)]
  }).then(html => {
    callback(null, html);
  });
});

app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, join(DIST_FOLDER, BROWSER_APP)));

// Serve static files
app.get('*.*', express.static(path.resolve(__dirname, join(DIST_FOLDER, BROWSER_APP))));

// All regular routes use the Universal engine
app.get('**', (req, res) => {
  res.render(path.resolve(__dirname, join(DIST_FOLDER, BROWSER_APP, 'index.html')), { req });
});

// app.get('**', function(req, res) {
//   renderModuleFactory(AppServerModuleNgFactory, {
//     url: req.path,
//     document: index,
//     extraProviders: [provideModuleMap(LAZY_MODULE_MAP)]
//   }).then(html => res.status(200).send(html));
// });

exports.ssr = functions
  .region('us-east1')
  .https.onRequest(app);
