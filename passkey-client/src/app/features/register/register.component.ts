import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

import { ApiService } from '../../core/services/api.service';
import { PasskeyService } from '../../core/services/passkey.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  username = '';

  constructor(
    private api: ApiService,
    private passkey: PasskeyService,
    private router: Router
  ) { }

  async register() {

    try {

      const options: any = await firstValueFrom(
        this.api.registerOptions(this.username)
      );

      const credential =
        await this.passkey.register(options);

      const result: any = await firstValueFrom(
        this.api.registerVerify({
          username: this.username,
          credential
        })
      );

      if (result.verified) {

        alert('Passkey Registered Successfully');

        this.router.navigate(['/login']);
      }

    } catch (error) {

      console.error(error);

      alert('Registration Failed');
    }
  }
}