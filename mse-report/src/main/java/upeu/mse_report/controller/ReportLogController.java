package upeu.mse_report.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upeu.mse_report.dto.ReportLogCreateDTO;
import upeu.mse_report.dto.ReportLogDTO;
import upeu.mse_report.entity.ReportLog;
import upeu.mse_report.service.ReportLogService;

import java.util.List;

@RestController
@RequestMapping("/report-logs")
@RequiredArgsConstructor
public class ReportLogController {

    private final ReportLogService logService;

    @PostMapping("/{reportId}")
    public ResponseEntity<ReportLogDTO> crearLog(
            @PathVariable Long reportId,
            @RequestBody ReportLogCreateDTO dto) {
        return ResponseEntity.ok(logService.crearLog(reportId, dto));
    }

    @GetMapping
    public ResponseEntity<List<ReportLogDTO>> listarLogs() {
        return ResponseEntity.ok(logService.listarLogs());
    }

    @GetMapping("/report/{idReport}")
    public ResponseEntity<List<ReportLogDTO>> listarPorReporte(@PathVariable Long idReport) {
        return ResponseEntity.ok(logService.listarLogsPorReporte(idReport));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReportLogDTO> obtenerLog(@PathVariable Long id) {
        return ResponseEntity.ok(logService.obtenerLogPorId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarLog(@PathVariable Long id) {
        logService.eliminarLog(id);
        return ResponseEntity.noContent().build();
    }
}
