import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReportDTO } from '../../../models/report/ReportDTO';
import { ReportService } from '../../../providers/services/report/report.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class ReportListComponent implements OnInit {
  reports: ReportDTO[] = [];
  loading = false;

  displayedColumns: string[] = ['idReport','generatedBy','type','format','status','actions'];

  constructor(private reportService: ReportService, private router: Router) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports() {
    this.loading = true;
    this.reportService.findAll().subscribe({
      next: (data) => {
        this.reports = data;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  editReport(id: number) {
    this.router.navigate(['/reports/edit', id]);
  }

  deleteReport(id: number) {
    if (confirm('¿Seguro que desea eliminar este reporte?')) {
      this.reportService.delete(id).subscribe(() => this.loadReports());
    }
  }

  createReport() {
    this.router.navigate(['/reports/create']);
  }
}


// import { Component, OnInit } from '@angular/core';
// import { Router, RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { ReportDTO } from '../../../models/report/ReportDTO';
// import { ReportService } from '../../../providers/services/report/report.service';
//
// @Component({
//   selector: 'app-report-list',
//   templateUrl: './report-list.component.html',
//   standalone: true,
//   imports: [CommonModule, RouterModule],
// })
// export class ReportListComponent implements OnInit {
//   reports: ReportDTO[] = [];
//   loading = false;
//
//   constructor(private reportService: ReportService, private router: Router) {}
//
//   ngOnInit(): void {
//     this.loadReports();
//   }
//
//   loadReports() {
//     this.loading = true;
//     this.reportService.findAll().subscribe({
//       next: (data) => {
//         this.reports = data;
//         this.loading = false;
//       },
//       error: () => (this.loading = false),
//     });
//   }
//
//   editReport(id: number) {
//     this.router.navigate(['/reports/edit', id]);
//   }
//
//   deleteReport(id: number) {
//     if (confirm('¿Seguro que desea eliminar este reporte?')) {
//       this.reportService.delete(id).subscribe(() => this.loadReports());
//     }
//   }
//
//   createReport() {
//     this.router.navigate(['/reports/create']);
//   }
// }
