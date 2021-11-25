import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { MainBroadcastService } from '../broadcast/main-broadcast.service';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { SpecialFunctionsService } from '../service/special-functions.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

 // exibir posts
 user: User = new User()
 idUsuario = environment.id
 minhaFoto = environment.foto
 meuNome = environment.nomeUsuario

  // remover posts
  idPostagemASerRemovidaOuEditada: number

  // editar pots
  listaTemas: Tema[]
  salvarPostagem: Postagem = new Postagem()
  idTema: number
  tema: Tema = new Tema()

  // ordenar o resultado dos posts order by
  key = 'data'
  reverse = true


 // injeções de dependência
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private authservice: AuthService,
    private temaService: TemaService,
    private alertas: AlertasService,
    private broadcast: MainBroadcastService,
    public specialfunctions: SpecialFunctionsService

  ) { }

  // ao iniciar o código pela primeira vez
  ngOnInit(){
    if(environment.token ==''){
      this.alertas.showAlertDanger('sua sessão expirou.')
      this.router.navigate(['/entrar'])
    }
    this.findByIdUser()
     // pega id na URL
     this.idPostagemASerRemovidaOuEditada = this.route.snapshot.params['id']
     // atualiza os campos do modal editar sempre que a página atualizar
     if (this.idPostagemASerRemovidaOuEditada != undefined)
     this.atualizarCamposModal();
  }

  // exibir pots
  findByIdUser(){
    this.authservice.getByIdUser(this.idUsuario).subscribe((resp: User)=>{
      this.user = resp
      // verifica se tem postagem!
      const posts = <HTMLElement> document.getElementById("semPostagem")
      if(resp.postagem.length <= 0 || resp.postagem == null)
      {
        posts.style.display="true"
      }
      else
      {
        posts.style.display="false"
      }



    })
  }

  // apagar posts
    apagarPostagem()
    {
      // pega id na URL
      this.idPostagemASerRemovidaOuEditada = this.route.snapshot.params['id']
      // deleta a postagem
      this.postagemService.deletePostagem( this.idPostagemASerRemovidaOuEditada).subscribe(()=>{
        this.alertas.showAlertSuccess('Postagem apagada com sucesso')
        this.router.navigate(['/perfil-usuario'])
        // emite um sinal para atualizar a rede
        this.broadcast.atualizarRedeToda()
      })
    }

  // editar posts
    atualizarPostagem(){
       // pega id na URL
       this.idPostagemASerRemovidaOuEditada = this.route.snapshot.params['id']

      this.tema.idTema = this.idTema
      this.salvarPostagem.fk_tema = this.tema
      this.postagemService.putPostagem(this.salvarPostagem).subscribe((resp: Postagem) => {
        this.salvarPostagem = resp
        this.alertas.showAlertSuccess('Postagem atualizada com sucesso!')
        this.router.navigate(['/perfil-usuario'])
        // emite um sinal para atualizar a rede
        this.broadcast.atualizarRedeToda()
      })
    }
    findByIdTema(id: number) {
      this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
        this.tema = resp
      })
    }

    findAllTemas(){
      this.temaService.getAllTema().subscribe((resp: Tema[]) =>{
        this.listaTemas = resp
      })
    }
    findByIdPostagem(id: number){
      this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
        this.salvarPostagem = resp
       this.idTema = this.salvarPostagem.fk_tema.idTema

      //this.findByIdTema(this.salvarPostagem.fk_tema.idTema)
      //this.user.postagem[this.idPostagemASerRemovidaOuEditada].fk_tema = this.tema
      })
    }
    atualizarCamposModal(){
      this.findByIdPostagem(this.idPostagemASerRemovidaOuEditada)
      this.findAllTemas()

    }


}
