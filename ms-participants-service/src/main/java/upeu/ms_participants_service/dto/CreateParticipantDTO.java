package upeu.ms_participants_service.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateParticipantDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
}
