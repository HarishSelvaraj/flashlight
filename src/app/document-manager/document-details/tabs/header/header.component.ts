import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  choices; forms; header; show;
  type = ['Button'];
  columns = ['1', '2', '3', '4', '5'];
  constructor() { }

  @Input() headers;
  ngOnInit() {
    if (this.headers.length == 0) {
      this.show = false;
    }
    this.choices = [];
    this.header = {};
  }
  addnew(data_add) {
    // this.choices.push({ id: newItemNo, header: '', column: '', label: '', type: '', js: '' });
    const mycloned = Object.assign({}, data_add);
    this.headers.push(mycloned);
    if (this.headers.length == 0) {
      this.show = false;
    } else {
      this.show = true;
    }
    console.log(this.headers);
    // this.headers = {};
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
