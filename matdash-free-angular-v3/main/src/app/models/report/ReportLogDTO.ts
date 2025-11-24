export interface ReportLogDTO {
  idReportLog: number;
  message: string;
  timestamp: string; // LocalDateTime -> string
  level: string;
}
