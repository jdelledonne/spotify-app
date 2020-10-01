import { BrowserModule } from '@angular/platform-browser';
import { CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { Injectable } from '@angular/core'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtistblockComponent } from './artistblock/artistblock.component';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    ArtistblockComponent,
    HomeComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule, 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
