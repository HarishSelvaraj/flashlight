import { Component, OnInit } from '@angular/core';
import { DocumentManagerService } from '../../services/document-manager.service';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {

  formTypesSelected : any;

  constructor(private documentManagerService : DocumentManagerService) { }

  ngOnInit() {
    this.formTypesSelected = this.documentManagerService.getDocumentFormTypes();
  }

}
