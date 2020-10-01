import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-artistblock',
  templateUrl: './artistblock.component.html',
  styleUrls: ['./artistblock.component.css']
})
export class ArtistblockComponent implements OnInit {

  @Input()
  artist;

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    console.log("Photo clicked");
  }

}
