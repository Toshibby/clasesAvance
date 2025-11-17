import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../enviroments/enviroment';
import {NotificationTemplate} from "../../../models/notification.template.model";

@Injectable({
  providedIn: 'root'
})
export class NotificationTemplateService {

  private baseUrl = `${environment.url}templates`;

  constructor(private http: HttpClient) {}

  // Listar plantillas
  getAll(): Observable<NotificationTemplate[]> {
    return this.http.get<NotificationTemplate[]>(this.baseUrl);
  }

  // Obtener plantilla por ID
  getById(id: number): Observable<NotificationTemplate> {
    return this.http.get<NotificationTemplate>(`${this.baseUrl}/${id}`);
  }

  // Crear plantilla
  create(template: NotificationTemplate): Observable<NotificationTemplate> {
    return this.http.post<NotificationTemplate>(this.baseUrl, template);
  }

  // Actualizar plantilla
  update(id: number, template: NotificationTemplate): Observable<NotificationTemplate> {
    return this.http.put<NotificationTemplate>(`${this.baseUrl}/${id}`, template);
  }

  // Eliminar plantilla
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
