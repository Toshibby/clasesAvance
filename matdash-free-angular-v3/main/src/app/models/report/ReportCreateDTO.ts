import { ReportType, ReportFormat } from './report.enums';

export interface ReportCreateDTO {
  generatedBy: string;
  type: ReportType;
  format: ReportFormat;
  fileUrl: string; // obligatorio al crear
}
