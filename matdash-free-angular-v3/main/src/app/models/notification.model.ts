// src/app/models/notification.model.ts

// 🔹 Tipos de notificación
export enum NotificationType {
  ATTENDANCE_ALERT = 'ATTENDANCE_ALERT',
  EVENT_REMINDER = 'EVENT_REMINDER',
  GENERAL = 'GENERAL',
}

// 🔹 Estado de la notificación
export enum NotificationStatus {
  SENT = 'SENT',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
}

// 🔹 DTO relacionado: AuthUser
export interface AuthUser {
  id: number;
  userName: string;
}

// 🔹 DTO relacionado: Event
export interface Event {
  idEvento: number;
  name: string;
  description?: string;
  startDate?: string; // ISO string
  endDate?: string;
  modality?: string;
  eventType?: string;
  maxCapacity?: number;
  organizerId?: number;
  address?: string;
  status?: string;
}

// 🔹 DTO relacionado: Participant
export interface Participant {
  idParticipant: number;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  registrationDate?: string;
}

// 🔹 Notification principal
export interface Notification {
  idNotification?: number;

  title: string;
  message: string;

  type: NotificationType;
  status: NotificationStatus;

  createdAt?: string; // ISO
  sentAt?: string | null;

  authUserDTO: AuthUser;
  eventDTO: Event;
  participantDTO: Participant;
}
