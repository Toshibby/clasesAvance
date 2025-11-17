// src/app/models/notification-template.model.ts

// 🔹 Reutilizamos el mismo enum del modelo principal
import { NotificationType } from './notification.model';

export interface NotificationTemplate {
  idTemplate?: number;

  name: string;
  content: string;

  type: NotificationType;

  enabled: boolean;
}
