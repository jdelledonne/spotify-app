import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-artistblock',
  templateUrl: './artistblock.component.html',
  styleUrls: ['./artistblock.component.css']
})
export class ArtistblockComponent implements OnInit {

  /* Inherit artist element from parent */
  @Input()
  artist;

  constructor() { }

  ngOnInit(): void {
  }

  /* Click event for artist photo */
  onClick() {
    console.log("Photo clicked");
  }

}
