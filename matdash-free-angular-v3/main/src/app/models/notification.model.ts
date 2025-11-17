// src/app/models/notification.model.ts
export interface AuthUser {
  id: number;
  userName: string;
}

export interface Event {
  idEvento: number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  modality?: string;
  eventType?: string;
  maxCapacity?: number;
  organizerId?: number;
  address?: string;
  status?: string;
}

export interface Participant {
  idParticipant: number;
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  registrationDate?: string;
}

export interface Notification {
  idNotification?: number;
  title: string;
  message: string;
  type: 'ATTENDANCE_ALERT' | 'EVENT_REMINDER' | 'GENERAL';
  status: 'PENDING' | 'SENT' | 'FAILED';
  authUserId: number;      // ✅ Agregado
  participantId: number;   // ✅ Agregado
  eventId: number;
}
