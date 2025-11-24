package upeu.mse_report.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import upeu.mse_report.dto.ReportLogCreateDTO;
import upeu.mse_report.dto.ReportLogDTO;
import upeu.mse_report.entity.Report;
import upeu.mse_report.entity.ReportLog;
import upeu.mse_report.mapper.ReportMapper;
import upeu.mse_report.repository.ReportLogRepository;
import upeu.mse_report.repository.ReportRepository;
import upeu.mse_report.service.ReportLogService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportLogServiceImpl implements ReportLogService {

    private final ReportLogRepository logRepository;
    private final ReportRepository reportRepository;
    private final ReportMapper mapper;

    @Override
    public ReportLogDTO crearLog(Long reportId, ReportLogCreateDTO dto) {

        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Reporte no encontrado"));

        ReportLog log = ReportLog.builder()
                .message(dto.getMessage())
                .level(dto.getLevel())
                .report(report)
                .build();

        return mapper.toLogDTO(logRepository.save(log));
    }

    @Override
    public List<ReportLogDTO> listarLogs() {
        return logRepository.findAll()
                .stream()
                .map(mapper::toLogDTO)
                .toList();
    }

    @Override
    public List<ReportLogDTO> listarLogsPorReporte(Long idReport) {
        return logRepository.findByReport_IdReport(idReport)
                .stream()
                .map(mapper::toLogDTO)
                .toList();
    }

    @Override
    public ReportLogDTO obtenerLogPorId(Long idReportLog) {
        ReportLog log = logRepository.findById(idReportLog)
                .orElseThrow(() -> new RuntimeException("Log no encontrado"));
        return mapper.toLogDTO(log);
    }

    @Override
    public void eliminarLog(Long idReportLog) {
        if (!logRepository.existsById(idReportLog)) {
            throw new RuntimeException("Log no encontrado con ID: " + idReportLog);
        }
        logRepository.deleteById(idReportLog);
    }
}
