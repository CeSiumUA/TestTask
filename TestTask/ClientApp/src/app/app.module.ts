import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import {MatTableModule, MatToolbarModule} from '@angular/material';
import {EmploymentTableComponent} from './employment/employment-table.component';

const homeRoutes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'employees'},
  {path: 'employees', component: EmploymentTableComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    EmploymentTableComponent
  ],
  imports: [
    RouterModule.forRoot(homeRoutes),
    HttpClientModule,
    BrowserModule,
    FormsModule,
    MatToolbarModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
