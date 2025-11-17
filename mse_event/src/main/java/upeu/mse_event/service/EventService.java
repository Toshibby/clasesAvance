package upeu.mse_event.service;

import upeu.mse_event.dto.EventDTO;
import java.util.List;

public interface EventService {
    EventDTO create(EventDTO eventDTO);
    EventDTO update(Long id, EventDTO eventDTO);
    EventDTO getById(Long id);
    List<EventDTO> getAll();
    void delete(Long id);
}
