package upeu.mse_report.dto;


import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ReportLogDTO {
    private Long idReportLog;
    private String message;
    private LocalDateTime timestamp;
    private String level;
}
