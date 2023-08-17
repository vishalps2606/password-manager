import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})

export class PasswordManagerService {

  constructor(private firestore : Firestore) { }

  //  ===== Site List Services =====

  addSite(data: object){
      const dbInstance = collection(this.firestore, 'sites');
      return addDoc(dbInstance, data);
  }

  loadSite(){
    const dbInstance = collection(this.firestore, 'sites');
    return collectionData(dbInstance, {idField: 'id'});
  }

  editSite(id: string, data: object){
    const docInstance = doc(this.firestore, 'sites', id);
    return updateDoc(docInstance, data);
  }

  deleteSite(id:string){
    const docInstance = doc(this.firestore, 'sites', id);
    return deleteDoc(docInstance);
  }

  // ===== Password Services =======

  addPassword(data: object, siteId : string){
    const dbInstance = collection(this.firestore, `sites/${siteId}/passwords`);
    return addDoc(dbInstance, data);
  }

  loadPassword(siteId : string){
    const dbInstance = collection(this.firestore, `sites/${siteId}/passwords`);
    return collectionData(dbInstance, {idField: 'id'});
  }

  editPassword(id: string, data: object, passId: string){
    const docInstance = doc(this.firestore, `sites/${id}/passwords`, passId);
    return updateDoc(docInstance, data);
  }

  deletePassword(siteId:string, passId: string){
    const docInstance = doc(this.firestore, `sites/${siteId}/passwords`, passId);
    return deleteDoc(docInstance);
  }

  
}
