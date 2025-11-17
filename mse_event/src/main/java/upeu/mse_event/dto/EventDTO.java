package upeu.mse_event.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventDTO {
    private Long idEvento;
    private String name;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private String modality;
    private String eventType;
    private Integer maxCapacity;
    private Long organizerId;
    private String address;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
