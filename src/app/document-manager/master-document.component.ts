import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { ResponsiveTableHelpers } from './helpers.data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master-document',
  templateUrl: './master-document.component.html',
  styleUrls: ['./master-document.component.scss']
})
export class MasterDocumentComponent implements OnInit {

  constructor() {}

  ngOnInit() { }
}
