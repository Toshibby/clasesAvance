// src/app/models/event.model.ts

export interface Event {
  idEvento: number;
  name: string;
  description?: string;

  // 🔹 Fechas en Angular deben manejarse como string ISO
  startDate?: string;
  endDate?: string;

  modality?: string;
  eventType?: string;
  maxCapacity?: number;
  organizerId?: number;
  address?: string;
  status?: string;

  // 🔹 Campos adicionales del DTO del backend
  createdAt?: string; // LocalDateTime → string
  updatedAt?: string; // LocalDateTime → string
}
