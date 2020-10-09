import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ArtistblockComponent } from './artistblock/artistblock.component';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import { PopularPlaylistsComponent } from './popular-playlists/popular-playlists.component';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
  { path: '',                     // localhost:4200/
    component: HomeComponent      // loads home component     
  },
  { path: 'popularPlaylists',      // localhost:4200/popularPlaylists
    component: PopularPlaylistsComponent         
  },
  {
    path: 'auth',
    component: AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],   // Registers appRoutes as application routes for navigation
  exports: [RouterModule]
})
export class AppRoutingModule { }
