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
    panelOpenState = false;
    displayedColumns = ['userId', 'userName', 'progress', 'color'];
    rows: Array<any> = [];
    showResponsiveTableCode;
    newcontents; show;
    @ViewChild(MatPaginator) paginator1: MatPaginator;
    pageLength = 0;
    pageSize = 3;
    helpers = ResponsiveTableHelpersBody;
    @Input() columns;
    @Input() lookupsData;
    @Input() status;
    @Input() actionStatus;
    @Output() edit = new EventEmitter();
    @Output() delete = new EventEmitter();
    @Output() view = new EventEmitter();
    @Output() page = new EventEmitter();
    @Output() sort = new EventEmitter();
    @Output() dup = new EventEmitter();

    elementType = ['TEXT', 'SELECT', 'TEXTAREA', 'LABEL'];
    //elementTypes = [
    //    {
    //        name: 'Element Type 1', data: [{ name: 'Element Type 2', data: '8', newcontent: 'new2' },
    //        { name: 'Element Type 3', data: '3', newcontent: 'new3' },
    //        { name: 'Element Type 4', data: '69', newcontent: 'new4' }]
    //    },
    //    {
    //        name: 'Element Type 2', data: [{ name: 'Element Type 3', data: '9', newcontent: 'new2' },
    //        { name: 'Element Type 3', data: '78', newcontent: 'new3' },
    //        { name: 'Element Type 4', data: '4', newcontent: 'new4' }]
    //    },
    //    {
    //        name: 'Element Type 3', data: [{ name: 'Element Type 8', data: '88', newcontent: 'new2' },
    //        { name: 'Element Type 3', data: '66', newcontent: 'new3' },
    //        { name: 'Element Type 4', data: '4', newcontent: 'new4' }]
    //    },
    //    {
    //        name: 'Element Type 4', data: [{ name: 'Element Type 7', data: '77', newcontent: 'new2' },
    //        { name: 'Element Type 3', data: '3', newcontent: 'new3' },
    //        { name: 'Element Type 4', data: '55', newcontent: 'new4' }]
    //    },
    //];

    viewTypes = [
        { name: 'Auto',value:'A' },
        { name: 'Required',value:'R' },
        { name: 'Optional',value:'O' }
    ];


    constructor(private router: Router) {
    }

    ngOnInit() {
        this.getRows();
        this.show = false;
    }
    next(event) {
        this.rows = [];
        for (var i = 1 * event.pageIndex * event.pageSize; i < event.pageSize + event.pageIndex * event.pageSize; i++) {
            this.rows = [...this.rows, this.helpers.rows[i]];
        }
    }
    getRows() {
        for (var i = 0; i < this.pageSize; i++) {
            this.rows = [...this.rows, this.helpers.rows[i]];
        }
        this.pageLength = this.helpers.rows.length;
    }
    sortData(val) {
    }
    open(data_bind) {
        const acc = document.getElementsByClassName('accordion');
        let i;
        
        for (i = 0; i < acc.length; i++) {
          acc[i].addEventListener('click', function() {
            this.classList.toggle('active');
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight){
              panel.style.maxHeight = null;
            } else {
              panel.style.maxHeight = panel.scrollHeight + 'px';
            } 
          });
        }
    }
}
