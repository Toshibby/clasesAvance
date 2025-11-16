// src/app/pages/participant/participant-form/participant-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { ParticipantService } from '../../../providers/services/participant/participant.service';
import { CreateParticipantDTO, Participant } from '../../../models/participant.model';

@Component({
  selector: 'app-participant-form',
  templateUrl: './participant-form.component.html',
  styleUrls: ['./participant-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
})
export class ParticipantFormComponent implements OnInit {

  form!: FormGroup;
  participantId?: number;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private participantService: ParticipantService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });

    this.route.params.subscribe(params => {
      if(params['id']) {
        this.participantId = +params['id'];
        this.isEditMode = true;
        this.loadParticipant(this.participantId);
      }
    });
  }

  loadParticipant(id: number): void {
    this.participantService.getById(id).subscribe(
      (data: Participant) => this.form.patchValue(data),
      error => console.error(error)
    );
  }

  submit(): void {
    if(this.form.invalid) return;
    const dto: CreateParticipantDTO = this.form.value;

    if(this.isEditMode && this.participantId) {
      this.participantService.update(this.participantId, dto).subscribe(() => {
        this.router.navigate(['/dashboard/participants']);
      });
    } else {
      this.participantService.create(dto).subscribe(() => {
        this.router.navigate(['/dashboard/participants']);
      });
    }
  }
}
