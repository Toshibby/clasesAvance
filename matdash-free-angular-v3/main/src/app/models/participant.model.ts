// participant.model.ts
export interface Participant {
  idParticipant: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // Campos opcionales para simular estado de pagos
  budget?: number;
  priority?: 'cancelled' | 'rejected' | 'confirmed';
}
