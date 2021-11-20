import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainBroadcastService } from '../broadcast/main-broadcast.service';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { SpecialFunctionsService } from '../service/special-functions.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tendencias',
  templateUrl: './tendencias.component.html',
  styleUrls: ['./tendencias.component.css']
})
export class TendenciasComponent implements OnInit {

  listaPostagens: Postagem[]
  listaTemas: Tema[]
  tituloPost: string
  nomeTema: string

    // order by
    key = 'data'
    reverse = true


  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authservice: AuthService,
    private receptor: MainBroadcastService,
    public specialfunctions: SpecialFunctionsService
  ) { }

  ngOnInit() {
    this.getAllPostagens()

    // quando algo for postado, atualiza o tendências
    this.receptor.emissorPrincipal.subscribe(
      resp=> {
        this.getAllPostagens()
      }

    );
  }

  getAllPostagens(){
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[])=>{
      this.listaPostagens = resp.slice(resp.length-3,resp.length)


    })

  }

  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=> {
      this.listaTemas = resp
    })
  }

  findByTituloPostagem(){

    if(this.tituloPost == ''){
      this.getAllPostagens()
    }else{
      this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[])=>{
        this.listaPostagens = resp
      })
    }
  }

  findByNomeTema(){

    if(this.nomeTema == ''){
      this.getAllTemas()
    }else{
      this.temaService.getByNomeTema(this.nomeTema).subscribe((resp: Tema[])=>{
        this.listaTemas = resp
      })
    }
  }




}
