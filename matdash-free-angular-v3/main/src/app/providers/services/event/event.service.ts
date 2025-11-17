// src/app/providers/services/event/event.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../../../models/event.model';
import { environment } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private baseUrl = `${environment.url}events`; // Coincide con @RequestMapping("/events")

  constructor(private http: HttpClient) {}

  // 🔹 Obtener todos los eventos
  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl);
  }

  // 🔹 Obtener un evento por ID
  getById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/${id}`);
  }

  // 🔹 Crear un nuevo evento
  create(event: Event): Observable<Event> {
    return this.http.post<Event>(this.baseUrl, event);
  }

  // 🔹 Actualizar un evento existente
  update(id: number, event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.baseUrl}/${id}`, event);
  }

  // 🔹 Eliminar evento
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
