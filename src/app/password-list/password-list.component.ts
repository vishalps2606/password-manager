import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasswordManagerService } from '../services/password-manager.service';
import { Observable } from 'rxjs';
import { AES, enc } from 'crypto-js'
import { environment } from 'src/environments/environment';

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
  passwordList!:Array<any>

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
  }

  resetForm(){
    this.email = '';
    this.password = '';
    this.username = '';

    this.formState = "Add";
  }

  onSubmit(value : any){

    const encryptedPassword = this.encryptPassword(value.password);
    value.password = encryptedPassword;
    
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
    this.passwordService.loadPassword(this.id).subscribe((val) => {
      this.passwordList = val;
    })
  }

  onEdit(id:string, email:string, username:string, password:string){
    this.passwordId = id;
    this.email = email;
    this.username = username;
    this.password = password;

    this.formState = "Edit";
  }

  onDelete(passId: string){
    this.passwordService.deletePassword(this.id, passId).then(() => {
      this.showAlert("Password Deleted Successfully!");
    })
    .catch((err) => {
      this.showAlert(err);
    })
  }

  encryptPassword(password: string){
    this.buttonName = '🙈'
    const secretKey = environment.apiKey;
    return AES.encrypt(password, secretKey).toString();
  }

  buttonName:string = '🙈'; 
  decryptPass(pass : string){
    this.buttonName = '🌝'
    const secretKey = environment.apiKey;
    return AES.decrypt(pass, secretKey).toString(enc.Utf8);
  }

  onDecrypt(pass : string, index: number){
    if(this.buttonName === '🙈')
      this.passwordList[index].password = this.decryptPass(pass);
    else if(this.buttonName === '🌝')
      this.passwordList[index].password = this.encryptPassword(pass);
  }

}
