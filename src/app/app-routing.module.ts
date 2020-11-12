import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ArtistblockComponent } from './artistblock/artistblock.component';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import { SearchArtistComponent } from './search-artist/search-artist.component';
import { PlaylistHubComponent } from './playlist-hub/playlist-hub.component';
import { PlaylistCreatorComponent } from './playlist-creator/playlist-creator.component';
import { PopularPlaylistsComponent } from './popular-playlists/popular-playlists.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard, LoginGuard } from './auth/auth.guard';

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
    path: 'playlistHub',      // localhost:4200/playlistHub
    component: PlaylistHubComponent,
    canActivate: [AuthGuard]        
  },
  { 
    path: 'playlistCreator',      // localhost:4200/playlistHub
    component: PlaylistCreatorComponent,
    canActivate: [AuthGuard]        
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],   // Registers appRoutes as application routes for navigation
  exports: [RouterModule]
})
export class AppRoutingModule { }
