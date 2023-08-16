import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasswordManagerService } from '../services/password-manager.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css']
})
export class PasswordListComponent {

  // query parameters, taken from sitelist
  id !: string;
  siteName !: string;
  siteUrl !: string; 

  // parameters used for update password
  email !: string;
  password !: string;
  username !: string;
  passwordId !: string;
  formState:string = "Add";

  // To store the value of Add Password
  passwordList!:Observable<Array<any>>

  // For alerts
  alertMessage: string = "";
  isSuccess:boolean = false;

  constructor(private route : ActivatedRoute, private passwordService : PasswordManagerService){
    this.route.queryParams.subscribe((val:any) => {
      this.id = val.id;
      this.siteName = val.name;
      this.siteUrl = val.url;
    })

    this.loadPassword();
  }

  showAlert(message : string){
    this.isSuccess = true;
    this.alertMessage = message;
    setTimeout(() => {
    }, 3000);
  }

  resetForm(){
    this.email = '';
    this.password = '';
    this.username = '';
  }

  onSubmit(value : object){
    
    if(this.formState === 'Add'){
      this.passwordService.addPassword(value, this.id).then(() => {
        this.showAlert("Password Saves Successfully!");
        this.resetForm();
      })
      .catch((err) => {
        this.showAlert(err);
      })
    }

    else if(this.formState === 'Edit'){
      this.passwordService.editPassword(this.id, value, this.passwordId).then(() => {
        this.showAlert("Password Updated Successfully!");
        this.resetForm();
      })
      .catch((err) => {
        this.showAlert(err);
      })
    }
  }

  loadPassword(){
    this.passwordList = this.passwordService.loadPassword(this.id)
  }

  onEdit(id:string, email:string, username:string, password:string){
    this.passwordId = id;
    this.email = email;
    this.username = username;
    this.password = password;

    this.formState = "Edit";
  }

}
