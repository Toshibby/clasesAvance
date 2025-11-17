import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { RouterLink, Router } from '@angular/router';

import { NotificationService } from '../../../providers/services/notification/notification.service';
import { ParticipantService } from '../../../providers/services/participant/participant.service';
import { EventService } from '../../../providers/services/event/event.service';
import { AuthService } from '../../../providers/services/auth/auth.service';

import { Notification, Participant, Event, AuthUser } from '../../../models/notification.model';

@Component({
  selector: 'app-notification-form',
  templateUrl: './notification-form.component.html',
  styleUrls: ['./notification-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterLink],
})
export class NotificationFormComponent implements OnInit {

  form!: FormGroup;
  participants: Participant[] = [];
  events: Event[] = [];
  authUser!: AuthUser;

  typeOptions = [
    { value: 'ATTENDANCE_ALERT', label: 'Alerta de asistencia' },
    { value: 'EVENT_REMINDER', label: 'Recordatorio de evento' },
    { value: 'GENERAL', label: 'General' }
  ];

  statusOptions = [
    { value: 'PENDING', label: 'Pendiente' },
    { value: 'SENT', label: 'Enviado' },
    { value: 'FAILED', label: 'Fallido' }
  ];

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private participantService: ParticipantService,
    private eventService: EventService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadParticipants();
    this.loadEvents();
    this.loadAuthenticatedUser();
  }

  buildForm(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
      type: ['', Validators.required],
      status: ['', Validators.required],
      participantId: ['', Validators.required],
      eventId: ['', Validators.required]
    });
  }

  loadAuthenticatedUser() {
    const username = this.authService.getUserName() ?? 'unknown';
    this.authUser = { id: 1, userName: username }; // 🔹 Mantiene el ID para enviar al backend
  }

  loadParticipants() {
    this.participantService.getAll().subscribe({
      next: data => this.participants = data,
      error: () => console.error('Error cargando participantes')
    });
  }

  loadEvents() {
    this.eventService.getAll().subscribe({
      next: data => this.events = data,
      error: () => console.error('Error cargando eventos')
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const f = this.form.value;
    const participant = this.participants.find(p => p.idParticipant === f.participantId)!;
    const event = this.events.find(e => e.idEvento === f.eventId)!;

    const notification: Notification = {
      title: f.title,
      message: f.message,
      type: f.type,
      status: f.status,
      authUserId: this.authUser.id,            // ID del usuario autenticado
      participantId: participant.idParticipant,
      eventId: event.idEvento
    };

    this.notificationService.create(notification).subscribe({
      next: () => {
        // 🔹 Redirige automáticamente a la lista de notificaciones
        this.router.navigate(['/dashboard/notifications']);
      },
      error: err => {
        console.error(err);
        alert('Error al crear notificación');
      }
    });
  }
}
