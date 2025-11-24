package upeu.mse_report.service;

import upeu.mse_report.dto.ReportCreateDTO;
import upeu.mse_report.dto.ReportDTO;
import upeu.mse_report.dto.ReportUpdateDTO;

import java.util.List;

public interface ReportService {

    ReportDTO crearReporte(ReportCreateDTO dto);

    List<ReportDTO> listarReportes();

    ReportDTO obtenerReportePorId(Long idReport);

    ReportDTO actualizarReporte(Long idReport, ReportUpdateDTO dto);

    void eliminarReporte(Long idReport);
}
