import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  OnInit
} from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthService } from '../../../providers/services/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    CommonModule,
    NgScrollbarModule,
    TablerIconsModule,
    MaterialModule,
    MatBadgeModule
  ],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {

  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();

  // ⭐ NUEVO: nombre del usuario logueado
  userName: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
  }
}

// import {
//   Component,
//   Output,
//   EventEmitter,
//   Input,
//   ViewEncapsulation,
// } from '@angular/core';
// import { TablerIconsModule } from 'angular-tabler-icons';
// import { MaterialModule } from 'src/app/material.module';
// import { RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { NgScrollbarModule } from 'ngx-scrollbar';
// import { MatBadgeModule } from '@angular/material/badge';
//
// @Component({
//   selector: 'app-header',
//   imports: [
//     RouterModule,
//     CommonModule,
//     NgScrollbarModule,
//     TablerIconsModule,
//     MaterialModule,
//     MatBadgeModule
//   ],
//   templateUrl: './header.component.html',
//   encapsulation: ViewEncapsulation.None,
// })
// export class HeaderComponent {
//   @Input() showToggle = true;
//   @Input() toggleChecked = false;
//   @Output() toggleMobileNav = new EventEmitter<void>();
//
// }
