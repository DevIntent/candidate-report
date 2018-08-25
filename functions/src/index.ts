import {enableProdMode} from '@angular/core';
// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';
import * as express from 'express';
const cors = require('cors')({origin: true});
const cookieParser = require('cookie-parser')();
import * as functions from 'firebase-functions';
import {join} from 'path';
// noinspection TsLint
import 'reflect-metadata';
// noinspection TsLint
import 'zone.js/dist/zone-node';

const {renderModuleFactory} = require('@angular/platform-server');

const path = require('path');

// Required for Firebase
(global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();
app.use(cors);
app.use(cookieParser);

const DIST_FOLDER = join(__dirname, '../candidate-report');
const APP_NAME = 'candidate-report-server';

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require(`../${APP_NAME}/main`);

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

const index = require('fs')
  .readFileSync(path.resolve(join(DIST_FOLDER, 'index.html')), 'utf8')
  .toString();

app.get('**', function(req, res) {
  renderModuleFactory(AppServerModuleNgFactory, {
    url: req.path,
    document: index,
    extraProviders: [provideModuleMap(LAZY_MODULE_MAP)]
  }).then(html => res.status(200).send(html));
});

exports.ssr = functions
  .region('us-east1')
  .https.onRequest(app);
