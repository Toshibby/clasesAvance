package upeu.mse_report.dto;

import lombok.Data;

@Data
public class ReportCreateDTO {
    private String generatedBy;
    private String type;
    private String format;
}
