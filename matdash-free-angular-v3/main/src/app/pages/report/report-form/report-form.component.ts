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
      status: ['IN_PROGRESS'] // default
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
            status: report.status
          });
        });
      }
    });
  }

  saveReport() {
    if (this.reportForm.invalid) return;

    if (this.isEdit) {
      const dto: ReportUpdateDTO = {
        status: this.reportForm.value.status,
        fileUrl: null
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
