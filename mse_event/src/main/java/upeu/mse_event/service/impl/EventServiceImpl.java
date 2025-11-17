package upeu.mse_event.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import upeu.mse_event.dto.EventDTO;
import upeu.mse_event.entity.Event;
import upeu.mse_event.repository.EventRepository;
import upeu.mse_event.service.EventService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;

    private EventDTO toDTO(Event entity) {
        return EventDTO.builder()
                .idEvento(entity.getIdEvento())
                .name(entity.getName())
                .description(entity.getDescription())
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .modality(entity.getModality())
                .eventType(entity.getEventType())
                .maxCapacity(entity.getMaxCapacity())
                .organizerId(entity.getOrganizerId())
                .address(entity.getAddress())
                .status(entity.getStatus())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    private Event toEntity(EventDTO dto) {
        return Event.builder()
                .idEvento(dto.getIdEvento())
                .name(dto.getName())
                .description(dto.getDescription())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .modality(dto.getModality())
                .eventType(dto.getEventType())
                .maxCapacity(dto.getMaxCapacity())
                .organizerId(dto.getOrganizerId())
                .address(dto.getAddress())
                .status(dto.getStatus())
                .createdAt(dto.getCreatedAt())
                .updatedAt(dto.getUpdatedAt())
                .build();
    }

    @Override
    public EventDTO create(EventDTO eventDTO) {
        Event entity = toEntity(eventDTO);
        Event saved = eventRepository.save(entity);
        return toDTO(saved);
    }

    @Override
    public EventDTO update(Long id, EventDTO eventDTO) {
        Event existing = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with id " + id));

        existing.setName(eventDTO.getName());
        existing.setDescription(eventDTO.getDescription());
        existing.setStartDate(eventDTO.getStartDate());
        existing.setEndDate(eventDTO.getEndDate());
        existing.setModality(eventDTO.getModality());
        existing.setEventType(eventDTO.getEventType());
        existing.setMaxCapacity(eventDTO.getMaxCapacity());
        existing.setOrganizerId(eventDTO.getOrganizerId());
        existing.setAddress(eventDTO.getAddress());
        existing.setStatus(eventDTO.getStatus());

        Event updated = eventRepository.save(existing);
        return toDTO(updated);
    }

    @Override
    public EventDTO getById(Long id) {
        Event entity = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with id " + id));
        return toDTO(entity);
    }

    @Override
    public List<EventDTO> getAll() {
        return eventRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        Event entity = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with id " + id));
        eventRepository.delete(entity);
    }
}
