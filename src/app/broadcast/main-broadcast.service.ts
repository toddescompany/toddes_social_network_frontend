import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainBroadcastService {

  emissorPrincipal = new EventEmitter()
  emissorDePesquisa = new EventEmitter()

  constructor() { }

  atualizarRedeToda()
  {
    this.emissorPrincipal.emit()
  }

  emitirPalavrasDaPesquisa(pesquisa: string)
  {
    this.emissorDePesquisa.emit(pesquisa)
  }
}
