package upeu.ms_participants_service.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import upeu.ms_participants_service.dto.*;
import upeu.ms_participants_service.entity.Participant;
import upeu.ms_participants_service.repository.ParticipantRepository;
import upeu.ms_participants_service.service.ParticipantService;

import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ParticipantServiceImpl implements ParticipantService {

    private final ParticipantRepository participantRepository;

    @Override
    @Transactional
    public ParticipantDTO create(CreateParticipantDTO dto) {
        Participant participant = Participant.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .registrationDate(LocalDateTime.now())
                .build();

        Participant saved = participantRepository.save(participant);
        return toDTO(saved);
    }

    @Override
    public List<ParticipantDTO> findAll() {
        return participantRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ParticipantDTO findById(Long id) {
        Participant p = participantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Participant not found with id: " + id));
        return toDTO(p);
    }

    @Override
    @Transactional
    public ParticipantDTO update(Long id, CreateParticipantDTO dto) {
        Participant p = participantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Participant not found with id: " + id));

        p.setFirstName(dto.getFirstName());
        p.setLastName(dto.getLastName());
        p.setEmail(dto.getEmail());
        p.setPhone(dto.getPhone());

        return toDTO(participantRepository.save(p));
    }

    @Override
    public void delete(Long id) {
        if (!participantRepository.existsById(id)) {
            throw new RuntimeException("Participant not found with id: " + id);
        }
        participantRepository.deleteById(id);
    }

    // 🔹 Conversión manual Entity → DTO
    private ParticipantDTO toDTO(Participant participant) {
        return ParticipantDTO.builder()
                .idParticipant(participant.getIdParticipant())
                .firstName(participant.getFirstName())
                .lastName(participant.getLastName())
                .email(participant.getEmail())
                .phone(participant.getPhone())
                .registrationDate(participant.getRegistrationDate())
                .build();
    }
}
