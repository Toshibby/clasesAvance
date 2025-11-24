package upeu.mse_report.dto;

import lombok.Data;

@Data
public class ReportUpdateDTO {
    private String status;   // GENERATED, FAILED, IN_PROGRESS
    private String fileUrl;  // puede ser null si todavía no existe
}
