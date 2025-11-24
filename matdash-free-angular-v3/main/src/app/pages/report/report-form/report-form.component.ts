import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { ReportService } from '../../../providers/services/report/report.service';
import { ReportUpdateDTO } from '../../../models/report/ReportUpdateDTO';
import { ReportCreateDTO } from '../../../models/report/ReportCreateDTO';
import { ReportType, ReportFormat, ReportStatus } from '../../../models/report/report.enums';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class ReportFormComponent implements OnInit {
  reportForm: FormGroup;
  isEdit = false;
  reportId!: number;

  reportTypes: ReportType[] = ['GENERAL', 'EVENT_SUMMARY', 'USER_ATTENDANCE'];
  reportFormats: ReportFormat[] = ['PDF', 'CSV', 'EXCEL'];
  reportStatuses: ReportStatus[] = ['GENERATED', 'IN_PROGRESS', 'FAILED'];

  constructor(
    private fb: FormBuilder,
    private reportService: ReportService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.reportForm = this.fb.group({
      generatedBy: ['', Validators.required],
      type: ['', Validators.required],
      format: ['', Validators.required],
      fileUrl: ['', Validators.required],
      status: ['IN_PROGRESS', Validators.required] // default
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEdit = true;
        this.reportId = +params['id'];
        this.reportService.findById(this.reportId).subscribe((report) => {
          this.reportForm.patchValue({
            generatedBy: report.generatedBy,
            type: report.type,
            format: report.format,
            fileUrl: report.fileUrl ?? '',
            status: report.status
          });
        });
      }
    });
  }

  saveReport() {
    if (this.reportForm.invalid) return;

    if (this.isEdit) {
      // Enviar todos los campos editables al backend
      const dto: ReportUpdateDTO = {
        generatedBy: this.reportForm.value.generatedBy,
        type: this.reportForm.value.type,
        format: this.reportForm.value.format,
        status: this.reportForm.value.status,
        fileUrl: this.reportForm.value.fileUrl
      };
      this.reportService.update(this.reportId, dto).subscribe(() => {
        this.router.navigate(['/reports']);
      });
    } else {
      const dto: ReportCreateDTO = this.reportForm.value;
      this.reportService.create(dto).subscribe(() => {
        this.router.navigate(['/reports']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/reports']);
  }
}
