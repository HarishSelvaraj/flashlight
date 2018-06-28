import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { ResponsiveTableHelpersBody } from '../../../helpers.data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  displayedColumns = ['userId', 'userName', 'progress', 'color'];
	rows: Array<any> = [];
    showResponsiveTableCode;

	@ViewChild(MatPaginator) paginator1: MatPaginator;
    pageLength = 0;
    pageSize = 3;
    helpers = ResponsiveTableHelpersBody;
    @Input() status;
    @Input() actionStatus;
    @Output() edit = new EventEmitter();
    @Output() delete = new EventEmitter();
    @Output() view = new EventEmitter();
    @Output() page = new EventEmitter();
    @Output() sort = new EventEmitter();
    @Output() dup = new EventEmitter();

    elementTypes = [
        { name: 'Element Type 1'},
        { name: 'Element Type 2' },
        { name: 'Element Type 3'},
        { name: 'Element Type 4'},
      ];

      viewTypes = [
        { name: 'View Type 1'},
        { name: 'View Type 2'},
        { name: 'View Type 3' },
        { name: 'View Type 4'},
      ];


  	constructor(private router: Router) {
   	}

    ngOnInit() {
        this.getRows();
    }
  	next(event) {
        this.rows = [];
    	for (var i= 1 * event.pageIndex * event.pageSize; i< event.pageSize+event.pageIndex*event.pageSize ;i++) {
            this.rows = [...this.rows,this.helpers.rows[i]];
        }
    }
    getRows() {
        for (var i=0;i<this.pageSize;i++) {
            this.rows = [...this.rows,this.helpers.rows[i]];
        }
        this.pageLength = this.helpers.rows.length;
    }
    sortData(val){
    }

}
