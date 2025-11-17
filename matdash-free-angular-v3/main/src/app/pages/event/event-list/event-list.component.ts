import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { DatePipe, CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';

import { EventService } from '../../../providers/services/event/event.service';
import { Event } from '../../../models/event.model';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule],
  providers: [DatePipe],
})
export class EventListComponent implements OnInit {

  displayedColumns: string[] = [
    'idEvento',
    'name',
    'startDate',
    'endDate',
    'modality',
    'eventType',
    'status',
    'actions'
  ];

  dataSource = new MatTableDataSource<Event>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private eventService: EventService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAll().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  create(): void {
    this.router.navigate(['/dashboard/events/form']);
  }

  edit(event: Event): void {
    this.router.navigate(['/dashboard/events/form', event.idEvento]);
  }

  delete(event: Event): void {
    if (confirm(`¿Eliminar evento "${event.name}"?`)) {
      this.eventService.delete(event.idEvento).subscribe(() => this.loadEvents());
    }
  }
}
