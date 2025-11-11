package upeu.ms_participants_service.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParticipantDTO {
    private Long idParticipant;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private LocalDateTime registrationDate;
}
