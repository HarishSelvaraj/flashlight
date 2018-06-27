import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { ResponsiveTableHelpers } from '../helpers.data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-manager',
  templateUrl: './document-manager.component.html',
  styleUrls: ['./document-manager.component.scss']
})
export class DocumentManagerComponent implements OnInit {
  displayedColumns = ['userId', 'userName', 'progress', 'color'];
	rows: Array<any> = [];
    showResponsiveTableCode;

	@ViewChild(MatPaginator) paginator1: MatPaginator;
    pageLength = 0;
    pageSize = 3;
    helpers = ResponsiveTableHelpers;
    @Input() status;
    @Input() actionStatus;
    @Output() edit = new EventEmitter();
    @Output() delete = new EventEmitter();
    @Output() view = new EventEmitter();
    @Output() page = new EventEmitter();
    @Output() sort = new EventEmitter();
    @Output() dup = new EventEmitter();
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

    addNewDocument() {
        this.router.navigate(['/document-manager/addnew']);
    }

}
