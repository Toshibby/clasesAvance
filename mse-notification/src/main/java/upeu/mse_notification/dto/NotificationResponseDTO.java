package upeu.mse_notification.dto;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class NotificationResponseDTO {

    private Long notificationId;
    private String title;
    private String message;
    private String status; // PENDING, SENT, ERROR
    private String emailTo;
    private LocalDateTime sentAt;
}
