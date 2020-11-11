import { BrowserModule } from '@angular/platform-browser';
import { CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { Injectable } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtistblockComponent } from './artistblock/artistblock.component';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import { PopularPlaylistsComponent } from './popular-playlists/popular-playlists.component';
import { AuthComponent } from './auth/auth.component';

import { FormsModule } from '@angular/forms';
import { SearchArtistComponent } from './search-artist/search-artist.component';
import { PlaylistHubComponent } from './playlist-hub/playlist-hub.component';
import { TrackComponent } from './track/track.component';
import { PublishedPlaylistComponent } from './published-playlist/published-playlist.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    ArtistblockComponent,
    HomeComponent,
    HistoryComponent,
    PopularPlaylistsComponent,
    AuthComponent,
    SearchArtistComponent,
    PlaylistHubComponent,
    TrackComponent,
    PublishedPlaylistComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule, 
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
