import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { MainBroadcastService } from '../broadcast/main-broadcast.service';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-menu-esquerdo',
  templateUrl: './menu-esquerdo.component.html',
  styleUrls: ['./menu-esquerdo.component.css']
})
export class MenuEsquerdoComponent implements OnInit {


  idUsuario = environment.id
  postagem = new Postagem()
  listaTemas : Tema[]
  tema: Tema = new Tema()
  idTema: number
  user = new User()

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authservice: AuthService,
    private alertas: AlertasService,
    private broadcast: MainBroadcastService
  ) { }

  ngOnInit(): void {

    this.getAllTemas()
    this.findByIdUser()


    // mudança de estado
    const btns =  document.getElementsByClassName("leftMenuNavItem");
    for (let i = 0; i < btns.length;i++){
      btns[i].addEventListener("click",()=>{

        // limpa a classe
        for (let i = 0; i < btns.length;i++)
        {
          btns[i].classList.remove("leftMenuNavItemAtivo")
        }
        // adiciona no clicado
        btns[i].classList.add("leftMenuNavItemAtivo")
      })
    }

    // algo algo for digitado para pesquisar, muda a cor do botao
    this.broadcast.emissorDePesquisa.subscribe(
      resp => {
         // limpa a classe
         for (let i = 0; i < btns.length;i++)
         {
           btns[i].classList.remove("leftMenuNavItemAtivo")
         }
         const first = document.querySelectorAll(".leftMenuNavItem")[0]
         first.classList.add("leftMenuNavItemAtivo")
      }
    );

    // algo algo for digitado para pesquisar, muda a cor do botao
    this.broadcast.emissorDeTema.subscribe(
      resp => {
         // limpa a classe
         for (let i = 0; i < btns.length;i++)
         {
           btns[i].classList.remove("leftMenuNavItemAtivo")
         }
         const first = document.querySelectorAll(".leftMenuNavItem")[1]
         first.classList.add("leftMenuNavItemAtivo")
      }
    );


  }


  // preparar modal
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

  findByIdUser(){
    this.authservice.getByIdUser(this.idUsuario).subscribe((resp: User)=>{
      this.user = resp
    })
  }

  // publicar postagem
  publicarPostagem()
  {

  this.postagem.anonimo_postagem = false
  this.tema.idTema = this.idTema
  this.postagem.fk_tema = this.tema
  this.user.id = this.idUsuario
  this.postagem.fk_usuario = this.user


  this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
    this.postagem = resp
    this.alertas.showAlertSuccess('Postagem realizada com sucesso!')
    this.postagem = new Postagem()
    // atualizar o feed e demais componentes da rede social
    this.broadcast.atualizarRedeToda()


  })

  this.router.navigate(['/feed'])
}




}
