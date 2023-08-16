import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class PasswordManagerService {

  constructor(private firestore : Firestore) { }

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
}
