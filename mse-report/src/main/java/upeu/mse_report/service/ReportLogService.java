package upeu.mse_report.service;

import upeu.mse_report.dto.ReportLogCreateDTO;
import upeu.mse_report.dto.ReportLogDTO;

import java.util.List;

public interface ReportLogService {

    ReportLogDTO crearLog(Long reportId, ReportLogCreateDTO dto);

    List<ReportLogDTO> listarLogs();

    List<ReportLogDTO> listarLogsPorReporte(Long idReport);

    ReportLogDTO obtenerLogPorId(Long idReportLog);

    void eliminarLog(Long idReportLog);
}
