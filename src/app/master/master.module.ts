import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule, MatSidenavModule, MatCheckboxModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MasterComponent } from './master.component';
import { SidemenuItemComponent } from './sidemenu-item/sidemenu-item.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { ListComponent } from './list/list.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { UserMenuComponent } from './user-menu/user-menu.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

// export const appRoutes: Routes = [{ 
//   path:'',component: MasterComponent, children: [
//     {path: 'document-manager', component: DocumentManagerComponent},
//      {path: 'addnew', component: CreateDocumentComponent},
//      {path: 'details', component: DocumentDetailsComponent},
//   ]}
// ]

export const appRoutes: Routes = [{
  path: '', component: MasterComponent, children: [
    { path: 'document-manager', loadChildren: '../document-manager/master-document.module#MasterDocumentModule' },
  ]
}
]

@NgModule({

  declarations: [
    MasterComponent,
    SidemenuComponent,
    SidemenuItemComponent,
    ListComponent,
    ToolbarComponent,
    UserMenuComponent
  ],

  imports: [
    RouterModule.forRoot(appRoutes),
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatChipsModule,
    MatListModule,
    MatCheckboxModule,
    CommonModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    MatButtonModule,
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})

export class MasterModule { }