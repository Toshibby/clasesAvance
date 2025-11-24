import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ReportUpdateDTO} from "../../../models/report/ReportUpdateDTO";
import {ReportDTO} from "../../../models/report/ReportDTO";
import {ReportCreateDTO} from "../../../models/report/ReportCreateDTO";
import {environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private readonly baseUrl =  `${environment.url}reports`;

  constructor(private http: HttpClient) {}

  // CREATE
  create(dto: ReportCreateDTO): Observable<ReportDTO> {
    return this.http.post<ReportDTO>(`${this.baseUrl}`, dto);
  }

  // LIST ALL
  findAll(): Observable<ReportDTO[]> {
    return this.http.get<ReportDTO[]>(`${this.baseUrl}`);
  }

  // FIND BY ID
  findById(id: number): Observable<ReportDTO> {
    return this.http.get<ReportDTO>(`${this.baseUrl}/${id}`);
  }

  // UPDATE
  update(id: number, dto: ReportUpdateDTO): Observable<ReportDTO> {
    return this.http.put<ReportDTO>(`${this.baseUrl}/${id}`, dto);
  }

  // DELETE
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
