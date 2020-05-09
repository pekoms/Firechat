import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Mensaje } from '../interface/mensaje.interface';
import {map, refCount} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats: Mensaje[] = [];

  constructor(private afs: AngularFirestore) { }

  cargarMensajes()
  {
    this.itemsCollection = this.afs.collection<Mensaje>('Chats',ref=>ref.orderBy('fecha','asc').limit(5));

    return this.itemsCollection.valueChanges()
                        .pipe(
                          map((mensajes:Mensaje[])=>{
                           this.chats=[];
                           for(let mensaje of mensajes)
                           {
                             this.chats.unshift(mensaje);
                          }

                          return this.chats;
                          })
                        );
                        
  
  }

  agregarMensaje( texto:string )
  {
    let mensaje: Mensaje ={
    
      nombre:'Demo',
      mensaje: texto,
      fecha: new Date().getTime(),
      uid:""

    }

    return this.itemsCollection.add(mensaje);
  }
}
