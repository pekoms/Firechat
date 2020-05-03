import { Component, OnInit } from '@angular/core';
import '../../providers/chat.service';
import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  mensaje:string = "";

  constructor(public _cs: ChatService) {
    
    this._cs.cargarMensajes()
            .subscribe();
  }

  ngOnInit(){

  }

  enviarMensaje()
  {
    console.log(this.mensaje);

    if(this.mensaje.length === 0)
    {
      return;
    }

    return this._cs.agregarMensaje(this.mensaje)
            .then(()=>this.mensaje="")
            .catch((err)=>console.log('Error al enviar', err));
    this.mensaje="";
  }

}
