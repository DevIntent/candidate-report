import {Module} from '@nestjs/common';
import {AngularUniversalModule, applyDomino} from '@nestjs/ng-universal';
import {join} from 'path';
import {AppServerModule} from '../src/main.server';
import {AppController} from './app.controller';

const BROWSER_DIR = join(process.cwd(), 'dist/candidate-report');
applyDomino(global, join(BROWSER_DIR, 'index.html'));

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: BROWSER_DIR
    }),
  ],
  controllers: [AppController],
})
export class ApplicationModule {
}
