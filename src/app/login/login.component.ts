import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

@Injectable({
  providedIn: 'root'
})
export class LoginComponent {

    currentYear = new Date().getFullYear();

    isError:boolean = false;
    alertMessage: string = 'Invalid Credentials';

    constructor(private auth: Auth, private router: Router){}

    async onSubmit(data: any){
      try {
        await signInWithEmailAndPassword(this.auth, data.email, data.password);
        this.router.navigate(['/sites']); // Redirect on successful login
      } catch (error) {
        this.isError = true;
      }
    }
  
    isLoggedIn(): boolean {
      return !!this.auth.currentUser;
    }
}
