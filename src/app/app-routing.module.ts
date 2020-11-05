import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ArtistblockComponent } from './artistblock/artistblock.component';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import { SearchArtistComponent } from './search-artist/search-artist.component';
import { PopularPlaylistsComponent } from './popular-playlists/popular-playlists.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard, LoginGuard } from './auth/auth.guard';
import { PlaylistBuilderComponent } from './playlist-builder/playlist-builder.component';

const appRoutes: Routes = [
  { 
    path: '',                     // localhost:4200/
    component: HomeComponent      // loads home component     
    //canActivate: [AuthGuard] 
  },
  { 
    path: 'popularPlaylists',      // localhost:4200/popularPlaylists
    component: PopularPlaylistsComponent
    //canActivate: [AuthGuard]     
  },
  { 
    path: 'searchArtist',      // localhost:4200/searchArtist
    component: SearchArtistComponent,
    canActivate: [AuthGuard]        
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'playlistBuilder',    // localhost:4200/playlistBuilder
    component: PlaylistBuilderComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],   // Registers appRoutes as application routes for navigation
  exports: [RouterModule]
})
export class AppRoutingModule { }
