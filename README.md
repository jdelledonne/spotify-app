# FeatureFour

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.3.

In this project we swtiched from the AngularJS framework to the Angular 10 framework. 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

This project uses the Spotify Development API.  In order to access this api, a token is needed.  Here is a fresh token: 

BQBezLXxhzzt7hsAFYhycsiNGmEskO2ipr0zSm8Rv6GvDGd9IQPyySWcvVtbvfNstz7iiKcbG3JAUw2zQx_9zfUVrMGHHE3VC2YTbhG0qKS6WTiFf_LcWlpFKBdWAcmbPYAk6ZMKKP_KXN7GIA

This token must be added to the spotify.services.ts file.  This file is located in src/app/services folder.  In the spotify.services.ts file, replace the old token on line 32: 

`'Authorization': 'Bearer BQABaj6eq-Z_0jgR7g5qy98SeArRYXvPF_n8UWAUpIT6RWaZUMzmMcu47xn5bUTx6PK2D4WEGneL7_GUIztB0rlombkuZ2eI3Gvyxh5zvG9nLg3bkixX-G1y98sY-aP4_YBffGN-QB5ElXLibQ'`

Do not change the Bearer part, only swap out the token itself.  

If you run into problems with the token or Spotify API, please reach out to either jbailey7@nd.edu or jdelledo@nd.edu.  


Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
Note: might have to run `npm i parse` to run.  

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
