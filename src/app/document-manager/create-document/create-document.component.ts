import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { DocumentManagerService } from '../services/document-manager.service';

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.scss']
})
export class CreateDocumentComponent implements OnInit {

    databases = [
        { value: 'db1', viewValue: 'Database 1' },
        { value: 'db2-1', viewValue: 'Database 2' },
        { value: 'db3', viewValue: 'Database 3' }
      ];

      objects = [
        { value: 'obj1', viewValue: 'Object 1' },
        { value: 'obj2', viewValue: 'Object 2' },
        { value: 'obj3', viewValue: 'Object 3' }
      ];

      formType = new FormControl();
      formTypes = [
        { value: 'ft1', viewValue: 'Search' },
        { value: 'ft2', viewValue: 'List' },
        { value: 'ft3', viewValue: 'Edit' },
        { value: 'ft4', viewValue: 'Portfolio' },
        { value: 'ft5', viewValue: 'Reports' }
      ];


      constructor(private router: Router, private documentManagerService : DocumentManagerService) { }

  ngOnInit() {
  }

  selectFormType() {
    //console.log(this.formType);
    this.documentManagerService.setDocumentFormTypes(this.formType);
  }

  documentDetails() {
    //console.log('i am in create document componenet..');
   // console.log(this.documentManagerService.getDocumentFormTypes());
    this.router.navigate(['/document-manager/details']);
  }

}
