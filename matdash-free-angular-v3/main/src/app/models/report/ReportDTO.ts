import { ReportType, ReportFormat, ReportStatus } from './report.enums';
import { ReportLogDTO } from './ReportLogDTO';

export interface ReportDTO {
  idReport: number;
  generatedBy: string;
  type: ReportType;
  format: ReportFormat;
  status: ReportStatus;

  createdAt: string;
  generatedAt: string;

  fileUrl: string | null;

  logs: ReportLogDTO[];
}
