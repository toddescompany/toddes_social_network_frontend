import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  tema: Tema = new Tema()
  postagem: Postagem = new Postagem()
  idTema: number
  user: User = new User()
  idUsuario = environment.id
  listaPostagens: Postagem[]
  listaTemas: Tema[]

  key = 'data'
  reverse = true


  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authservice: AuthService
  ) { }

  ngOnInit() {
    if(environment.token ==''){
      alert('sua sessão expirou.')
      this.router.navigate(['/entrar'])
    }
    this.getAllTemas()
    this.getAllPostagens()
    this.findByIdUser()
  }

  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=> {
      this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema)=>{
      this.tema = resp
    })
  }
  getAllPostagens(){
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[])=>{
      this.listaPostagens = resp
    })

  }

  findByIdUser(){
    this.authservice.getByIdUser(this.idUsuario).subscribe((resp: User)=>{
      this.user = resp
    })
  }

  publicar(){

    this.postagem.anonimo_postagem = false
    //this.postagem.tituloPostagem =' '
    this.tema.idTema = this.idTema
    this.postagem.fk_tema = this.tema
    this.user.id = this.idUsuario
    this.postagem.fk_usuario = this.user


    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp
      alert('Postagem feita!')
      this.postagem = new Postagem()
      this.getAllPostagens()
    })
  }

}
