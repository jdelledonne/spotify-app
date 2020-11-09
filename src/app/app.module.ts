import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
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
import { PlaylistBuilderComponent } from './playlist-builder/playlist-builder.component';

@NgModule({
  declarations: [
    AppComponent,
    ArtistblockComponent,
    HomeComponent,
    HistoryComponent,
    PopularPlaylistsComponent,
    AuthComponent,
    SearchArtistComponent,
    PlaylistBuilderComponent
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
