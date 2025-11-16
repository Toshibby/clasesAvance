// src/app/models/participant.model.ts

export interface Participant {
  idParticipant: number;
  firstName: string;
  lastName?: string; // opcional según tu backend
  email: string;
  phone?: string; // opcional según tu backend
  registrationDate?: string; // ISO date string
}

export interface CreateParticipantDTO {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
}
