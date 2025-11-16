// src/app/pages/participant/participant-list/participant-list.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { DatePipe, CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { ParticipantService } from '../../../providers/services/participant/participant.service';
import { Participant } from '../../../models/participant.model';

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule],
  providers: [DatePipe], // <<< Aquí se agregó DatePipe como provider
})
export class ParticipantListComponent implements OnInit {

  displayedColumns: string[] = [
    'idParticipant',
    'firstName',
    'lastName',
    'email',
    'phone',
    'registrationDate',
    'actions'
  ];
  dataSource = new MatTableDataSource<Participant>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private participantService: ParticipantService,
    private router: Router,
    private datePipe: DatePipe // <<< Esto ya funciona porque lo proveímos
  ) {}

  ngOnInit(): void {
    this.loadParticipants();
  }

  loadParticipants(): void {
    this.participantService.getAll().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  create(): void {
    this.router.navigate(['/dashboard/participants/form']);
  }

  edit(participant: Participant): void {
    this.router.navigate(['/dashboard/participants/form', participant.idParticipant]);
  }

  delete(participant: Participant): void {
    if(confirm(`¿Eliminar participante ${participant.firstName} ${participant.lastName}?`)) {
      this.participantService.delete(participant.idParticipant).subscribe(() => this.loadParticipants());
    }
  }
}
