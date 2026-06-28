import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Meta } from '../model/meta.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetaServiceService {

  private coleccion = 'metas'; 

  constructor(private firestore: AngularFirestore) {}

  
  getMetas(): Observable<Meta[]> {
    return this.firestore.collection<Meta>(this.coleccion, ref =>
      ref.orderBy('meta')
    ).valueChanges({ idField: 'id' });
  }

  
  addMeta(meta: string) {
    return this.firestore.collection(this.coleccion).add({ meta });
  }

  
  deleteMeta(id: string) {
    return this.firestore.collection(this.coleccion).doc(id).delete();
  }
}