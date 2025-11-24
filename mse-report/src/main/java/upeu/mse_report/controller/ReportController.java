package upeu.mse_report.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upeu.mse_report.dto.ReportCreateDTO;
import upeu.mse_report.dto.ReportDTO;
import upeu.mse_report.dto.ReportUpdateDTO;
import upeu.mse_report.entity.Report;
import upeu.mse_report.service.ReportService;

import java.util.List;
@RestController
@RequestMapping("/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @PostMapping
    public ResponseEntity<ReportDTO> crearReporte(@Valid @RequestBody ReportCreateDTO dto) {
        ReportDTO created = reportService.crearReporte(dto);
        return ResponseEntity.ok(created);
    }

    @GetMapping
    public ResponseEntity<List<ReportDTO>> listarReportes() {
        return ResponseEntity.ok(reportService.listarReportes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReportDTO> obtenerReporte(@PathVariable Long id) {
        return ResponseEntity.ok(reportService.obtenerReportePorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReportDTO> actualizarReporte(
            @PathVariable Long id,
            @RequestBody ReportUpdateDTO dto) {

        return ResponseEntity.ok(reportService.actualizarReporte(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarReporte(@PathVariable Long id) {
        reportService.eliminarReporte(id);
        return ResponseEntity.noContent().build();
    }
}
