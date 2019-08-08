// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAn6E-3jK5Y7uBQltM3tzb9pmnYQV5aOsc',
    authDomain: 'candidate-report.firebaseapp.com',
    databaseURL: 'https://candidate-report.firebaseio.com',
    projectId: 'candidate-report',
    storageBucket: 'candidate-report.appspot.com',
    messagingSenderId: '1011405737947',
    appId: '1:1011405737947:web:fd61b9e3236b26f4'
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
