// src/app/providers/services/attendance/attendance.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendance, AttendanceGroup } from '../../../models/attendance.model';
import {environment} from "../../../../enviroments/enviroment";

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private baseUrl = `${environment.url}attendances`; // URL completa desde environment

  constructor(private http: HttpClient) {}

  // Listar todas las asistencias
  getAll(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(this.baseUrl);
  }

  // Obtener asistencia por ID
  getById(id: number): Observable<Attendance> {
    return this.http.get<Attendance>(`${this.baseUrl}/${id}`);
  }

  // Crear una nueva asistencia
  create(attendance: Attendance): Observable<Attendance> {
    return this.http.post<Attendance>(this.baseUrl, attendance);
  }

  // Actualizar asistencia existente
  update(id: number, attendance: Attendance): Observable<Attendance> {
    return this.http.put<Attendance>(`${this.baseUrl}/${id}`, attendance);
  }

  // Eliminar asistencia
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }


}
