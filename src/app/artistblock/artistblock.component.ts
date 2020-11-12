import { Component, Input, OnInit } from '@angular/core';
import {BrowserModule, DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-artistblock',
  templateUrl: './artistblock.component.html',
  styleUrls: ['./artistblock.component.css']
})
export class ArtistblockComponent implements OnInit {

  /* Inherit artist element from parent */
  @Input() artist;

  safe_url = null;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.safe_url = this.sanitizer.bypassSecurityTrustResourceUrl("https://open.spotify.com/embed/artist/" + this.artist.id);
  }

}
