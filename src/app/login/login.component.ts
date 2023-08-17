import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
    
    async logout() {
      await this.auth.signOut();
      this.router.navigate(['/']); // Redirect on logout
    }
  
    isLoggedIn(): boolean {
      return !!this.auth.currentUser;
    }
}
