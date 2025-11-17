package upeu.mse_event.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upeu.mse_event.dto.EventDTO;
import upeu.mse_event.service.EventService;

import java.util.List;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    // 🔹 Crear un nuevo evento
    @PostMapping
    public ResponseEntity<EventDTO> createEvent(@RequestBody EventDTO eventDTO) {
        EventDTO created = eventService.create(eventDTO);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // 🔹 Obtener todos los eventos
    @GetMapping
    public ResponseEntity<List<EventDTO>> getAllEvents() {
        List<EventDTO> events = eventService.getAll();
        return ResponseEntity.ok(events);
    }

    // 🔹 Obtener un evento por ID
    @GetMapping("/{id}")
    public ResponseEntity<EventDTO> getEventById(@PathVariable Long id) {
        EventDTO event = eventService.getById(id);
        return ResponseEntity.ok(event);
    }

    // 🔹 Actualizar un evento existente
    @PutMapping("/{id}")
    public ResponseEntity<EventDTO> updateEvent(@PathVariable Long id, @RequestBody EventDTO eventDTO) {
        EventDTO updated = eventService.update(id, eventDTO);
        return ResponseEntity.ok(updated);
    }

    // 🔹 Eliminar un evento
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
