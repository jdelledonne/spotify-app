import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  /* Inherit artists array from parent */
  @Input() 
  artists = [];

  constructor() { }

  ngOnInit(): void {
    
  }

}
