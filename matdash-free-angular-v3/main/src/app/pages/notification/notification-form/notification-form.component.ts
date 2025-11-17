// src/app/pages/notification/notification-form/notification-form.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';

import { NotificationService } from '../../../providers/services/notification/notification.service';
import { ParticipantService } from '../../../providers/services/participant/participant.service';

import {
  Notification,
  NotificationType,
  NotificationStatus,
  Event,
  Participant as NotificationParticipant
} from '../../../models/notification.model';
import { Participant } from '../../../models/participant.model';

@Component({
  selector: 'app-notification-form',
  templateUrl: './notification-form.component.html',
  styleUrls: ['./notification-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterLink],
})
export class NotificationFormComponent implements OnInit {

  form!: FormGroup;
  notificationId?: number;
  isEditMode = false;

  participants: Participant[] = [];
  events: Event[] = [];

  typeOptions = Object.values(NotificationType);
  statusOptions = Object.values(NotificationStatus);

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private participantService: ParticipantService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      participantId: ['', Validators.required],
      // 🔹 Cambiado de select a input para permitir escribir nombre de evento
      eventName: ['', Validators.required],
      type: ['', Validators.required],
      status: ['', Validators.required],
      title: ['', Validators.required],
      message: ['', Validators.required],
    });

    this.loadParticipants();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.notificationId = +params['id'];
        this.isEditMode = true;
        this.loadNotification(this.notificationId);
      }
    });
  }

  loadParticipants(): void {
    this.participantService.getAll().subscribe(data => {
      this.participants = data;
    });
  }

  loadNotification(id: number): void {
    this.notificationService.getById(id).subscribe(notif => {
      this.form.patchValue({
        participantId: notif.participantDTO.idParticipant,
        eventName: notif.eventDTO?.name || '', // 🔹 Ajuste por el nuevo input
        type: notif.type,
        status: notif.status,
        title: notif.title,
        message: notif.message,
      });
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    // 🔹 Obtener participante seleccionado
    const selectedParticipant = this.participants.find(
      p => p.idParticipant === +this.form.value.participantId
    );

    if (!selectedParticipant) return;

    const participantDTO: NotificationParticipant = {
      idParticipant: selectedParticipant.idParticipant,
      firstName: selectedParticipant.firstName,
      lastName: selectedParticipant.lastName || '',
      email: selectedParticipant.email || '',
      phone: selectedParticipant.phone,
      registrationDate: selectedParticipant.registrationDate,
    };

    // 🔹 Creamos el objeto Event temporal con solo nombre
    const eventDTO: Event = {
      idEvento: 0, // 0 o cualquier valor temporal, backend lo puede ignorar
      name: this.form.value.eventName
    };

    const payload: Notification = {
      title: this.form.value.title,
      message: this.form.value.message,
      type: this.form.value.type,
      status: this.form.value.status,
      participantDTO: participantDTO,
      eventDTO: eventDTO, // 🔹 usamos el input escrito
      authUserDTO: { id: 1, userName: 'currentUser' }, // reemplazar por usuario real
    };

    if (this.isEditMode && this.notificationId) {
      this.notificationService.update(this.notificationId, payload)
        .subscribe(() => this.router.navigate(['/dashboard/notifications']));
    } else {
      this.notificationService.create(payload)
        .subscribe(() => this.router.navigate(['/dashboard/notifications']));
    }
  }

}


// // src/app/pages/notification/notification-form/notification-form.component.ts
//
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router, ActivatedRoute, RouterLink } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { MaterialModule } from '../../../material.module';
//
// import { NotificationService } from '../../../providers/services/notification/notification.service';
// import { ParticipantService } from '../../../providers/services/participant/participant.service';
//
// import {
//   Notification,
//   NotificationType,
//   NotificationStatus,
//   Event,
//   Participant as NotificationParticipant
// } from '../../../models/notification.model';
// import { Participant } from '../../../models/participant.model';
//
// @Component({
//   selector: 'app-notification-form',
//   templateUrl: './notification-form.component.html',
//   styleUrls: ['./notification-form.component.scss'],
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterLink],
// })
// export class NotificationFormComponent implements OnInit {
//
//   form!: FormGroup;
//   notificationId?: number;
//   isEditMode = false;
//
//   participants: Participant[] = [];
//   events: Event[] = []; // si tienes servicio de eventos, cargar desde backend
//
//   typeOptions = Object.values(NotificationType);
//   statusOptions = Object.values(NotificationStatus);
//
//   constructor(
//     private fb: FormBuilder,
//     private notificationService: NotificationService,
//     private participantService: ParticipantService,
//     private router: Router,
//     private route: ActivatedRoute
//   ) {}
//
//   ngOnInit(): void {
//     this.form = this.fb.group({
//       participantId: ['', Validators.required],
//       eventId: ['', Validators.required],
//       type: ['', Validators.required],
//       status: ['', Validators.required],
//       title: ['', Validators.required],
//       message: ['', Validators.required],
//     });
//
//     this.loadParticipants();
//     // this.loadEvents(); // descomenta si tienes servicio de eventos
//
//     this.route.params.subscribe(params => {
//       if (params['id']) {
//         this.notificationId = +params['id'];
//         this.isEditMode = true;
//         this.loadNotification(this.notificationId);
//       }
//     });
//   }
//
//   loadParticipants(): void {
//     this.participantService.getAll().subscribe(data => {
//       this.participants = data;
//     });
//   }
//
//   // loadEvents(): void {
//   //   this.eventService.getAll().subscribe(data => {
//   //     this.events = data;
//   //   });
//   // }
//
//   loadNotification(id: number): void {
//     this.notificationService.getById(id).subscribe(notif => {
//       this.form.patchValue({
//         participantId: notif.participantDTO.idParticipant,
//         eventId: notif.eventDTO.idEvento,
//         type: notif.type,
//         status: notif.status,
//         title: notif.title,
//         message: notif.message,
//       });
//     });
//   }
//
//   submit(): void {
//     if (this.form.invalid) return;
//
//     // 🔹 Obtener participante seleccionado
//     const selectedParticipant = this.participants.find(
//       p => p.idParticipant === +this.form.value.participantId
//     );
//
//     if (!selectedParticipant) return; // seguridad
//
//     // 🔹 Crear objeto participantDTO como espera el backend
//     const participantDTO: NotificationParticipant = {
//       idParticipant: selectedParticipant.idParticipant,
//       firstName: selectedParticipant.firstName,
//       lastName: selectedParticipant.lastName || '',
//       email: selectedParticipant.email || '',
//       phone: selectedParticipant.phone,
//       registrationDate: selectedParticipant.registrationDate,
//     };
//
//     // 🔹 Payload de notificación
//     const payload: Notification = {
//       title: this.form.value.title,
//       message: this.form.value.message,
//       type: this.form.value.type,
//       status: this.form.value.status,
//       participantDTO: participantDTO,
//       eventDTO: { idEvento: +this.form.value.eventId, name: '' }, // solo idEvento es obligatorio
//       authUserDTO: { id: 1, userName: 'currentUser' },           // reemplazar por usuario logueado real
//     };
//
//     if (this.isEditMode && this.notificationId) {
//       this.notificationService.update(this.notificationId, payload)
//         .subscribe(() => this.router.navigate(['/dashboard/notifications']));
//     } else {
//       this.notificationService.create(payload)
//         .subscribe(() => this.router.navigate(['/dashboard/notifications']));
//     }
//   }
//
// }
