import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ReportLogDTO} from "../../../models/report/ReportLogDTO";
import {ReportLogCreateDTO} from "../../../models/report/ReportLogCreateDTO";


@Injectable({
  providedIn: 'root'
})
export class ReportLogService {

  private baseUrl = 'http://localhost:8080/report-logs';

  constructor(private http: HttpClient) {}

  // CREATE LOG FOR REPORT
  create(reportId: number, dto: ReportLogCreateDTO): Observable<ReportLogDTO> {
    return this.http.post<ReportLogDTO>(`${this.baseUrl}/${reportId}`, dto);
  }

  // LIST ALL LOGS
  findAll(): Observable<ReportLogDTO[]> {
    return this.http.get<ReportLogDTO[]>(`${this.baseUrl}`);
  }

  // LIST BY REPORT
  findByReport(idReport: number): Observable<ReportLogDTO[]> {
    return this.http.get<ReportLogDTO[]>(`${this.baseUrl}/report/${idReport}`);
  }

  // FIND ONE
  findById(id: number): Observable<ReportLogDTO> {
    return this.http.get<ReportLogDTO>(`${this.baseUrl}/${id}`);
  }

  // DELETE
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
