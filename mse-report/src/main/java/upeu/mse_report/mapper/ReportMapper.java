package upeu.mse_report.mapper;

import org.springframework.stereotype.Component;
import upeu.mse_report.dto.ReportCreateDTO;
import upeu.mse_report.dto.ReportDTO;
import upeu.mse_report.dto.ReportLogDTO;
import upeu.mse_report.dto.ReportUpdateDTO;
import upeu.mse_report.entity.Report;
import upeu.mse_report.entity.ReportLog;
import upeu.mse_report.enums.ReportFormat;
import upeu.mse_report.enums.ReportStatus;
import upeu.mse_report.enums.ReportType;

import java.util.stream.Collectors;

@Component
public class ReportMapper {

    // ---------------------- CONVERTIR A DTO ----------------------
    public ReportDTO toDTO(Report report) {
        if (report == null) return null;

        ReportDTO dto = new ReportDTO();
        dto.setIdReport(report.getIdReport());
        dto.setGeneratedBy(report.getGeneratedBy());
        dto.setType(report.getType());       // enum
        dto.setFormat(report.getFormat());   // enum
        dto.setStatus(report.getStatus());   // enum
        dto.setCreatedAt(report.getCreatedAt());
        dto.setGeneratedAt(report.getGeneratedAt());
        dto.setFileUrl(report.getFileUrl());

        if (report.getLogs() != null) {
            dto.setLogs(
                    report.getLogs()
                            .stream()
                            .map(this::toLogDTO)
                            .collect(Collectors.toList())
            );
        }

        return dto;
    }

    // ---------------------- CONVERTIR DE DTO A ENTIDAD ----------------------
    public Report toEntity(ReportCreateDTO dto) {
        return Report.builder()
                .generatedBy(dto.getGeneratedBy())
                .type(dto.getType() != null ? dto.getType() : ReportType.GENERAL)
                .format(dto.getFormat() != null ? dto.getFormat() : ReportFormat.PDF)
                .status(ReportStatus.IN_PROGRESS)
                .fileUrl(dto.getFileUrl()) // <-- AGREGAR ESTO
                .build();
    }


    // ---------------------- ACTUALIZAR ENTIDAD ----------------------
    public void updateEntity(Report report, ReportUpdateDTO dto) {
        if (dto.getGeneratedBy() != null) report.setGeneratedBy(dto.getGeneratedBy());
        if (dto.getType() != null) report.setType(dto.getType());
        if (dto.getFormat() != null) report.setFormat(dto.getFormat());
        if (dto.getStatus() != null) report.setStatus(dto.getStatus());
        if (dto.getFileUrl() != null) report.setFileUrl(dto.getFileUrl());
    }


    // ---------------------- LOG ----------------------
    public ReportLogDTO toLogDTO(ReportLog log) {
        if (log == null) return null;

        ReportLogDTO dto = new ReportLogDTO();
        dto.setIdReportLog(log.getIdReportLog());
        dto.setMessage(log.getMessage());
        dto.setTimestamp(log.getTimestamp());
        dto.setLevel(log.getLevel());
        return dto;
    }
}
