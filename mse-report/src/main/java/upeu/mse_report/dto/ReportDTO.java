package upeu.mse_report.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class ReportDTO {
    private Long idReport;
    private String generatedBy;
    private String type;
    private String format;
    private String status;

    private LocalDateTime createdAt;
    private LocalDateTime generatedAt;

    private String fileUrl;

    private List<ReportLogDTO> logs;
}
