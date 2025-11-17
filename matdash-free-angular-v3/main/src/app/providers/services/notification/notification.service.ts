import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../../../models/notification.model';
import { environment } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl = `${environment.url}notifications`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.baseUrl);
  }

  getById(id: number): Observable<Notification> {
    return this.http.get<Notification>(`${this.baseUrl}/${id}`);
  }

  create(notification: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, notification);
  }


  updateStatus(id: number, status: string): Observable<Notification> {
    return this.http.put<Notification>(`${this.baseUrl}/${id}/status`, null, { params: { status } });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
