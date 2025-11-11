package upeu.ms_participants_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import upeu.ms_participants_service.entity.Participant;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Long> {
}
