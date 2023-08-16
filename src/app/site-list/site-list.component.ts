import { Component, OnInit } from '@angular/core';
import { PasswordManagerService } from '../services/password-manager.service';
import { Observable } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent{

  allSites!: Observable<Array<any>>;
  siteName!:string;
  siteUrl !: string;
  imgUrl !: string;
  id !: string;
  FormState: string = "Add";

  alertMessage: string = "";
  isSuccess:boolean = false;

  showAlert(message : string){
    this.isSuccess = true;
    this.alertMessage = message;
  }

  constructor(private passwordManager: PasswordManagerService){
    this.loadSites();
  }

  onSubmit(values: object){

    if(this.FormState === 'Add'){
      this.passwordManager.addSite(values)
      .then(() => {
        this.showAlert("Data Saves Successfully")
      })
      .catch((error: any) => {
        this.showAlert(error);      
      })
    }
    else if(this.FormState === "Edit"){
      this.passwordManager.editSite(this.id, values)
      .then(() => {
        this.showAlert("Data Updated!");
      })
      .catch((err) => {
        this.showAlert(err);
        
      })
    }
  }

  loadSites(){
     this.allSites = this.passwordManager.loadSite();         
  }

  onEdit(siteName:string, siteUrl:string, imgUrl:string, id:string){
    this.siteName = siteName;
    this.siteUrl = siteUrl;
    this.imgUrl = imgUrl;
    this.id = id;

    this.FormState = "Edit";
  }

  onDelete(id: string){
    this.passwordManager.deleteSite(id)
    .then(() => {
      this.showAlert("Data deleted!");      
    })
    .catch((err) => {
      console.log(err);      
    })
  }
}
