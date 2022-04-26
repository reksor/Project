import { Injectable } from '@angular/core';
import { PerStorageService } from './per-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private storage:PerStorageService) { }

  isLogged=false

  login(): void {
this.isLogged=true
this.storage.setItem()
  }

  logout(): void {
this.isLogged=false
  }
}
