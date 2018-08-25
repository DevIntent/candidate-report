import {renderModuleFactory} from '@angular/platform-server';
import * as express from 'express';

import * as functions from 'firebase-functions';
import * as fs from 'fs';
import * as path from 'path';
// noinspection TsLint
import 'zone.js/dist/zone-node'; // Load zone.js for the server.

// Import the AOT compiled factory for your AppServerModule.
const AppServerModuleNgFactory = require(path.resolve(__dirname, `../candidate-report/main`)).AppServerModuleNgFactory;

// Load the index.html file.
const document = fs.readFileSync(path.resolve(__dirname, `../candidate-report/index.html`), 'utf8');

const app = express();

app.get('**', (req, res) => {
  const url = req.path;
  renderModuleFactory(AppServerModuleNgFactory, {document, url})
    .then(html => {
      const browserCache = 600; // 5 minutes
      const cdnCache = 600; // 5 minutes
      res.set('Cache-Control', `public max-age=${browserCache}, s-maxage=${cdnCache}`);
      res.send(html);
    })
    .catch(err => {
      console.log(err);
    });
});

exports.ssr = functions.https.onRequest(app);
