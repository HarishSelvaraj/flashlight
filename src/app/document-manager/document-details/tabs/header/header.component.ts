import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  columns = ['1', '2', '3', '4', '5' ];
  constructor() { }

  ngOnInit() {
  }

}
