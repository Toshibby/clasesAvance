import {ReportLogDTO} from "./ReportLogDTO";


export interface ReportDTO {
  idReport: number;
  generatedBy: string;
  type: string;
  format: string;
  status: string;

  createdAt: string;    // LocalDateTime -> string
  generatedAt: string;  // LocalDateTime -> string

  fileUrl: string | null;

  logs: ReportLogDTO[];
}
