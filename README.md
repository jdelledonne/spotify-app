
# Install and Usage
To run this code, two npm installs are needed: 
`npm install --save-dev @angular-devkit/build-angular`
`npm install spotify-web-api-node --save`

Next, run `ng serve` while in the spotify-app folder.  Once the project has compiled, navigate to `http://localhost:4200`. 

First step will be to link your Spotify Account.  Click the Link Spotify button and sign in to your account. 

Next, create an account for the website and sign in. 

Note that the Spotify account must be linked before signing into the website, as if you link your Spotify account after signing in you will be signed out.  Also note that you will be automatically provided with a Spotify authorization token, so there is no need to add one in manually. 

# Features
Popular Playlists: Displays 12 popular playlists from Spotify.  Categories include top overall songs, top pop songs, top rock songs, and top hip-hop songs. 

Search Artists: Can search Spotify artists. Search results are displayed with their top tracks.  A history of all searches will be displayed below the search bar. 

Playlist Hub: Can create a new playlist with the option to publish it to a "playlist hub." The hub allows other users to see your published playlists, along with the abliity to like, dislike, and comment on playlists. 

Playlist Creator: Search Spotify by either Song or Artist. Can iterate through search results, with the option to add it to a playlist.  Songs that were added to the playlist are all displayed, and there is an option to create the playlist at the end. 

Note that in both Playlist features, the created playlists will actually be added to the linked Spotify account (there might be a slight delay in the creation of the playlist). 

JOE EVERYTHING BELOW WAS ALREADY HERE AUTOMATICALLY I DONT THINK WE NEED ANY OF IT BUT TAKE A LOOK AND DELETE IT IF YOU AGREE 

# Spotify Helper: Feature 5, version 0.4.0

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.3.

In this project we swtiched from the AngularJS framework to the Angular 10 framework. 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

This project uses the Spotify Development API.  In order to access this api, a token is needed.  Here is a fresh token: 

BQDc1gxqNgEahScfFCBFMYeg4tqjh_tyjwyFIC4qImRrvCiuI1Bbyhv666ipBW68FzEl335YxDuGnZnWlPs00AZOuc1xFYcrrmJiHUJBbsh2oqTYzVy2jE1IDhKHPprJkQtzd9-cDp2laTfRugckwg

This token must be added to the spotify.services.ts file.  This file is located in src/app/services folder.  In the spotify.services.ts file, replace the old token on line 80: 

`'Authorization': 'Bearer BQA5WdRFwDiQ2zPyblvsiPn9Ie4ngLKCT5Um0-pqBNi-jXqr4e07kFNKAu8NIqWU0648u-TqxJW1MmoeQI6G4gbHSwRSKdYB2HIA2vWQq_FrxwFbkztI-6D60TVxUR41LbMYtiuYU0gz5syHsZjAcQ'`

Do not change the Bearer part, only swap out the token itself.  

If you run into problems with the token or Spotify API, please reach out to either jbailey7@nd.edu or jdelledo@nd.edu.  


Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

NOTE: might have to run `npm i parse` to run.  

## User Authentication

In order to use the site, users must now be authenticated. You can create a new account by signing up through the authentication page and then logging in with your new account credentials.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
