import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { StarterComponent } from './pages/starter/starter.component';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      // Dashboard con rutas hijas
      {
        path: 'dashboard',
        component: StarterComponent,
        children: [
          

          // Participantes
          {
            path: 'participants',
            loadComponent: () =>
              import('./pages/participant/participant-list/participant-list.component')
                .then(m => m.ParticipantListComponent),
          },
          {
            path: 'participants/form',
            loadComponent: () =>
              import('./pages/participant/participant-form/participant-form.component')
                .then(m => m.ParticipantFormComponent),
          },
          {
            path: 'participants/form/:id',
            loadComponent: () =>
              import('./pages/participant/participant-form/participant-form.component')
                .then(m => m.ParticipantFormComponent),
          },

          // Attendance
          {
            path: 'attendance',
            loadComponent: () =>
              import('./pages/attendance/attendance-list/attendance-list.component')
                .then(m => m.AttendanceListComponent),
          },
          {
            path: 'attendance/form',
            loadComponent: () =>
              import('./pages/attendance/attendance-form/attendance-form.component')
                .then(m => m.AttendanceFormComponent),
          },
          {
            path: 'attendance/form/:id',
            loadComponent: () =>
              import('./pages/attendance/attendance-form/attendance-form.component')
                .then(m => m.AttendanceFormComponent),
          },
        ],
      },
      // Ruta por defecto
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            m => m.AuthenticationRoutes
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'authentication/error' },
];


// import { Routes } from '@angular/router';
// import { BlankComponent } from './layouts/blank/blank.component';
// import { FullComponent } from './layouts/full/full.component';
// import { StarterComponent } from './pages/starter/starter.component';
//
// export const routes: Routes = [
//   {
//     path: '',
//     component: FullComponent,
//     children: [
//       // Ruta por defecto al dashboard
//       {
//         path: '',
//         redirectTo: 'dashboard',
//         pathMatch: 'full',
//       },
//       // Dashboard
//       {
//         path: 'dashboard',
//         component: StarterComponent, // solo el StarterComponent
//       },
//       // Microservicio: participantes
//       {
//         path: 'participants',
//         loadComponent: () =>
//           import('./pages/participant/participant-list/participant-list.component')
//             .then(m => m.ParticipantListComponent),
//       },
//       {
//         path: 'participants/form',
//         loadComponent: () =>
//           import('./pages/participant/participant-form/participant-form.component')
//             .then(m => m.ParticipantFormComponent),
//       },
//       {
//         path: 'participants/form/:id',
//         loadComponent: () =>
//           import('./pages/participant/participant-form/participant-form.component')
//             .then(m => m.ParticipantFormComponent),
//       },
//       {
//         path: 'attendance',
//         loadComponent: () =>
//           import('./pages/attendance/attendance-list/attendance-list.component')
//             .then(m => m.AttendanceListComponent),
//       },
//       {
//         path: 'attendance/form',
//         loadComponent: () =>
//           import('./pages/attendance/attendance-form/attendance-form.component')
//             .then(m => m.AttendanceFormComponent),
//       },
//       {
//         path: 'attendance/form/:id',
//         loadComponent: () =>
//           import('./pages/attendance/attendance-form/attendance-form.component')
//             .then(m => m.AttendanceFormComponent),
//       },
//     ],
//   },
//   {
//     path: '',
//     component: BlankComponent,
//     children: [
//       {
//         path: 'authentication',
//         loadChildren: () =>
//           import('./pages/authentication/authentication.routes').then(
//             (m) => m.AuthenticationRoutes
//           ),
//       },
//     ],
//   },
//   {
//     path: '**',
//     redirectTo: 'authentication/error',
//   },
// ];
