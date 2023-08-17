import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  currentYear = new Date().getFullYear();

  constructor(private auth: Auth, private router: Router) {}

  async onSubmit(value: any){
    try {
      await createUserWithEmailAndPassword(this.auth, value.email, value.password);
      alert("Registration Successful, redirecting to Login Page!");
      setTimeout(() => {
        this.router.navigate(['/']); // Redirect to login after successful registration
      }, 1000);
    } catch (error) {
      console.error('Registration error:', error);
      // Handle error (show error message, etc.)
    }
  }
}


