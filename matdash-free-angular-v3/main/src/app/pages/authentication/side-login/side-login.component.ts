import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from "../../../providers/services/auth/auth.service";
import { TokenModels } from "../../../models/token-models";

@Component({
  selector: 'app-side-login',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {

  constructor(private router: Router, private authService: AuthService) {}

  private tokenModels = new TokenModels();

  form = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  protected login() {
    console.log(this.form.value);

    this.authService.add$(this.form.value).subscribe(
      data => {
        this.tokenModels = data;

        // 🔥 CAMBIO → Guardamos token + userName
        this.authService.setToken(
          this.tokenModels.token,
          this.tokenModels.userName
        );

        console.log("TOKEN:", this.tokenModels.token);
        console.log("USER:", this.tokenModels.userName); // 🔥 NUEVO

        this.router.navigate(['/']);        // redirecciona al dashboard
      }
    );
  }
}
