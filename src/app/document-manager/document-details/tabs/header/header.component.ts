import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  choices; forms;
  columns = ['1', '2', '3', '4', '5'];
  constructor() { }

  ngOnInit() {
    this.choices = [];
    this.forms = {};
  }
  addnew(data_add) {
    // this.choices.push({ id: newItemNo, header: '', column: '', label: '', type: '', js: '' });
    this.choices.push(data_add);
    console.log(this.choices);
    this.forms = {};
  }

  delete(choice) {
    if (this.choices.length <= 2) {
    }
    for (var i = 0; i < this.choices.length; i++) {
      if (this.choices[i]['id'] === choice['id']) {
        this.choices.splice(i, 1);
        break;
      }
    }
  }

}
