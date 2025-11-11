package upeu.ms_participants_service.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upeu.ms_participants_service.dto.*;
import upeu.ms_participants_service.service.ParticipantService;

import java.util.List;

@RestController
@RequestMapping("participants")
@RequiredArgsConstructor
public class ParticipantController {

    private final ParticipantService participantService;

    @PostMapping
    public ResponseEntity<ParticipantDTO> create(@RequestBody CreateParticipantDTO dto) {
        return ResponseEntity.ok(participantService.create(dto));
    }

    @GetMapping
    public ResponseEntity<List<ParticipantDTO>> getAll() {
        return ResponseEntity.ok(participantService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ParticipantDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(participantService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ParticipantDTO> update(@PathVariable Long id, @RequestBody CreateParticipantDTO dto) {
        return ResponseEntity.ok(participantService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        participantService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
