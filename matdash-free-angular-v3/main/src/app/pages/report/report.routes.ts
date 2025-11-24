import { Routes } from '@angular/router';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportFormComponent } from './report-form/report-form.component';

export const ReportsRoutes: Routes = [
  { path: '', component: ReportListComponent },
  { path: 'create', component: ReportFormComponent },
  { path: 'edit/:id', component: ReportFormComponent },
];
