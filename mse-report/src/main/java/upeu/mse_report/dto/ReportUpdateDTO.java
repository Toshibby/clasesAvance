package upeu.mse_report.dto;

import lombok.Data;
import upeu.mse_report.enums.ReportFormat;
import upeu.mse_report.enums.ReportStatus;
import upeu.mse_report.enums.ReportType;

@Data
public class ReportUpdateDTO {
    private String generatedBy;       // nuevo generador
    private ReportType type;          // tipo de reporte
    private ReportFormat format;      // formato del reporte
    private ReportStatus status;      // GENERATED, FAILED, IN_PROGRESS
    private String fileUrl;           // puede ser null si todavía no existe
}
