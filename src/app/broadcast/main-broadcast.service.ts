import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainBroadcastService {

  emissorPrincipal = new EventEmitter()
  emissorDePesquisa = new EventEmitter()
  emissorDeTema = new EventEmitter()

  constructor() { }

  atualizarRedeToda()
  {
    this.emissorPrincipal.emit()
  }

  emitirPalavrasDaPesquisa(pesquisa: string)
  {
    this.emissorDePesquisa.emit(pesquisa)
  }

  pulaProTemaSelecionado(id: number)
  {
    this.emissorDeTema.emit(id)
  }


}
