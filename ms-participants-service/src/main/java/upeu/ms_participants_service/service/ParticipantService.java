package upeu.ms_participants_service.service;

import upeu.ms_participants_service.dto.*;

import java.util.List;

public interface ParticipantService {
    ParticipantDTO create(CreateParticipantDTO dto);
    List<ParticipantDTO> findAll();
    ParticipantDTO findById(Long id);
    ParticipantDTO update(Long id, CreateParticipantDTO dto);
    void delete(Long id);
}
