import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { DatePipe, CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { NotificationService } from '../../../providers/services/notification/notification.service';
import { Notification } from '../../../models/notification.model';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule],
  providers: [DatePipe],
})
export class NotificationListComponent implements OnInit {

  displayedColumns: string[] = [
    'idNotification',
    'observations', // reemplaza authUser
    'status',
    'timestamp',
    'actions'
  ];

  dataSource = new MatTableDataSource<Notification>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getAll().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  create(): void {
    this.router.navigate(['/dashboard/notifications/form']);
  }

  edit(notification: Notification): void {
    if(notification.idNotification) {
      this.router.navigate(['/dashboard/notifications/form', notification.idNotification]);
    }
  }

  delete(notification: Notification): void {
    if(notification.idNotification && confirm(`¿Eliminar notificación "${notification.message}"?`)) {
      this.notificationService.delete(notification.idNotification)
        .subscribe(() => this.loadNotifications());
    }
  }
}
