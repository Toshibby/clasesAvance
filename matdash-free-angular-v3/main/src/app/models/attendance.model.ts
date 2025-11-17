// src/app/models/attendance.model.ts

// 🔹 NUEVO: Enums para status y check-in method
export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  LATE = 'LATE',
  ABSENT = 'ABSENT',
}

export enum CheckInMethod {
  MANUAL = 'MANUAL',
  QR = 'QR',
  NFC = 'NFC',
}

export interface AuthUser {
  id: number;
  userName: string;
}

export interface Event {
  idEvento: number;
  name: string;
  description?: string;
  startDate?: string; // ISO string
  endDate?: string;   // ISO string
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
  lastName: string;
  email?: string;
  phone?: string;
  registrationDate?: string; // ISO string
}

export interface Attendance {
  idAttendance?: number;
  timestamp?: string;  // ISO string
  status: AttendanceStatus;       // 🔹 MODIFICADO (antes era string)
  checkInMethod?: CheckInMethod;  // 🔹 MODIFICADO (antes era string)
  observations?: string;

  authUserDTO: AuthUser;
  eventDTO: Event;
  participantDTO: Participant;
}

// DTO para registrar asistencia en grupo
export interface AttendanceGroup {
  authUserDTO: AuthUser;
  eventDTO: Event;
  participantDTOs: Participant[];
  status: AttendanceStatus;       // 🔹 MODIFICADO (antes era string)
  checkInMethod?: CheckInMethod;  // 🔹 MODIFICADO (antes era string)
  observations?: string;
}
