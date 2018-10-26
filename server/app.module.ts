import {Module} from '@nestjs/common';
import {AngularUniversalModule, applyDomino} from '@nestjs/ng-universal';
import {join} from 'path';
import {AppController} from './app.controller';

const BROWSER_DIR = join(process.cwd(), 'dist/candidate-report');
applyDomino(global, join(BROWSER_DIR, 'index.html'));

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      viewsPath: BROWSER_DIR,
      bundle: require('../candidate-report-server/main.js')
    }),
  ],
  controllers: [AppController],
})
export class ApplicationModule {
}
