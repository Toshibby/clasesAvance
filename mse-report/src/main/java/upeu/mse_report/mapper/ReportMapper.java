package upeu.mse_report.mapper;

import org.springframework.stereotype.Component;
import upeu.mse_report.dto.ReportCreateDTO;
import upeu.mse_report.dto.ReportDTO;
import upeu.mse_report.dto.ReportLogDTO;
import upeu.mse_report.dto.ReportUpdateDTO;
import upeu.mse_report.entity.Report;
import upeu.mse_report.entity.ReportLog;

import java.util.stream.Collectors;

@Component
public class ReportMapper {

    public ReportDTO toDTO(Report report) {
        if (report == null) return null;

        ReportDTO dto = new ReportDTO();
        dto.setIdReport(report.getIdReport());
        dto.setGeneratedBy(report.getGeneratedBy());
        dto.setType(report.getType());
        dto.setFormat(report.getFormat());
        dto.setStatus(report.getStatus());
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

    public Report toEntity(ReportCreateDTO dto) {
        return Report.builder()
                .generatedBy(dto.getGeneratedBy())
                .type(dto.getType())
                .format(dto.getFormat())
                .status("IN_PROGRESS") // Valor inicial
                .build();
    }

    public void updateEntity(Report report, ReportUpdateDTO dto) {
        if (dto.getStatus() != null) report.setStatus(dto.getStatus());
        if (dto.getFileUrl() != null) report.setFileUrl(dto.getFileUrl());
    }

    public ReportLogDTO toLogDTO(ReportLog log) {
        ReportLogDTO dto = new ReportLogDTO();
        dto.setIdReportLog(log.getIdReportLog());
        dto.setMessage(log.getMessage());
        dto.setTimestamp(log.getTimestamp());
        dto.setLevel(log.getLevel());
        return dto;
    }
}
