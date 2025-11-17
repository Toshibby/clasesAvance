package upeu.mse_event.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import upeu.mse_event.entity.Event;

public interface EventRepository extends JpaRepository<Event, Long> {
}
