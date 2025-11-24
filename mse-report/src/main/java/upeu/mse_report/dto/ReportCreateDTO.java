package upeu.mse_report.dto;

import lombok.Data;
import upeu.mse_report.enums.ReportFormat;
import upeu.mse_report.enums.ReportType;

@Data
public class ReportCreateDTO {
    private String generatedBy;
    private ReportType type;
    private ReportFormat format;
    private String fileUrl; // opcional, puede ser null
}
