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
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  user: User = new User()
  idUsuario = environment.id
  listaPostagens: Postagem[]
  tema: Tema = new Tema()
  constructor(
    private router: Router,
    private postagemService: PostagemService,
   
    private authservice: AuthService
  ) { }

  ngOnInit(){
    if(environment.token ==''){
      alert('sua sessão expirou.')
      this.router.navigate(['/entrar'])
    }
    this.findByIdUser()
   
    this.getAllPostagens()
  }

  findByIdUser(){
    this.authservice.getByIdUser(this.idUsuario).subscribe((resp: User)=>{
      this.user = resp
    })
  }



  getAllPostagens(){
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[])=>{
      this.listaPostagens = resp
    })

  }
}
