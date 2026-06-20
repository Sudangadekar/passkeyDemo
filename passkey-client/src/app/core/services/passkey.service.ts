import { Injectable } from '@angular/core';

import {
  startRegistration,
  startAuthentication
} from '@simplewebauthn/browser';

@Injectable({
  providedIn: 'root'
})
export class PasskeyService {

  async register(options: any) {
    return await startRegistration(options);
  }

  async authenticate(options: any) {
    return await startAuthentication(options);
  }
}