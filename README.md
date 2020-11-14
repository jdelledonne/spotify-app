# Spotify Helper: Final Features, version 0.5.0

## Install and Usage
To run this code, two npm installs are needed: 
- `npm install --save-dev @angular-devkit/build-angular`
- `npm install spotify-web-api-node --save`

Next, run `ng serve` while in the spotify-app folder.  Once the project has compiled, navigate to `http://localhost:4200`. 

First step will be to link your Spotify Account.  Click the Link Spotify button and sign in to your account. 

Next, create an account for the website and sign in. 

Note that the Spotify account must be linked before signing into the website, as if you link your Spotify account after signing in you will be signed out.  Also note that you will be automatically provided with a Spotify authorization token, so there is no need to add one in manually. 

## Features
Popular Playlists: Displays 12 popular playlists from Spotify.  Categories include top overall songs, top pop songs, top rock songs, and top hip-hop songs. 

Search Artists: Can search Spotify artists. Search results are displayed with their top tracks.  A history of all searches will be displayed below the search bar. 

Playlist Hub: Can create a new playlist with the option to publish it to a "playlist hub." The hub allows other users to see your published playlists, along with the abliity to like, dislike, and comment on playlists. 

Playlist Creator: Search Spotify by either Song or Artist. Can iterate through search results, with the option to add it to a playlist.  Songs that were added to the playlist are all displayed, and there is an option to create the playlist at the end. 

Note that in both Playlist features, the created playlists will actually be added to the linked Spotify account (there might be a slight delay in the creation of the playlist). 

If there are any issues with setup / use for grading purposes, please reach out to jdelledo@nd.edu or jbailey7@nd.edu
