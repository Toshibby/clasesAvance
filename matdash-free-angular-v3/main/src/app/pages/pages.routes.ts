import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: StarterComponent,
    children: [
      { path: '', redirectTo: 'participants', pathMatch: 'full' },
      {
        path: 'participants',
        loadComponent: () => import('./participant/participant-list/participant-list.component')
          .then(m => m.ParticipantListComponent)
      },
      {
        path: 'participants/form',
        loadComponent: () => import('./participant/participant-form/participant-form.component')
          .then(m => m.ParticipantFormComponent)
      },
      {
        path: 'participants/form/:id',
        loadComponent: () => import('./participant/participant-form/participant-form.component')
          .then(m => m.ParticipantFormComponent)
      },
    ],
  },
];
