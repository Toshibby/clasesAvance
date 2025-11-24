package upeu.mse_report.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import upeu.mse_report.enums.ReportFormat;
import upeu.mse_report.enums.ReportStatus;
import upeu.mse_report.enums.ReportType;

@Data
public class ReportDTO {
    private Long idReport;
    private String generatedBy;
    private ReportType type;
    private ReportFormat format;
    private ReportStatus status;

    private LocalDateTime createdAt;
    private LocalDateTime generatedAt;

    private String fileUrl;

    private List<ReportLogDTO> logs;
}
