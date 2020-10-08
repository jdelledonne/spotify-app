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

const appRoutes: Routes = [
  { path: '',                     // localhost:4200/
    component: HomeComponent      // loads home component     
  },
  { path: 'popularPlaylists',      // localhost:4200/popularPlaylists
    component: PopularPlaylistsComponent         
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ArtistblockComponent,
    HomeComponent,
    HistoryComponent,
    PopularPlaylistsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule, 
    HttpClientModule,
    RouterModule.forRoot(appRoutes)   // Registers appRoutes as application routes for navigation
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
