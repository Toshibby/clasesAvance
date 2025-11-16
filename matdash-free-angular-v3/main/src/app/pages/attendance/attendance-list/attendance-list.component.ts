import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { DatePipe, CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { AttendanceService } from '../../../providers/services/attendance/attendance.service';
import { Attendance } from '../../../models/attendance.model';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule],
  providers: [DatePipe],
})
export class AttendanceListComponent implements OnInit {

  displayedColumns: string[] = [
    'idAttendance',
    'participant',
    'event',
    'authUser',
    'status',
    'timestamp',
    'actions'
  ];
  dataSource = new MatTableDataSource<Attendance>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private attendanceService: AttendanceService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadAttendances();
  }

  loadAttendances(): void {
    this.attendanceService.getAll().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  create(): void {
    this.router.navigate(['/dashboard/attendance/form']);
  }

  edit(attendance: Attendance): void {
    if(attendance.idAttendance) {
      this.router.navigate(['/dashboard/attendance/form', attendance.idAttendance]);
    }
  }

  delete(attendance: Attendance): void {
    if(attendance.idAttendance && confirm(`¿Eliminar asistencia del participante ${attendance.participantDTO.firstName} ${attendance.participantDTO.lastName}?`)) {
      this.attendanceService.delete(attendance.idAttendance).subscribe(() => this.loadAttendances());
    }
  }
}
