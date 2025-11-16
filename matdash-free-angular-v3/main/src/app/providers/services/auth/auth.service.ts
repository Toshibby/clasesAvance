import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { END_POINTS } from '../../utils/end-points';
import { EntityDataService } from "../../utils/entity-data";
import { TokenModels } from "../../../models/token-models";

@Injectable({ providedIn: 'root' })
export class AuthService extends EntityDataService<TokenModels> {

  private readonly TOKEN_KEY = "auth_token";
  private readonly USERNAME_KEY = "auth_user";

  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.login);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // ✔ Guardar token y usuario
  setToken(token?: string, userName?: string): void {

    // 🔥 Solo limpiar los valores de auth (NO todo el localStorage)
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USERNAME_KEY);

    if (token) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }

    if (userName) {
      localStorage.setItem(this.USERNAME_KEY, userName);
    }
  }

  getUserName(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
  }

  // Validar token contra MS-AUTH
  validateToken(token: string) {
    return this.httpClient.post<any>(
      `/auth/validate?token=${token}`,
      {}
    );
  }
}

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { END_POINTS } from '../../utils/end-points';
// import { EntityDataService } from "../../utils/entity-data";
// import { TokenModels } from "../../../models/token-models";
//
// @Injectable({ providedIn: 'root' })
// export class AuthService extends EntityDataService<TokenModels> {
//
//   private readonly TOKEN_KEY = "auth_token";
//   private readonly USERNAME_KEY = "auth_user";
//
//   constructor(protected override httpClient: HttpClient) {
//     super(httpClient, END_POINTS.login);
//   }
//
//   public getToken(): string | null {
//     return localStorage.getItem(this.TOKEN_KEY);
//   }
//
//   // ⛔ ANTES SOLO GUARDABA EL TOKEN
//   // ✔ AHORA GUARDARÁ TOKEN + USERNAME
//   setToken(token: string | undefined, userName?: string): void {
//     localStorage.clear();
//
//     if (token != null) {
//       localStorage.setItem(this.TOKEN_KEY, token);
//     }
//
//     if (userName) {
//       localStorage.setItem(this.USERNAME_KEY, userName);
//     }
//   }
//
//
//   getUserName(): string | null {
//     return localStorage.getItem(this.USERNAME_KEY);
//   }
//
//   // --------------PARA PODER VER QUIEN TIENE LA SESION ACTIVA---------------
//   validateToken(token: string) {
//     return this.httpClient.post<any>(
//       `/auth/validate?token=${token}`,
//       {}
//     );
//   }
// }
