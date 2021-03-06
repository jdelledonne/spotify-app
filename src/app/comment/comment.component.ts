import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, ɵSafeResourceUrl } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  /* Inherit comment object from parent */
  @Input() comment: any;

  /* Initialize comment variables */
  username  = null;
  text      = null;

  constructor(public http: HttpClient, public spotifyService: SpotifyService, private router: Router) { }

  ngOnInit(): void {
    /* Initialize username and text */
    this.username = this.comment.get('username');
    this.text     = this.comment.get('text');
  }

}
