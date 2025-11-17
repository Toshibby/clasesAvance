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

  // Listar todas las notificaciones
  getAll(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.baseUrl);
  }

  // Obtener notificación por ID
  getById(id: number): Observable<Notification> {
    return this.http.get<Notification>(`${this.baseUrl}/${id}`);
  }

  // Crear notificación
  create(notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(this.baseUrl, notification);
  }

  // Actualizar notificación
  update(id: number, notification: Notification): Observable<Notification> {
    return this.http.put<Notification>(`${this.baseUrl}/${id}`, notification);
  }

  // Eliminar notificación
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
