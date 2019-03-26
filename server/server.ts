import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import {enableProdMode} from '@angular/core';
import {NestFactory} from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express';
import * as yesHttps from 'yes-https';
import {ApplicationModule} from './app.module';

// Required for Firebase
(global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xhr2');
(global as any).XMLHttpRequestEventTarget = require('xhr2').XMLHttpRequestEventTarget;
(global as any).XMLHttpRequestUpload = require('xhr2').XMLHttpRequestUpload;

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApplicationModule);
  app.enableCors({
    methods: 'GET',
    maxAge: 3600,
  });

  // Configure GAE proxy and health checks. Force HTTPS.
  app.set('trust proxy', true);
  app.use(yesHttps({ maxAge: 31536000, includeSubdomains: true, preload: true }));
  // app.get('/_ah/health', (req, res) => {
  //   res.sendStatus(200);
  // });
  await app.listen(PORT);
}
bootstrap().catch(err => console.error(err));
