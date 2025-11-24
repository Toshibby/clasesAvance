import { ReportType, ReportFormat, ReportStatus } from './report.enums';

export interface ReportUpdateDTO {
  generatedBy: string;       // nuevo generador
  type: ReportType;          // tipo de reporte
  format: ReportFormat;      // formato del reporte
  status: ReportStatus;      // GENERATED, FAILED, IN_PROGRESS
  fileUrl: string | null;    // puede ser null si todavía no existe
}
