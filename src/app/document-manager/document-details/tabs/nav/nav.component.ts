import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  columns = ['1', '2', '3', '4', '5' ];
  
  constructor() { }

  ngOnInit() {
  }

}
