import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';

import { AttendanceService } from '../../../providers/services/attendance/attendance.service';
import { ParticipantService } from '../../../providers/services/participant/participant.service';

import { Attendance, AttendanceStatus, CheckInMethod } from '../../../models/attendance.model';
import { Participant } from "../../../models/participant.model";

@Component({
  selector: 'app-attendance-form',
  templateUrl: './attendance-form.component.html',
  styleUrls: ['./attendance-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterLink],
})
export class AttendanceFormComponent implements OnInit {

  form!: FormGroup;
  attendanceId?: number;
  isEditMode = false;

  participants: Participant[] = [];

  // 🔹 NUEVO: Arrays de enums para el select
  statusOptions = Object.values(AttendanceStatus);       // 🔹 NUEVO
  checkInMethodOptions = Object.values(CheckInMethod);  // 🔹 NUEVO

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService,
    private participantService: ParticipantService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      participantId: ['', Validators.required],
      status: ['', Validators.required],
      checkInMethod: [''],
      observations: [''],
    });

    this.loadParticipants();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.attendanceId = +params['id'];
        this.isEditMode = true;
        this.loadAttendance(this.attendanceId);
      }
    });
  }

  loadParticipants(): void {
    this.participantService.getAll().subscribe(data => {
      this.participants = data;
    });
  }

  loadAttendance(id: number): void {
    this.attendanceService.getById(id).subscribe(att => {
      this.form.patchValue({
        participantId: att.participantDTO.idParticipant,
        status: att.status,
        checkInMethod: att.checkInMethod,
        observations: att.observations
      });
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    const selectedParticipant = this.participants.find(
      p => p.idParticipant === +this.form.value.participantId
    );

    const attendance: Attendance = {
      ...this.form.value,
      authUserDTO: { id: 1, userName: 'currentUser' },
      eventDTO: { idEvento: 1, name: 'Evento Demo' },
      participantDTO: selectedParticipant!
    };

    if (this.isEditMode && this.attendanceId) {
      this.attendanceService.update(this.attendanceId, attendance).subscribe(() => {
        this.router.navigate(['/dashboard/attendance']);
      });
    } else {
      this.attendanceService.create(attendance).subscribe(() => {
        this.router.navigate(['/dashboard/attendance']);
      });
    }
  }
}
// 🔹 MODIFICACIONES: se agregaron `statusOptions` y `checkInMethodOptions`
// 🔹 NINGUNA ELIMINACIÓN NECESARIA
