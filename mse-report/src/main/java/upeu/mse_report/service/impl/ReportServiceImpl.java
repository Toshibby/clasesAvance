package upeu.mse_report.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import upeu.mse_report.dto.ReportCreateDTO;
import upeu.mse_report.dto.ReportDTO;
import upeu.mse_report.dto.ReportUpdateDTO;
import upeu.mse_report.entity.Report;
import upeu.mse_report.entity.ReportLog;
import upeu.mse_report.mapper.ReportMapper;
import upeu.mse_report.repository.ReportRepository;
import upeu.mse_report.service.ReportService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;
    private final ReportMapper mapper;

    // ---------------------------------------------------------------------
    // CREAR REPORTE + LOG AUTOMÁTICO
    // ---------------------------------------------------------------------
    @Override
    public ReportDTO crearReporte(ReportCreateDTO dto) {

        // Convertir el DTO a entidad básica
        Report report = mapper.toEntity(dto);

        // Status por defecto
        report.setStatus("IN_PROGRESS");
        report.setCreatedAt(LocalDateTime.now());

        // Crear log automático
        ReportLog log = ReportLog.builder()
                .message("Reporte creado correctamente.")
                .level("INFO")
                .timestamp(LocalDateTime.now())
                .report(report)
                .build();

        // Agregar el log a la lista
        List<ReportLog> logs = new ArrayList<>();
        logs.add(log);
        report.setLogs(logs);

        // Guardar
        Report saved = reportRepository.save(report);

        return mapper.toDTO(saved);
    }

    // ---------------------------------------------------------------------
    // LISTAR
    // ---------------------------------------------------------------------
    @Override
    public List<ReportDTO> listarReportes() {
        return reportRepository.findAll()
                .stream()
                .map(mapper::toDTO)
                .toList();
    }

    // ---------------------------------------------------------------------
    // OBTENER POR ID
    // ---------------------------------------------------------------------
    @Override
    public ReportDTO obtenerReportePorId(Long idReport) {
        Report report = reportRepository.findById(idReport)
                .orElseThrow(() -> new RuntimeException("Reporte no encontrado con ID: " + idReport));
        return mapper.toDTO(report);
    }

    // ---------------------------------------------------------------------
    // ACTUALIZAR REPORTE + LOG AUTOMÁTICO
    // ---------------------------------------------------------------------
    @Override
    public ReportDTO actualizarReporte(Long idReport, ReportUpdateDTO dto) {

        Report report = reportRepository.findById(idReport)
                .orElseThrow(() -> new RuntimeException("Reporte no encontrado con ID: " + idReport));

        // Actualizar campos desde el DTO
        mapper.updateEntity(report, dto);

        // LOG AUTOMÁTICO
        ReportLog log = ReportLog.builder()
                .message("Reporte actualizado. Nuevo estado: " + dto.getStatus())
                .level("INFO")
                .timestamp(LocalDateTime.now())
                .report(report)
                .build();

        report.getLogs().add(log);

        // Guardar cambios
        Report saved = reportRepository.save(report);

        return mapper.toDTO(saved);
    }

    // ---------------------------------------------------------------------
    // ELIMINAR
    // ---------------------------------------------------------------------
    @Override
    public void eliminarReporte(Long idReport) {
        if (!reportRepository.existsById(idReport)) {
            throw new RuntimeException("Reporte no encontrado con ID: " + idReport);
        }
        reportRepository.deleteById(idReport);
    }
}
