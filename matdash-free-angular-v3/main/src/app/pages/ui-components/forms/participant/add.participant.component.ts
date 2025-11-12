import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ParticipantService } from '../../../../providers/services/catalog/participant-service';
import { Participant } from '../../../../models/participant.model';

@Component({
  selector: 'app-add-participant',
  templateUrl: './add.participant.component.html',
  styleUrls: ['./add.participant.component.scss']
})
export class AddParticipantComponent implements OnInit {

  participantForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private participantService: ParticipantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.participantForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{7,15}$')])
    });
  }

  get f() {
    return this.participantForm.controls;
  }

  onSubmit(): void {
    if (this.participantForm.invalid) {
      this.participantForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const newParticipant = this.participantForm.value as Omit<Participant, 'idParticipant'>;

    this.participantService.create$(newParticipant).subscribe({
      next: (res) => {
        console.log('✅ Participant created:', res);
        this.isSubmitting = false;
        this.router.navigate(['/ui-components/tables']);
      },
      error: (err) => {
        console.error('❌ Error creating participant:', err);
        this.isSubmitting = false;
        alert('Error creating participant. Check console for details.');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/ui-components/tables']);
  }
}
