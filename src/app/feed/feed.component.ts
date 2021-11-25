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
import { SpecialFunctionsService } from '../service/special-functions.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  tema: Tema = new Tema()
  idTema: number
  postagem: Postagem = new Postagem()

  user: User = new User()
  idUsuario = environment.id
  listaPostagens: Postagem[]
  listaTemas: Tema[]

  // PESQUISAR
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
    private alertas: AlertasService,
    private receptor: MainBroadcastService,
    public specialfunctions: SpecialFunctionsService
  ) { }

  ngOnInit() {
    if(environment.token ==''){
      this.alertas.showAlertDanger('sua sessão expirou.')
      this.router.navigate(['/entrar'])
    }
    this.refreshFeed()

    // quando algo for postado fora do componente, atualiza o feed
    this.receptor.emissorPrincipal.subscribe(
      resp => {
        this.getAllPostagens()
        window.scrollTo(0,0)
      }
    );
    // algo algo for digitado para pesquisar, executa o método de pesquisa
    this.receptor.emissorDePesquisa.subscribe(
      resp => {
        this.tituloPost = resp
        this.findByTituloPostagem()
      }
    );


  }

  refreshFeed()
  {
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

    // VALIDA
    this.postagem.anonimo_postagem = false
    //this.postagem.tituloPostagem =' '
    this.tema.idTema = this.idTema
    this.postagem.fk_tema = this.tema
    this.user.id = this.idUsuario
    this.postagem.fk_usuario = this.user

    // FAZ A REQUISIÇÃO
    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp
      this.alertas.showAlertSuccess('Postagem realizada com sucesso!')
      this.postagem = new Postagem()
      this.getAllPostagens()

      // emite um sinal para atualizar o tendências
      this.receptor.atualizarRedeToda()

    // SE FUNCIONOU, SOBE A JANELINHA
    this.fecharTelaDePostagemDpsQuePostou()


    }, erro=>{
      if (erro.status == 500){
        this.alertas.showAlertInfo('Existem campos vazios, verifique novamente.')
      }
    })
  }




findByTituloPostagem(){

  if(this.tituloPost == ''){
    this.getAllPostagens()

  }else{
    this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[])=>{
      this.listaPostagens = resp
      if(this.listaPostagens.length == 0){
        this.alertas.showAlertDanger('Não temos publicações com títulos referente ao que foi digitado')
      }
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


fecharTelaDePostagemDpsQuePostou()
{
  const tela = <HTMLElement> document.getElementById("collapseNovaPostagem")
  tela.classList.remove("show")
}





}
