// src/app/providers/services/participant/participant.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participant, CreateParticipantDTO } from '../../../models/participant.model';
import {environment} from "../../../../enviroments/enviroment";


@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  private baseUrl = `${environment.url}participants`; // construye URL completa

  constructor(private http: HttpClient) {}

  getAll(): Observable<Participant[]> {
    return this.http.get<Participant[]>(this.baseUrl);
  }

  getById(id: number): Observable<Participant> {
    return this.http.get<Participant>(`${this.baseUrl}/${id}`);
  }

  create(dto: CreateParticipantDTO): Observable<Participant> {
    return this.http.post<Participant>(this.baseUrl, dto);
  }

  update(id: number, dto: CreateParticipantDTO): Observable<Participant> {
    return this.http.put<Participant>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
