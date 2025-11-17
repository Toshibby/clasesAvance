import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';

import { EventService } from '../../../providers/services/event/event.service';
import { Event } from '../../../models/event.model';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
})
export class EventFormComponent implements OnInit {

  form!: FormGroup;
  eventId?: number;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // ✅ Inicializa las fechas con null
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      modality: ['', Validators.required],
      eventType: ['', Validators.required],
      maxCapacity: ['', Validators.required],
      organizerId: ['', Validators.required],
      address: [''],
      status: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.eventId = +params['id'];
        this.isEditMode = true;
        this.loadEvent(this.eventId);
      }
    });
  }

  loadEvent(id: number): void {
    this.eventService.getById(id).subscribe(event => {
      this.form.patchValue({
        ...event,
        // ✅ Convierte string a Date para el datepicker
        startDate: event.startDate ? new Date(event.startDate) : null,
        endDate: event.endDate ? new Date(event.endDate) : null
      });
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    // ✅ Convierte Date a formato YYYY-MM-DD para el backend
    const formatDateToString = (date: Date | null): string | null => {
      if (!date) return null;
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const eventData: Event = {
      ...this.form.value,
      idEvento: this.eventId || 0,
      startDate: formatDateToString(this.form.value.startDate),
      endDate: formatDateToString(this.form.value.endDate),
    };

    if (this.isEditMode && this.eventId) {
      this.eventService.update(this.eventId, eventData).subscribe(() => {
        this.router.navigate(['/dashboard/events']);
      });
    } else {
      this.eventService.create(eventData).subscribe(() => {
        this.router.navigate(['/dashboard/events']);
      });
    }
  }
}
