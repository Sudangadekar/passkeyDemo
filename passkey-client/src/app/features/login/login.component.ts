import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

import { ApiService } from '../../core/services/api.service';
import { PasskeyService } from '../../core/services/passkey.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  username = '';

  constructor(
    private api: ApiService,
    private passkey: PasskeyService,
    private router: Router
  ) { }

  async login() {

    try {

      const options: any = await firstValueFrom(
        this.api.loginOptions(this.username)
      );

      const credential =
        await this.passkey.authenticate(options);

      const result: any = await firstValueFrom(
        this.api.loginVerify({
          username: this.username,
          credential
        })
      );

      if (result.verified) {

        alert('Login Successful');

        this.router.navigate(['/dashboard']);
      }

    } catch (error) {

      console.error(error);

      alert('Login Failed');
    }
  }
}