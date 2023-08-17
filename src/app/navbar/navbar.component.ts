import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth'
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private auth: Auth, private router: Router){}

  async logOut() {
    await this.auth.signOut();
    this.router.navigate(['/']); // Redirect on logout
  }
}
