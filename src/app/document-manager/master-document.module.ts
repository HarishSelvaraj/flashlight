import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule, MatTooltipModule, MatChipsModule, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatSelectModule, MatDividerModule, MatCheckboxModule, MatAutocompleteModule } from '@angular/material';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DocumentDetailsComponent } from './document-details/document-details/document-details.component';
import { DocumentManagerComponent } from './document-manager/document-manager.component';
import { CreateDocumentComponent } from './create-document/create-document.component';
import { MasterDocumentComponent } from './master-document.component';
import { DocumentManagerService } from './services/document-manager.service';
import { SharedComponent } from './document-details/shared/shared.component';
import { HeaderComponent } from './document-details/tabs/header/header.component';
import { NavComponent } from './document-details/tabs/nav/nav.component';
import { BodyComponent } from './document-details/tabs/body/body.component';
import { ReportsComponent } from './document-details/tabs/reports/reports.component';
import { GeneralServiceService } from '../service/general-service.service';
import { HttpClientModule } from '@angular/common/http';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

// export const appRoutes: Routes = [
//   { path: '', component: DocumentManagerComponent },
//   { path: 'addnew', component: CreateDocumentComponent },
// ]

// export const appRoutes: Routes = [{
//   path: '', component: MasterDocumentComponent, children: [
//     { path: '', component: DocumentManagerComponent},
//     { path: 'addnew', component: CreateDocumentComponent },
//   ]
// }
// ]


export const appRoutes: Routes = [
  { path: '',  component: MasterDocumentComponent,
  children: [
    { path: '', component: DocumentManagerComponent },
    { path: 'addnew', component: CreateDocumentComponent },
    { path: 'details/:formType', component: DocumentDetailsComponent }
  ] },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatSidenavModule,
    PerfectScrollbarModule,
    MatTooltipModule,
    MatChipsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatCheckboxModule,
    HttpClientModule,
    MatAutocompleteModule
  ],
  declarations: [MasterDocumentComponent,
    DocumentManagerComponent,
    CreateDocumentComponent,
    DocumentDetailsComponent,
    SharedComponent,
    HeaderComponent,
    NavComponent,
    BodyComponent,
    ReportsComponent
  ],
  providers: [GeneralServiceService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    DocumentManagerService,    
  ]
})
export class MasterDocumentModule { }
